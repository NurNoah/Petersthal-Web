import type { Restaurant, Accommodation, Club, BusConnection } from './types';

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
    name: 'Löwe Apartments',
    type: 'Apartments',
    description: 'Erleben Sie die Natur im Löwe Apartments. eine unvergessliche Unterkunft für Familien und Abenteuerlustige.',
    imageUrl: '/images/fewo/fewo4.jpg',
    imageHint: 'farmhouse stay',
    bookingUrl: 'https://www.oy-mittelberg.de/unterkunft/#/unterkuenfte/VIT/8972647d-c403-46d4-b5ec-ac077f0dbb3e/loewe-apartments---schenk?useDetailSearch=false',
    features: ['20m² - 110m²', 'WLAN'],
    price: 'ab 35€ /Nacht',
  },
  {
    id: '2',
    name: 'Mayer Florian',
    type: 'Appartement/Fewo',
    description: 'Unser Hof liegt schön gelegen am Rottachsee. Wanderungen oder Radtouren können direkt vor der Haustür gestartet werden.',
    imageUrl: '/images/fewo/fewo2.jpg',
    imageHint: 'vacation apartment',
    bookingUrl: 'https://www.oy-mittelberg.de/unterkunft/#/unterkuenfte/VIT/675ab89c-25d6-4c71-a7cd-cb9ca236ee39/mayer-florian?useDetailSearch=false',
    features: ['2 Schlafzimmer', 'Dusche, WC'],
    price: '16,25 € /Nacht',
  },
  {
    id: '3',
    name: 'Buchenberg Hans',
    type: 'Appartement/Fewo',
    description: 'Die 3-Sterne-Ferienwohnung (60 m² Maisonettewohnung) mit gehobener Ausstattung und komfortablem Bad.',
    imageUrl: '/images/fewo/fewo3.jpeg',
    imageHint: 'guesthouse exterior',
    bookingUrl: 'https://www.oy-mittelberg.de/unterkunft/#/unterkuenfte/VIT/f562e550-6a87-4594-a852-fd11c7129bff/buchenberg-hans?useDetailSearch=false',
    features: ['1 Schlafzimmer', 'Dusche, WC'],
    price: '33,00 € /Nacht',
  },
  {
    id: '4',
    name: 'Waibel',
    type: 'Unterkunft',
    description: 'Gepflegte Unterkunft mit gemütlich eingerichteten Zimmern und separatem Aufenthaltsraum in ruhiger Ortsrandlage.',
    imageUrl: '/images/fewo/fewo9.jpg',
    imageHint: 'farmhouse stay',
    bookingUrl: 'https://www.oy-mittelberg.de/unterkunft/#/unterkuenfte/VIT/e2669647-f047-4e0d-8d0d-84a2e308e67c/waibel?useDetailSearch=false',
    features: ['bis zu 4 Personen'],
    price: 'ab 20,00 € /Nacht',
  },
  {
    id: '5',
    name: 'Alpenloft Mereine',
    type: 'Alpenloft',
    description: 'Das ALPENLOFT MEREINE - außen Tradition - innen purer Luxus!',
    imageUrl: '/images/fewo/fewo1.jpg',
    imageHint: 'hotel room',
    bookingUrl: 'https://www.oy-mittelberg.de/unterkunft/#/unterkuenfte/VIT/57cd66ff-9bf2-49e6-9181-10051490074b/alpenloft-mereine?useDetailSearch=false',
    features: ['Luxus'],
    price: 'ab 496,00 € / Nacht',
  },
  {
    id: '6',
    name: 'Ferienwohnung Andrea',
    type: 'Ferienwohnung',
    description: 'Unsere 2-Zimmer-Ferienwohnung ist in einem Mehrfamilienhaus. 5 Min. Fußweg führen zum Badestrand am Rottachsee.',
    imageUrl: '/images/fewo/fewo5.jpeg',
    imageHint: 'farmhouse stay',
    bookingUrl: 'https://www.oy-mittelberg.de/unterkunft/#/unterkuenfte/VIT/c512a7bd-8d02-473f-91f2-4e164fd09126/ferienwohnung-andrea---schrag-dieter?useDetailSearch=false',
    features: ['1 Schlafzimmer', 'Dusche, WC'],
    price: 'ab 45,00 € /Nacht',
  },
  {
    id: '7',
    name: 'Ostheimer Annelies',
    type: 'Appartement/Fewo',
    description: 'Unsere FEWO liegt in Petersthal, einem ländlichen Ort.',
    imageUrl: '/images/fewo/fewo6.jpeg',
    imageHint: 'farmhouse stay',
    bookingUrl: 'https://www.oy-mittelberg.de/unterkunft/#/unterkuenfte/VIT/a4eae87c-04ba-4438-88b4-11d5ef1f880b/ostheimer-annelies?useDetailSearch=false',
    features: ['1 Schlafzimmer', 'Dusche, WC'],
    price: 'ab 29,00€ / Nacht',
  },
  {
    id: '8',
    name: 'Fewo Herp',
    type: 'Fewo',
    description: 'In unserer hübschen Ferienwohnung mit Südterrasse im Dorf Petersthal sind Sie inmitten des OBERALLGÄUs.',
    imageUrl: '/images/fewo/fewo7.jpeg',
    imageHint: 'farmhouse stay',
    bookingUrl: 'https://www.oy-mittelberg.de/unterkunft/#/unterkuenfte/VIT/11576888-5798-4809-a94a-a3c3292c9d2d/fewo-herp?useDetailSearch=false',
    price: 'ab 65,00€ / Nacht',
  },
  {
    id: '9',
    name: 'Waldmann Waltraud',
    type: 'Appartement/Fewo',
    description: 'Willkommen in unserer gemütlichen Ferienwohnung 65 m² für 1-4 Personen am Rottachsee.',
    imageUrl: '/images/fewo/fewo8.jpg',
    imageHint: 'farmhouse stay',
    bookingUrl: 'https://www.oy-mittelberg.de/unterkunft/#/unterkuenfte/VIT/6d5f2b27-ed0a-43d6-9f0e-e58cbe3ab381/waldmann-waltraud?useDetailSearch=false',
    features: ['2 Schlafzimmer', 'Dusche, WC, Badewanne'],
    price: 'ab 25,50€ / Nacht',
  },
];

