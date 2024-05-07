package com.BidZone.repository;

import com.BidZone.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByName(String imageName);

    void deleteByName(String imageName);
}
