package com.BidZone.controller;

import com.BidZone.dto.request.ApiRequest;
import com.BidZone.dto.response.ApiResponse;
import com.BidZone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
// This class defines RESTful API endpoints related to user operations.
@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;
    // This class defines RESTful API endpoints related to user operations.
    @PostMapping("/sign-up")
    public ApiResponse signUp(@RequestBody ApiRequest apiRequest) {
        return userService.signUp(apiRequest);
    }
    // Endpoint for user sign-in.
    @PostMapping("/sign-in")
    public ApiResponse signIn(@RequestBody ApiRequest apiRequest) {
        return userService.signIn(apiRequest);
    }

}
