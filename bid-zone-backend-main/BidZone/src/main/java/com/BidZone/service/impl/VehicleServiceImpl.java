package com.BidZone.service.impl;

import com.BidZone.dto.request.ApiRequest;
import com.BidZone.dto.response.ApiResponse;
import com.BidZone.entity.Vehicle;
import com.BidZone.entity.User;
import com.BidZone.repository.BidRepository;
import com.BidZone.repository.VehicleRepository;
import com.BidZone.repository.UserRepository;
import com.BidZone.service.VehicleService;
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
public class VehicleServiceImpl implements VehicleService {
    @Autowired
    Messages messages;

    @Autowired
    VehicleRepository vehicleRepository;

    @Autowired
    BidRepository bidRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ApiResponse sellVehicle(ApiRequest apiRequest) {
        ApiResponse apiResponse = new ApiResponse();

        // Find user by userId
        Optional<User> byId = userRepository.findById(apiRequest.getUserId());
        if(byId.isPresent()) {
            Vehicle vehicle = new Vehicle();
            vehicle.setVehicleName(apiRequest.getVehicleName());
            vehicle.setDescription(apiRequest.getDescription());
            vehicle.setYear(apiRequest.getYear());
            vehicle.setBidAmount(apiRequest.getBidAmount());
            vehicle.setIsBiddingEnded(Constants.DB_FALSE);
            vehicle.setIsDeleted(Constants.DB_FALSE);
            vehicle.setStartDate(apiRequest.getStartDate());
            vehicle.setEndDate(apiRequest.getEndDate());
            vehicle.setPostedDate(apiRequest.getPostedDate());
            vehicle.setImageName(apiRequest.getImageName());
            vehicle.setUser(byId.get());

            // Save the car object
            Vehicle save = vehicleRepository.save(vehicle);
            apiResponse.setStatus(ResponseCodes.SUCCESS);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.VEHICLE_ADD_SUCCESS, null));
            apiResponse.setVehicle(save);
            return apiResponse;
        } else {
            apiResponse.setStatus(ResponseCodes.BAD_REQUEST_CODE);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.CANNOT_FIND_USER, null));
            return apiResponse;
        }
    }

    @Override
    public ApiResponse getVehicles(Pageable pageable) {
        ApiResponse apiResponse = new ApiResponse();

        // Find all cars by page and count
        Page<Vehicle> all = vehicleRepository.findAll(Constants.DB_FALSE, pageable);

        // Set car list to response
        apiResponse.setVehicles(all);
        apiResponse.setStatus(ResponseCodes.SUCCESS);
        return apiResponse;
    }

    @Override
    public ApiResponse getActiveVehicles(ApiRequest apiRequest) {

        ApiResponse apiResponse = new ApiResponse();
        Pageable pageable = PageRequest.of(apiRequest.getPage(), apiRequest.getPageCount());
        // Find all active cars by page and count
        Page<Vehicle> all = vehicleRepository.findAllByIsBiddingEnded(Constants.DB_FALSE, Constants.DB_FALSE, pageable);

        // Set car list to response
        apiResponse.setVehicles(all);
        apiResponse.setStatus(ResponseCodes.SUCCESS);
        return apiResponse;
    }

    @Override
    public ApiResponse getVehiclesByUser(ApiRequest apiRequest) {

        Pageable pageable = PageRequest.of(apiRequest.getPage(), apiRequest.getPageCount());
        ApiResponse apiResponse = new ApiResponse();

        // Find user by userId
        Optional<User> byId = userRepository.findById(apiRequest.getUserId());
        if(byId.isPresent()) {
            // Find cars by user
            Page<Vehicle> byUser = vehicleRepository.findByUser(byId.get(), Constants.DB_FALSE, pageable);
            apiResponse.setVehicles(byUser);
            apiResponse.setStatus(ResponseCodes.SUCCESS);
            return apiResponse;
        } else {
            apiResponse.setStatus(ResponseCodes.BAD_REQUEST_CODE);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.CANNOT_FIND_USER, null));
            return apiResponse;
        }
    }

    @Override
    public ApiResponse deleteVehicle(ApiRequest apiRequest) {

        // Find the vehicle By Id
        Optional<Vehicle> byId = vehicleRepository.findById(apiRequest.getVehicleId());
        ApiResponse apiResponse = new ApiResponse();
        if(byId.isPresent()) {
            // Change the Delete State
            byId.get().setIsDeleted(Constants.DB_TRUE);

            // Save the Edited Vehicle
            Vehicle save = vehicleRepository.save(byId.get());
            apiResponse.setStatus(ResponseCodes.SUCCESS);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.VEHICLE_DELETE_SUCCESS, null));
            apiResponse.setVehicle(save);
            return apiResponse;
        } else {
            apiResponse.setStatus(ResponseCodes.BAD_REQUEST_CODE);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.VEHICLE_NOT_FOUND, null));
            return apiResponse;
        }
    }

    @Override
    public ApiResponse getDeletedVehicles(ApiRequest apiRequest) {

        Pageable pageable = PageRequest.of(apiRequest.getPage(), apiRequest.getPageCount());
        ApiResponse apiResponse = new ApiResponse();

        // Find deleted Vehicles
        Page<Vehicle> deletedVehicles = vehicleRepository.findDeletedVehicles(Constants.DB_TRUE, pageable);

        apiResponse.setVehicles(deletedVehicles);
        apiResponse.setStatus(ResponseCodes.SUCCESS);
        return apiResponse;
    }
}
