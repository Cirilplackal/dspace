# DSpace - Modern E-commerce Platform

A modern full-stack e-commerce platform built with Next.js 14, Redux Toolkit, Prisma, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Running the Application

```bash
# Install dependencies
npm install

# Set up the database (if using Prisma)
npm run db:generate
npm run db:push

# Start the development server
npm run dev
```

The application will run on `http://localhost:3000`

## 🎯 Features

### ✅ Implemented Features
- **Full-stack Next.js Application**: API routes built into the Next.js app
- **Authentication System**: Login and registration with JWT tokens
- **Product Management**: Product listing with search, filtering, and pagination
- **Modern UI**: Responsive design with Tailwind CSS and Lucide React icons
- **State Management**: Redux Toolkit for global state management
- **Type Safety**: Full TypeScript support throughout the application
- **Form Handling**: React Hook Form with Zod validation
- **Dark Mode**: Theme switching support
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Database Ready**: Prisma ORM integration for database operations

### 🔄 In Progress
- Database integration with Prisma
- User profile management
- Shopping cart functionality
- Order management
- Admin dashboard

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get products with pagination/filters
  - Query params: `page`, `limit`, `category`, `q`, `minPrice`, `maxPrice`, `sortBy`, `sortOrder`

### Health Check
- `GET /api/health` - API health status

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript type checking
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run db:generate  # Generate Prisma client
npm run db:push      # Push database schema
npm run db:studio    # Open Prisma Studio
```

## 📁 Project Structure

```
dspace/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── products/      # Product endpoints
│   │   │   └── health/        # Health check endpoint
│   │   ├── auth/              # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Registration page
│   │   ├── products/          # Products listing page
│   │   ├── error.tsx          # Global error page
│   │   ├── not-found.tsx      # 404 page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── home/              # Home page components
│   │   ├── layout/            # Layout components
│   │   ├── products/          # Product-related components
│   │   ├── providers/         # Context providers
│   │   └── ui/                # Reusable UI components
│   ├── services/              # API services
│   │   └── api/               # API client and services
│   ├── store/                 # Redux store
│   │   └── slices/            # Redux slices
│   ├── types/                 # TypeScript type definitions
│   ├── lib/                   # Utility functions and mock data
│   └── constants/             # Application constants
├── public/                    # Static assets
├── prisma/                    # Database schema and migrations
└── package.json               # Dependencies and scripts
```

## 🎨 UI Components

### Core Components
- **ProductGrid**: Displays products in a responsive grid
- **SearchBar**: Product search functionality
- **CategoryFilter**: Filter products by category
- **PriceFilter**: Filter products by price range
- **SortSelect**: Sort products by various criteria
- **Pagination**: Navigate through product pages
- **LoadingSpinner**: Loading state indicator
- **EmptyState**: Empty state for no results
- **UserMenu**: User account menu
- **Header**: Main navigation header
- **Sidebar**: Sidebar navigation

### Form Components
- **Login Form**: User authentication
- **Registration Form**: User registration
- **Form validation**: Zod schema validation

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="your-database-url"

# JWT Secret
JWT_SECRET="your-jwt-secret"

# Next.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### Tailwind CSS
The project uses Tailwind CSS with custom configuration for:
- Dark mode support
- Custom color palette
- Responsive design utilities
- Form styling

## 🧪 Testing

### Manual Testing
- Visit `http://localhost:3000` for the home page
- Navigate to `/products` for product listing
- Test authentication at `/auth/login` and `/auth/register`
- Check API endpoints at `/api/health`

### Test Data
The application includes mock data for testing:
- Sample products with various categories and prices
- Test user credentials (check the auth API for details)

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**: Make sure port 3000 is available
2. **Type errors**: Run `npm run type-check` to verify TypeScript
3. **Build errors**: Clear `.next` folder and reinstall dependencies
4. **Database issues**: Ensure Prisma is properly configured

### Reset Everything
```bash
# Stop the development server
# Clear cache and reinstall dependencies
rm -rf .next node_modules
npm install
npm run dev
```

## 📦 Dependencies

### Core Dependencies
- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **Redux Toolkit**: State management
- **Prisma**: Database ORM
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### Development Dependencies
- **TypeScript**: Type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **PostCSS**: CSS processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔮 Roadmap

- [ ] Complete database integration
- [ ] Shopping cart functionality
- [ ] Order management system
- [ ] Admin dashboard
- [ ] Payment integration
- [ ] User reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Advanced search filters
