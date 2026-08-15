package com.touristsafety.touristsafety.controller;

import com.touristsafety.touristsafety.entity.Expense;
import com.touristsafety.touristsafety.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    @Autowired private ExpenseRepository expenseRepository;

    @GetMapping("/{touristId}")
    public List<Expense> getExpenses(@PathVariable Long touristId) {
        return expenseRepository.findByTouristId(touristId);
    }
}