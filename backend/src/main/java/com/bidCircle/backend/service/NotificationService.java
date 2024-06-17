package com.bidCircle.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bidCircle.backend.entity.Notification;
import com.bidCircle.backend.repository.NotificationRepository;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    // public List<Notification> getRecentNotifications() {
    //     return notificationRepository.findAll(); // You might want to add logic to get the latest 5 notifications
    // }
}
