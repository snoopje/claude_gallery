export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'admin' | 'gallery_owner' | 'artist'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          role: UserRole
          full_name: string
          email: string
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: UserRole
          full_name: string
          email: string
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: UserRole
          full_name?: string
          email?: string
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      galleries: {
        Row: {
          id: string
          owner_id: string
          name: string
          description: string
          address: string
          city: string
          country: string
          postal_code: string
          phone: string | null
          email: string | null
          website: string | null
          opening_hours: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          description: string
          address: string
          city: string
          country: string
          postal_code: string
          phone?: string | null
          email?: string | null
          website?: string | null
          opening_hours?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          description?: string
          address?: string
          city?: string
          country?: string
          postal_code?: string
          phone?: string | null
          email?: string | null
          website?: string | null
          opening_hours?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      artists: {
        Row: {
          id: string
          user_id: string
          bio: string
          website: string | null
          instagram: string | null
          portfolio_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          bio: string
          website?: string | null
          instagram?: string | null
          portfolio_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          bio?: string
          website?: string | null
          instagram?: string | null
          portfolio_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      artworks: {
        Row: {
          id: string
          artist_id: string
          title: string
          description: string
          year: number
          medium: string
          dimensions: string
          price: number | null
          is_available: boolean
          image_url: string
          thumbnail_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          artist_id: string
          title: string
          description: string
          year: number
          medium: string
          dimensions: string
          price?: number | null
          is_available?: boolean
          image_url: string
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          artist_id?: string
          title?: string
          description?: string
          year?: number
          medium?: string
          dimensions?: string
          price?: number | null
          is_available?: boolean
          image_url?: string
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          gallery_id: string
          title: string
          description: string
          event_type: 'vernissage' | 'exhibition' | 'workshop' | 'other'
          start_date: string
          end_date: string
          location: string
          max_attendees: number | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          gallery_id: string
          title: string
          description: string
          event_type?: 'vernissage' | 'exhibition' | 'workshop' | 'other'
          start_date: string
          end_date: string
          location: string
          max_attendees?: number | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          gallery_id?: string
          title?: string
          description?: string
          event_type?: 'vernissage' | 'exhibition' | 'workshop' | 'other'
          start_date?: string
          end_date?: string
          location?: string
          max_attendees?: number | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      event_artists: {
        Row: {
          id: string
          event_id: string
          artist_id: string
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          artist_id: string
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          artist_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: UserRole
      event_type: 'vernissage' | 'exhibition' | 'workshop' | 'other'
    }
  }
}
