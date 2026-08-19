package com.touristsafety.touristsafety.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
@Data
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long touristId;
    private String category;
    private BigDecimal amount;
    private String note;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