export const clubs: Club[] = [
  {
    id: '1',
    slug: 'tsv-petersthal',
    name: 'TSV Petersthal ',
    description: 'Der Turn- und Sportverein Petersthal bietet ein  Angebot an sportlichen Aktivitäten für alle Altersgruppen. Fördernung an der Gemeinschaftssinn und die Freude an der Bewegung.',
    contact: {
      name: '1. Vorstand: Andreas Waldmann jun.',
      address: 'Feld 9a\n87466 Oy-Mittelberg',
      email: 'info@tsvpetersthal.de',
      website: 'https://www.tsvpetersthal.de',
      instagram: 'tsv_petersthal',
    },
    imageUrl: '/images/verein/tsv.jpg',
    imageHint: 'soccer game',
  },
  {
    id: '2',
    slug: 'kljb-petersthal',
    name: 'Katholische Landjugend',
    description: 'Organisieren von Festen, soziale Projekte und Freizeitaktivitäten für jungendliche in Petersthal.',
    contact: {
      name: '1. Vorstand: Magnus Jörg',
      address: 'Gschwend 5\n87466 Oy-Mittelberg',
      instagram: 'kljb_petersthal',
    },
    imageUrl: '/images/verein/kljb.png',
    imageHint: 'youth group',
  },
  {
    id: '3',
    slug: 'trachtenverein-petersthal',
    name: "Trachtenverein D'Rottachtaler",
    description: 'Am 31. Oktober 1920 trafen sie sich in der Kantine Zollhaus zu ihrer Gründungsversammlung. 30 gleichgesinnte junge Menschen gaben sich eine neue Aufgabe und gründeten den Trachtenverein. \n Am 27. Mai 1934 konnten die Petersthaler Trachtler die Gipfelkreuzeinweihung auf dem Petersthaler Horn mit 400 Besuchern feiern. \n Eine alte Tradition hatte der Trachtenverein am 27. Juli 1954 zu neuem Leben erweckt: das „Maibaumklettern“. Zum erstenmal wurde 1874 in einer Kirchenurkunde über das Maibaumklettern berichtet. Bis heute wird alle zwei Jahre das traditionelle Maibaumklettern vom Trachtenverein durchgeführt.',
    contact: {
      name: '1. Vorstand: Thomas Reiser',
      address: 'Wiesen 1\n87466 Oy-Mittelberg',
      email: 'trachtenverein-petersthal@web.de',
      website: 'https://www.petersthal.com/',
      instagram: 'd.rottachtalerpetersthal',
    },
    imageUrl: '/images/verein/trachtenverein.jpg',
    imageHint: 'traditional',
  },
  {
    id: '4',
    slug: 'musikkapelle-petersthal',
    name: 'Musikkapelle Petersthal ',
    description: 'Nachweislich wurde in 1871 ein Veteranenfest in Petersthal ausgerichtet, bei dem die Musikkapelle (9 Musikanten) mit ihrem Dirigent Josef Jörg gespielt hatte. 1991: 120-jähriges Bestehen der Musikkapelle Petersthal und 25-jähriges Bestehen der  Jodlergruppe Petersthal3-tägiges Fest vom 26. bis 28. Juli 1991 mit Höhepunkt am Sonntag: Festzug mit 25 Startnummern, davon 13 MusikkapellenDie Musikkapelle zählt in diesem Jahr 49 Mitglieder und 14 Jungbläser in Ausbildung',
    contact: {
      name: '1. Vorstand: Lothar Riedmiller',
      website: 'https://musikkapelle-petersthal.de',
      address: 'Im Rehling 2\n87466 Oy-Mittelberg',
      instagram: 'musikkapelle_petersthal',
    },
    imageUrl: '/images/verein/musik.jpeg',
    imageHint: 'brass band',
  },
  {
    id: '5',
    slug: 'feuerwehr-petersthal',
    name: 'Freiwillige Feuerwehr ',
    description: 'Die Freiwillige Feuerwehr leistet schnelle Hilfe bei Bränden, Unfällen und anderen Notlagen.',
    contact: {
      name: '1. Vorstand: Manfred Baur',
      email: 'baur.elektrotechnik@t-online.de',
      address: 'Mitbühl 6\n87466 Oy-Mittelberg',
    },
    imageUrl: '/images/verein/feuerwehr.jpg',
    imageHint: 'firefighters team',
  },
  {
    id: '6',
    slug: 'jodlergruppe-petersthal',
    name: 'Jodlergruppe Petersthal',
    description: 'Die Jodlergruppe tritt bei Heimatabenden und anderen festlichen Anlässen auf und pflegt die tradition.',
    contact: {
      name: '1. Vorsitzender Theo Haslach',
      phone: '0151 / 17 66 19 39',
      email: 'theo.haslach@gmail.com',
      address: 'Roßbergstraße 15\n87484 Nesselwang',
    },
    imageUrl: '/images/verein/jodler.jpg',
    imageHint: 'choir singing',
  },
  {
    id: '7',
    slug: 'schuetzenverein-petersthal',
    name: 'Schützenverein Petersthal',
    description: 'Der Schützenverein Petersthal widmet sich dem sportlichen Schießen. Wir bieten Trainingsmöglichkeiten für verschiedene Disziplinen und Altersklassen.',
    contact: {
      name: '1. Schützenmeister Andreas Breher',
      email: 'sv-petersthal@outlook.de',
      address: 'Im Leer 19a\n87466 Oy-Mittelberg',
    },
    imageUrl: '/images/verein/schuetzen.jpg',
    imageHint: 'shooting range',
  },
  {
    id: '8',
    slug: 'theatergruppe-petersthal',
    name: 'Theatergruppe Petersthal',
    description: 'Die Theatergruppe Petersthal bringt  unterhaltsame und traditionelle Stücke auf die Bühne.',
    contact: {
      name: 'Spielleiter Josef Laub',
      address: 'Feld 4\n87466 Oy-Mittelberg',
    },
    imageUrl: '/images/verein/theater.jpg',
    imageHint: 'theater stage',
  },
  {
    id: '9',
    slug: 'lebendiges-petersthal',
    name: 'Lebendiges Petersthal ',
    description: 'Aktuelle Info zu Urlaub und Veranstaltungen in Petersthal am Rottachsee',
    contact: {
      name: '1. Vorstand: Alfred Kögel',
      address: 'Am Petersbach 15\n87466 Oy-Mittelberg',
      website: 'http://www.rottachsee.info'
    },
    imageUrl: '/images/verein/lebendiges.png',
    imageHint: 'community gathering',
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
