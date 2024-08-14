package io.jahidem.collectr.repository;

import io.jahidem.collectr.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LikeRepository extends JpaRepository<Like, UUID> {
}
