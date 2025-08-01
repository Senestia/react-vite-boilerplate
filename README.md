# React Vite Boilerplate

A modern, production-ready React boilerplate built with cutting-edge technologies for rapid development and optimal performance.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## 🚀 Tech Stack

This boilerplate leverages the latest and greatest in React ecosystem:

- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[React Router 7](https://reactrouter.com/)** - Modern file-based routing with SSR
- **[Vite 6](https://vitejs.dev/)** - Lightning-fast development and build tool
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development with strict configuration
- **[Inter Font](https://fonts.google.com/specimen/Inter)** - Modern, readable typography

## ✨ Key Features

- 🎯 **File-based Routing** - Intuitive routing with React Router 7 conventions
- 🎨 **Atomic Design** - Scalable component architecture
- 🌓 **Dark/Light Theme** - Built-in theme system with CSS variables
- ⚡️ **Hot Module Replacement** - Instant development feedback
- 📦 **Asset Optimization** - Automatic bundling and optimization
- 🔄 **Server-Side Rendering** - Enhanced performance and SEO
- 🔒 **Type Safety** - Full TypeScript integration
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🧩 **Path Aliases** - Clean imports with `~` alias for app directory
- 🎭 **Error Boundaries** - Graceful error handling
- 🔧 **Developer Experience** - Optimized tooling and configuration

## 📁 Project Structure

```
react-vite-boilerplate/
├── public/                      # 🌐 Static assets
│   ├── images/                  # Image assets
│   ├── icons/                   # SVG icons and favicons
│   ├── fonts/                   # Font files
│   └── locales/                 # Internationalization files
├── app/                         # 🎯 All application code
│   ├── root.tsx                 # Root component with Layout
│   ├── routes.ts                # Route configuration
│   ├── routes/                  # 📂 File-based routes
│   │   ├── _index.tsx           # Home route (/)
│   │   ├── _layout.tsx          # Root layout
│   │   └── _components/         # Route-specific components
│   │       └── welcome.tsx      # Welcome component example
│   ├── components/              # 🌐 Shared components (Atomic Design)
│   │   ├── atoms/               # Basic building blocks
│   │   ├── molecules/           # Component combinations
│   │   ├── organisms/           # Complex UI sections
│   │   └── templates/           # Page layouts
│   ├── hooks/                   # 🎣 Custom React hooks
│   ├── utils/                   # 🛠️ Utility functions
│   ├── types/                   # 📝 TypeScript type definitions
│   └── styles/                  # 🎨 Styling system
│       ├── app.css              # Global styles
│       ├── components.css       # Component-specific styles
│       ├── utilities.css        # Utility classes
│       └── themes/              # Theme system
│           ├── light.css        # Light theme variables
│           ├── dark.css         # Dark theme variables
│           └── variables.css    # CSS custom properties
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── react-router.config.ts       # React Router configuration
```

## 🏗️ Architecture Principles

### File-based Routing
Following [React Router conventions](https://reactrouter.com/how-to/file-route-conventions):
- `_index.tsx` - Index routes
- `_layout.tsx` - Layout routes
- `_components/` - Route-specific components
- Nested routing through folder structure

### Atomic Design System
Components are organized using atomic design methodology:
- **Atoms**: Basic HTML elements (buttons, inputs, labels)
- **Molecules**: Simple component combinations (search box, form field)
- **Organisms**: Complex UI components (header, footer, forms)
- **Templates**: Page wireframes and layouts

### Styling Philosophy
- **Utility-First**: Tailwind CSS for rapid styling
- **Component-Scoped**: CSS modules for complex components
- **Theme System**: CSS variables for consistent theming
- **Responsive**: Mobile-first responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone or use this template**
   ```bash
   git clone <repository-url>
   cd react-vite-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## 🎨 Styling Guidelines

### Tailwind CSS v4
This project uses the latest Tailwind CSS with enhanced features:

```tsx
// Example component with Tailwind classes
export function Button({ children, variant = 'primary' }) {
  return (
    <button 
      className={`
        px-4 py-2 rounded-lg font-medium transition-colors
        ${variant === 'primary' 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }
      `}
    >
      {children}
    </button>
  );
}
```

### Theme System
Dark/light theme support with CSS variables:

```css
/* themes/light.css */
:root {
  --color-background: #ffffff;
  --color-foreground: #000000;
}

/* themes/dark.css */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #000000;
    --color-foreground: #ffffff;
  }
}
```

## 🗂️ File Conventions

### Route Files
- Use lowercase with hyphens: `user-profile.tsx`
- Prefix with underscore for special routes: `_layout.tsx`
- Group related routes in folders

### Component Files
- Use PascalCase: `UserProfile.tsx`
- Export as named export matching filename
- Include types in same file when simple

### Import Paths
Use the configured alias for clean imports:
```tsx
import { Button } from '~/components/atoms/Button';
import { useAuth } from '~/hooks/useAuth';
import { formatDate } from '~/utils/date';
```

### Platform Support
Deploy to any platform supporting Node.js:
- **Vercel** - Zero-config deployment
- **Netlify** - JAMstack deployment
- **Railway** - Full-stack deployment
- **AWS ECS** - Container deployment
- **Google Cloud Run** - Serverless containers
- **Digital Ocean** - VPS deployment

### DIY Deployment
For custom deployment, ensure:
1. Node.js 18+ runtime
2. Serve the `build/` directory
3. Set environment variables as needed
4. Configure process manager (PM2, forever)

## 🤝 Contributing

1. Follow the established patterns
2. Use TypeScript for type safety
3. Follow atomic design principles
4. Write semantic, accessible HTML
5. Use Tailwind CSS for styling
6. Test your changes thoroughly

## 📚 Resources

- [React Router 7 Documentation](https://reactrouter.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)

---

Built with ❤️ using modern React ecosystem tools for exceptional developer experience and performance.
