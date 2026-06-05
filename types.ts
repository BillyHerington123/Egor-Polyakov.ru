
// Enums
export enum UserRole {
  USER = 'user',
  ORGANIZER = 'organizer',
  ADMIN = 'admin',
}

export enum EventStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  PUBLISHED = 'published',
  CANCELLED = 'cancelled',
  ARCHIVED = 'archived',
}

export enum PriceType {
  FREE = 'free',
  PAID = 'paid',
}

export enum AgeRating {
  ZERO_PLUS = '0+',
  SIX_PLUS = '6+',
  TWELVE_PLUS = '12+',
  SIXTEEN_PLUS = '16+',
  EIGHTEEN_PLUS = '18+',
}

export enum LocaleCode {
  RU = 'ru',
  EN = 'en',
}

export enum EventFormat {
  OFFLINE = 'offline',
  HYBRID = 'hybrid',
  ONLINE = 'online',
}

// Interfaces based on DB tables

export interface City {
  id: string; // UUID
  name: string;
  country: string;
  slug: string;
}

export interface Venue {
  id: string; // UUID
  cityId: string; // UUID
  name: string;
  address: string;
  district?: string;
  lat?: number;
  lng?: number;
  phone?: string;
  siteUrl?: string;
  createdAt: string; // TIMESTAMPTZ
  updatedAt: string; // TIMESTAMPTZ
}

export interface Category {
  id: string; // UUID
  slug: string;
  title: Record<string, string>; // JSONB for localization e.g. { "ru": "Театр", "en": "Theatre" }
  parentId?: string; // UUID
}

export interface Tag {
  id: string; // UUID
  slug: string;
  title: Record<string, string>; // JSONB
}

export interface Language {
  code: string;
  title: string;
}

export interface AccessibilityFeature {
  code: string;
  title: Record<string, string>; // JSONB
}

export interface AppUser {
  id: string; // UUID
  role: UserRole;
  email: string;
  phone?: string;
  displayName: string;
  createdAt: string; // TIMESTAMPTZ
  updatedAt: string; // TIMESTAMPTZ
}

export interface Organizer {
  id: string; // UUID
  name: string;
  description: string;
  siteUrl?: string;
  contacts?: Record<string, any>; // JSONB
  verified: boolean;
  ownerUserId: string; // UUID
  createdAt: string; // TIMESTAMPTZ
  updatedAt: string; // TIMESTAMPTZ
}

export interface MediaAsset {
  id: string; // UUID
  url: string;
  mimeType: string;
  width?: number;
  height?: number;
  alt?: string;
  createdAt: string; // TIMESTAMPTZ
}

export interface Event {
  id: string; // UUID
  cityId: string; // UUID
  venueId?: string; // UUID
  organizerId: string; // UUID
  status: EventStatus;
  format: EventFormat;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  categoryPrimary: string; // UUID
  age: AgeRating;
  startAt: string; // TIMESTAMPTZ
  endAt?: string; // TIMESTAMPTZ
  timezone: string;
  languageMain: string;
  languages?: string[];
  priceMode: PriceType;
  priceMin?: number;
  priceMax?: number;
  currency?: string;
  isFree: boolean;
  ticketUrl?: string;
  registrationUrl?: string;
  heroMediaId?: string; // UUID
  createdBy: string; // UUID
  updatedBy?: string; // UUID
  createdAt: string; // TIMESTAMPTZ
  updatedAt: string; // TIMESTAMPTZ
  lastPublishedAt?: string; // TIMESTAMPTZ
  // Joined data for convenience
  city?: City;
  venue?: Venue;
  organizer?: Organizer;
  heroMedia?: MediaAsset;
  categories: Category[];
  tags: Tag[];
}

export interface Collection {
    id: string; // UUID
    slug: string;
    title: Record<string, string>; // JSONB
    description: string;
    pinned: boolean;
    createdBy: string; // UUID
    createdAt: string; // TIMESTAMPTZ
    updatedAt: string; // TIMESTAMPTZ
    coverImageUrl: string;
}

export type Page = {
    name: 'home' | 'catalog' | 'event' | 'dashboard' | 'about' | 'author' | 'admin';
    id?: string;
    query?: string;
};

export type NavigationFn = (page: Page['name'], id?: string, query?: string) => void;
