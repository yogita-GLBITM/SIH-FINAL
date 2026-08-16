package com.touristsafety.touristsafety.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "tourists")
@Data
public class Tourist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String idProofNumber;
    private String phone;
    private String emergencyContact;
    private LocalDate tripStart;
    private LocalDate tripEnd;
}