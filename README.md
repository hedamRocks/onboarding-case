# Clever Case

## Installation

```bash
npm install
```

## How to Run

For the full experience, I recommend building and previewing the production version:

```bash
npm run build && npm run preview
```

For development:

```bash
npm run dev
```

## Testing

Run the test suite:

```bash
# Run all tests
npm run test
```

## How to use
To use the application:

1. **Login**: Use the following credentials:
    - Email: `testuser`
    - Password: `password123`

2. **Action Buttons**: At the top of the index page, you'll find:
    - **Logout**: Logs you out of the application and redirects you to the login page
    - **Clear Onboarding**: Resets the onboarding flow

## Project structure
```
clever-case/
├── app/
│   ├── components/         # Reusable UI components
│   │   └── __tests__/      # Component tests
│   ├── composables/        # Vue composables for state & logic
│   │   └── __tests__/      # Composable tests
│   ├── pages/              # Page components and routing
│   ├── services/           # API services
│   │   └── __tests__/      # Service tests
│   ├── types/              # TypeScript type definitions
│   └── layouts/            # Layout components
├── server/
│   └── api/                # Backend API endpoints
│       └── __tests__/      # API tests
├── public/                 # Static assets and mock data
├── vitest.config.ts        # Test configuration
└── package.json            # Project dependencies and scripts
```

## Test Coverage

The project includes comprehensive test coverage:
- ✅ 40 passing tests
- Component tests (BaseButton, BaseInput)
- Composable tests (useAuth, useOnboarding, useContent)
- Service tests (fetchContent)
- API logic tests (login validation)# onboarding-case
