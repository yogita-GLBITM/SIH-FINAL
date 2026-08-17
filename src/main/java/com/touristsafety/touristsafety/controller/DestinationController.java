package com.touristsafety.touristsafety.controller;

import com.touristsafety.touristsafety.entity.Destination;
import com.touristsafety.touristsafety.entity.BookableItem;
import com.touristsafety.touristsafety.repository.DestinationRepository;
import com.touristsafety.touristsafety.repository.BookableItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*")
public class DestinationController {

    @Autowired private DestinationRepository destinationRepository;
    @Autowired private BookableItemRepository bookableItemRepository;

    @GetMapping
    public List<Destination> getAll() {
        return destinationRepository.findAll();
    }

    @GetMapping("/{id}/items")
    public List<BookableItem> getItemsForDestination(@PathVariable Long id) {
        return bookableItemRepository.findByDestinationId(id);
    }
}