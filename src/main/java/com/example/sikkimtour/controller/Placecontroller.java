package com.example.sikkimtour.controller;

import java.util.List;
import com.example.sikkimtour.dto.NearbyPlaceResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.sikkimtour.service.WeatherService;
import com.example.sikkimtour.entity.Place;
import com.example.sikkimtour.service.Placeservice;
import com.example.sikkimtour.dto.SafetyResponse;
@RestController
@RequestMapping("/places")
public class Placecontroller {

    private final Placeservice service;
    private final WeatherService weatherService;
    public Placecontroller(
        Placeservice service,
        WeatherService weatherService) {

    this.service = service;
    this.weatherService = weatherService;
}
    @GetMapping
    public List<Place> getAllPlaces() {
        return service.getAllPlaces();
    }

    @GetMapping("/id/{id}")
    public Place getPlaceById(@PathVariable Long id) {
        return service.getPlaceById(id);
    }

    @GetMapping("/nearby")
public List<NearbyPlaceResponse> getNearbyPlaces(
        @RequestParam("latitude") double latitude,
        @RequestParam("longitude") double longitude) {

    return service.getNearbyPlaces(latitude, longitude);
}
@GetMapping("/weather")
public String getWeather(
        @RequestParam("latitude") double latitude,
        @RequestParam("longitude") double longitude) {

    return weatherService.getWeather(latitude, longitude);
}
@GetMapping("/weather-alert")
public String getWeatherAlert(
        @RequestParam("latitude") double latitude,
        @RequestParam("longitude") double longitude) {

    return weatherService.getWeatherAlert(latitude, longitude);
}
@GetMapping("/safety")
public List<SafetyResponse> getSafetyInformation(
        @RequestParam("latitude") double latitude,
        @RequestParam("longitude") double longitude) {

    return service.getSafetyInformation(latitude, longitude);
}
}