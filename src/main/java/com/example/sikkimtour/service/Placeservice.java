package com.example.sikkimtour.service;
import com.example.sikkimtour.dto.NearbyPlaceResponse;
import com.example.sikkimtour.dto.SafetyResponse;
import java.util.ArrayList;
import java.util.List;
import com.example.sikkimtour.service.WeatherService;
import org.springframework.stereotype.Service;
import com.example.sikkimtour.dto.WeatherResponse;
import com.example.sikkimtour.entity.Place;
import com.example.sikkimtour.repository.PlaceRepository;

@Service
public class Placeservice {

    private final PlaceRepository repository;
    private final WeatherService weatherService;

    public Placeservice(
        PlaceRepository repository,
        WeatherService weatherService) {

    this.repository = repository;
    this.weatherService = weatherService;
}

    public List<Place> getAllPlaces() {
        return repository.findAll();
    }

    public Place getPlaceById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Place savePlace(Place place) {
        return repository.save(place);
    }

    
    public List<NearbyPlaceResponse> getNearbyPlaces(
        double latitude,
        double longitude) {

    List<Place> places = repository.findAll();
    List<NearbyPlaceResponse> nearbyPlaces = new ArrayList<>();

    for (Place place : places) {

        double distance = calculateDistance(
                latitude,
                longitude,
                place.getLatitude(),
                place.getLongitude()
        );

        if (distance <= 1.0) {
            nearbyPlaces.add(
                new NearbyPlaceResponse(place, distance)
            );
        }
    }

    return nearbyPlaces;
}

    // Calculates distance in kilometres using Haversine formula
    private double calculateDistance(
            double lat1,
            double lon1,
            double lat2,
            double lon2) {

        final double EARTH_RADIUS = 6371.0;

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1))
                * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2)
                * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
        );

        return EARTH_RADIUS * c;
    }
    public List<SafetyResponse> getSafetyInformation(
        double latitude,
        double longitude) {

    List<NearbyPlaceResponse> nearbyPlaces =
            getNearbyPlaces(latitude, longitude);

    List<SafetyResponse> result = new ArrayList<>();

    for (NearbyPlaceResponse nearby : nearbyPlaces) {

        Place place = nearby.getPlace();

        WeatherResponse weather =
                weatherService.getWeatherData(
                        place.getLatitude(),
                        place.getLongitude()
                );

        String severity;
        String alert;

        if (weather.getWeather().equalsIgnoreCase("Thunderstorm")) {

            severity = "DANGER";
            alert = "⚠️ Thunderstorm detected near "
                    + place.getName();

        } else if (weather.getWeather().equalsIgnoreCase("Rain")) {

            severity = "WARNING";
            alert = "⚠️ Rain detected near "
                    + place.getName();

        } else if (weather.getWeather().equalsIgnoreCase("Snow")) {

            severity = "WARNING";
            alert = "⚠️ Snow detected near "
                    + place.getName();

        } else {

            severity = "NORMAL";
            alert = "Weather conditions are normal.";
        }

        result.add(new SafetyResponse(
                place.getName(),
                nearby.getDistanceKm(),
                weather.getWeather(),
                weather.getTemperature(),
                weather.getHumidity(),
                weather.getVisibility(),
                severity,
                alert
        ));
    }

    return result;
}
}
