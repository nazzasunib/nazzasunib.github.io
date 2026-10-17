import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE, SOCIALS } from '../data/content';
import { Magnetic, Reveal, Section, SectionHead } from './ui/Primitives';
import Icon from './ui/Icon';
import VoiceOrb from './fx/VoiceOrb';
import './contact.css';

const FIELDS = [
  { key: 'name', label: 'Your Name', type: 'text', autoComplete: 'name' },
  { key: 'email', label: 'Your Email', type: 'email', autoComplete: 'email' },
  { key: 'message', label: 'Message', type: 'textarea' },
];

/* No backend here, so the form composes a prefilled mail draft in the
   visitor's own client — more reliable than form action="mailto:". */
function buildMailto({ name, email, message, topic }) {
  const subject = `[${topic}] Portfolio enquiry from ${name || 'a visitor'}`;
  const body = [`Topic: ${topic}`, `Name: ${name}`, `Email: ${email}`, '', message].join('\n');
  return `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

const TOPICS = ['Job', 'Collaboration', 'Business', 'General'];

const LINKEDIN = SOCIALS.find((x) => x.name === 'LinkedIn');

const DETAILS = [
  { icon: 'mail', label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  {
    icon: 'phone',
    label: 'Phone',
    value: PROFILE.phone,
    href: `tel:${PROFILE.phone.replace(/[^\d+]/g, '')}`,
  },
  {
    icon: 'chat',
    label: 'WhatsApp',
    value: PROFILE.phone,
    href: `https://wa.me/${PROFILE.whatsapp}`,
    external: true,
  },
  ...(LINKEDIN
    ? [{ icon: 'linkedin', label: 'LinkedIn', value: LINKEDIN.handle, href: LINKEDIN.url, external: true }]
    : []),
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
      className="detail glass card"
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
          <a
            className="detail-value"
            href={item.href}
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
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
  const [form, setForm] = useState({ name: '', email: '', message: '', topic: TOPICS[0] });
  const [state, setState] = useState('idle'); /* idle | sending | sent | error */
  const sent = state === 'sent';

  const submit = async (e) => {
    e.preventDefault();
    if (!PROFILE.formUrl) {
      /* no endpoint configured: open a prefilled draft in the visitor's mail app */
      window.location.href = buildMailto(form);
      setState('sent');
      setTimeout(() => setState('idle'), 4000);
      return;
    }
    setState('sending');
    try {
      const res = await fetch(PROFILE.formUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `[${form.topic}] Portfolio enquiry from ${form.name}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
      setForm({ name: '', email: '', message: '', topic: form.topic });
    } catch {
      setState('error');
    }
    setTimeout(() => setState('idle'), 5000);
  };

  return (
    <Section id="contact" bloom="vermilion" bloomAt="left">
      <SectionHead
        eyebrow="Contact"
        title="Let's"
        accent="talk."
        sub="Hiring, partnering or simply curious? I am open to roles and collaborations across textiles, business development and tech."
      />

      <div className="contact-grid">
        <Reveal className="contact-form-wrap">
          <form className="contact-form glass" onSubmit={submit}>
            <div className="topics" role="group" aria-label="What is this about?">
              <span className="topics-l mono">I'm writing about</span>
              {TOPICS.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`topic ${form.topic === t ? 'is-on' : ''}`}
                  aria-pressed={form.topic === t}
                  onClick={() => setForm({ ...form, topic: t })}
                >
                  {t}
                </button>
              ))}
            </div>

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
                {state === 'sending'
                  ? 'Sending…'
                  : sent
                    ? PROFILE.formUrl ? 'Message sent' : 'Opening your mail app…'
                    : state === 'error'
                      ? 'Failed, try again'
                      : 'Send Message'}
                <Icon name={sent ? 'check' : 'send'} size={16} />
              </button>
            </Magnetic>

            <p className="contact-fineprint">
              {PROFILE.formUrl
                ? `Goes straight to ${PROFILE.email}. You can also use the email, WhatsApp or LinkedIn on the right.`
                : 'This opens a prefilled draft in your own mail app. Nothing is sent from this page.'}
            </p>
          </form>
        </Reveal>

        <div className="contact-side">
          <Reveal>
            <VoiceOrb
              speakers={['You', PROFILE.first.split(' ')[0]]}
              states={['Listening', 'Replying']}
              note="Say hello. I read every message."
            />
          </Reveal>
          {DETAILS.map((d, i) => (
            <DetailCard item={d} index={i} key={d.label} />
          ))}

          <Reveal delay={0.28}>
            <div className="map glass">
              <iframe
                title="Map of Gulshan 2 Circle, Dhaka"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  PROFILE.mapQuery
                )}&z=16&output=embed`}
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
