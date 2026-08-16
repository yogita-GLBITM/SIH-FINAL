package com.touristsafety.touristsafety.controller;

import com.touristsafety.touristsafety.entity.Booking;
import com.touristsafety.touristsafety.entity.BookableItem;
import com.touristsafety.touristsafety.repository.BookingRepository;
import com.touristsafety.touristsafety.repository.BookableItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/itinerary")
@CrossOrigin(origins = "*")
public class ItineraryController {

    @Autowired private BookingRepository bookingRepository;
    @Autowired private BookableItemRepository bookableItemRepository;

    @GetMapping("/{touristId}")
    public List<Map<String, Object>> getItinerary(@PathVariable Long touristId) {
        List<Booking> bookings = bookingRepository.findByTouristIdOrderByBookedAtAsc(touristId);
        List<Map<String, Object>> itinerary = new ArrayList<>();
        int day = 1;
        for (Booking b : bookings) {
            BookableItem item = bookableItemRepository.findById(b.getBookableItemId()).orElse(null);
            Map<String, Object> entry = new HashMap<>();
            entry.put("day", day);
            entry.put("item", item != null ? item.getName() : "Unknown");
            entry.put("type", item != null ? item.getType() : "");
            itinerary.add(entry);
            day++;
        }
        return itinerary;
    }
}