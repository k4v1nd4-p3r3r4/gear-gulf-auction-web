package com.BidZone.service.impl;

import com.BidZone.dto.request.ApiRequest;
import com.BidZone.dto.response.ApiResponse;
import com.BidZone.entity.User;
import com.BidZone.entity.Vehicle;
import com.BidZone.repository.UserRepository;
import com.BidZone.repository.VehicleRepository;
import com.BidZone.service.UserService;
import com.BidZone.util.Constants;
import com.BidZone.util.Messages;
import com.BidZone.util.ResponseCodes;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    Messages messages;

    @Autowired
    UserRepository userRepository;

    @Autowired
    VehicleRepository vehicleRepository;

    @Autowired
    ModelMapper modelMapper;

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public ApiResponse signUp(ApiRequest apiRequest) {
        ApiResponse apiResponse = new ApiResponse();

        // Check user email exist
        Optional<User> byEmail = userRepository.findByEmail(apiRequest.getEmail());
        if(byEmail.isPresent()) {
            apiResponse.setStatus(ResponseCodes.BAD_REQUEST_CODE);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.EMAIL_ALREADY_IN_USE, null));
            return apiResponse;
        } else {
            User user = new User();
            user.setUserName(apiRequest.getUserName());
            user.setEmail(apiRequest.getEmail());
            user.setPassword(bCryptPasswordEncoder.encode(apiRequest.getPassword()));

            // Save user
            userRepository.save(user);
            apiResponse.setStatus(ResponseCodes.SUCCESS);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.USER_SIGN_UP_SUCCESS, null));
            return apiResponse;
        }
    }

    @Override
    public ApiResponse signIn(ApiRequest apiRequest) {
        ApiResponse apiResponse = new ApiResponse();

        // Check user exist
        Optional<User> byEmail = userRepository.findByEmail(apiRequest.getEmail());
        if(byEmail.isPresent()) {
            // Check if password matches
            if (bCryptPasswordEncoder.matches(apiRequest.getPassword(), byEmail.get().getPassword())) {

                // Change the bidding date according to login date
                Date loginDate = apiRequest.getDate();
                List<Vehicle> vehicles = vehicleRepository.findAll();
                for (Vehicle vehicle : vehicles) {
                    if (vehicle.getEndDate() != null) {
                        Calendar loginCalendar = Calendar.getInstance();
                        loginCalendar.setTime(loginDate);
                        Calendar endCalendar = Calendar.getInstance();
                        endCalendar.setTime(vehicle.getEndDate());

                        System.out.println("login date time :" + loginCalendar.getTime());
                        System.out.println("end date time :" + endCalendar.getTime());

                        if (loginCalendar.get(Calendar.YEAR) > endCalendar.get(Calendar.YEAR) ||
                                (loginCalendar.get(Calendar.YEAR) == endCalendar.get(Calendar.YEAR) &&
                                        loginCalendar.get(Calendar.MONTH) > endCalendar.get(Calendar.MONTH)) ||
                                (loginCalendar.get(Calendar.YEAR) == endCalendar.get(Calendar.YEAR) &&
                                        loginCalendar.get(Calendar.MONTH) == endCalendar.get(Calendar.MONTH) &&
                                        loginCalendar.get(Calendar.DAY_OF_MONTH) > endCalendar.get(Calendar.DAY_OF_MONTH)) ||
                                (loginCalendar.get(Calendar.YEAR) == endCalendar.get(Calendar.YEAR) &&
                                        loginCalendar.get(Calendar.MONTH) == endCalendar.get(Calendar.MONTH) &&
                                        loginCalendar.get(Calendar.DAY_OF_MONTH) == endCalendar.get(Calendar.DAY_OF_MONTH) &&
                                        loginCalendar.get(Calendar.HOUR_OF_DAY) > endCalendar.get(Calendar.HOUR_OF_DAY)) ||
                                (loginCalendar.get(Calendar.YEAR) == endCalendar.get(Calendar.YEAR) &&
                                        loginCalendar.get(Calendar.MONTH) == endCalendar.get(Calendar.MONTH) &&
                                        loginCalendar.get(Calendar.DAY_OF_MONTH) == endCalendar.get(Calendar.DAY_OF_MONTH) &&
                                        loginCalendar.get(Calendar.HOUR_OF_DAY) == endCalendar.get(Calendar.HOUR_OF_DAY) &&
                                        loginCalendar.get(Calendar.MINUTE) > endCalendar.get(Calendar.MINUTE)) ||
                                (loginCalendar.get(Calendar.YEAR) == endCalendar.get(Calendar.YEAR) &&
                                        loginCalendar.get(Calendar.MONTH) == endCalendar.get(Calendar.MONTH) &&
                                        loginCalendar.get(Calendar.DAY_OF_MONTH) == endCalendar.get(Calendar.DAY_OF_MONTH) &&
                                        loginCalendar.get(Calendar.HOUR_OF_DAY) == endCalendar.get(Calendar.HOUR_OF_DAY) &&
                                        loginCalendar.get(Calendar.MINUTE) == endCalendar.get(Calendar.MINUTE) &&
                                        loginCalendar.get(Calendar.SECOND) > endCalendar.get(Calendar.SECOND))) {
                            // login date is after end date
                            vehicle.setIsBiddingEnded(Constants.DB_TRUE);
                        }
                    }
                }
                vehicleRepository.saveAll(vehicles);
                apiResponse.setStatus(ResponseCodes.SUCCESS);
                apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.USER_SIGN_IN_SUCCESS, null));
                apiResponse.setUser(byEmail.get());
                return apiResponse;
            } else {
                apiResponse.setStatus(ResponseCodes.BAD_REQUEST_CODE);
                apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.PASSWORD_MISMATCH, null));
                return apiResponse;
            }
        } else {
            apiResponse.setResponseCode(ResponseCodes.BAD_REQUEST_CODE);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.CANNOT_FIND_USER, null));
            return apiResponse;
        }
    }
}
