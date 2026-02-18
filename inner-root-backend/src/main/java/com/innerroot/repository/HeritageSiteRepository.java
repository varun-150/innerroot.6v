package com.innerroot.repository;

import com.innerroot.model.HeritageSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeritageSiteRepository extends JpaRepository<HeritageSite, String> {
    List<HeritageSite> findByCategory(String category);

    List<HeritageSite> findByNameContainingIgnoreCase(String name);
}
