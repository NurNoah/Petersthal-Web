export function Footer() {
    return (
      <footer className="border-t">
        <div className="container flex h-14 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Petersthal Village Hub
          </p>
        </div>
      </footer>
    );
  }
  