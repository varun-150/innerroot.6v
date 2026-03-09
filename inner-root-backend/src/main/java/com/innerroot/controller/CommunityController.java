package com.innerroot.controller;

import com.innerroot.model.CommunityPost;
import com.innerroot.model.User;
import com.innerroot.repository.CommunityPostRepository;
import com.innerroot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import com.innerroot.dto.CommunityPostRequest;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityPostRepository postRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/posts")
    public ResponseEntity<List<CommunityPost>> getAllPosts() {
        return ResponseEntity.ok(postRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<CommunityPost> getPostById(@PathVariable String id) {
        return postRepository.findById(id).map(post -> {
            post.setViews(post.getViews() + 1);
            postRepository.save(post);
            return ResponseEntity.ok(post);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/posts")
    public ResponseEntity<?> createPost(@Valid @RequestBody CommunityPostRequest body,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "You must be logged in to post"));
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        CommunityPost post = CommunityPost.builder()
                .title(body.getTitle())
                .content(body.getContent())
                .author(user.getName())
                .user(user)
                .build();

        CommunityPost savedPost = postRepository.save(post);
        messagingTemplate.convertAndSend("/topic/community/posts", savedPost);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
    }

    @PostMapping("/posts/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable String id) {
        return postRepository.findById(id).map(post -> {
            post.setLikes(post.getLikes() + 1);
            CommunityPost savedPost = postRepository.save(post);
            messagingTemplate.convertAndSend("/topic/community/likes", savedPost);
            return ResponseEntity.ok(savedPost);
        }).orElse(ResponseEntity.notFound().build());
    }
}
