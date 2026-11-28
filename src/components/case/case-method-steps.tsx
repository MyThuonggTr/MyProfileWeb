// Numbered method steps ("01", "02", …) from a "(1) … (2) …" content row.
import s from "./case-blocks.module.css";

export function CaseMethodSteps({ steps }: { steps: string[] }) {
  return (
    <ol className={s.steps}>
      {steps.map((step, i) => (
        <li key={step}>
          <span className={`${s.stepN} num`} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p>{step}</p>
        </li>
      ))}
    </ol>
  );
}
