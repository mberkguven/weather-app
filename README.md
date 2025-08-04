# Weather App

A modern weather forecast application built with Next.js, React Query, and OpenWeather API.

## Features

- 🌤️ Real-time weather data from OpenWeatherMap API
- 📍 Geolocation detection
- 🔍 City search functionality
- 📅 7-day weather forecast
- 🌙 Dark/light mode toggle
- 🌍 Multi-language support (Turkish/English/Spanish)
- ⏰ Auto-refresh with countdown timer
- 📱 Responsive design with shadcn/ui components

## Tech Stack

- **Framework**: Next.js w/ App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Query + React Context
- **Theming**: next-themes
- **Icons**: Lucide React + Weather Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- OpenWeatherMap API key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:

```env
API_KEY=your_openweather_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `API_KEY`: Your OpenWeatherMap API key (required)

## Project Structure

```
weather-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── contexts/              # React Context providers
├── hooks/                 # Custom React hooks
├── providers/             # Provider components
├── services/              # API services
└── types.ts              # TypeScript types
```

## Features

### Weather Data

- Current weather conditions
- 7-day forecast
- Temperature, humidity, wind speed
- Weather icons

### Geolocation

- Automatic location detection
- Manual city search
- Location dialog for coordinates

### UI/UX

- Dark/light mode toggle
- Responsive design
- Loading states
- Error handling
- Countdown timer for auto-refresh

### Internationalization

- Turkish, English and Spanish support
- Language toggle
- Localized weather descriptions

## API Security

The app uses a secure API route (`/api/weather`) that keeps your OpenWeather API key private on the server side, preventing client-side exposure.

## Localization (i18n)

All localization files are stored in the `i18n/` folder at the project root. Add new language files there as needed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
