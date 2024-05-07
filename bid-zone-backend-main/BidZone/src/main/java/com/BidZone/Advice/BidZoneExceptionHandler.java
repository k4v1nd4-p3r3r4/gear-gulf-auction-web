package com.BidZone.Advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class BidZoneExceptionHandler {

    // This class serves as an exception handler for the BidZoneController.
    // It intercepts exceptions thrown during request processing and provides customized responses.

    // The @ExceptionHandler annotation specifies that this method will handle IllegalArgumentExceptions.
    // It returns a Map containing error details with the HTTP status set to BAD_REQUEST.

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public Map<String, String> handleIllegalArgumentException(IllegalArgumentException ex) {
        // Create a HashMap to store error details.
        Map<String, String> error = new HashMap<>();
        // Add the error message from the exception to the map with the key "Image".
        error.put("Image", ex.getMessage());
        // Return the error map.
        return error;
    }
}
