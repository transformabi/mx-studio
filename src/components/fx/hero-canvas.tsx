'use client';

import { useEffect, useRef, useState } from 'react';
import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderer } from 'three';

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// Domain-warped fbm "ink" in the brand colors, lit by a glow that follows the pointer.
const fragmentShader = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.05;

  vec2 q = vec2(fbm(p * 1.5 + t), fbm(p * 1.5 - t + 4.1));
  vec2 r = vec2(
    fbm(p * 1.3 + 3.0 * q + vec2(1.7, 9.2) + t * 1.4),
    fbm(p * 1.3 + 3.0 * q + vec2(8.3, 2.8) - t)
  );
  float f = fbm(p * 1.2 + 2.6 * r);

  float d = length(p - m);
  float glow = exp(-d * d * 4.0);

  vec3 lime = vec3(0.776, 1.0, 0.231);
  vec3 coral = vec3(1.0, 0.541, 0.361);

  vec3 col = vec3(0.015) + vec3(0.05, 0.06, 0.04) * f;
  col += lime * pow(f, 3.2) * (0.55 + glow * 1.6) * smoothstep(0.0, 1.0, vUv.y);
  col += coral * pow(clamp(r.x, 0.0, 1.0), 5.0) * 0.35 * smoothstep(0.3, 1.0, vUv.x);
  col += lime * glow * 0.05;

  col *= smoothstep(0.0, 0.45, vUv.y);
  col *= 1.0 - 0.35 * length(vUv - vec2(0.5, 0.6));
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.025;

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
    } catch {
      return; // No WebGL: the CSS gradients behind the canvas stay visible.
    }

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(dpr);

    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new Vector2() },
      uMouse: { value: new Vector2() },
    };
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new PlaneGeometry(2, 2);
    const material = new ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    scene.add(new Mesh(geometry, material));

    const target = new Vector2();
    const start = performance.now();
    let raf = 0;
    let onScreen = true;

    const resize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      uniforms.uRes.value.set(canvas.clientWidth * dpr, canvas.clientHeight * dpr);
    };
    const render = () => {
      uniforms.uTime.value = reduced ? 12 : (performance.now() - start) / 1000;
      uniforms.uMouse.value.lerp(target, 0.05);
      renderer.render(scene, camera);
    };
    const loop = () => {
      render();
      raf = onScreen && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const play = () => {
      if (!raf && !reduced) raf = requestAnimationFrame(loop);
    };
    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.set((e.clientX - rect.left) * dpr, (rect.height - (e.clientY - rect.top)) * dpr);
    };

    resize();
    target.set(uniforms.uRes.value.x * 0.72, uniforms.uRes.value.y * 0.6);
    uniforms.uMouse.value.copy(target);
    render();
    setReady(true);
    play();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced) render();
    });
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) play();
    });
    intersection.observe(canvas);
    const onVisibility = () => {
      if (!document.hidden) play();
    };
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`absolute inset-0 h-full w-full transition-opacity duration-[1500ms] ${ready ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}
