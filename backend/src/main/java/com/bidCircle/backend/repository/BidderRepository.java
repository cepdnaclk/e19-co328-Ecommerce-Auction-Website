package com.bidCircle.backend.repository;

import com.bidCircle.backend.entity.Bider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BidderRepository extends JpaRepository<Bider,String> {
}
