# Jewelry Product Display Frontend

A modern React application for displaying jewelry products with advanced filtering and carousel functionality.

## Features

- **Product Carousel**: Responsive carousel with swipe/arrow navigation for desktop and mobile
- **Color Picker**: Interactive color selection that changes product images (Yellow, Rose, White gold)
- **Popularity Score**: Display items with scores out of 5 (with 1 decimal place precision)
- **Advanced Filtering**: Filter products by price range and popularity score
- **Responsive Design**: Mobile-first responsive design matching the provided mockup
- **API Integration**: Fetches product data from backend API with real-time filtering

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling and development server
- **Swiper.js** for carousel functionality
- **Axios** for API communication
- **CSS3** with modern responsive design patterns

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Integration

The application connects to a backend API at `localhost:8080/products` with the following optional query parameters:

- `minPrice`: Minimum price filter (number)
- `maxPrice`: Maximum price filter (number) 
- `minPopularity`: Minimum popularity score filter (0-5)
- `maxPopularity`: Maximum popularity score filter (0-5)

### API Response Format

```json
[
  {
    "name": "Engagement Ring 1",
    "popularityScore": 0.85,
    "weight": 2.1,
    "price": 364.0,
    "images": {
      "yellow": "https://cdn.shopify.com/...",
      "rose": "https://cdn.shopify.com/...",
      "white": "https://cdn.shopify.com/..."
    },
    "popularityScoreOutOfFive": 4.3
  }
]
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/
│   ├── ProductCard.tsx      # Individual product display
│   ├── ProductCarousel.tsx  # Swiper-based carousel
│   └── Filters.tsx          # Filter controls
├── services/
│   └── productService.ts    # API communication
├── types/
│   └── Product.ts           # TypeScript interfaces
├── App.tsx                  # Main application component
├── App.css                  # Global styles
└── main.tsx                 # Application entry point
```

## Features in Detail

### Product Carousel
- Responsive breakpoints: 1 item (mobile), 2 items (640px+), 3 items (768px+), 4 items (1024px+)
- Touch/swipe support for mobile devices
- Navigation arrows with hover effects
- Pagination dots for easy navigation

### Color Picker
- Visual color swatches for Yellow, Rose, and White gold
- Instant image switching on color selection
- Active state indicators with smooth transitions

### Filtering System
- Real-time API filtering with input validation
- Price range filters with decimal support
- Popularity score filters (0-5 range)
- Clear all filters functionality
- Loading states during filter application

### Error Handling
- Network error handling with user-friendly messages
- 403 error handling for invalid filter parameters
- Loading states throughout the application

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
