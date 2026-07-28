import { ScrollingPreview } from "@/components/ScrollingPreview";

type Props = {
  src: string;
  title: string;
  alt: string;
  website: string;
  websiteLabel: string;
};

export function CaseStudyMedia({ src, title, alt, website, websiteLabel }: Props) {
  return (
    <section aria-labelledby="presentation-heading" className="py-16 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="font-mono-label text-muted-foreground">Responsive presentation</p>
        <h2 id="presentation-heading" className="mt-3 font-display text-4xl md:text-6xl">
          Desktop and mobile
        </h2>
        <div className="mt-10 md:mt-16">
          <ScrollingPreview
            src={src}
            alt={alt}
            href={website}
            label={websiteLabel}
            className="shadow-sm"
          />
        </div>
        <div className="mt-8 grid items-start gap-8 md:mt-12 md:grid-cols-12">
          <figure className="md:col-span-8">
            <div className="aspect-[4/3] overflow-hidden border border-hairline bg-background">
              <img
                src={src}
                alt={`Close-up interface detail from the ${title} website`}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 font-mono-label text-muted-foreground">
              Interface detail
            </figcaption>
          </figure>
          <figure className="flex flex-col items-center md:col-span-4">
            <div className="w-full max-w-[300px] rounded-[2rem] border border-foreground/25 bg-background p-2 shadow-sm">
              <div className="aspect-[9/19] overflow-hidden rounded-[1.55rem] border border-hairline">
                <img
                  src={src}
                  alt={`Mobile-format presentation of the ${title} website`}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
            <figcaption className="mt-3 font-mono-label text-muted-foreground">
              Mobile presentation
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
