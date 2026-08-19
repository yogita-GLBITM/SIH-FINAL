package com.example.sikkimtour.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String description;
    private String location;
    private Double latitude;
    private Double longitude;
    private String imageUrl;
    private Integer estimatedVisitTime;

    // Getters and Setters
    public Long getId() {
    return id;
  }

public void setId(Long id) {
    this.id = id;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getCategory() {
    return category;
}

public void setCategory(String category) {
    this.category = category;
}

public String getDescription() {
    return description;
}

public void setDescription(String description) {
    this.description = description;
}

public String getLocation() {
    return location;
}

public void setLocation(String location) {
    this.location = location;
}

public Double getLatitude() {
    return latitude;
}

public void setLatitude(Double latitude) {
    this.latitude = latitude;
}

public Double getLongitude() {
    return longitude;
}

public void setLongitude(Double longitude) {
    this.longitude = longitude;
}

public String getImageUrl() {
    return imageUrl;
}

public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
}

public Integer getEstimatedVisitTime() {
    return estimatedVisitTime;
}

public void setEstimatedVisitTime(Integer estimatedVisitTime) {
    this.estimatedVisitTime = estimatedVisitTime;
}
}