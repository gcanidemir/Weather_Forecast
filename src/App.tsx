import { useRef, useState, useEffect } from "react";
import axios from "axios";
import './App.css'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_APP_KEY;

interface WeatherData {
	weather: [{
		description: string;
		icon: string;
		main: string;
	}];
	main: {
		temp: number;
		humidity: number;
		feels_like: number;
		pressure: number;
	};
	name: string;
	wind: {
		speed: number;
	};
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};
}

function App() {
	const [weatherData, setWeatherData] = useState<WeatherData>({
		weather: [
			{
				description: "Weather Report",
				icon: "",
				main: ""
			}
		],
		main: {
			temp: 0,
			humidity: 0,
			feels_like: 0,
			pressure: 0
		},
		name: "City Name",
		wind: {
			speed: 0
		},
		sys: {
			country: "",
			sunrise: 0,
			sunset: 0
		}
	});

	const [loading, setLoading] = useState(false);
	const cityNameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (weatherData.weather[0].main) {
			const weatherCondition = weatherData.weather[0].main.toLowerCase();
			document.body.className = weatherCondition;
		}
	}, [weatherData]);

	async function getWeatherData() {
		if (!cityNameRef.current?.value) {
			alert("Please enter a city name");
			return;
		}

		setLoading(true);
		try {
			const geocodingResponse = await axios.get(
				"http://api.openweathermap.org/geo/1.0/direct",
				{
					params: {
						q: cityNameRef.current?.value || "",
						appid: OPENWEATHER_API_KEY,
					},
				}
			);
			
			if (!geocodingResponse.data.length) {
				alert("City not found. Please check the spelling and try again.");
				setLoading(false);
				return;
			}
		
			const weatherResponse = await axios.get(
				"https://api.openweathermap.org/data/2.5/weather",
				{
					params: {
						lat: geocodingResponse.data[0].lat,
						lon: geocodingResponse.data[0].lon,
						appid: OPENWEATHER_API_KEY,
						units: "metric",
						lang: "en"
					},
				}
			);

			weatherResponse.data.name = geocodingResponse.data[0].name;
			setWeatherData(weatherResponse.data);
		} catch (error) {
			console.error("Error fetching weather data:", error);
			alert("An error occurred while fetching weather data. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			getWeatherData();
		}
	};

	// Format time from Unix timestamp
	const formatTime = (timestamp: number) => {
		const date = new Date(timestamp * 1000);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	return (
		<>
			<div className="weather-card">
				<h1>Weather Forecast</h1>
				<div className="search-section">
					<input 
						type="text" 
						ref={cityNameRef} 
						placeholder="Enter city name" 
						onKeyDown={handleKeyPress}
					/>
					<button onClick={getWeatherData} type="button">Search</button>
				</div>

				{loading ? (
					<div className="loading"></div>
				) : (
					<div className="weather-report-section">
						<h2>{weatherData.name} {weatherData.sys.country && `(${weatherData.sys.country})`}</h2>
						{weatherData.weather[0].icon && (
							<img 
								className="weather-icon" 
								src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
								alt={weatherData.weather[0].description} 
							/>
						)}
						<h3>{weatherData.weather[0].description}</h3>
						<div className="temp-display">{Math.round(weatherData.main.temp)}°C</div>
						
						<div className="weather-details">
							<div className="weather-detail-item">
								<span className="detail-label">Feels Like</span>
								<span className="detail-value">{Math.round(weatherData.main.feels_like)}°C</span>
							</div>
							<div className="weather-detail-item">
								<span className="detail-label">Humidity</span>
								<span className="detail-value">{weatherData.main.humidity}%</span>
							</div>
							<div className="weather-detail-item">
								<span className="detail-label">Wind Speed</span>
								<span className="detail-value">{weatherData.wind.speed} m/s</span>
							</div>
							<div className="weather-detail-item">
								<span className="detail-label">Pressure</span>
								<span className="detail-value">{weatherData.main.pressure} hPa</span>
							</div>
							{weatherData.sys.sunrise && (
								<>
									<div className="weather-detail-item">
										<span className="detail-label">Sunrise</span>
										<span className="detail-value">{formatTime(weatherData.sys.sunrise)}</span>
									</div>
									<div className="weather-detail-item">
										<span className="detail-label">Sunset</span>
										<span className="detail-value">{formatTime(weatherData.sys.sunset)}</span>
									</div>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default App;