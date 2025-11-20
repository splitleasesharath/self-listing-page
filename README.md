# Self-Listing Page

A multi-step wizard form for property hosts to create and submit their rental listings. Built with React, TypeScript, and Vite.

## Features

- **Multi-step Wizard**: Navigate through different sections of the listing creation process
- **Navigation Sidebar**: Visual progress tracking with clickable section navigation
- **Space Snapshot Section**: Comprehensive first step collecting property basics
  - Listing name with character limit
  - Property type, bedrooms, bathrooms, beds
  - Kitchen and parking information
  - Address input with manual confirmation
  - Neighborhood selection based on ZIP code
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Type-Safe**: Full TypeScript implementation with defined interfaces
- **Form State Management**: Centralized state management for all form data

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Add your Google Maps API key to `.env`:
```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

The Google Maps API key is required for address autocomplete functionality in Section 1 (Space Snapshot).

### Development

Run the development server on port 8000:

```bash
npm run dev
```

Visit [http://localhost:8000](http://localhost:8000) to view the application.

**Note:** If port 8000 is in use, Vite will automatically use the next available port (8001, 8002, etc.)

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── SelfListingWizard.tsx      # Main wizard component
│   ├── NavigationSidebar.tsx       # Left sidebar navigation
│   └── sections/
│       └── SpaceSnapshotSection.tsx # First form section
├── types/
│   └── listing.ts                  # TypeScript interfaces
├── App.tsx                         # Root component
└── main.tsx                        # Entry point
```

## Documentation

See the markdown files in the project root for comprehensive documentation:
- `Self listing context extraction - design and layout.md`
- `Self listing context extraction - data schema, option sets.md`
- `Self listing context extraction - workflows.md`
- `self-listing-flow-documentation.md`

## Technology Stack

This template uses:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

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
