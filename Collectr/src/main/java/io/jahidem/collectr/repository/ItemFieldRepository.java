package io.jahidem.collectr.repository;

import io.jahidem.collectr.model.ItemField;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ItemFieldRepository extends JpaRepository<ItemField, UUID> {
}
