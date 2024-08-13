package io.jahidem.collectr.repository;

import io.jahidem.collectr.model.CollectionCatagory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CollectionCatagoryRepository extends JpaRepository<CollectionCatagory, UUID> {
    public List<CollectionCatagory> findAllByOrderByNameAsc();
}
