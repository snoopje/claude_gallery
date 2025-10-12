import type { Database } from '../lib/database.types';

export type UserRole = Database['public']['Enums']['user_role'];
export type EventType = Database['public']['Enums']['event_type'];

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Gallery = Database['public']['Tables']['galleries']['Row'];
export type Artist = Database['public']['Tables']['artists']['Row'];
export type Artwork = Database['public']['Tables']['artworks']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type EventArtist = Database['public']['Tables']['event_artists']['Row'];

export interface AuthUser {
  id: string;
  email: string;
  profile: Profile | null;
}
