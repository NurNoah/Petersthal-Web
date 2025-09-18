import type { Event, Restaurant, Accommodation, Club, BusConnection } from './types';

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
    website: 'http://kiosk-rottachsee.9gg.de/',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5376.897700570105!2d10.380840192236292!3d47.636843917197744!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x479c7d0fb430257f%3A0x9db0cec5248edc58!2sKiosk%20am%20Rottachsee!5e0!3m2!1sde!2sde!4v1758144734113!5m2!1sde!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
  },
  {
    id: '2',
    name: 'Pizzeria Rosso Pomodoro',
    description: 'Authentische, herzliche italienische Küche, serviert wie in den charmanten Dörfern Italiens.',
    address: 'Thalstraße 10, 87466 Oy-Mittelberg',
    imageUrl: '/images/gastro/pizza.png',
    imageHint: 'modern restaurant',
    website: 'https://www.rossopomodororestaurant.de/',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.4636397059535!2d10.384571587124736!3d47.636556480249624!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x479c7d61a1b9f71f%3A0xd01a1168f00ff6c5!2sRosso%20Pomodoro!5e0!3m2!1sde!2sde!4v1758144783040!5m2!1sde!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
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
    bookingUrl: '#',
  },
  {
    id: '2',
    name: 'Ferienwohnung Müller',
    type: 'Ferienwohnung',
    description: 'Moderne und voll ausgestattete Ferienwohnung für bis zu 4 Personen in ruhiger Lage.',
    imageUrl: 'https://picsum.photos/seed/acc2/600/400',
    imageHint: 'vacation apartment',
    bookingUrl: '#',
  },
  {
    id: '3',
    name: 'Pension Gabi',
    type: 'Pension',
    description: 'Familiär geführte Pension mit gemütlichen Zimmern und persönlichem Service.',
    imageUrl: 'https://picsum.photos/seed/acc3/600/400',
    imageHint: 'guesthouse exterior',
    bookingUrl: '#',
  },
  {
    id: '4',
    name: 'Urlaub auf dem Bauernhof',
    type: 'Bauernhof',
    description: 'Erleben Sie das Landleben hautnah. Ideal für Familien mit Kindern.',
    imageUrl: 'https://picsum.photos/seed/acc4/600/400',
    imageHint: 'farmhouse stay',
    bookingUrl: '#',
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

export const busConnections: BusConnection[] = [
  {
    direction: 'Von Kempten nach Petersthal',
    routes: [
      {
        line: 'Linie 22 (Tagesverkehr)',
        note: 'Abfahrt Kempten ZUM',
        schedules: [
          {
            days: 'Montag - Freitag',
            times: [
              '05:35 (ab Kempten Hbf, Ankunft Petersthal ca. 06:15)',
              '12:55 (Ankunft Petersthal 13:40)',
              '15:27 (Ankunft Petersthal 15:53)',
              '16:27 (Ankunft Petersthal 16:53)',
            ],
          },
        ],
      },
      {
        line: 'Linie 130 - Anruf-Sammel-Taxi',
        note: 'Abfahrt Kempten Hbf (Steig Taxi). Abend- & Nachtverkehr.',
        schedules: [
          {
            days: 'Montag - Freitag',
            times: ['20:25', '21:10', '22:15', '23:10', '00:10', '01:00 (nur Freitags)'],
          },
          {
            days: 'Samstag',
            times: ['20:25', '21:10', '22:15', '23:10', '00:10'],
          },
          {
            days: 'Sonn- & Feiertag',
            times: ['20:25', '21:10', '22:15'],
          },
        ],
      },
    ],
  },
  {
    direction: 'Von Oy-Mittelberg nach Petersthal',
    routes: [
      {
        line: 'Linie 9787 (Ringlinie)',
        note: 'Abfahrt Oy, Kurhaus.',
        schedules: [
          {
            days: 'Montag - Freitag',
            times: ['06:55 (Ankunft 07:08)', '08:55 (Ankunft 09:08)', '10:55 (Ankunft 11:08)', '12:55 (Ankunft 13:08)', '14:55 (Ankunft 15:08)', '16:55 (Ankunft 17:08)', '17:55 (Ankunft 18:08)'],
          },
          {
            days: 'Samstag, Sonn- & Feiertag',
            times: ['07:55 (Ankunft 08:08)', '09:55 (Ankunft 10:08)', '11:55 (Ankunft 12:08)', '13:55 (Ankunft 14:08)', '15:55 (Ankunft 16:08)', '17:55 (Ankunft 18:08)'],
          },
        ],
      },
    ],
  },
  {
    direction: 'Von Petersthal',
    routes: [
        {
            line: 'Nach Kempten (Linie 22)',
            schedules: [
                {
                    days: 'Montag - Freitag',
                    times: ['06:25', '13:40'],
                }
            ]
        },
        {
            line: 'Nach Oy-Mittelberg (Linie 9787)',
            schedules: [
                {
                    days: 'Montag - Freitag',
                    times: ['07:08', '09:08', '11:08', '13:08', '15:08', '17:08', '18:08'],
                },
                {
                    days: 'Samstag, Sonn- & Feiertag',
                    times: ['08:08', '10:08', '12:08', '14:08', '16:08', '18:08'],
                }
            ]
        }
    ]
  }
];
