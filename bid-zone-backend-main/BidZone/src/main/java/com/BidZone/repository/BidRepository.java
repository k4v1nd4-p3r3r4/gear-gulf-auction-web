package com.BidZone.repository;

import com.BidZone.entity.Bid;
import com.BidZone.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BidRepository extends JpaRepository<Bid, Integer> {
    @Query("SELECT b FROM Bid b WHERE b.vehicle.vehicleId = :vehicleId ORDER BY b.date DESC")
    Page<Bid> findByVehicleId(@Param("vehicleId") int vehicleId, Pageable pageable);
    @Query("SELECT b FROM Bid b WHERE b.user = :user ORDER BY b.date DESC")
    Page<Bid> findByUser(@Param("user") User user, Pageable pageable);
    @Query("SELECT b FROM Bid b " +
            "WHERE b.user = :user " +
            "AND b.id IN (SELECT MAX(b2.id) FROM Bid b2 WHERE b2.user = :user GROUP BY b2.vehicle) " +
            "ORDER BY b.date DESC")
    Page<Bid> findLatestBidsByUser(@Param("user") User user, Pageable pageable);

    @Query("SELECT b FROM Bid b WHERE b.vehicle.vehicleId = :vehicleId AND b.user = :user ORDER BY b.date DESC")
    Page<Bid> findByVehicleIdAndUser(@Param("vehicleId") int vehicleId, @Param("user") User user, Pageable pageable);
    @Query("SELECT b FROM Bid b WHERE (:vehicleId is null OR b.vehicle.vehicleId = :vehicleId) AND (:userId is null OR b.user.userId = :userId) ORDER BY b.date DESC")
    Page<Bid> findByVehicleIdAndUserId(@Param("vehicleId") Integer vehicleId, @Param("userId") Integer userId, Pageable pageable);

}
