export interface NavLink {
  href: string;
  label: string;
}

export interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string;
  description: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  imageUrl: string;
  imageHint: string;
  website?: string;
  mapEmbed?: string;
}

export interface Accommodation {
  id:string;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  bookingUrl?: string;
}

export interface Club {
  id: string;
  slug: string;
  name: string;
  description: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  imageUrl: string;
  imageHint: string;
}

export interface DailySchedule {
  days: string;
  times: string[];
  note?: string;
}

export interface BusRoute {
  line: string;
  schedules: DailySchedule[];
  note?: string;
}

export interface BusConnection {
  direction: string;
  routes: BusRoute[];
}
