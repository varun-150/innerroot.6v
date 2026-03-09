package com.innerroot.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Simple IP-based token bucket rate limiter using Bucket4j.
 * Applies to every request and responds with 429 when limit is exceeded.
 * Configuration can be tuned by adjusting the limits below.
 */
@Component
@WebFilter(urlPatterns = "/api/*")
public class RateLimitingFilter implements Filter {
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    // Allow 100 requests per minute per IP by default
    private static final Bandwidth LIMIT = Bandwidth.builder().capacity(100)
            .refillIntervally(100, Duration.ofMinutes(1)).build();

    private Bucket createNewBucket() {
        return Bucket.builder().addLimit(LIMIT).build();
    }

    private Bucket resolveBucket(HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        return buckets.computeIfAbsent(ip, k -> createNewBucket());
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        Bucket bucket = resolveBucket(request);
        if (bucket.tryConsume(1)) {
            chain.doFilter(request, response);
        } else {
            response.setStatus(429); // 429 Too Many Requests
            response.getWriter().write("Too many requests");
        }
    }
}