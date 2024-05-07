package com.BidZone.service.impl;

import com.BidZone.dto.response.ApiResponse;
import com.BidZone.entity.Image;
import com.BidZone.repository.ImageRepository;
import com.BidZone.service.ImageService;
import com.BidZone.util.Messages;
import com.BidZone.util.ResponseCodes;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    Messages messages;

    @Override
    public ApiResponse upload(MultipartFile file) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Image image = new Image();
            image.setName(UUID.randomUUID().toString());
            image.setData(file.getBytes());
            imageRepository.save(image);
            apiResponse.setResponseCode(ResponseCodes.SUCCESS);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.SUCCESS,null));
            apiResponse.setImageName(image.getName());
            return apiResponse;
        } catch (IOException e) {
            apiResponse.setResponseCode(ResponseCodes.BAD_REQUEST_CODE);
            apiResponse.setMessage(messages.getMessageForResponseCode(ResponseCodes.IMAGE_UPLOAD_FAILED,null));
            return apiResponse;
        }
    }

    @Override
    public ResponseEntity<byte[]> getImage(String imageName) {
        Optional<Image> byName = imageRepository.findByName(imageName);
        if (!byName.isPresent()) {
            throw new IllegalArgumentException("Image not found");
        }

        Image image = byName.get();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getName() + "\"");

        return ResponseEntity.ok()
                .headers(headers)
                .body(image.getData());
    }

    @Override
    @Transactional
    public void deleteImage(String imageName) {
        imageRepository.deleteByName(imageName);
    }

}
