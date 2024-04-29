package com.bidCircle.backend.repository;

import com.bidCircle.backend.entity.Auctioneer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctioneerRepository extends JpaRepository<Auctioneer, String> {
    Auctioneer findByUserName(String userName);
}
