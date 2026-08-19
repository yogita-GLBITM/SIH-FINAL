package com.example.sikkimtour.service;

import com.example.sikkimtour.dto.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    @Value("${openweather.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getWeather(double latitude, double longitude) {

        String url = "https://api.openweathermap.org/data/2.5/weather"
                + "?lat=" + latitude
                + "&lon=" + longitude
                + "&units=metric"
                + "&appid=" + apiKey;

        return restTemplate.getForObject(url, String.class);
    }

    public WeatherResponse getWeatherData(
            double latitude,
            double longitude) {

        String url = "https://api.openweathermap.org/data/2.5/weather"
                + "?lat=" + latitude
                + "&lon=" + longitude
                + "&units=metric"
                + "&appid=" + apiKey;

        Map<String, Object> response =
                restTemplate.getForObject(url, Map.class);

        Map<String, Object> main =
                (Map<String, Object>) response.get("main");

        List<Map<String, Object>> weatherList =
                (List<Map<String, Object>>) response.get("weather");

        Map<String, Object> weather =
                weatherList.get(0);

        String condition =
                (String) weather.get("main");

        String description =
                (String) weather.get("description");

        double temperature =
                ((Number) main.get("temp")).doubleValue();

        int humidity =
                ((Number) main.get("humidity")).intValue();

        int visibility =
                ((Number) response.get("visibility")).intValue();

        return new WeatherResponse(
                condition,
                description,
                temperature,
                humidity,
                visibility
        );
    }
    public String getWeatherAlert(double latitude, double longitude) {

    WeatherResponse weather = getWeatherData(latitude, longitude);

    if (weather.getWeather().equalsIgnoreCase("Thunderstorm")) {
        return "⚠️ DANGER: Thunderstorm detected!";
    }

    if (weather.getWeather().equalsIgnoreCase("Rain")) {
        return "⚠️ WARNING: Rain detected!";
    }

    if (weather.getWeather().equalsIgnoreCase("Snow")) {
        return "⚠️ WARNING: Snow detected!";
    }

    return "Weather conditions are normal.";
}
}