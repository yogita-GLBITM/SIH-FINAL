package com.touristsafety.touristsafety.controller;

import com.touristsafety.touristsafety.entity.Booking;
import com.touristsafety.touristsafety.entity.BookableItem;
import com.touristsafety.touristsafety.entity.Expense;
import com.touristsafety.touristsafety.repository.BookingRepository;
import com.touristsafety.touristsafety.repository.BookableItemRepository;
import com.touristsafety.touristsafety.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired private BookingRepository bookingRepository;
    @Autowired private BookableItemRepository bookableItemRepository;
    @Autowired private ExpenseRepository expenseRepository;

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setBookedAt(LocalDateTime.now());
        Booking saved = bookingRepository.save(booking);

        BookableItem item = bookableItemRepository.findById(booking.getBookableItemId()).orElse(null);
        if (item != null) {
            Expense expense = new Expense();
            expense.setTouristId(booking.getTouristId());
            expense.setCategory(item.getType());
            expense.setAmount(item.getPrice());
            expense.setNote(item.getName());
            expense.setCreatedAt(LocalDateTime.now());
            expenseRepository.save(expense);
        }
        return saved;
    }
}