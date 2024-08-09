package io.jahidem.collectr.repository;

import io.jahidem.collectr.model.Collection;
import io.jahidem.collectr.model.ItemTemplate;
import io.jahidem.collectr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CollectionRepository extends JpaRepository<Collection, UUID> {
    List<Collection> findAllByUser(User user);
}
