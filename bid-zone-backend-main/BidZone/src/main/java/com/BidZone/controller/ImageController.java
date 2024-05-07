package com.BidZone.controller;


import com.BidZone.dto.response.ApiResponse;
import com.BidZone.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
// This class defines RESTful API endpoints related to image operations.
@RestController
@CrossOrigin
@RequestMapping("/image")
public class ImageController {

    @Autowired
    ImageService imageService;
    // Endpoint for uploading an image file.
    @PostMapping("/upload")
    public ApiResponse uploadFile(@RequestParam("file") MultipartFile file) {
        return imageService.upload(file);
    }
    // Endpoint for viewing an image by its name.
    @GetMapping("/view/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
        return imageService.getImage(imageName);
    }
    // Endpoint for deleting an image by its name.
    @PostMapping("/delete/{imageName}")
    public void deleteImage(@PathVariable String imageName) {
         imageService.deleteImage(imageName);
    }
}
