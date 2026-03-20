package com.innerroot.repository;

import com.innerroot.model.MoodEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoodEntryRepository extends JpaRepository<MoodEntry, String> {
    List<MoodEntry> findByUserOrderByCreatedAtDesc(com.innerroot.model.User user);

    List<MoodEntry> findByUserIdOrderByCreatedAtDesc(String userId);
}
