'use client';

import { motion } from 'framer-motion';
import { useContactStore } from '@/stores/contactStore';
import { PROFILE } from '@/constants/profile';
import { useTranslations } from '@/hooks/use-translations';

export default function ContactSection() {
  const { form, status, error, setField, submit, reset } = useContactStore();
  const t = useTranslations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit();
  };

  return (
    <div className="p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-b border-border pb-4 mb-8">
            <h2 className="text-heading mb-1">
              {t.contact.sendTransmission}
            </h2>
            <p className="text-body text-foreground-secondary">
              {t.contact.formSubtitle}
            </p>
          </div>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-status-available/30 bg-status-available/5 p-8 text-center"
            >
              <div className="font-mono text-heading-sm text-status-available mb-3">✓</div>
              <h3 className="text-heading-sm mb-2">
                {t.contact.transmissionReceived}
              </h3>
              <p className="text-body text-foreground-secondary mb-6">
                {t.contact.replyPromise}
              </p>
              <button onClick={reset} className="btn-outline text-xs">
                {t.contact.sendAnother}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  label={t.contact.name}
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(v) => setField('name', v)}
                  placeholder="John Doe"
                  required
                />
                <FormField
                  label={t.contact.email}
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setField('email', v)}
                  placeholder="john@company.com"
                  required
                />
              </div>

              <FormField
                label={t.contact.subject}
                id="subject"
                type="text"
                value={form.subject}
                onChange={(v) => setField('subject', v)}
                placeholder={t.contact.subjectPlaceholder}
              />

              <div>
                <label
                  htmlFor="message"
                  className="label-mono block mb-2"
                >
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => setField('message', e.target.value)}
                  placeholder={t.contact.messagePlaceholder}
                  required
                  className="w-full bg-elevated border border-border
                             text-body text-foreground placeholder:text-foreground-muted
                             px-4 py-3 resize-none
                             focus:outline-none focus:border-accent
                             transition-colors duration-200"
                />
              </div>

              {error && (
                <p className="text-code text-status-busy">{error}</p>
              )}

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="animate-spin font-mono">⟳</span>
                      {t.contact.sending}
                    </>
                  ) : (
                    t.contact.sendMessage
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-8"
        >
          <div>
            <div className="border-b border-border pb-4 mb-5">
              <h3 className="text-heading-sm">
                {t.contact.directContact}
              </h3>
            </div>
            <div className="space-y-4">
              {PROFILE.contact.map((c) => (
                <a
                  key={c.type}
                  href={c.url}
                  target={c.type !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-border
                             hover:border-accent group transition-colors"
                >
                  <div>
                    <p className="label-mono text-foreground-muted mb-0.5">{c.label}</p>
                    <p className="text-heading-2xs text-foreground
                                  group-hover:text-accent transition-colors">
                      {c.value}
                    </p>
                  </div>
                  <span className="font-mono text-foreground-muted group-hover:text-accent transition-colors sm:ml-auto">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="border-b border-border pb-4 mb-5">
              <h3 className="text-heading-sm">
                {t.contact.findMeOnline}
              </h3>
            </div>
            <div className="space-y-3">
              {PROFILE.social.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-wrap items-center gap-3 p-3 border border-border
                             hover:border-accent group transition-colors"
                >
                  <span className="text-code text-foreground-muted w-16">
                    {s.platform}
                  </span>
                  <span className="text-body text-foreground-secondary group-hover:text-foreground transition-colors">
                    {s.handle}
                  </span>
                  <span className="sm:ml-auto font-mono text-foreground-muted group-hover:text-accent transition-colors text-xs">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="border border-border p-5">
            <p className="label-mono mb-2">{t.contact.baseOfOperations}</p>
            <h4 className="text-heading">
              {PROFILE.location.city}, {PROFILE.location.country}
            </h4>
            <p className="coord-text mt-1">{PROFILE.location.coords}</p>
            <p className="text-body-xs text-foreground-secondary mt-3">
              {t.contact.timezone}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}

function FormField({ label, id, type, value, onChange, placeholder, required }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="label-mono block mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-elevated border border-border
                   text-body text-foreground placeholder:text-foreground-muted
                   px-4 py-3
                   focus:outline-none focus:border-accent
                   transition-colors duration-200"
      />
    </div>
  );
}
