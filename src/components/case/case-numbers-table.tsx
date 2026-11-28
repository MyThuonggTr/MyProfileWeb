// Two-way numbers table (row headers × column headers) inside a scroll container.
// The container is a labelled, focusable region so keyboard users can scroll it, and it
// shows edge shadows while more columns are hidden (see .scroll in case-table.module.css).
// The <caption> names the table for assistive tech; the same text is shown under the scroll
// box (hidden from assistive tech) so it stays readable when the table scrolls sideways.
import s from "./case-table.module.css";

export type NumbersTableData = {
  caption: string;
  /** Top-left header cell, describing the row and column axes. */
  corner: string;
  columns: string[];
  rows: { head: string; cells: string[] }[];
  /** Cell of the base case, highlighted. */
  base?: { row: number; col: number };
};

export function CaseNumbersTable({ caption, corner, columns, rows, base }: NumbersTableData) {
  return (
    <div className={s.wrap}>
      <div className={s.scroll} role="region" aria-label={caption} tabIndex={0}>
        <table className={`${s.table} num`}>
          <caption className="visually-hidden">{caption}</caption>
          <thead>
            <tr>
              <th scope="col">{corner}</th>
              {columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={r.head}>
                <th scope="row">{r.head}</th>
                {r.cells.map((cell, ci) => (
                  <td key={columns[ci] ?? ci} className={base?.row === ri && base.col === ci ? s.base : undefined}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={s.caption} aria-hidden="true">
        {caption}
      </p>
    </div>
  );
}
