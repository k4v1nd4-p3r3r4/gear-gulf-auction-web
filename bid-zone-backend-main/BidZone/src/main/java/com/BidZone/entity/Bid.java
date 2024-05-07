package com.BidZone.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bid")
// This class represents the Bid entity, which is mapped to the "bid" table in the database.
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bidId;
    // Field representing the date of the bid, formatted using Jackson's JsonFormat annotation.
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "IST")
    private Date date;
    // Field representing the bid amount.
    private double bidAmount;
    // Many-to-One relationship with Vehicle entity.
    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;
    // Many-to-One relationship with User entity.
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
