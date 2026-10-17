import { useState } from 'react';
import { PROFILE } from '../../data/content';
import Icon from './Icon';

/* Share a link: native sheet where the browser has one, otherwise
   WhatsApp, LinkedIn and copy-link buttons. */
export default function Share({ title, hash = '', text }) {
  const [copied, setCopied] = useState(false);
  const url = `${PROFILE.site}/${hash ? `#${hash}` : ''}`;
  const msg = text || title;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked */
    }
  };

  const native = async () => {
    try {
      await navigator.share({ title, text: msg, url });
    } catch {
      /* dismissed */
    }
  };

  return (
    <div className="share" role="group" aria-label={`Share ${title}`}>
      <span className="share-l mono">Share</span>
      {typeof navigator !== 'undefined' && navigator.share && (
        <button type="button" className="share-b" onClick={native}>
          <Icon name="send" size={13} />
          Share
        </button>
      )}
      <a
        className="share-b"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://wa.me/?text=${encodeURIComponent(`${msg} ${url}`)}`}
      >
        <Icon name="chat" size={13} />
        WhatsApp
      </a>
      <a
        className="share-b"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
      >
        <Icon name="linkedin" size={13} />
        LinkedIn
      </a>
      <button type="button" className="share-b" onClick={copy}>
        <Icon name={copied ? 'check' : 'link'} size={13} />
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  );
}
