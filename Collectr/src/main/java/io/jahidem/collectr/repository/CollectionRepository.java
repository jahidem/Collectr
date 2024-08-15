package io.jahidem.collectr.repository;

import io.jahidem.collectr.model.Collection;
import io.jahidem.collectr.model.ItemTemplate;
import io.jahidem.collectr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface CollectionRepository extends JpaRepository<Collection, UUID> {
    List<Collection> findAllByUser(User user);

    @Query("SELECT c FROM Collection c WHERE (SELECT COUNT(i) FROM Item i WHERE i.collection = c) >= 0 ORDER BY (SELECT COUNT(i) FROM Item i WHERE i.collection = c) DESC")
    List<Collection> findTopByItemCount();

    void deleteAllByUser(User user);
}