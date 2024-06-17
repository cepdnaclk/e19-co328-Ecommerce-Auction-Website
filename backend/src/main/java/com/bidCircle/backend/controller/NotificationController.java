package com.bidCircle.backend.controller;

import com.bidCircle.backend.entity.Notification;
import com.bidCircle.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Adjust the origin as per your frontend server
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // @GetMapping("/notifications")
    // public ResponseEntity<List<Notification>> getNotifications() {
    //     List<Notification> notifications = notificationService.getRecentNotifications();
    //     return ResponseEntity.ok(notifications);
    // }
}