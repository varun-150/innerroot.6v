package com.innerroot.controller;

import com.innerroot.dto.ChatMessage;
import com.innerroot.dto.ChatResponse;
import com.innerroot.service.chat.AutomationEngineService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatGatewayController {

    private final AutomationEngineService automationEngine;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void handleChatMessage(@Payload ChatMessage message) {
        log.info("Chat Gateway: Received WebSocket chat message: {} from session: {}", message.getContent(),
                message.getSessionId());

        // Push message to Automation Engine
        String responseContent = automationEngine.processChat(message.getContent());

        // Generate final response payload
        ChatResponse response = new ChatResponse("bot", responseContent);

        // WebSocket Push to Frontend UI Update segment, uniquely by session
        String replyTopic = "/topic/chat/reply";
        if (message.getSessionId() != null && !message.getSessionId().isEmpty()) {
            replyTopic += "/" + message.getSessionId();
        }
        log.info("Chat Gateway: Sending WebSocket Push response to {}", replyTopic);
        messagingTemplate.convertAndSend(replyTopic, response);
    }
}
