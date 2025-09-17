import type { Event, Restaurant, Accommodation, Club, BusSchedule } from './types';

export const events: Event[] = [
  {
    id: '1',
    title: 'Dorffest Petersthal',
    date: '2024-08-15',
    time: '11:00',
    location: 'Dorfplatz',
    description: 'Jährliches Dorffest mit Musik, Essen und Trinken. Ein Treffpunkt für Jung und Alt.',
  },
  {
    id: '2',
    title: 'Maibaumaufstellen der KLJB',
    date: '2024-05-01',
    time: '10:00',
    location: 'Dorfplatz',
    description: 'Traditionelles Aufstellen des Maibaums durch die Katholische Landjugend.',
  },
  {
    id: '3',
    title: 'Weihnachtsmarkt',
    date: '2024-12-14',
    time: '15:00',
    location: 'Schulhof',
    description: 'Stimmungsvoller Weihnachtsmarkt mit lokalen Ausstellern und Glühwein.',
  },
  {
    id: '4',
    title: 'Sommerkonzert der Musikkapelle',
    date: '2024-07-20',
    time: '19:30',
    location: 'Musikpavillon',
    description: 'Genießen Sie einen lauen Sommerabend mit Blasmusik vom Feinsten.',
  },
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Kiosk am Rottachsee',
    description: 'Reichhaltiges Speisenangebot und kurze Wartezeiten. Ideal für einen schnellen Imbiss nach dem Baden.',
    address: 'Am Petersbach 21, 87466 Oy-Mittelberg',
    imageUrl: '/images/gastro/kiosk.jpg',
    imageHint: 'traditional restaurant',
    website: 'https://www.rottachsee.info/',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7644.259769520318!2d10.378936314279649!3d47.63638020043541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c7d0fb430257f%3A0x9db0cec5248edc58!2sKiosk%20am%20Rottachsee!5e1!3m2!1sde!2sde!4v1758144303801!5m2!1sde!2sde',
  },
  {
    id: '2',
    name: 'Pizzeria Rosso Pomodoro',
    description: 'Authentische, herzliche italienische Küche, serviert wie in den charmanten Dörfern Italiens..',
    address: 'Thalstraße 10, 87466 Oy-Mittelberg',
    imageUrl: '/images/gastro/pizza.png',
    imageHint: 'modern restaurant',
    website: 'https://www.example.com',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991625922379!2d10.42089141567433!3d48.85837027928736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479899e548981669%3A0x5e234383a45a353b!2sThalstra%C3%9Fe%2010%2C%2087466%20Oy-Mittelberg!5e0!3m2!1sde!2sde!4v1622548858362!5m2!1sde!2sde',
  },
];

export const accommodations: Accommodation[] = [
  {
    id: '1',
    name: 'Hotel Alpenrose',
    type: 'Hotel',
    description: 'Komfortables 3-Sterne-Hotel mit Wellnessbereich und reichhaltigem Frühstücksbuffet.',
    imageUrl: 'https://picsum.photos/seed/acc1/600/400',
    imageHint: 'hotel room',
  },
  {
    id: '2',
    name: 'Ferienwohnung Müller',
    type: 'Ferienwohnung',
    description: 'Moderne und voll ausgestattete Ferienwohnung für bis zu 4 Personen in ruhiger Lage.',
    imageUrl: 'https://picsum.photos/seed/acc2/600/400',
    imageHint: 'vacation apartment',
  },
  {
    id: '3',
    name: 'Pension Gabi',
    type: 'Pension',
    description: 'Familiär geführte Pension mit gemütlichen Zimmern und persönlichem Service.',
    imageUrl: 'https://picsum.photos/seed/acc3/600/400',
    imageHint: 'guesthouse exterior',
  },
  {
    id: '4',
    name: 'Urlaub auf dem Bauernhof',
    type: 'Bauernhof',
    description: 'Erleben Sie das Landleben hautnah. Ideal für Familien mit Kindern.',
    imageUrl: 'https://picsum.photos/seed/acc4/600/400',
    imageHint: 'farmhouse stay',
  },
];

