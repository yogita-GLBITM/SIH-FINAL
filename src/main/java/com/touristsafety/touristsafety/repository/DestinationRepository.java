package com.touristsafety.touristsafety.repository;

import com.touristsafety.touristsafety.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
}