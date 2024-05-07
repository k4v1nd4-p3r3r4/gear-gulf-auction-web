package com.BidZone.repository;

import com.BidZone.entity.Vehicle;
import com.BidZone.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    @Query("SELECT v FROM Vehicle v WHERE v.isDeleted = :isDeleted")
    Page<Vehicle> findAll(@Param("isDeleted") String isDeleted, Pageable pageable);
    @Query("SELECT v FROM Vehicle v WHERE v.isBiddingEnded = :isBiddingEnded AND v.isDeleted = :isDeleted")
    Page<Vehicle> findAllByIsBiddingEnded(@Param("isBiddingEnded") String isBiddingEnded, @Param("isDeleted") String isDeleted, Pageable pageable);
    @Query("SELECT v FROM Vehicle v WHERE v.user = :user AND v.isDeleted = :isDeleted")
    Page<Vehicle> findByUser(@Param("user") User user, @Param("isDeleted") String isDeleted, Pageable pageable);
    @Query("SELECT v FROM Vehicle v WHERE v.vehicleId = :vehicleId AND v.isDeleted = :isDeleted")
    Optional<Vehicle> findByVehicleId(@Param("vehicleId") int vehicleId, @Param("isDeleted") String isDeleted);
    @Query("SELECT v FROM Vehicle v WHERE v.isDeleted = :isDeleted")
    Page<Vehicle> findDeletedVehicles(@Param("isDeleted") String isDeleted, Pageable pageable);
}