export const clubs: Club[] = [
  {
    id: '1',
    slug: 'tsv-petersthal',
    name: 'TSV Petersthal',
    description: 'Der Turn- und Sportverein Petersthal bietet ein breites Angebot an sportlichen Aktivitäten für alle Altersgruppen, von Fußball über Turnen bis hin zu Volleyball. Wir fördern den Gemeinschaftssinn und die Freude an der Bewegung.',
    contact: { name: 'Max Mustermann', email: 'tsv@petersthal.de', phone: '0123 456789' },
    imageUrl: '/images/verein/tsv.jpg',
    imageHint: 'soccer game',
  },
  {
    id: '2',
    slug: 'kljb-petersthal',
    name: 'KLJB Petersthal',
    description: 'Die Katholische Landjugendbewegung Petersthal engagiert sich für die Gestaltung des Dorflebens. Wir organisieren Feste, soziale Projekte und Freizeitaktivitäten für junge Leute auf dem Land.',
    contact: { name: 'Maria Musterfrau', email: 'kljb@petersthal.de', phone: '0123 987654' },
    imageUrl: '/images/verein/kljb.png',
    imageHint: 'youth group',
  },
  {
    id: '3',
    slug: 'trachtenverein-petersthal',
    name: 'Trachtenverein Petersthal',
    description: 'Wir pflegen das bayerische Brauchtum, die Tracht und den Volkstanz. Unser Verein ist ein wichtiger Kulturträger in der Gemeinde und tritt bei vielen Festlichkeiten auf.',
    contact: { name: 'Georg Huber', email: 'trachten@petersthal.de', phone: '0123 123456' },
    imageUrl: '/images/verein/trachtenverein.jpg',
    imageHint: 'traditional dance',
  },
  {
    id: '4',
    slug: 'musikkapelle-petersthal',
    name: 'Musikkapelle Petersthal',
    description: 'Die Musikkapelle Petersthal ist bei kirchlichen und weltlichen Anlässen nicht wegzudenken. Unser Repertoire reicht von traditioneller Blasmusik bis zu modernen Arrangements.',
    contact: { name: 'Anna Schmidt', email: 'musik@petersthal.de', phone: '0123 654321' },
    imageUrl: '/images/verein/musik.jpeg',
    imageHint: 'brass band',
  },
  {
    id: '5',
    slug: 'feuerwehr-petersthal',
    name: 'Freiwillige Feuerwehr Petersthal',
    description: 'Rund um die Uhr im Einsatz für die Sicherheit der Bürger. Die Freiwillige Feuerwehr leistet schnelle Hilfe bei Bränden, Unfällen und anderen Notlagen. Wir freuen uns immer über neue Mitglieder.',
    contact: { name: 'Kommandant Bauer', email: 'feuerwehr@petersthal.de', phone: '112' },
    imageUrl: '/images/verein/feuerwehr.jpg',
    imageHint: 'firefighters team',
  },
  {
    id: '6',
    slug: 'jodlergruppe-petersthal',
    name: 'Jodlergruppe Petersthal',
    description: 'Mit unseren Stimmen bewahren wir ein Stück alpenländische Kultur. Die Jodlergruppe tritt bei Heimatabenden und anderen festlichen Anlässen auf und pflegt das traditionelle Liedgut.',
    contact: { name: 'Theresa Mayr', email: 'jodler@petersthal.de', phone: '0123 112233' },
    imageUrl: '/images/verein/jodler.jpg',
    imageHint: 'choir singing',
  },
];

export const busSchedules: BusSchedule[] = [
    {
        route: 'Linie 56: Petersthal - Nachbarort A',
        times: ['06:15', '07:15', '08:15', '10:15', '12:15', '14:15', '16:15', '18:15'],
    },
    {
        route: 'Linie 56: Nachbarort A - Petersthal',
        times: ['06:45', '07:45', '08:45', '10:45', '12:45', '14:45', '16:45', '18:45'],
    },
    {
        route: 'Linie 71: Petersthal - Kreisstadt B',
        times: ['06:30', '08:30', '11:30', '13:30', '15:30', '17:30'],
    },
    {
        route: 'Linie 71: Kreisstadt B - Petersthal',
        times: ['07:30', '09:30', '12:30', '14:30', '16:30', '18:30'],
    },
]
