# Free Galleries

A modern art gallery portal built with React, TypeScript, and Supabase, featuring multilingual support and role-based access control.

## Features

- **User Roles**: Admin, Gallery Owners, and Artists with role-based permissions
- **Multilingual Support**: German (DE), English (EN), Dutch (NL), and Swedish (SV)
- **Event Management**: Create and manage vernissages and art exhibitions
- **Modern Design**: Dark theme with yellow accents for an elegant look
- **WebP Support**: Optimized artwork uploads using WebP format
- **Authentication**: Secure user authentication with Supabase Auth
- **Database**: PostgreSQL with Supabase, featuring Row Level Security

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Internationalization**: i18next + react-i18next
- **Routing**: React Router DOM
- **Styling**: Custom CSS with CSS Variables

## Project Structure

```
gallery/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   └── common/          # Reusable components
│   ├── contexts/            # React contexts (Auth)
│   ├── hooks/               # Custom hooks
│   ├── i18n/                # Internationalization
│   │   ├── config.ts
│   │   └── locales/         # Translation files (en, de, nl, sv)
│   ├── lib/                 # Libraries and utilities
│   │   ├── supabase.ts      # Supabase client
│   │   └── database.types.ts # Database TypeScript types
│   ├── pages/               # Page components
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
├── supabase/
│   └── migrations/          # Database migrations
│       ├── 20240101000000_initial_schema.sql
│       └── 20240101000001_rls_policies.sql
└── .env                     # Environment variables
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update with your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. Set up the database:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the migrations in order:
     - `supabase/migrations/20240101000000_initial_schema.sql`
     - `supabase/migrations/20240101000001_rls_policies.sql`

4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

### Tables

- **profiles**: User profiles with role information
- **galleries**: Gallery information owned by gallery owners
- **artists**: Artist profiles with portfolio links
- **artworks**: Artwork catalog with images and details
- **events**: Event management (vernissages, exhibitions, workshops)
- **event_artists**: Junction table linking artists to events

### User Roles

- **admin**: Full access to all features
- **gallery_owner**: Can manage their galleries and events
- **artist**: Can manage their profile and artworks

## Row Level Security (RLS)

The database uses Row Level Security policies to ensure:
- Users can only modify their own data
- Gallery owners can only manage their galleries
- Artists can only manage their artworks
- Admins have full access to all resources
- Public data is viewable by everyone

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Design System

### Colors

- **Primary**: Gold (#FFD700) - Used for CTAs and highlights
- **Background**: Dark (#0A0A0A) - Main background
- **Cards**: Darker (#121212) - Card backgrounds
- **Text**: White (#FFFFFF) - Primary text
- **Borders**: Dark Gray (#2A2A2A) - Borders and dividers

### Spacing Scale

- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

## Next Steps

To complete the application, you'll need to:

1. **Authentication Pages**: Create login, signup, and role selection pages
2. **Routing**: Set up React Router with protected routes
3. **WebP Upload**: Configure Supabase Storage for artwork uploads
4. **Event Management**: Build the event management interface
5. **Gallery Management**: Create gallery CRUD operations
6. **Artist Profiles**: Build artist profile and portfolio pages
7. **Artwork Gallery**: Create artwork browsing and detail views

## Contributing

This project is set up for local development. To contribute:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

All rights reserved.

## Support

For issues and questions, please contact the development team.
