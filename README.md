# Weather Forecast App

A modern, responsive weather application built with React and TypeScript that provides real-time weather information for any city around the world.

[Weather App Demo](https://youtu.be/2egZ6ksf7AM)

## Features

- **Real-time Weather Data**: Get current weather conditions for any city worldwide
- **Detailed Weather Information**: View temperature, feels like, humidity, wind speed, pressure, sunrise, and sunset times
- **Dynamic UI**: Background changes based on current weather conditions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean and Modern Interface**: User-friendly design with smooth animations

## Technologies Used

- **React**: For building the user interface
- **TypeScript**: For type-safe code
- **Vite**: For fast development and optimized builds
- **Axios**: For API requests
- **OpenWeatherMap API**: For weather data
- **CSS**: For styling with modern features like CSS Grid, Flexbox, and animations

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gcanidemir/Weather_Forecast.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_OPENWEATHER_APP_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## How to Use

1. Enter a city name in the search box
2. Press Enter or click the Search button
3. View the current weather information for the specified city

## API Reference

This application uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. You'll need to sign up for a free API key to use this application.
