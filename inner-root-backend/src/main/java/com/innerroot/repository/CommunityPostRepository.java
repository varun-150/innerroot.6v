package com.innerroot.repository;

import com.innerroot.model.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityPostRepository extends JpaRepository<CommunityPost, String> {
    List<CommunityPost> findByAuthor(String author);

    List<CommunityPost> findByUserId(String userId);

    List<CommunityPost> findAllByOrderByCreatedAtDesc();
}
