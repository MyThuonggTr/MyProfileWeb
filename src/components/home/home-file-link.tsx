// Download link for one entry of the FILES list. The visible text is short (the file type
// or a given label); the full document name follows for screen readers so links stay distinct.
import type { ReactNode } from "react";
import type { Lang } from "../../lib/content";
import { FILES, fileOf } from "../../lib/ui";
import { DownloadLink } from "../ui/download-link";
import c from "./home-common.module.css";

export type FileKey = (typeof FILES)[number]["key"];

/** The FILES row for a key (label per language and file type). */
export function fileEntry(key: FileKey) {
  const entry = FILES.find((f) => f.key === key);
  if (!entry) throw new Error(`download not listed in FILES: ${key}`);
  return entry;
}

type HomeFileLinkProps = { fileKey: FileKey; lang: Lang; children?: ReactNode };

export function HomeFileLink({ fileKey, lang, children }: HomeFileLinkProps) {
  const entry = fileEntry(fileKey);
  return (
    <DownloadLink file={fileOf(fileKey)} className={c.link}>
      {children ?? entry.type}
      <span className="visually-hidden"> – {entry[lang]}</span>
    </DownloadLink>
  );
}
