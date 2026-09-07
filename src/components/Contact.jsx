import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../data/content';
import { Magnetic, Reveal, Section, SectionHead } from './ui/Primitives';
import Icon from './ui/Icon';
import './contact.css';

const FIELDS = [
  { key: 'name', label: 'Your Name', type: 'text', autoComplete: 'name' },
  { key: 'email', label: 'Your Email', type: 'email', autoComplete: 'email' },
  { key: 'message', label: 'Message', type: 'textarea' },
];

/* No backend here, so the form composes a prefilled mail draft in the
   visitor's own client — more reliable than form action="mailto:". */
function buildMailto({ name, email, message }) {
  const subject = `Portfolio enquiry from ${name || 'a visitor'}`;
  const body = [`Name: ${name}`, `Email: ${email}`, '', message].join('\n');
  return `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

const DETAILS = [
  { icon: 'mail', label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  {
    icon: 'phone',
    label: 'Phone',
    value: PROFILE.phone,
    href: `tel:${PROFILE.phone.replace(/[^\d+]/g, '')}`,
  },
  { icon: 'pin', label: 'Location', value: PROFILE.location },
];

function DetailCard({ item, index }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(item.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — the value is visible and linked anyway */
    }
  };

  return (
    <motion.div
      className="detail glass"
      initial={{ opacity: 0, x: 26 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="detail-icon">
        <Icon name={item.icon} size={17} />
      </span>
      <div className="detail-body">
        <span className="detail-label mono">{item.label}</span>
        {item.href ? (
          <a className="detail-value" href={item.href}>
            {item.value}
          </a>
        ) : (
          <span className="detail-value">{item.value}</span>
        )}
      </div>
      <button className="detail-copy" onClick={copy} aria-label={`Copy ${item.label}`}>
        {copied ? <Icon name="check" size={14} /> : <Icon name="link" size={14} />}
        <span className="mono">{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </motion.div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    window.location.href = buildMailto(form);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <Section id="contact" bloom="vermilion" bloomAt="left">
      <SectionHead
        index={11}
        eyebrow="Contact"
        title="Let's"
        accent="start a conversation."
        sub="Open to internships, entry-level roles and collaborations across textile, business development and tech."
      />

      <div className="contact-grid">
        <Reveal className="contact-form-wrap">
          <form className="contact-form glass" onSubmit={submit}>
            {FIELDS.map((f, i) => (
              <div className={`field ${f.type === 'textarea' ? 'field-area' : ''}`} key={f.key}>
                {f.type === 'textarea' ? (
                  <textarea
                    id={`c-${f.key}`}
                    placeholder=" "
                    required
                    rows={5}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                ) : (
                  <input
                    id={`c-${f.key}`}
                    type={f.type}
                    placeholder=" "
                    required
                    autoComplete={f.autoComplete}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                )}
                <label htmlFor={`c-${f.key}`}>{f.label}</label>
                <span className="field-line" aria-hidden="true" />
                <span className="field-num mono">{String(i + 1).padStart(2, '0')}</span>
              </div>
            ))}

            <Magnetic strength={0.14}>
              <button type="submit" className="btn btn-primary contact-submit">
                {sent ? 'Opening your mail app…' : 'Send Message'}
                <Icon name={sent ? 'check' : 'send'} size={16} />
              </button>
            </Magnetic>

            <p className="contact-fineprint">
              This opens a prefilled draft in your own mail app — nothing is sent from this page.
            </p>
          </form>
        </Reveal>

        <div className="contact-side">
          {DETAILS.map((d, i) => (
            <DetailCard item={d} index={i} key={d.label} />
          ))}

          <Reveal delay={0.28}>
            <div className="map glass">
              <iframe
                title="Map of Dhaka, Bangladesh"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  PROFILE.mapQuery
                )}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span className="map-veil" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
