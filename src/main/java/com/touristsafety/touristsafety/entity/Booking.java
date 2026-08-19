package com.touristsafety.touristsafety.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long touristId;
    private Long bookableItemId;
    @Column(name = "booked_at")
    private LocalDateTime bookedAt;
}