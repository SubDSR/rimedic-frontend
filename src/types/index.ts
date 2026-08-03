export type PageView =
  | "home"
  | "medicina"
  | "aparatologias"
  | "limpieza"
  | "terms"
  | "privacy";

export interface ServiceItem {
  name: string;
  desc: string;
  before: string;
  after: string;
  msg: string;
}

export interface ServiceCategory {
  label: string;
  desc: string;
  items: ServiceItem[];
}

export interface PromoCard {
  label: string;
  sub: string;
  img: string;
  cat: PageView;
}

export interface Promotion {
  img: string;
  alt: string;
  msg: string;
}

export interface Credential {
  flag: string;
  country: string;
  event: string;
}

export interface TeamMember {
  name: string;
  role: string;
  spec: string;
  img: string;
  msg: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  stars: number;
  initials: string;
}

export interface BlogPost {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  img: string;
}

export interface Sede {
  name: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  hours: string;
  mapSrc: string;
}

export interface NavItem {
  label: string;
  href?: string | null;
  action?: string | null;
  cat: PageView | null;
  subItems?: string[];
}
