import Link from 'next/link';
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { estudio, whatsappUrl } from '@/lib/estudio';
import { MaxMonogram } from './max-monogram';

export function EstudioFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-black">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-40 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(198,255,59,0.10),transparent)]" />

      <div className="container-wide py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2.5">
              <MaxMonogram variant="inverted" rounded={22} className="h-9 w-9 shrink-0" />
              <div>
                <div className="font-display text-lg font-semibold text-white">Max Costa</div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                  Estúdio digital
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              Sites, e-commerces e produtos digitais sob medida para marcas que
              querem ser levadas a sério. Do brief à entrega, um humano só.
            </p>

            <div className="mt-6 flex flex-col gap-3 text-sm text-white/70">
              <a
                href={`mailto:${estudio.email}`}
                className="inline-flex items-center gap-2 self-start hover:text-white"
              >
                <Mail className="h-4 w-4" /> {estudio.email}
              </a>
              <div className="inline-flex items-center gap-2 self-start">
                <MapPin className="h-4 w-4 shrink-0" /> {estudio.location}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <SocialLink href={estudio.instagram} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={estudio.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={estudio.github} label="GitHub">
                <Github className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Portfólio
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/#trabalhos" className="text-white/70 hover:text-white">Trabalhos</Link></li>
                <li><Link href="/#processo" className="text-white/70 hover:text-white">Processo</Link></li>
                <li><Link href="/#servicos" className="text-white/70 hover:text-white">Serviços</Link></li>
                <li><Link href="/#sobre" className="text-white/70 hover:text-white">Sobre</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Demos
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/demo/moda-arte" className="text-white/70 hover:text-white">E-commerce</Link></li>
                <li><Link href="/demo/restaurante-terra" className="text-white/70 hover:text-white">Restaurante</Link></li>
                <li><Link href="/demo/clinica-sereno" className="text-white/70 hover:text-white">Clínica</Link></li>
                <li><Link href="/demo/motta-advogados" className="text-white/70 hover:text-white">Advocacia</Link></li>
                <li><Link href="/demo/costa-imoveis" className="text-white/70 hover:text-white">Imobiliária</Link></li>
                <li><Link href="/demo/rota-clara" className="text-white/70 hover:text-white">Infoproduto</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c6ff3b]">
                Vamos conversar?
              </div>
              <div className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl">
                Respondo em até 24 horas.
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#c6ff3b] px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                WhatsApp {estudio.whatsappDisplay}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${estudio.email}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Enviar e-mail
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Max Costa · Estúdio digital · Todos os direitos reservados</div>
          <div className="flex items-center gap-6">
            <span>Feito à mão em Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-[#c6ff3b]/40 hover:text-[#c6ff3b] hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}
