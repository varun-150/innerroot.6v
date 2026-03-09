package com.innerroot.service.chat;

import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class IntentDetectionService {
    public String detectIntent(String message) {
        log.info("Intent Detection: analyzing message");
        String lowerMsg = message.toLowerCase();
        if (lowerMsg.contains("heritage") || lowerMsg.contains("culture")) {
            return "HERITAGE_QUERY";
        } else if (lowerMsg.contains("wellness") || lowerMsg.contains("meditation") || lowerMsg.contains("yoga")) {
            return "WELLNESS_QUERY";
        }
        return "GENERAL_QUERY";
    }
}
