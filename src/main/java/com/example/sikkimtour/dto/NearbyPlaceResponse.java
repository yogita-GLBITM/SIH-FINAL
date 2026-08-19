package com.example.sikkimtour.dto;

import com.example.sikkimtour.entity.Place;

public class NearbyPlaceResponse {

    private Place place;
    private double distanceKm;

    public NearbyPlaceResponse(Place place, double distanceKm) {
        this.place = place;
        this.distanceKm = distanceKm;
    }

    public Place getPlace() {
        return place;
    }

    public double getDistanceKm() {
        return distanceKm;
    }
} 
