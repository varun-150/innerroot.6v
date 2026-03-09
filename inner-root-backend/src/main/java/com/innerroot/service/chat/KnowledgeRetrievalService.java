package com.innerroot.service.chat;

import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class KnowledgeRetrievalService {
    public String retrieveKnowledge(String intent) {
        log.info("Knowledge Retrieval: fetching context for intent {}", intent);
        return switch (intent) {
            case "HERITAGE_QUERY" ->
                "Indian heritage encompasses ancient traditions, languages like Sanskrit, classical arts, and timeless architecture. The Vedas forms the core of its wisdom.";
            case "WELLNESS_QUERY" ->
                "Ayurveda and Yoga are ancient wellness practices focusing on the harmony of body, mind, and spirit for holistic health.";
            default -> "Inner Root is a platform dedicated to Indian culture, spirituality, and wellness.";
        };
    }
}
