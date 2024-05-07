package com.BidZone.service;

import com.BidZone.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService{
    ApiResponse upload(MultipartFile file);

    ResponseEntity<byte[]> getImage(String imageName);

    void deleteImage(String imageName);
}
