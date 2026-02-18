package com.innerroot.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class GoogleOAuthService {

    private static final Logger logger = LoggerFactory.getLogger(GoogleOAuthService.class);
    private static final String GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

    @Value("${app.google.client-id}")
    private String googleClientId;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Verify Google access token and fetch user info.
     * Returns a Map with keys: sub, name, email, picture, email_verified
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> verifyAccessToken(String accessToken) {
        try {
            // Use the access token to fetch user info from Google
            var headers = new org.springframework.http.HttpHeaders();
            headers.setBearerAuth(accessToken);

            var entity = new org.springframework.http.HttpEntity<>(headers);

            var response = restTemplate.exchange(
                    GOOGLE_USERINFO_URL,
                    org.springframework.http.HttpMethod.GET,
                    entity,
                    Map.class);

            Map<String, Object> userInfo = response.getBody();

            if (userInfo == null || !userInfo.containsKey("email")) {
                throw new RuntimeException("Failed to get user info from Google");
            }

            // Verify email is verified
            Boolean emailVerified = (Boolean) userInfo.get("email_verified");
            if (emailVerified == null || !emailVerified) {
                throw new RuntimeException("Google email is not verified");
            }

            logger.info("Google token verified for email: {}", userInfo.get("email"));
            return userInfo;

        } catch (Exception e) {
            logger.error("Failed to verify Google token: {}", e.getMessage());
            throw new RuntimeException("Invalid Google access token: " + e.getMessage());
        }
    }
}
