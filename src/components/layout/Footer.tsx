import Link from "next/link";
import { Button } from "../ui/button";

export function Footer() {
    return (
      <footer className="border-t">
        <div className="container flex h-14 flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Petersthal Village Hub
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <a href="http://www.archiv-petersthal.de" target="_blank" rel="noopener noreferrer">
                    Dorfarchive
                </a>
            </Button>
            <Button variant="ghost" asChild>
                <a href="http://www.rottachsee.info" target="_blank" rel="noopener noreferrer">
                    Verkehrsverein
                </a>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/admin">
                Admin
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    );
  }
  