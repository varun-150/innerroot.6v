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

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityPostRepository postRepository;
    private final UserRepository userRepository;

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
    public ResponseEntity<?> createPost(@RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "You must be logged in to post"));
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        CommunityPost post = CommunityPost.builder()
                .title(body.get("title"))
                .content(body.get("content"))
                .author(user.getName())
                .user(user)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(postRepository.save(post));
    }

    @PostMapping("/posts/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable String id) {
        return postRepository.findById(id).map(post -> {
            post.setLikes(post.getLikes() + 1);
            return ResponseEntity.ok(postRepository.save(post));
        }).orElse(ResponseEntity.notFound().build());
    }
}
