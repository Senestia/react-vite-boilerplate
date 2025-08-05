// @ts-check

import js from "@eslint/js"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  // Global ignores - equivalent to .eslintignore
  {
    ignores: [
      "**/node_modules/**",
      "**/build/**",
      "**/dist/**",
      "**/.build/**",
      "**/.react-router/**",
      "**/coverage/**",
      "**/*.min.js",
      "**/public/**",
      "**/vite.config.ts",
      "**/tailwind.config.ts",
    ],
  },

  // Base ESLint recommended rules
  js.configs.recommended,

  // TypeScript ESLint configurations
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  // React configurations
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"], // For React 17+ JSX transform

  // Main configuration for all JavaScript/TypeScript files
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // ============================================
      // FRONT-END STANDARDS ENFORCEMENT RULES
      // ============================================

      // Component naming - enforce PascalCase for React components
      "react/jsx-pascal-case": "error",

      // File size limits - enforce max 500 lines per file
      "max-lines": [
        "error",
        { max: 500, skipBlankLines: true, skipComments: true },
      ],

      // Enforce destructuring for props and parameters
      "prefer-destructuring": [
        "error",
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: true,
          },
        },
      ],

      // Require keys in React map functions
      "react/jsx-key": [
        "error",
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
        },
      ],

      // Prevent duplicate code patterns
      "no-duplicate-imports": "error",
      "no-unreachable": "error",
      "no-unreachable-loop": "error",

      // ============================================
      // REACT BEST PRACTICES
      // ============================================

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // React Refresh (for Vite HMR) - allow React Router patterns
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          allowExportNames: ["meta", "loader", "action", "headers", "links"],
        },
      ],

      // Enforce proper JSX practices
      "react/jsx-uses-react": "off", // Not needed with new JSX transform
      "react/react-in-jsx-scope": "off", // Not needed with new JSX transform
      "react/prop-types": "off", // Using TypeScript for prop validation
      "react/jsx-uses-vars": "error",
      "react/no-unescaped-entities": "error",
      "react/self-closing-comp": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],

      // ============================================
      // TYPESCRIPT BEST PRACTICES
      // ============================================

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",

      // ============================================
      // CODE QUALITY RULES
      // ============================================

      // General code quality
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "arrow-spacing": "error",
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
      "eol-last": "error",
      "comma-dangle": ["error", "always-multiline"],
      semi: ["error", "never"],
      quotes: ["error", "double", { avoidEscape: true }],

      // Import/Export organization
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],

      // Function and variable naming
      camelcase: ["error", { properties: "never", ignoreDestructuring: true }],

      // Error prevention
      "no-unused-expressions": "error",
      "no-implicit-coercion": "error",
      eqeqeq: ["error", "always"],
      curly: "error",
    },
  },

  // Specific configuration for JavaScript files (disable TypeScript rules)
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // Disable TypeScript-specific rules for JS files
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  // Configuration for test files
  {
    files: [
      "**/*.{test,spec}.{js,jsx,ts,tsx}",
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
    ],
    rules: {
      // Relax some rules for test files
      "max-lines": "off",
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Configuration for configuration files
  {
    files: ["*.config.{js,ts,mjs}", "vite.config.ts", "tailwind.config.ts"],
    rules: {
      // Relax some rules for config files
      "max-lines": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
)
