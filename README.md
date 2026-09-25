# Eagle's Lab - Neuroscience & Biomedical Research Hub

A modern, full-stack web application built with Next.js 14, TypeScript, and Supabase for the Eagle's Lab Neuroscience Group at LAUTECH. This platform showcases research activities, publications, team members, events, and gallery content while providing an editorial management system for content administration.

## 🚀 Tech Stack

### Frontend Framework
- **Next.js 14.2.15** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Framer Motion 11.11.9** - Animation library
- **Lucide React 0.454.0** - Icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service (PostgreSQL database, authentication, storage)
- **Cloudinary** - Cloud media management and image/video hosting

### Development Tools
- **ESLint** - Code linting
- **PostCSS 8** - CSS processing
- **Autoprefixer 10.4.20** - CSS vendor prefixing
- **Sharp 0.35.3** - High-performance image processing

## 📁 Project Structure

```
eagles-lab/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Homepage with hero section
│   ├── globals.css              # Global styles
│   ├── about/                   # About page
│   ├── events/                  # Events listing and detail pages
│   ├── gallery/                 # Gallery page with images/videos
│   ├── publications/            # Publications listing and detail pages
│   ├── research/                # Research areas and projects
│   ├── team/                    # Team members listing and profiles
│   ├── join/                    # Join/lab application page
│   ├── Eagle_Editorial/         # Editorial management portal
│   ├── api/                     # API routes
│   │   └── cloudinary/          # Cloudinary upload/delete endpoints
│   └── lib/                     # Shared library files
│       ├── hooks/               # Custom React hooks
│       ├── seo.ts               # SEO utilities
│       └── utils.ts             # Utility functions
├── components/                   # Reusable React components
│   ├── Navbar.tsx              # Navigation bar with mobile menu
│   ├── Footer.tsx              # Footer with social links
│   ├── AnimatedCounter.tsx    # Animated number counter
│   ├── MapSection.tsx          # Interactive map section
│   ├── RichTextEditor.tsx      # WYSIWYG text editor
│   └── gallery/                # Gallery-specific components
│       ├── GalleryGrid.tsx     # Masonry grid layout
│       ├── GalleryCard.tsx     # Individual gallery item
│       ├── GalleryFilters.tsx  # Category filtering
│       ├── GalleryHero.tsx     # Gallery hero section
│       ├── GalleryLightbox.tsx # Image lightbox viewer
│       ├── VideoGallery.tsx     # Video gallery section
│       └── VideoModal.tsx       # Video playback modal
├── lib/                         # Core library files
│   ├── contexts/               # React contexts
│   │   └── AuthContext.tsx     # Authentication context
│   ├── data/                   # Static data and types
│   │   ├── events.ts           # Event data structures
│   │   └── team.ts             # Team data structures
│   ├── hooks/                  # Custom hooks
│   │   └── data/               # Data fetching hooks
│   ├── supabase/               # Supabase client and utilities
│   │   ├── client.ts          # Supabase client initialization
│   │   ├── team.ts            # Team CRUD operations
│   │   ├── publications.ts    # Publications CRUD operations
│   │   ├── events.ts          # Events CRUD operations
│   │   ├── gallery.ts         # Gallery CRUD operations
│   │   ├── research.ts        # Research projects CRUD
│   │   ├── editorial-users.ts # Editorial user management
│   │   ├── research-sections.ts # Research content sections
│   │   └── *.sql              # Database schema files
│   ├── types/                  # TypeScript type definitions
│   │   ├── auth.ts            # Authentication types
│   │   ├── publications.ts    # Publication types
│   │   └── research.ts        # Research types
│   └── utils.ts               # General utility functions
├── public/                     # Static assets
│   ├── *.png                  # Hero images and graphics
│   ├── *.jpg                  # Team and event images
│   └── lng-logo.png           # LAUTECH Neuro Group logo
├── scripts/                    # Utility scripts
│   ├── migrate_supabase_to_cloudinary.js  # Data migration script
│   └── test_cloudinary_upload.js         # Cloudinary upload test
├── .env.local                 # Environment variables (not in git)
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── TODO.md                    # Project tasks and roadmap
```

## 🌐 Key Features

### Public Website
- **Homepage**: Dynamic hero section with rotating background images, statistics counters, and featured content
- **Research Section**: Comprehensive research areas, philosophy, methodology, and collaboration showcases
- **Publications**: Searchable and filterable academic repository with journal articles, conference papers, and research reports
- **Team**: Team member profiles with categorization, social media links, and detailed bios
- **Events**: Event listings with categories, search functionality, and registration links
- **Gallery**: Masonry-style image and video gallery with filtering and lightbox viewing
- **About**: Lab mission, vision, and academic roots information

