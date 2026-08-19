package com.example.sikkimtour.dto;

public class SafetyResponse {

    private String placeName;
    private double distanceKm;
    private String weather;
    private double temperature;
    private int humidity;
    private int visibility;
    private String severity;
    private String alert;

    public SafetyResponse(
            String placeName,
            double distanceKm,
            String weather,
            double temperature,
            int humidity,
            int visibility,
            String severity,
            String alert) {

        this.placeName = placeName;
        this.distanceKm = distanceKm;
        this.weather = weather;
        this.temperature = temperature;
        this.humidity = humidity;
        this.visibility = visibility;
        this.severity = severity;
        this.alert = alert;
    }

    public String getPlaceName() {
        return placeName;
    }

    public double getDistanceKm() {
        return distanceKm;
    }

    public String getWeather() {
        return weather;
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

    public String getSeverity() {
        return severity;
    }

    public String getAlert() {
        return alert;
    }
}