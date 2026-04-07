package com.innerroot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.innerroot.config.AIConfig;
import com.innerroot.config.WebhookConfig;

@SpringBootApplication
@EnableConfigurationProperties({AIConfig.class, WebhookConfig.class})
public class InnerRootApplication {

    public static void main(String[] args) {
        SpringApplication.run(InnerRootApplication.class, args);
    }
}
