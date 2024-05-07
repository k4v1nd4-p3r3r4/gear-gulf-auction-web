package com.BidZone.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
// This class represents the Vehicle entity, which is mapped to the "car" table in the database.
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "car")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vehicleId;
    // Fields representing various attributes of a vehicle.
    private String vehicleName;
    private String description;
    private String year;
    private double bidAmount;
    // Fields representing dates, formatted using Jackson's JsonFormat annotation.
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "IST")
    private Date postedDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "IST")
    private Date startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "IST")
    private Date endDate;
    // Field representing whether bidding for the vehicle has ended.
    private String isBiddingEnded;
    // Field representing whether the vehicle is deleted.
    private String isDeleted;
    // Field representing the name of the image associated with the vehicle.
    private String imageName;
    // Many-to-One relationship with User entity.
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
