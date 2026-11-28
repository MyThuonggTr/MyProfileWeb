// Optional portrait for the hero. No photo is committed yet: drop src/assets/portrait.(jpg|jpeg|png|webp)
// in and it appears on the next build; without a file the hero renders without a photo column.
const found = import.meta.glob<string>("../../assets/portrait.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

/** URL of the portrait file, or null when none has been added. */
export const portraitUrl: string | null = Object.values(found)[0] ?? null;

type HeroPortraitProps = { src: string; alt: string; className?: string };

/** 4:5 framed photo; width/height reserve the box so the page does not shift while it loads. */
export function HeroPortrait({ src, alt, className }: HeroPortraitProps) {
  return (
    <figure className={className}>
      <img src={src} alt={alt} width={480} height={600} decoding="async" fetchPriority="high" />
    </figure>
  );
}
