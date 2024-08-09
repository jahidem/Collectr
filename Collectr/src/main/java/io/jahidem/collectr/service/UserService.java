package io.jahidem.collectr.service;

import io.jahidem.collectr.model.User;
import io.jahidem.collectr.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AppUserRepository appUserRepository;

    public User getUser( UUID userId){
        return  appUserRepository.findById(userId).orElseThrow();
    }
}
