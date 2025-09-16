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
}

export interface Accommodation {
  id:string;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
  imageHint: string;
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

export interface BusSchedule {
  route: string;
  times: string[];
}