### Editorial Management Portal
- **Authentication**: Role-based access control (Super Admin, Admin, Editor)
- **Dashboard**: Overview of content statistics and recent activity
- **Publications Management**: Create, edit, delete publications with rich text editor
- **Team Management**: Full CRUD operations for team members with image uploads
- **Events Management**: Event creation with dates, venues, and registration links
- **Gallery Management**: Image and video uploads with categorization
- **Research Content**: Management of research philosophy, areas, methodology, and collaborations
- **User Management**: Editorial user administration with role assignments

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animations**: Smooth page transitions and micro-interactions with Framer Motion
- **Image Optimization**: Next.js Image component with Cloudinary integration
- **SEO**: Meta tags, structured data, and semantic HTML
- **Type Safety**: Full TypeScript implementation across the codebase
- **Database Security**: Row Level Security (RLS) policies in Supabase

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Supabase account (free tier works)
- Cloudinary account (free tier works)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Eagle'slab
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
CLOUDINARY_URL=cloudinary://api-key:api-secret@cloud-name
```

### 4. Database Setup
Run the SQL schema files in your Supabase SQL Editor in this order:

1. `lib/supabase/team.sql` - Team members table
2. `lib/supabase/publications.sql` - Publications table
3. `lib/supabase/events.sql` - Events and related tables
4. `lib/supabase/gallery.sql` - Gallery images and videos tables

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

### Core Tables

#### `team` / `team_members`
Team member profiles with academic information, social media links, and research interests.

#### `publications`
Academic publications with metadata, authors, abstracts, and file attachments.

#### `events`
Event listings with dates, venues, speakers, and registration information.

#### `gallery_images` & `gallery_videos`
Media gallery with categorization, featured flags, and event dates.

#### `research_projects`
Research project descriptions and status tracking.

#### `research_sections_*`
Research philosophy, areas, methodology, and collaboration content.

#### `editorial_users`
Administrative users with role-based access control.

### Storage Buckets
- `publications` - PDF files and publication images
- `team-images` - Team member profile photos
- `team-cvs` - Curriculum vitae files
- `gallery-images` - Gallery image uploads
- `gallery-videos` - Gallery video uploads

## 🔐 Authentication & Authorization

The application uses Supabase Auth with a custom editorial user system:

### User Roles
- **Super Admin**: Full access to all features including user management
- **Admin**: Content management access (publications, team, events, gallery)
- **Editor**: Limited content editing permissions

### Authentication Flow
1. Users log in via the Editorial Portal (`/Eagle_Editorial`)
2. Credentials are authenticated against Supabase Auth
3. User details are fetched from `editorial_users` table
4. Session is maintained in localStorage and context
5. Role-based permissions control feature access

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (`#0f172a`, `#3b82f6`)
- **Background**: Slate (`#f8fafc`, `#0f172a`)
- **Accent**: Teal for highlights and secondary actions
- **Text**: Slate scale for typography hierarchy

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, uppercase with tight tracking
- **Body**: Regular weight with optimized line heights
- **UI Elements**: Extra-bold, uppercase with wide letter spacing

### Components
- **Glass morphism**: Translucent backgrounds with blur effects
- **Rounded corners**: Large border-radius (2xl, 3xl) for modern feel
- **Shadows**: Layered shadows for depth and elevation
- **Gradients**: Subtle color gradients for visual interest

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Variables for Production
Ensure all environment variables are set in your hosting platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CLOUDINARY_URL`

### Recommended Hosting Platforms
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **AWS Amplify**

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Utility Scripts
- `node scripts/migrate_supabase_to_cloudinary.js` - Migrate Supabase storage to Cloudinary
- `node scripts/test_cloudinary_upload.js` - Test Cloudinary upload functionality

## 🔍 SEO & Performance

### SEO Features
- Dynamic meta tags per page
- Semantic HTML structure
- Open Graph tags for social sharing
- Responsive images with proper alt text
- Structured data for rich snippets

### Performance Optimizations
- Next.js Image optimization
- Code splitting and lazy loading
- Static generation where possible
- Cloudinary CDN for media delivery
- Tailwind CSS purging in production

## 🛠️ Maintenance & Troubleshooting

### Common Issues

#### Supabase Connection Errors
- Verify environment variables are correct
- Check Supabase project is active
- Ensure RLS policies are properly configured

#### Image Upload Failures
- Verify Cloudinary URL format
- Check file size limits (10MB max)
- Ensure bucket permissions are correct

#### Build Errors
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

### Database Maintenance
Run migration scripts in order when updating schema:
1. Backup existing data
2. Test SQL scripts in development environment
3. Apply to production during low-traffic periods
4. Verify data integrity post-migration

## 📄 License

This project is proprietary software for Eagle's Lab Neuroscience Group.

## 👥 Team & Affiliations

**Eagle's Lab Neuroscience Group**
- LAUTECH (Ladoke Akintola University of Technology)
- College of Health Sciences, Ogbomoso, Oyo State, Nigeria

**Academic Affiliations**
- LAUTECH Neuroscience Group
- IBRO (International Brain Research Organization)
- NSN (Neuroscience Society of Nigeria)
- WIN (Women in Neuroscience)
- Humboldt Hub
- LETNeu

## 📞 Contact

- **Email**: contact@lautechneuro.org.ng
- **Phone**: +234 (913) 197 0317
- **Location**: College of Health Sciences, LAUTECH, Ogbomoso, Oyo State, Nigeria
- **Website**: https://lautechneuro.org.ng/

## 🗺️ Roadmap

See [TODO.md](TODO.md) for current development tasks and future improvements.

### Planned Features
- [ ] Enhanced search functionality with Elasticsearch
- [ ] Multilingual support (Yoruba, Hausa, etc.)
- [ ] Advanced analytics dashboard
- [ ] Online course integration
- [ ] Research collaboration portal
- [ ] Mobile application (React Native)
- [ ] API documentation with Swagger
- [ ] Automated testing with Jest/Cypress

---

**Built with ❤️ for neuroscience research and education at LAUTECH**