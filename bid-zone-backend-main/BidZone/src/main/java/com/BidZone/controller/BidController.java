package com.BidZone.controller;

import com.BidZone.dto.request.ApiRequest;
import com.BidZone.dto.response.ApiResponse;
import com.BidZone.service.BidService;
import com.BidZone.util.ResponseCodes;
import config.ThreadPoolConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

// This class defines the RESTful API endpoints related to bidding operations.

@RestController
@CrossOrigin
@RequestMapping("/bid")
public class BidController {

    @Autowired
    BidService bidService;

    // Endpoint for placing a bid.
    @PostMapping("/place")
    public ApiResponse placeBid(@RequestBody ApiRequest apiRequest) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Future<ApiResponse> future = ThreadPoolConfig.getThreadPoolExecutor().submit(() -> bidService.placeBid(apiRequest));
            apiResponse = future.get(); // Block and wait for the result
        } catch (InterruptedException | ExecutionException e) {
            // Handle the exception
            apiResponse.setResponseCode(ResponseCodes.INTERNAL_SERVER_ERROR);
            apiResponse.setMessage("An error occurred while processing the request.");
        }
        return apiResponse;
    }

    // Endpoint for retrieving bids for a vehicle.
    @PostMapping("/get-bids-vehicle")
    public ApiResponse getBidsForVehicle(@RequestBody ApiRequest apiRequest) {
        return bidService.getBidsForVehicle(apiRequest);
    }
    // Endpoint for retrieving bids by a user.
    @PostMapping("/get-bids-user")
    public ApiResponse getBidsByUser(@RequestBody ApiRequest apiRequest) {
        return bidService.getBidsByUser(apiRequest);
    }
    // Endpoint for retrieving bids by a user for a specific vehicle.
    @PostMapping("/get-bids-vehicle-user")
    public ApiResponse getBidsByUserForVehicle(@RequestBody ApiRequest apiRequest) {
        return bidService.getBidsByUserForVehicle(apiRequest);
    }
}
