package com.innerroot.repository;

import com.innerroot.model.WellnessContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WellnessContentRepository extends JpaRepository<WellnessContent, String> {
    List<WellnessContent> findByType(String type);
}
