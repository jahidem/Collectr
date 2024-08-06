package io.jahidem.collectr.repository;

import io.jahidem.collectr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AppUserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
}
