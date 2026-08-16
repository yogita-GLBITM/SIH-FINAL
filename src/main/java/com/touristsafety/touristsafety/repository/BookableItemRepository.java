package com.touristsafety.touristsafety.repository;

import com.touristsafety.touristsafety.entity.BookableItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookableItemRepository extends JpaRepository<BookableItem, Long> {
    List<BookableItem> findByDestinationId(Long destinationId);
}