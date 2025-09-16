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
    name: 'Gasthof zum Hirschen',
    description: 'Traditionelle bayerische Küche in gemütlicher Atmosphäre. Bekannt für seine Wildgerichte.',
    address: 'Hauptstraße 1, 87466 Petersthal',
    imageUrl: 'https://picsum.photos/seed/res1/600/400',
    imageHint: 'traditional restaurant',
  },
  {
    id: '2',
    name: 'Pizzeria da Luigi',
    description: 'Authentische italienische Pizza und Pasta. Familienfreundlich mit großer Sonnenterrasse.',
    address: 'Seeweg 5, 87466 Petersthal',
    imageUrl: 'https://picsum.photos/seed/res2/600/400',
    imageHint: 'modern restaurant',
  },
  {
    id: '3',
    name: 'Café Seeblick',
    description: 'Hausgemachte Kuchen und Torten mit einem wunderschönen Blick auf den See.',
    address: 'Uferstraße 12, 87466 Petersthal',
    imageUrl: 'https://picsum.photos/seed/res3/600/400',
    imageHint: 'cafe terrace',
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
    imageUrl: 'https://picsum.photos/seed/club1/800/500',
    imageHint: 'soccer game',
  },
  {
    id: '2',
    slug: 'kljb-petersthal',
    name: 'KLJB Petersthal',
    description: 'Die Katholische Landjugendbewegung Petersthal engagiert sich für die Gestaltung des Dorflebens. Wir organisieren Feste, soziale Projekte und Freizeitaktivitäten für junge Leute auf dem Land.',
    contact: { name: 'Maria Musterfrau', email: 'kljb@petersthal.de', phone: '0123 987654' },
    imageUrl: 'https://picsum.photos/seed/club2/800/500',
    imageHint: 'youth group',
  },
  {
    id: '3',
    slug: 'trachtenverein-petersthal',
    name: 'Trachtenverein D\'Lechgauer',
    description: 'Wir pflegen das bayerische Brauchtum, die Tracht und den Volkstanz. Unser Verein ist ein wichtiger Kulturträger in der Gemeinde und tritt bei vielen Festlichkeiten auf.',
    contact: { name: 'Georg Huber', email: 'trachten@petersthal.de', phone: '0123 123456' },
    imageUrl: 'https://picsum.photos/seed/club3/800/500',
    imageHint: 'traditional dance',
  },
  {
    id: '4',
    slug: 'musikkapelle-petersthal',
    name: 'Musikkapelle Petersthal',
    description: 'Die Musikkapelle Petersthal ist bei kirchlichen und weltlichen Anlässen nicht wegzudenken. Unser Repertoire reicht von traditioneller Blasmusik bis zu modernen Arrangements.',
    contact: { name: 'Anna Schmidt', email: 'musik@petersthal.de', phone: '0123 654321' },
    imageUrl: 'https://picsum.photos/seed/club4/800/500',
    imageHint: 'brass band',
  },
  {
    id: '5',
    slug: 'feuerwehr-petersthal',
    name: 'Freiwillige Feuerwehr Petersthal',
    description: 'Rund um die Uhr im Einsatz für die Sicherheit der Bürger. Die Freiwillige Feuerwehr leistet schnelle Hilfe bei Bränden, Unfällen und anderen Notlagen. Wir freuen uns immer über neue Mitglieder.',
    contact: { name: 'Kommandant Bauer', email: 'feuerwehr@petersthal.de', phone: '112' },
    imageUrl: 'https://picsum.photos/seed/club5/800/500',
    imageHint: 'firefighters team',
  },
  {
    id: '6',
    slug: 'jodlergruppe-petersthal',
    name: 'Jodlergruppe Petersthal',
    description: 'Mit unseren Stimmen bewahren wir ein Stück alpenländische Kultur. Die Jodlergruppe tritt bei Heimatabenden und anderen festlichen Anlässen auf und pflegt das traditionelle Liedgut.',
    contact: { name: 'Theresa Mayr', email: 'jodler@petersthal.de', phone: '0123 112233' },
    imageUrl: 'https://picsum.photos/seed/club6/800/500',
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
