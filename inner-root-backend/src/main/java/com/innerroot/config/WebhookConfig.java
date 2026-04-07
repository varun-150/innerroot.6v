package com.innerroot.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.webhook")
@Data
public class WebhookConfig {
    /**
     * URL for the n8n webhook.
     */
    private String n8nUrl;
}
