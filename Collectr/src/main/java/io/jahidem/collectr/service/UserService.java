package io.jahidem.collectr.service;

import io.jahidem.collectr.model.Role;
import io.jahidem.collectr.model.User;
import io.jahidem.collectr.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AppUserRepository appUserRepository;

    public User getUser( UUID userId){
        return  appUserRepository.findById(userId).orElseThrow();
    }

    public List<User> getUsers(){
        return appUserRepository.findAll();
    }

    public void deleteById(UUID userId) {
        appUserRepository.deleteById(userId);
    }

    public void makeAdmin(Principal principal, UUID userId) {
        User user = appUserRepository.findByEmail(principal.getName()).get();
        if(user.getRole() == Role.ADMIN)
        {
            User currUser = appUserRepository.findById(userId).get();
            currUser.setRole(Role.ADMIN);
            appUserRepository.save(currUser);
        }
    }
    public void makeUser(Principal principal, UUID userId) {
        User user = appUserRepository.findByEmail(principal.getName()).get();
        if(user.getRole() == Role.ADMIN)
        {
            User currUser = appUserRepository.findById(userId).get();
            currUser.setRole(Role.USER);
            appUserRepository.save(currUser);
        }
    }
}
