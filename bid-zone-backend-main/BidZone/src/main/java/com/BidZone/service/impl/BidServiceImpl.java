package com.BidZone.service.impl;

import com.BidZone.dto.request.ApiRequest;
import com.BidZone.dto.response.ApiResponse;
import com.BidZone.entity.Bid;
import com.BidZone.entity.User;
import com.BidZone.entity.Vehicle;
import com.BidZone.repository.BidRepository;
import com.BidZone.repository.UserRepository;
import com.BidZone.repository.VehicleRepository;
import com.BidZone.service.BidService;
import com.BidZone.util.Constants;
import com.BidZone.util.Messages;
import com.BidZone.util.ResponseCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BidServiceImpl implements BidService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    VehicleRepository vehicleRepository;

    @Autowired
    BidRepository bidRepository;

    @Autowired
    Messages messages;


    @Override
    public ApiResponse placeBid(ApiRequest apiRequest) {
        ApiResponse apiResponse = new ApiResponse();
        System.out.println(apiRequest);

        Optional<User> byEmail = userRepository.findByEmail(apiRequest.getEmail());
        if (!byEmail.isPresent()) {
            apiResponse.setResponseCode(ResponseCodes.CANNOT_FIND_USER);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.CANNOT_FIND_USER, null));
            return apiResponse; // Return the response if the user is not present
        }
        Optional<Vehicle> byVehicleId = vehicleRepository.findByVehicleId(apiRequest.getVehicleId(), Constants.DB_FALSE);
        if (!byVehicleId.isPresent()) {
            apiResponse.setResponseCode(ResponseCodes.INVALID_VEHICLE_ID);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.INVALID_VEHICLE_ID, null));
            return apiResponse; // Return the response if the vehicle is not present
        }

        Vehicle vehicle = byVehicleId.get();
        vehicle.setBidAmount(apiRequest.getBidAmount());
        vehicleRepository.save(vehicle);

        // Create a Bid object
        Bid bid = new Bid();
        bid.setDate(apiRequest.getDate());
        bid.setBidAmount(apiRequest.getBidAmount());
        bid.setVehicle(byVehicleId.get());
        bid.setUser(byEmail.get());

        // Save the Bid object
        bidRepository.save(bid);
        System.out.println("service :"+Thread.currentThread().getName());

        // Return success response
        apiResponse.setResponseCode(ResponseCodes.SUCCESS);
        apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.SUCCESS, null));
        return apiResponse;
    }


    @Override
    public ApiResponse getBidsForVehicle(ApiRequest apiRequest) {

        Pageable pageable = PageRequest.of(apiRequest.getPage(), apiRequest.getPageCount());
        ApiResponse apiResponse = new ApiResponse();

        // Find Bids for the Vehicle
        Page<Bid> byVehicleId = bidRepository.findByVehicleId(apiRequest.getVehicleId(), pageable);
        // Check Whether Bids are Empty
        if(byVehicleId.isEmpty()) {
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.NO_BIDS_YET, null));
        } else {
            apiResponse.setBidList(byVehicleId);
        }
        apiResponse.setStatus(ResponseCodes.SUCCESS);
        return apiResponse;
    }

    @Override
    public ApiResponse getBidsByUser(ApiRequest apiRequest) {

        Pageable pageable = PageRequest.of(apiRequest.getPage(), apiRequest.getPageCount());
        ApiResponse apiResponse = new ApiResponse();

        // Find the User
        Optional<User> user = userRepository.findById(apiRequest.getUserId());
        if(user.isPresent()) {
            // Find Bids By User
            Page<Bid> byUser = bidRepository.findLatestBidsByUser(user.get(), pageable);
            apiResponse.setBidList(byUser);
            apiResponse.setStatus(ResponseCodes.SUCCESS);
            return apiResponse;
        } else {
            apiResponse.setStatus(ResponseCodes.BAD_REQUEST_CODE);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.CANNOT_FIND_USER, null));
            return apiResponse;
        }
    }

    @Override
    public ApiResponse getBidsByUserForVehicle(ApiRequest apiRequest) {
        Pageable pageable = PageRequest.of(apiRequest.getPage(), apiRequest.getPageCount());
        ApiResponse apiResponse = new ApiResponse();

        // Find User By Id
        Optional<User> user = userRepository.findById(apiRequest.getUserId());
        if(user.isPresent()) {
            // Find Bids By User For Vehicle Using Vehicle Id and User
            Page<Bid> byVehicleIdAndUser = bidRepository.findByVehicleIdAndUser(apiRequest.getVehicleId(), user.get(), pageable);
            apiResponse.setBidList(byVehicleIdAndUser);
            apiResponse.setStatus(ResponseCodes.SUCCESS);
            return apiResponse;
        } else {
            apiResponse.setStatus(ResponseCodes.BAD_REQUEST_CODE);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.CANNOT_FIND_USER, null));
            return apiResponse;
        }
    }
}
