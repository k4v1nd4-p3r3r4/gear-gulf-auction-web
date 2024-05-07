package com.BidZone.service;

import com.BidZone.dto.request.ApiRequest;
import com.BidZone.dto.response.ApiResponse;

public interface BidService {
    ApiResponse placeBid(ApiRequest apiRequest);
    ApiResponse getBidsForVehicle(ApiRequest apiRequest);
    ApiResponse getBidsByUser(ApiRequest apiRequest);
    ApiResponse getBidsByUserForVehicle(ApiRequest apiRequest);
}
