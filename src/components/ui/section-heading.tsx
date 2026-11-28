// Section header pattern from the design: small serif number ("01") above an h2.
// `id` goes on the h2 so the section can use aria-labelledby; `children` sit on the right (e.g. a link).
import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Position of the section on the page, shown zero-padded ("01"). */
  n: number;
  title: string;
  id?: string;
  children?: ReactNode;
};

export function SectionHeading({ n, title, id, children }: SectionHeadingProps) {
  return (
    <div className="sec__head">
      <div>
        <div className="sec__n num" aria-hidden="true">
          {String(n).padStart(2, "0")}
        </div>
        <h2 id={id} className="sec__title">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
