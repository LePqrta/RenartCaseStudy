# Renart Case Study

A full-stack jewelry e-commerce application featuring a dynamic product carousel with filtering capabilities.

## 🚀 Project Overview

This project consists of a **Spring Boot backend** and a **React + TypeScript frontend** for displaying and managing jewelry products with real-time gold price integration.

### Live Demo

- **Frontend**: [Deployed on Vercel] https://renart-case-study-drab.vercel.app/
- **Backend API**: https://renartcasestudy-production.up.railway.app

---

## 📁 Repository Structure

```
RenartCaseStudy/
├── Backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/mrvalevictorian/backend/
│   │   │   │   ├── controllers/      # REST API controllers
│   │   │   │   ├── models/           # Data models
│   │   │   │   ├── services/         # Business logic
│   │   │   │   ├── DTO/              # Data Transfer Objects
│   │   │   │   └── config/           # CORS & configuration
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data/products.json
│   │   └── test/
│   ├── pom.xml
│   └── README.md
│
└── Frontend/                # React + TypeScript frontend
    ├── src/
    │   ├── components/      # React components
    │   │   ├── ProductCarousel.tsx
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductFilter.tsx
    │   │   └── LoadingSpinner.tsx
    │   ├── services/        # API services
    │   ├── types/           # TypeScript interfaces
    │   ├── assets/          # Fonts and images
    │   └── App.tsx
    ├── package.json
    ├── vite.config.ts
    └── tsconfig.json
```

---

## 🛠️ Technology Stack

### Backend
- **Java 17+**
- **Spring Boot** - REST API framework
- **Maven** - Dependency management
- **Jackson** - JSON processing
- **Railway** - Deployment platform

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **CSS3** - Styling with custom properties
- **ESLint** - Code linting

---

## 🎯 Features

### Backend Features
- ✅ RESTful API for product management
- ✅ Product filtering by price and popularity
- ✅ Gold price retrieval service
- ✅ CORS configuration for cross-origin requests
- ✅ JSON-based data storage
- ✅ Query parameter support for filtering

### Frontend Features
- ✅ Responsive product carousel with pagination
- ✅ Native scroll with snap-to-page behavior
- ✅ Advanced filtering (price & popularity range)
- ✅ Multi-color product variants (Yellow Gold, White Gold, Rose Gold)
- ✅ Interactive product cards with hover effects
- ✅ Keyboard navigation (arrow keys)
- ✅ Touch/swipe support for mobile devices
- ✅ Custom styled scrollbar
- ✅ Loading states and error handling
- ✅ Fully responsive design (mobile, tablet, desktop)

---

## 🚦 Getting Started

### Prerequisites

**Backend:**
- Java 17 or higher
- Maven 3.6+

**Frontend:**
- Node.js 18+ 
- npm or yarn

### Installation & Running

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   mvn install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

4. Run tests:
   ```bash
   mvn test
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📡 API Endpoints

### Products API

#### Get All Products
```http
GET /products
```

**Query Parameters:**
- `minPrice` (optional) - Minimum price filter
- `maxPrice` (optional) - Maximum price filter
- `minPopularity` (optional) - Minimum popularity score (0-5)
- `maxPopularity` (optional) - Maximum popularity score (0-5)

**Example:**
```http
GET /products?minPrice=100&maxPrice=500&minPopularity=3&maxPopularity=5
```

**Response:**
```json
[
  {
    "name": "Classic Solitaire Engagement Ring",
    "popularityScore": 950,
    "weight": 2.5,
    "price": 362.00,
    "images": {
      "yellow": "https://example.com/image-yellow.jpg",
      "rose": "https://example.com/image-rose.jpg",
      "white": "https://example.com/image-white.jpg"
    },
    "popularityScoreOutOfFive": 4.75
  }
]
```

#### Get Gold Price
```http
GET /gold-price
```

**Response:**
```json
{
  "price": 1950.50,
  "currency": "USD",
  "timestamp": "2025-10-05T12:00:00Z"
}
```

---

## 🎨 Frontend Architecture

### Component Structure

```
App
└── ProductCarousel
    ├── ProductFilter (modal)
    ├── LoadingSpinner
    ├── ProductCard (multiple)
    │   └── Color Options
    ├── Navigation Arrows
    ├── Page Indicators
    └── Scrollbar
```

### State Management
- React hooks (`useState`, `useEffect`, `useRef`, `useCallback`)
- Local component state
- Synchronized scroll and navigation state

### Responsive Breakpoints
- **Mobile** (<480px): 1 product per page
- **Small Tablet** (480-600px): 2 products per page
- **Medium Tablet** (600-900px): 2 products per page
- **Tablet Landscape** (900-1024px): 2 products per page
- **Large Tablet** (1024-1280px): 3 products per page
- **Desktop** (>1280px): 4 products per page

---

## 🎨 Design Specifications

### Color Palette
- **Yellow Gold**: `#E6CA97`
- **White Gold**: `#D9D9D9`
- **Rose Gold**: `#E1A4A9`
- **Accent Click**: `#E6CA97`
- **Text Primary**: `#333333`
- **Text Secondary**: `#666666`
- **Border**: `#E0E0E0`

### Typography
- **Avenir Book** - Body text, labels (400 weight)
- **Montserrat Regular** - Prices, filters (400 weight)
- **Montserrat Medium** - Titles, buttons (500 weight)

---

## 👥 Contributors

- **Frontend Development**: React + TypeScript implementation
- **Backend Development**: Spring Boot REST API
- **Deployment**: Railway (Backend) + Vercel (Frontend)

---


## 🙏 Acknowledgments

- Font families: Avenir and Montserrat
- Icons: Custom SVG icons
- Deployment: Railway, Vercel 
