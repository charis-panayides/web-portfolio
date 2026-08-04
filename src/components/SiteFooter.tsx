export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-hairline">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <div className="font-mono-label text-muted-foreground">Contact</div>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
              Have something meaningful to build?
            </h2>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              Available for freelance projects and selected opportunities.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:col-span-4 md:items-end md:justify-end">
            <a
              href="mailto:harris_panayides@outlook.com"
              className="border-b border-foreground pb-1 text-lg transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
            >
              Email me ↗
            </a>
           <a
              href="tel:+35797803201"
              aria-label="Call Charis Panayides at +357 97803201"
              className="border-b border-foreground pb-1 text-lg transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
            >
              Call me ↗
            </a>
            <a
              href="https://www.linkedin.com/in/charis-panayides-a57ba8254/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="border-b border-foreground pb-1 text-lg transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
            >
              LinkedIn ↗
            </a>
            <p className="pt-2 font-mono-label text-muted-foreground">
              Cyprus · Available remotely
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline pt-6 font-mono-label text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:mt-24">
          <span>© {new Date().getFullYear()} Charis Panayides</span>
          <a
            href="#top"
            className="transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
