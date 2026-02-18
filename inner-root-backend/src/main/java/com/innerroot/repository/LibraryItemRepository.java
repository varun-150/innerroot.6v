package com.innerroot.repository;

import com.innerroot.model.LibraryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LibraryItemRepository extends JpaRepository<LibraryItem, String> {
    List<LibraryItem> findByCategory(String category);
}
