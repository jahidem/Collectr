package io.jahidem.collectr.service;

import io.jahidem.collectr.model.User;
import io.jahidem.collectr.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AppUserRepository userRepository;
     public User loadByEmail(String email) {
         return userRepository.findByEmail(email).get();
     }
}
