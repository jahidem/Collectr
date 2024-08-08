package io.jahidem.collectr.repository;

import io.jahidem.collectr.model.ItemTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ItemTemplateRepository  extends JpaRepository<ItemTemplate, UUID> {
}
