package com.BidZone.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
// This class represents the request payload for API requests.
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiRequest {
    // Fields representing various parameters related to vehicles, users, and bidding.
    private String vehicleName;
    private String description;
    private String year;
    private double bidAmount;
    private int userId;
    private int vehicleId;
    // Fields representing dates, formatted using Jackson's JsonFormat annotation.
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "IST")
    private Date date;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "IST")
    private Date postedDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "IST")
    private Date startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "IST")
    private Date endDate;
    // Fields representing user details.
    private String userName;
    private String email;
    private String password;
    // Field representing the name of the image associated with a vehicle.
    private String imageName;
    // Pagination parameters.
    private int page = 0;
    private int pageCount = 10;
}
