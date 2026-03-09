package com.innerroot.service.chat;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AutomationEngineService {

    private final IntentDetectionService intentDetectionService;
    private final KnowledgeRetrievalService knowledgeRetrievalService;
    private final AIProcessingService aiProcessingService;

    public String processChat(String message) {
        log.info("Automation Engine Pipeline Started");

        // 1. Intent Detection
        String intent = intentDetectionService.detectIntent(message);
        log.info("Pipeline Step 1: Intent Detected -> {}", intent);

        // 2. Knowledge Retrieval
        String knowledgeCtx = knowledgeRetrievalService.retrieveKnowledge(intent);
        log.info("Pipeline Step 2: Knowledge Retrieved -> Length {}", knowledgeCtx.length());

        // 3. AI Processing & Response Generation
        String aiResponse = aiProcessingService.generateResponse(message, knowledgeCtx);
        log.info("Pipeline Step 3: Response Generated -> Length {}", aiResponse.length());

        log.info("Automation Engine Pipeline Completed");
        return aiResponse;
    }
}
