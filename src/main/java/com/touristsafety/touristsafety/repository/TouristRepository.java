package com.touristsafety.touristsafety.repository;

import com.touristsafety.touristsafety.entity.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TouristRepository extends JpaRepository<Tourist, Long> {
}