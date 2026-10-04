'use client';

import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { Check, Send } from 'lucide-react';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { useI18n } from '@/i18n/provider';
import { whatsappUrl } from '@/lib/estudio';
import { cn } from '@/lib/utils';

const input =
  'w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-bone placeholder:text-white/35 transition-colors focus:border-lime/60 focus:bg-white/[0.06]';
const chip = (active: boolean) =>
  cn(
    'rounded-full border px-4 py-2 text-sm transition-colors',
    active ? 'border-bone bg-bone text-ink' : 'border-white/15 text-white/70 hover:border-white/35 hover:text-bone',
  );

/** No backend: the lead goes to WhatsApp with the message already written. */
export function ContactForm({ t }: { t: Messages['contact']['form'] }) {
  const { money } = useI18n();
  const amount = (brl: number) => money(brl, { decimals: 0, round: true });
  const budgets = [
    fill(t.budgetUpTo, { amount: amount(5000) }),
    fill(t.budgetUpTo, { amount: amount(10000) }),
    fill(t.budgetUpTo, { amount: amount(20000) }),
    fill(t.budgetAbove, { amount: amount(20000) }),
  ];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState(0);
  const [budget, setBudget] = useState(1);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const uid = useId();
  const ids = { name: `${uid}-name`, email: `${uid}-email`, message: `${uid}-message` };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found: Record<string, string> = {};
    if (!name.trim()) found.name = t.errorName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) found.email = t.errorEmail;
    if (message.trim().length < 12) found.message = t.errorMessage;
    setErrors(found);
    if (Object.keys(found).length) return;

    const url = whatsappUrl(
      [
        t.waIntro,
        '',
        `${t.name}: ${name.trim()}`,
        `${t.email}: ${email.trim()}`,
        `${t.waProject}: ${t.projects[project]}`,
        `${t.waBudget}: ${budgets[budget]}`,
        '',
        message.trim(),
      ].join('\n'),
    );
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentUrl(url);
  };

  if (sentUrl) {
    return (
      <div className="rounded-xl border border-white/10 bg-ink-2 p-10 text-center" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-lime text-ink">
          <Check className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-6 font-brand text-2xl font-bold">{t.sentTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-white/70">{fill(t.sentText, { name: name.trim().split(' ')[0] })}</p>
        <a
          href={sentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block text-sm text-lime underline-offset-4 hover:underline"
        >
          {t.sentRetry}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-xl border border-white/10 bg-ink-2 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={ids.name} label={t.name} error={errors.name}>
          <input
            id={ids.name}
            {...invalid(ids.name, errors.name)}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            autoComplete="name"
            className={input}
          />
        </Field>
        <Field id={ids.email} label={t.email} error={errors.email}>
          <input
            id={ids.email}
            {...invalid(ids.email, errors.email)}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            autoComplete="email"
            className={input}
          />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">{t.project}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {t.projects.map((p, i) => (
            <button key={p} type="button" aria-pressed={project === i} onClick={() => setProject(i)} className={chip(project === i)}>
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">{t.budget}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {budgets.map((b, i) => (
            <button key={b} type="button" aria-pressed={budget === i} onClick={() => setBudget(i)} className={chip(budget === i)}>
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <Field id={ids.message} label={t.message} error={errors.message}>
          <textarea
            id={ids.message}
            {...invalid(ids.message, errors.message)}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.messagePlaceholder}
            className={cn(input, 'resize-none')}
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/45">{t.footnote}</p>
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-[#b8ff52]"
        >
          {t.send}
          <Send className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </form>
  );
}

const errorId = (id: string) => `${id}-error`;

/** Marks a field invalid and points it at its error message, so screen readers announce both. */
const invalid = (id: string, error?: string) =>
  error ? { 'aria-invalid': true as const, 'aria-describedby': errorId(id) } : {};

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={errorId(id)} className="mt-2 text-xs text-[#ff9b7a]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
