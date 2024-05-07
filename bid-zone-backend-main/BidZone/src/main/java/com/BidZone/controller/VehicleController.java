package com.BidZone.controller;

import com.BidZone.dto.request.ApiRequest;
import com.BidZone.dto.response.ApiResponse;
import com.BidZone.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
// This class defines RESTful API endpoints related to vehicle operations.
@RestController
@CrossOrigin
@RequestMapping("/vehicle")
public class VehicleController {

    @Autowired
    VehicleService vehicleService;
    // Endpoint for selling a vehicle.
    @PostMapping("/sell")
    public ApiResponse sellVehicle(@RequestBody ApiRequest apiRequest) {
        return vehicleService.sellVehicle(apiRequest);
    }
    // Endpoint for retrieving vehicles with pagination support.
    @PostMapping("/get")
    public ApiResponse getVehicles(@RequestBody ApiRequest apiRequest) {
        Pageable pageable = PageRequest.of(apiRequest.getPage(), apiRequest.getPageCount());
        return vehicleService.getVehicles(pageable);
    }
    // Endpoint for retrieving active vehicles.
    @PostMapping("/get-active")
    public ApiResponse getActiveVehicles(@RequestBody ApiRequest apiRequest) {
        return vehicleService.getActiveVehicles(apiRequest);
    }
    // Endpoint for retrieving vehicles by user.
    @PostMapping("/get-by-user")
    public ApiResponse getVehiclesByUser(@RequestBody ApiRequest apiRequest) {
        return vehicleService.getVehiclesByUser(apiRequest);
    }
    // Endpoint for deleting a vehicle.
    @PostMapping("/delete")
    public ApiResponse deleteVehicle(@RequestBody ApiRequest apiRequest) {
        return vehicleService.deleteVehicle(apiRequest);
    }
    // Endpoint for retrieving deleted vehicles.
    @PostMapping("/get-deleted-vehicles")
    public ApiResponse getDeletedVehicles(@RequestBody ApiRequest apiRequest) {
        return vehicleService.getDeletedVehicles(apiRequest);
    }
}
