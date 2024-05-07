package com.BidZone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
// This class represents the User entity, which is mapped to the "user" table in the database.
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Fields representing user details.
    private int userId;
    private String userName;
    private String email;
    private String password;
}
