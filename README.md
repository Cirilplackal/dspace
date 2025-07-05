# DSpace - Modern E-commerce Platform

A modern e-commerce platform built with Next.js, Redux Toolkit, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Running the Application

#### 1. Start the Backend API
```bash
cd backend
npm install
npm start
```
The backend will run on `http://localhost:3001`

#### 2. Start the Frontend
```bash
# In a new terminal, from the project root
npm install
npm run dev
```
The frontend will run on `http://localhost:3000`

## 🔧 What's Fixed

### API Issues
- ✅ Complete backend API with all required endpoints
- ✅ Proper response format matching frontend expectations
- ✅ Mock data for testing (users, products, categories)
- ✅ Error handling and validation

### Authentication
- ✅ Login page (`/auth/login`)
- ✅ Registration page (`/auth/register`)
- ✅ Redux integration for auth state management
- ✅ Form validation with Zod
- ✅ Token management and storage

### Error Handling
- ✅ Global error page (`/app/error.tsx`)
- ✅ 404 Not Found page (`/app/not-found.tsx`)
- ✅ API error handling and user feedback

### Data Types
- ✅ Fixed type mismatches between frontend and backend
- ✅ Proper API response structure
- ✅ Redux store integration

## 🧪 Testing

Visit `http://localhost:3000/test` to see a test page that verifies:
- API connectivity
- Products fetching
- Redux store functionality

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get products with pagination/filters
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search` - Search products

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

### Health Check
- `GET /api/health` - API health status

## 🔑 Test Credentials

For testing the login functionality:
- Email: `john@example.com`
- Password: `password123`

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
npm run dev  # Next.js development server
npm run build  # Build for production
npm run lint  # Run ESLint
```

## 📁 Project Structure

```
dspace/
├── backend/           # Express.js API server
│   ├── server.js     # Main server file
│   └── package.json  # Backend dependencies
├── src/
│   ├── app/          # Next.js App Router pages
│   │   ├── auth/     # Authentication pages
│   │   ├── error.tsx # Global error page
│   │   └── not-found.tsx # 404 page
│   ├── components/   # React components
│   ├── services/     # API services
│   ├── store/        # Redux store and slices
│   └── types/        # TypeScript type definitions
└── package.json      # Frontend dependencies
```

## 🎨 Features

- **Modern UI**: Built with Tailwind CSS and Lucide React icons
- **Type Safety**: Full TypeScript support
- **State Management**: Redux Toolkit for global state
- **Form Handling**: React Hook Form with Zod validation
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme switching support
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🚨 Troubleshooting

### Common Issues

1. **Backend not starting**: Make sure port 3001 is available
2. **Frontend can't connect to API**: Ensure backend is running on port 3001
3. **Type errors**: Run `npm run type-check` to verify TypeScript
4. **Build errors**: Clear `.next` folder and reinstall dependencies

### Reset Everything
```bash
# Stop all processes
# Clear node_modules and reinstall
rm -rf node_modules backend/node_modules
npm install
cd backend && npm install
```

## 📄 License

This project is licensed under the MIT License.
