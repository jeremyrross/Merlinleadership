"use client";

import { useState } from "react";

export default function ShareLinks({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;
  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  const cls =
    "text-neutral-400 hover:text-teal-700 text-[11px] tracking-widest uppercase transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-5">
      <span className="text-neutral-300 text-[11px] tracking-widest uppercase">
        Share
      </span>
      <a href={linkedIn} target="_blank" rel="noopener noreferrer" className={cls}>
        LinkedIn
      </a>
      <a href={x} target="_blank" rel="noopener noreferrer" className={cls}>
        X
      </a>
      <button type="button" onClick={copy} className={cls}>
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
