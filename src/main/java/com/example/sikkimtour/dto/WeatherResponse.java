package com.example.sikkimtour.dto;

public class WeatherResponse {

    private String weather;
    private String description;
    private double temperature;
    private int humidity;
    private int visibility;

    public WeatherResponse(
            String weather,
            String description,
            double temperature,
            int humidity,
            int visibility) {

        this.weather = weather;
        this.description = description;
        this.temperature = temperature;
        this.humidity = humidity;
        this.visibility = visibility;
    }

    public String getWeather() {
        return weather;
    }

    public String getDescription() {
        return description;
    }

    public double getTemperature() {
        return temperature;
    }

    public int getHumidity() {
        return humidity;
    }

    public int getVisibility() {
        return visibility;
    }
}