import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Veranstaltungen',
  description: 'Alle Veranstaltungen und Termine in Petersthal am Rottachsee.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
