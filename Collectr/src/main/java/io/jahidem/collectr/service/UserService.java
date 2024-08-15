package io.jahidem.collectr.service;

import io.jahidem.collectr.model.Role;
import io.jahidem.collectr.model.User;
import io.jahidem.collectr.repository.AppUserRepository;
import io.jahidem.collectr.repository.CollectionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final AppUserRepository appUserRepository;
    private final CollectionRepository collectionRepository;

    public User getUser( UUID userId){
        return  appUserRepository.findById(userId).orElseThrow();
    }

    public List<User> getUsers(){
        return appUserRepository.findAll();
    }

    public void deleteAllById(List<UUID> userIds) {
        for(User user : getUsers())
            collectionRepository.deleteAllByUser(user);
        appUserRepository.deleteAllById(userIds);
    }

    public void makeAllAdmin(Principal principal, List<UUID> userIds) {
        User user = appUserRepository.findByEmail(principal.getName()).get();
        if(user.getRole() == Role.ADMIN) {
            for(UUID userId : userIds) {
            User currUser = appUserRepository.findById(userId).get();
            currUser.setRole(Role.ADMIN);
            appUserRepository.save(currUser);
            }
        }
    }
    public void makeAllUser(Principal principal, List<UUID> userIds) {
        User user = appUserRepository.findByEmail(principal.getName()).get();
        if(user.getRole() == Role.ADMIN)
        {
            for(UUID userId : userIds) {
            User currUser = appUserRepository.findById(userId).get();
            currUser.setRole(Role.USER);
            appUserRepository.save(currUser);}
        }
    }

    public void blockAllUser(Principal principal, List<UUID> userIds) {
        User adminUser = appUserRepository.findByEmail(principal.getName()).get();
        if(adminUser.getRole() == Role.ADMIN) {
            appUserRepository.saveAll(
                    userIds.stream().map(
                            id -> {
                                User user = appUserRepository.findById(id).get();
                                user.setEnabled(false);
                                return user;
                            }
                    ).collect(Collectors.toList())
            );
        }
    }

    public void unblockAllUser(Principal principal, List<UUID> userIds) {
        User adminUser = appUserRepository.findByEmail(principal.getName()).get();
        if(adminUser.getRole() == Role.ADMIN) {
            appUserRepository.saveAll(
                    userIds.stream().map(
                            id -> {
                                User user = appUserRepository.findById(id).get();
                                user.setEnabled(true);
                                return user;
                            }
                    ).collect(Collectors.toList())
            );
        }
    }
}
