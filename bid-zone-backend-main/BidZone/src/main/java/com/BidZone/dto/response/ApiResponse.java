package com.BidZone.dto.response;

import com.BidZone.entity.Bid;
import com.BidZone.entity.User;
import com.BidZone.entity.Vehicle;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.Page;

@Getter
@Setter
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
// This class represents the response payload for API requests.
public class ApiResponse extends Response {
    // Fields representing various entities and lists, with inclusion of non-null values in JSON serialization.
    private Bid bid;
    private Page<Bid> bidList;
    private User user;
    private Vehicle vehicle;
    private Page<Vehicle> vehicles;
    private String imageName;
}
