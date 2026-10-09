import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum des Einzelunternehmens von Noah Weißenbach für Webentwicklung, Software und digitale Projekte.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ImpressumPage() {
  return (
    <div className="container mx-auto max-w-3xl space-y-10 px-4 py-12 md:py-20">
      <div className="space-y-4">
        <Link href="/" className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary">
          Zurück zur Startseite
        </Link>
        <h1 className="font-headline text-4xl font-bold">Impressum</h1>
      </div>

      <section className="space-y-4 rounded-2xl border border-border bg-secondary/40 p-6 md:p-8">
        <h2 className="font-headline text-xl font-semibold">Angaben gemäß § 5 DDG</h2>
        <div className="space-y-2 text-muted-foreground">
          <p>Noah Weissenbach</p>
          <p>E-Mail: Kontakt@Noah-Weissenbach.de</p>
          <p>c/o MDC#weissenbach</p>
          <p>Welserstraße 3</p>
          <p>87463 Dietmannsried</p>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-background p-6 md:p-8">
        <h2 className="font-headline text-xl font-semibold">Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV</h2>
        <p className="leading-relaxed text-muted-foreground">
          Noah Weissenbach
          <br />
          Anschrift wie oben
          <br />
          E-Mail: Kontakt@Noah-Weissenbach.de
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-background p-6 md:p-8">
        <h2 className="font-headline text-xl font-semibold">Verbraucherstreitbeilegung</h2>
        <p className="leading-relaxed text-muted-foreground">
          Ich bin nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-background p-6 md:p-8">
        <h2 className="font-headline text-xl font-semibold">Urheberrecht</h2>
        <p className="leading-relaxed text-muted-foreground">
          Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem deutschen
          Urheberrecht. Jede Verwertung außerhalb der Grenzen des Urheberrechts bedarf der
          vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers.
        </p>
      </section>
    </div>
  );
}
