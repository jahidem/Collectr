package io.jahidem.collectr.repository;

import io.jahidem.collectr.model.ItemTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ItemTagRepository extends JpaRepository<ItemTag, UUID>{
    public List<ItemTag> findAllByOrderByNameAsc();
}
