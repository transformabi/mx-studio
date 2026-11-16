'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { flushSync } from 'react-dom';
import { Check } from 'lucide-react';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { whatsappUrl } from '@/lib/estudio';

const input =
  'w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-bone placeholder:text-white/35 focus:border-[#FFE500] focus:bg-white/[0.06]';

/** No backend. The name and number open WhatsApp already written, which is the waitlist. */
export function Waitlist({ t }: { t: Messages['campaign']['waitlist'] }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const uid = useId();
  const nameId = `${uid}-name`;
  const phoneId = `${uid}-phone`;
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) found.name = t.errorName;
    if (phone.replace(/\D/g, '').length < 8) found.phone = t.errorPhone;
    flushSync(() => setErrors(found));
    if (found.name) {
      nameRef.current?.focus();
      return;
    }
    if (found.phone) {
      phoneRef.current?.focus();
      return;
    }
    const url = whatsappUrl(fill(t.wa, { name: name.trim(), phone: phone.trim() }));
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentUrl(url);
  };

  return (
    <section id="lista" className="scroll-mt-48 border-t border-white/10">
      <div className="container-site max-w-3xl py-16 sm:py-20">
        <p className="font-label text-[11px] font-bold uppercase tracking-[0.16em] text-[#FFE500]">Black Friday</p>
        <h2 className="mt-3 text-balance font-brand text-4xl font-bold leading-[0.95] tracking-[-0.03em] sm:text-5xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">{t.lead}</p>

        {sentUrl ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-ink-2 p-8" role="status">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#FFE500] text-[#111]">
              <Check className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-5 font-brand text-2xl font-bold">{t.sentTitle}</h3>
            <p className="mt-3 max-w-md text-white/70">{fill(t.sentText, { name: name.trim().split(' ')[0] })}</p>
            <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-[#FFE500] underline-offset-4 hover:underline">
              {t.sentRetry}
            </a>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-8 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={nameId} className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">
                {t.name}
              </label>
              <input
                ref={nameRef}
                id={nameId}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                autoComplete="name"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? `${nameId}-error` : undefined}
                className={`${input} mt-2`}
              />
              {errors.name && (
                <p id={`${nameId}-error`} className="mt-2 text-xs text-[#ff9b7a]" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor={phoneId} className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">
                {t.phone}
              </label>
              <input
                ref={phoneRef}
                id={phoneId}
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phonePlaceholder}
                autoComplete="tel"
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
                className={`${input} mt-2`}
              />
              {errors.phone && (
                <p id={`${phoneId}-error`} className="mt-2 text-xs text-[#ff9b7a]" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#FFE500] px-6 text-sm font-bold text-[#111] sm:col-span-2 sm:justify-self-start"
            >
              {t.send}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
