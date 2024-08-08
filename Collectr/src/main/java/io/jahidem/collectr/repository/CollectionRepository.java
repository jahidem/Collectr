package io.jahidem.collectr.repository;

import io.jahidem.collectr.model.Collection;
import io.jahidem.collectr.model.ItemTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CollectionRepository extends JpaRepository<Collection, UUID> {
}
