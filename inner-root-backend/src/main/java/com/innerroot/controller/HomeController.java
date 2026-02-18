package com.innerroot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;
import java.time.LocalDateTime;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "running");
        response.put("message", "InnerRoot Backend is Active");
        response.put("timestamp", LocalDateTime.now());
        response.put("endpoints", new String[] {
                "/api/auth/login",
                "/api/auth/register"
        });
        return response;
    }
}
