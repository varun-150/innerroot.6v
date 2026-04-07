package com.innerroot.service;

import com.innerroot.config.WebhookConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequiredArgsConstructor
public class WebhookService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final WebhookConfig webhookConfig;

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

            String url = webhookConfig.getN8nUrl();
            log.info("Triggering webhook event: {} to {}", eventName, url);
            
            // Send POST request
            restTemplate.postForLocation(url, body);
            
        } catch (Exception e) {
            log.error("Failed to trigger webhook for event {}: {}", eventName, e.getMessage());
        }
    }
}
