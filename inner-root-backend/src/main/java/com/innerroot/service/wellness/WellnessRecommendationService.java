package com.innerroot.service.wellness;

import com.innerroot.service.chat.AIProcessingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class WellnessRecommendationService {

    private final AIProcessingService aiProcessingService;

    public Map<String, String> getRecommendation(String mood, String intensity) {
        log.info("Generating wellness recommendation for mood: {} (intensity: {})", mood, intensity);

        String prompt = String.format(
            "The user is feeling '%s' with an intensity of %s/10. " +
            "Provide a short, poetic recommendation (max 2 sentences) and suggest one of these practices: " +
            "'Morning Pranayama', 'Loving-Kindness Meditation', 'Gratitude Journaling', or 'Chakra Visualization'. " +
            "Format your response EXACTLY as: Recommendation: [text] | Practice: [practice name]",
            mood, intensity
        );

        String systemPrompt = "You are Aura AI, the Sentient Heritage Guide. You specialize in matching emotional frequencies with ancient Indian practices.";
        
        // We use a simplified version of aiProcessingService or just call it
        String response = aiProcessingService.generateAIResponse(systemPrompt, prompt);
        
        log.info("AI raw response: {}", response);

        try {
            String[] parts = response.split("\\|");
            String recText = parts[0].replace("Recommendation:", "").trim();
            String practice = parts[1].replace("Practice:", "").trim();
            
            return Map.of(
                "text", recText,
                "practice", practice
            );
        } catch (Exception e) {
            log.warn("Failed to parse AI response, using fallback", e);
            return Map.of(
                "text", "Your frequency is noted. Ground yourself with deep awareness.",
                "practice", "Morning Pranayama"
            );
        }
    }
}
