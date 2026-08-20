
package com.tourism.login_backend.entity;

import jakarta.persistence.*;
        import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String phone;

    private String email;

    private String dob;

    private String address;

    private String familyName;

    private String familyPhone;
}