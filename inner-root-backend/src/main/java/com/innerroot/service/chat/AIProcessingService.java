package com.innerroot.service.chat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class AIProcessingService {

    @Value("${openrouter.api.key:}")
    private String openRouterApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateResponse(String message, String knowledgeCtx) {
        log.info("AI Processing module: Generating response with LLM...");

        if (openRouterApiKey == null || openRouterApiKey.trim().isEmpty()) {
            log.warn("OpenRouter API Key is missing. Returning fallback response.");
            return "Based on my wisdom (" + knowledgeCtx
                    + "), I guide you on your journey. (API Key not configured in backend)";
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + openRouterApiKey);
            headers.set("HTTP-Referer", "http://localhost:8080");
            headers.set("X-Title", "Inner Root Backend Engine");

            Map<String, Object> body = new HashMap<>();
            body.put("model", "google/gemini-2.0-flash-lite-001");

            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content",
                    "You are the Inner Root Heritage Companion, an AI guide. Be rooted in traditional Indian wisdom. Use this knowledge retrieval context to form your answer: "
                            + knowledgeCtx));
            messages.add(Map.of("role", "user", "content", message));
            body.put("messages", messages);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    "https://openrouter.ai/api/v1/chat/completions",
                    org.springframework.http.HttpMethod.POST,
                    entity,
                    new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {
                    });

            Map<String, Object> respBody = response.getBody();
            if (respBody != null && respBody.containsKey("choices")) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> choices = (List<Map<String, Object>>) respBody.get("choices");
                @SuppressWarnings("unchecked")
                Map<String, Object> messageObj = (Map<String, Object>) choices.get(0).get("message");
                return (String) messageObj.get("content");
            }
        } catch (Exception e) {
            log.error("AI API call failed", e);
            return "I apologize, but I am having trouble connecting to the wisdom ether right now. (Knowledge Context used: "
                    + knowledgeCtx + ")";
        }

        return "Internal AI processing error.";
    }
}
