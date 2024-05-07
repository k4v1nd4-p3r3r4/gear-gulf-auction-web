package com.BidZone.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "image")
// This class represents the Image entity, which is mapped to the "image" table in the database.

public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Field representing the name of the image.
    private String name;
    // Field representing the name of the image.
    @Lob
    @Column(length = 1000000000) // Adjust length as needed for your specific use case
    private byte[] data;

    // Constructors, getters, and setters
}
