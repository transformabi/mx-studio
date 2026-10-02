'use client';

import { useState } from 'react';
import { Check, Send } from 'lucide-react';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { whatsappUrl } from '@/lib/estudio';

/** There is no backend: the form hands the lead to WhatsApp with the message already written. */
export function ContactForm({ t, budgets }: { t: Messages['form']; budgets: string[] }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState(0);
  const [budget, setBudget] = useState(1);
  const [message, setMessage] = useState('');
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t.errorName;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = t.errorEmail;
    if (message.trim().length < 12) e.message = t.errorMessage;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const text = [
      t.waIntro,
      '',
      `${t.name}: ${name.trim()}`,
      `${t.email}: ${email.trim()}`,
      `${t.waProject}: ${t.projects[project]}`,
      `${t.waBudget}: ${budgets[budget]}`,
      '',
      message.trim(),
    ].join('\n');
    const url = whatsappUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentUrl(url);
  };

  if (sentUrl) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/4 p-10 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-lime text-ink">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-brand text-2xl font-bold text-white">{t.sentTitle}</h3>
        <p className="mt-3 max-w-md mx-auto text-white/70">
          {fill(t.sentText, { name: name.trim().split(' ')[0] })}
        </p>
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
    <form
      onSubmit={submit}
      className="rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t.name} error={errors.name} htmlFor="name">
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className="input"
          />
        </Field>
        <Field label={t.email} error={errors.email} htmlFor="email">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="input"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label={t.project} htmlFor="project">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="project-label">
            {t.projects.map((p, i) => (
              <button
                type="button"
                key={p}
                role="radio"
                aria-checked={project === i}
                onClick={() => setProject(i)}
                className={
                  'rounded-full border px-4 py-2 text-sm transition-colors ' +
                  (project === i
                    ? 'border-lime bg-lime text-black'
                    : 'border-white/15 bg-white/3 text-white/70 hover:border-white/30 hover:text-white')
                }
              >
                {p}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-6">
        <Field label={t.budget} htmlFor="budget">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="budget-label">
            {budgets.map((b, i) => (
              <button
                type="button"
                key={b}
                role="radio"
                aria-checked={budget === i}
                onClick={() => setBudget(i)}
                className={
                  'rounded-full border px-4 py-2 text-sm transition-colors ' +
                  (budget === i
                    ? 'border-lime bg-lime text-black'
                    : 'border-white/15 bg-white/3 text-white/70 hover:border-white/30 hover:text-white')
                }
              >
                {b}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-6">
        <Field label={t.message} error={errors.message} htmlFor="msg">
          <textarea
            id="msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder={t.messagePlaceholder}
            className="input resize-none"
          />
        </Field>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-xs text-white/40">{t.footnote}</p>
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
        >
          {t.send} <Send className="h-4 w-4" />
        </button>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 12px;
          padding: 12px 16px;
          color: white;
          font-size: 14px;
          transition: border-color 200ms, background 200ms;
        }
        .input::placeholder { color: rgba(255,255,255,0.35); }
        .input:focus {
          outline: none;
          border-color: rgba(148,228,33,0.6);
          background: rgba(255,255,255,0.06);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
  error,
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  htmlFor?: string;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        id={`${htmlFor}-label`}
        className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <div className="mt-2 text-xs text-[#ff8a5c]" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
