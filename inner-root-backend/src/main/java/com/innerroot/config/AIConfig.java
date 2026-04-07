package com.innerroot.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix = "nvidia.api")
@Data
public class AIConfig {
    /**
     * API Key for NVIDIA services.
     */
    private String key;

    /**
     * API Endpoint for NVIDIA services.
     */
    private String url;

    /**
     * API Model for NVIDIA services.
     */
    private String model;
}
