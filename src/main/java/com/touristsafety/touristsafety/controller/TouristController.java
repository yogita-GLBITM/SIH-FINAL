package com.touristsafety.touristsafety.controller;

import com.touristsafety.touristsafety.entity.Tourist;
import com.touristsafety.touristsafety.repository.TouristRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tourists")
@CrossOrigin(origins = "*")
public class TouristController {

    @Autowired
    private TouristRepository touristRepository;

    @PostMapping("/register")
    public Tourist register(@RequestBody Tourist tourist) {
        return touristRepository.save(tourist);
    }
}