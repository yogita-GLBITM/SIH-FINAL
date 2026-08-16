package com.touristsafety.touristsafety.repository;

import com.touristsafety.touristsafety.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByTouristIdOrderByBookedAtAsc(Long touristId);
}