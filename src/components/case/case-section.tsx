// A titled block of the case main column: optional kicker over an h2, then its content.
import type { ReactNode } from "react";
import { Icon } from "../ui/icon";
import s from "./case-blocks.module.css";

type CaseSectionProps = { id: string; title: string; kicker?: string; children: ReactNode };

export function CaseSection({ id, title, kicker, children }: CaseSectionProps) {
  return (
    <section aria-labelledby={id} className={s.section}>
      <div className={s.sectionHead}>
        {kicker && <p className="kicker">{kicker}</p>}
        <h2 id={id} className={s.h2}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

/** Short highlighted paragraph: "<strong>Label:</strong> body". The "note" tone adds an info icon. */
export function Callout({ label, body, tone = "plain" }: { label: string; body: string; tone?: "plain" | "note" }) {
  return (
    <div className={tone === "note" ? `${s.callout} ${s.calloutNote}` : s.callout}>
      {tone === "note" && <Icon name="info" size={22} />}
      <p>
        {label && <strong>{label}:</strong>} {body}
      </p>
    </div>
  );
}

/** Body paragraph limited to a comfortable reading width. */
export function Lead({ children }: { children: ReactNode }) {
  return <p className={s.lead}>{children}</p>;
}
