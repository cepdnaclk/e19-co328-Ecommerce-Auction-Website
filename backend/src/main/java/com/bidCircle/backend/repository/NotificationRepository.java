package com.bidCircle.backend.repository;

import com.bidCircle.backend.entity.Notification;
import com.bidCircle.backend.*;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer>{

  @Query(value = "SELECT * FROM notification ORDER BY id DESC LIMIT 5", nativeQuery = true)
    List<Notification> findLatestFive();  
} 