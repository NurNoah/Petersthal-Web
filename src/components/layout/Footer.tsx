import Link from "next/link";
import { Button } from "../ui/button";

export function Footer() {
    return (
      <footer className="border-t">
        <div className="container flex h-14 items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Petersthal Village Hub
          </p>
          <Button variant="ghost" asChild>
            <Link href="/admin">
              Admin
            </Link>
          </Button>
        </div>
      </footer>
    );
  }
  