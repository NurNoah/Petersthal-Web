import Link from "next/link";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const externalLinks = [
  { href: "http://www.archiv-petersthal.de", label: "Dorfarchiv" },
  { href: "http://www.rottachsee.info", label: "Rottachsee" },
];

export function Footer() {
  return (
    <footer className="border-t bg-secondary/20">
      <div className="container py-6">
        <div className="grid gap-6 border-b border-border/70 pb-5 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div className="space-y-2">
            <h2 className="text-base font-semibold">Petersthal</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Veranstaltungen, Vereine und Informationen rund um Petersthal am Rottachsee.
            </p>
          </div>

          <div className="space-y-2 md:text-right">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Kontakt &amp; interessantes</h3>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Kontakt</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Hinweis zum Kontakt</DialogTitle>
                    <DialogDescription>
                      Bitte schreiben Sie an diese E-Mail-Adresse nur Anliegen, die die Webseite betreffen.
                      Vereinsbezogene Themen wie Kündigungen, Mitgliedschaften oder Anfragen an einzelne Vereine
                      gehören nicht hierher. Nutzen Sie dafür bitte den Kontaktbereich auf der jeweiligen
                      Vereins-Unterseite.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                      <Button variant="outline">Abbrechen</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="secondary" asChild>
                        <Link href="/vereine">
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Vereine
                        </Link>
                      </Button>
                    </DialogClose>
                    <Button asChild>
                      <a href="mailto:Info@Noah-Weissenbach.de">
                        <Mail className="mr-2 h-4 w-4" />
                        E-Mail senden
                      </a>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {externalLinks.map((link) => (
                <Button key={link.href} variant="outline" size="sm" asChild>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Petersthal</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="hidden text-border md:inline">|</span>
            <p>
              Webdesign, technische Umsetzung und Betreuung durch{" "}
              <a
                href="https://noah-weissenbach.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-primary underline-offset-4 transition-colors hover:text-primary"
              >
                Noah Wei&szlig;enbach IT-Dienstleistungen
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </p>
            <span className="hidden text-border md:inline">|</span>

            <Button variant="outline" size="sm" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
