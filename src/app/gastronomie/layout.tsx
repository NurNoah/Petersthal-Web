import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gastro',
  description: 'Restaurants, Kiosk und Einkehrmöglichkeiten in Petersthal am Rottachsee.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
