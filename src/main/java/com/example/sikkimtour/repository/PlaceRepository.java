package com.example.sikkimtour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.sikkimtour.entity.Place;

public interface PlaceRepository extends JpaRepository<Place, Long> {

}