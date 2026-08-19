package com.touristsafety.touristsafety.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "bookable_items")
@Data
public class BookableItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long destinationId;
    private String type;
    private String name;
    private String description;
    private BigDecimal price;
    private String duration;
    private String tag;
}