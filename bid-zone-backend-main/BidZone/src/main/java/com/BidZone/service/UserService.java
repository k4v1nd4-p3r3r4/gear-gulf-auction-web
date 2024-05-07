package com.BidZone.service;

import com.BidZone.dto.request.ApiRequest;
import com.BidZone.dto.response.ApiResponse;

public interface UserService {
    ApiResponse signUp(ApiRequest apiRequest);
    ApiResponse signIn(ApiRequest apiRequest);
}
