package com.BidZone.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
// This class represents the basic structure of a response returned by API requests.
@Getter
@Setter
@ToString
public class Response {
    // Fields representing response metadata and content.
    private String responseCode;
    private String status;
    private String message;
    // Fields to be ignored during JSON serialization.
    @JsonIgnore
    private String statusCode;
    @JsonIgnore
    private String statusDesc;
}
