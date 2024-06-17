package com.bidCircle.backend.config;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.bidCircle.backend.entity.Notification;
import com.bidCircle.backend.repository.NotificationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class NotificationWebSocketHandler extends TextWebSocketHandler {
    private final NotificationRepository notificationRepository;
    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public NotificationWebSocketHandler(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        sendLatestNotifications(session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Handle incoming messages if needed
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }

    public void sendLatestNotifications(WebSocketSession session) {
        List<Notification> notifications = notificationRepository.findLatestFive();
        try {
            String notificationsJson = objectMapper.writeValueAsString(notifications);
            session.sendMessage(new TextMessage(notificationsJson));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
