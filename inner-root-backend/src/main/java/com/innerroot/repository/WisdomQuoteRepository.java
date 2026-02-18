package com.innerroot.repository;

import com.innerroot.model.WisdomQuote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WisdomQuoteRepository extends JpaRepository<WisdomQuote, String> {
    List<WisdomQuote> findByTheme(String theme);

    // Note: findRandom() will need custom implementation or manual logic in
    // Service/Controller
}
