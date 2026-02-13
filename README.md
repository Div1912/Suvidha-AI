# Suvidha AI

Real-time algorithmic transparency & income intelligence for gig workers.

## Overview

Suvidha AI helps gig workers (Swiggy, Zomato, Uber, Ola) understand their earnings, detect algorithmic bias, and coordinate for fair treatment under Section 13 of the Social Security Code.

## Features

- **Truth Lens**: Real-time order analysis via AccessibilityService
- **Earnings Forecast**: 7-day ML predictions
- **Bias Detection**: Peer comparison and anomaly detection
- **Unite**: Collective action coordination
- **Digital Passport**: Blockchain-verified worker identity

## Tech Stack

- React Native (TypeScript)
- Redux Toolkit
- React Navigation
- Android AccessibilityService (Java)
- AWS Backend (Lambda, API Gateway, Cognito, SageMaker, DynamoDB, QLDB)

## Getting Started

```bash
# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on Android
npm run android
```

## Project Structure

```
src/
├── components/ui/     # UI components (Button, Card, Text, Icons)
├── navigation/        # React Navigation setup
├── screens/           # App screens (home, forecast, bias, unite, profile)
├── store/            # Redux slices
├── services/         # API and storage services
├── theme/            # Colors, typography, spacing
└── types/            # TypeScript definitions

android/app/src/main/java/com/suvidhai/accessibility/
├── TruthLensService.java      # AccessibilityService
├── NotificationParser.java    # Notification parsing
└── OverlayManager.java        # System overlay
```

## License

Proprietary - Suvidha AI
