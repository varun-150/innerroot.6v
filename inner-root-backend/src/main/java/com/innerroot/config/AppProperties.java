package com.innerroot.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix = "app")
@Data
public class AppProperties {
    
    private final Jwt jwt = new Jwt();
    private final Google google = new Google();
    private final Cors cors = new Cors();
    private final Webhook webhook = new Webhook();

    @Data
    public static class Jwt {
        private String secret;
        private long expirationMs;
        private String cookieName = "jwt";
    }

    @Data
    public static class Google {
        private String clientId;
    }

    @Data
    public static class Cors {
        private List<String> allowedOrigins;
    }

    @Data
    public static class Webhook {
        private String n8nUrl;
    }
}
