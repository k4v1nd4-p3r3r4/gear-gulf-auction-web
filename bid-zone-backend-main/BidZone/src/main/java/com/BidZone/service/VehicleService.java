package com.BidZone.service;

import com.BidZone.dto.request.ApiRequest;
import com.BidZone.dto.response.ApiResponse;
import org.springframework.data.domain.Pageable;

public interface VehicleService {
    ApiResponse sellVehicle(ApiRequest apiRequest);
    ApiResponse getVehicles(Pageable pageable);
    ApiResponse getActiveVehicles(ApiRequest apiRequest);
    ApiResponse getVehiclesByUser(ApiRequest apiRequest);
    ApiResponse deleteVehicle(ApiRequest apiRequest);
    ApiResponse getDeletedVehicles(ApiRequest apiRequest);
}
