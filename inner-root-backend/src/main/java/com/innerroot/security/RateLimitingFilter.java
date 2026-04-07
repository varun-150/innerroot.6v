package com.innerroot.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * IP and User-based token bucket rate limiter using Bucket4j.
 * Applies stricter limits on authentication routes and sensitive API usage.
 */
@Component
@Order(Ordered.LOWEST_PRECEDENCE)
public class RateLimitingFilter extends OncePerRequestFilter {

    // Scalable in-memory store for rate limits
    private final Map<String, Bucket> standardBuckets = new ConcurrentHashMap<>();
    private final Map<String, Bucket> sensitiveBuckets = new ConcurrentHashMap<>();

    // Standard limit: 100 requests per minute
    private final Bandwidth standardLimit = Bandwidth.builder()
            .capacity(100)
            .refillIntervally(100, Duration.ofMinutes(1))
            .build();

    // Sensitive limit: 5 requests per minute (applies to login, register, and costly API usage)
    private final Bandwidth sensitiveLimit = Bandwidth.builder()
            .capacity(5)
            .refillIntervally(5, Duration.ofMinutes(1))
            .build();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        
        // Skip rate limiting for static resources (if any) or non-API calls
        if (!requestURI.startsWith("/api/")) {
            filterChain.doFilter(request, response);
            return;
        }

        boolean isSensitive = isSensitiveEndpoint(requestURI);
        String clientIdentifier = resolveClientIdentifier(request);

        // Separate token buckets prevent bypassing between standard and sensitive routes
        Bucket bucket;
        if (isSensitive) {
            bucket = sensitiveBuckets.computeIfAbsent(clientIdentifier, k -> Bucket.builder().addLimit(sensitiveLimit).build());
        } else {
            bucket = standardBuckets.computeIfAbsent(clientIdentifier, k -> Bucket.builder().addLimit(standardLimit).build());
        }

        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Too many requests. Please try again later.\"}");
        }
    }

    private boolean isSensitiveEndpoint(String uri) {
        return uri.startsWith("/api/auth/login") ||
               uri.startsWith("/api/auth/register") ||
               uri.startsWith("/api/auth/google") ||
               uri.startsWith("/api/chat"); // assuming chat implies heavy AI API usage
    }

    private String resolveClientIdentifier(HttpServletRequest request) {
        // Use user ID (email/username) if authenticated
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser")) {
            return auth.getName();
        }

        // Fallback to IP Address
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip;
    }
}