package com.innerroot.repository;

import com.innerroot.model.CultureItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CultureItemRepository extends JpaRepository<CultureItem, String> {
    List<CultureItem> findByCategory(String category);

    List<CultureItem> findByTitleContainingIgnoreCase(String title);
}
