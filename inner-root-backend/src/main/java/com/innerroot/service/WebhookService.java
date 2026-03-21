package com.innerroot.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

/**
 * Service to handle outgoing webhooks to platforms like n8n.
 * This enables automated user interaction workflows (SMS, Email, Alerts).
 */
@Service
@Slf4j
public class WebhookService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${app.webhook.n8n-url:http://localhost:5678/webhook-test/inner-root-events}")
    private String n8nWebhookUrl;

    /**
     * Notify n8n of a system event asynchronously.
     * @param eventName The type of event (e.g. USER_SIGNUP, MOOD_LOGGED, JAPA_COMPLETE)
     * @param payload Map of data related to the event
     */
    public void triggerEvent(String eventName, Map<String, Object> payload) {
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("event", eventName);
            body.put("timestamp", System.currentTimeMillis());
            body.put("data", payload);

            log.info("Triggering webhook event: {} to {}", eventName, n8nWebhookUrl);
            
            // Send POST request
            restTemplate.postForLocation(n8nWebhookUrl, body);
            
        } catch (Exception e) {
            log.error("Failed to trigger webhook for event {}: {}", eventName, e.getMessage());
        }
    }
}
