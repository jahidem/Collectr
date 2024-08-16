package io.jahidem.collectr.repository;

import io.jahidem.collectr.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    public List<Item> findAllByCollectionId(UUID collectionId);

    public List<Item> findAllByOrderByCreatedAtDesc();
}

