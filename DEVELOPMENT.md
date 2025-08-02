# Development Workflow - WACC Website

## Overview
This guide ensures consistent development practices and prevents CI/GitHub Actions build failures.

## Key Problem Solved
Local builds were succeeding while CI/Actions builds failed due to TypeScript strictness differences. This setup ensures consistent behavior.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Git Hooks (Optional but Recommended)
```bash
npx husky install
```

## Development Commands

### Standard Development
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
```

### Quality Assurance
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run type-check   # TypeScript type checking only
npm run build:check  # Full pre-deployment check (type + lint + build)
npm run pre-deploy   # Alias for build:check
```

## Pre-Commit Workflow

The project includes automatic pre-commit hooks that run:
- TypeScript type checking
- ESLint with auto-fixing
- Full build validation on push

## Best Practices

### 1. Before Making Changes
```bash
npm run dev          # Start development
```

### 2. Before Committing
```bash
npm run build:check  # Validate your changes locally
```

### 3. TypeScript Guidelines
- **Never use implicit `any` types**
- Always add type annotations to function parameters:
  ```typescript
  // ❌ Bad
  items.map(item => ...)
  
  // ✅ Good
  items.map((item: ItemType) => ...)
  // or if type is complex
  items.map((item: any) => ...)
  ```

### 4. Testing Changes
- Run `npm run build:check` before pushing
- This matches exactly what CI/Actions will run
- Fix any errors locally before committing

## Configuration Files

### TypeScript (`tsconfig.json`)
- Strict mode enabled with explicit options
- `noImplicitAny: true` catches implicit any types
- Additional strict type checking enabled

### ESLint (`.eslintrc.json`)
- TypeScript-specific rules enabled
- Catches implicit any types and unsafe operations
- Integrates with Next.js best practices

### Build Scripts
- `build:check`: Comprehensive validation
- `type-check`: TypeScript-only validation
- `lint:fix`: Automatic code formatting

## Troubleshooting

### Local vs CI Build Differences
If you see CI failures but local success:

1. **Run full build check locally:**
   ```bash
   npm run build:check
   ```

2. **Check for implicit any types:**
   ```bash
   npm run type-check
   ```

3. **Fix TypeScript errors:**
   - Add explicit type annotations
   - Use `(param: any)` for complex types
   - Ensure all function parameters have types

### Common Issues

1. **"Parameter 'x' implicitly has an 'any' type"**
   ```typescript
   // Fix by adding type annotation
   .map((x: any) => ...)
   .forEach((item: any) => ...)
   .filter((value: any) => ...)
   ```

2. **ESLint errors**
   ```bash
   npm run lint:fix  # Auto-fix many issues
   ```

3. **Build failures**
   ```bash
   npm run build:check  # See exactly what CI sees
   ```

## CI/Actions Environment
The GitHub Actions environment:
- Uses strict TypeScript compilation
- Runs `npm run build` in production mode
- Has zero tolerance for implicit types
- Uses exact package versions from package-lock.json

By following this workflow, your local development will match the CI environment exactly.