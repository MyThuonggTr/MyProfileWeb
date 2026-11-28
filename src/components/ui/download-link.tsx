// Link to a file in public/downloads, saved under its human-readable name.
// Pass an entry of DOWNLOADS (src/lib/ui.ts) or fileOf(key).
import { ButtonLink, type ButtonLinkProps } from "./button-link";

export type DownloadFile = { readonly href: string; readonly name: string };

type DownloadLinkProps = Omit<ButtonLinkProps, "href" | "download"> & { file: DownloadFile };

export function DownloadLink({ file, icon = "download", ...rest }: DownloadLinkProps) {
  return <ButtonLink href={file.href} download={file.name} icon={icon} {...rest} />;
}
