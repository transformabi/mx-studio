'use client';

import { useState } from 'react';
import { Check, Send } from 'lucide-react';

const projects = [
  'Site institucional',
  'E-commerce',
  'Landing de conversão',
  'Sistema sob medida',
  'Ainda não sei',
];

const budgets = [
  'Até R$ 5 mil',
  'R$ 5–10 mil',
  'R$ 10–20 mil',
  'Acima de R$ 20 mil',
];

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState(projects[0]);
  const [budget, setBudget] = useState(budgets[1]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Diz seu nome, por favor.';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'E-mail inválido.';
    if (message.trim().length < 12) e.message = 'Conta um pouquinho mais sobre o projeto.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 900));
    setStatus('sent');
  };

  if (status === 'sent') {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#c6ff3b] text-black">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-white">Recebido!</h3>
        <p className="mt-3 max-w-md mx-auto text-white/70">
          Obrigado, {name.split(' ')[0]}. Vou te responder em até 24 horas com um
          convite pra uma call ou uma proposta preliminar. Ficamos por WhatsApp
          enquanto isso?
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nome" error={errors.name} htmlFor="name">
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Como quer ser chamado?"
            className="input"
          />
        </Field>
        <Field label="E-mail" error={errors.email} htmlFor="email">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@dominio.com"
            className="input"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Qual tipo de projeto?" htmlFor="project">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="project-label">
            {projects.map((p) => (
              <button
                type="button"
                key={p}
                role="radio"
                aria-checked={project === p}
                onClick={() => setProject(p)}
                className={
                  'rounded-full border px-4 py-2 text-sm transition-colors ' +
                  (project === p
                    ? 'border-[#c6ff3b] bg-[#c6ff3b] text-black'
                    : 'border-white/15 bg-white/[0.03] text-white/70 hover:border-white/30 hover:text-white')
                }
              >
                {p}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Faixa de investimento" htmlFor="budget">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="budget-label">
            {budgets.map((b) => (
              <button
                type="button"
                key={b}
                role="radio"
                aria-checked={budget === b}
                onClick={() => setBudget(b)}
                className={
                  'rounded-full border px-4 py-2 text-sm transition-colors ' +
                  (budget === b
                    ? 'border-[#c6ff3b] bg-[#c6ff3b] text-black'
                    : 'border-white/15 bg-white/[0.03] text-white/70 hover:border-white/30 hover:text-white')
                }
              >
                {b}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Sobre o projeto" error={errors.message} htmlFor="msg">
          <textarea
            id="msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Conta brevemente: o que a empresa faz, o que precisa e um prazo desejado."
            className="input resize-none"
          />
        </Field>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-xs text-white/40">
          Resposta em até 24h · seus dados não vão pra parte nenhuma.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === 'sending' ? 'Enviando…' : (<>Enviar <Send className="h-4 w-4" /></>)}
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
          border-color: rgba(198,255,59,0.6);
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
