package com.innerroot.repository;

import com.innerroot.model.JapaLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JapaLogRepository extends JpaRepository<JapaLog, String> {
    List<JapaLog> findByUserIdOrderByCreatedAtDesc(String userId);
    List<JapaLog> findByUserId(String userId);
}
