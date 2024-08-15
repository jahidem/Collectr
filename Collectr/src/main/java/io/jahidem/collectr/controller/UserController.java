package io.jahidem.collectr.controller;

import io.jahidem.collectr.model.Collection;
import io.jahidem.collectr.model.User;
import io.jahidem.collectr.service.AuthenticationService;
import io.jahidem.collectr.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private  final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/auth")
    @ResponseStatus(code = HttpStatus.OK)
    public User getAuthUser(Principal principal) {
        return  authenticationService.getAuth(principal.getName());
    }

    @GetMapping("/user/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public User getUser(@PathVariable("userId") UUID userId) {
        return userService.getUser(userId);
    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @PostMapping("/user/delete")
    @ResponseStatus(code=HttpStatus.OK)
    public void deleteUser(@RequestBody List<UUID> userIds) {
        userService.deleteAllById(userIds);
    }

    @PostMapping("/role/admin")
    @ResponseStatus(code=HttpStatus.OK)
    public void makeAdmin(@RequestBody List<UUID> userIds, Principal principal) {
            userService.makeAllAdmin(principal, userIds);
    }

    @PostMapping("/role/user")
    @ResponseStatus(code=HttpStatus.OK)
    public void makeUser(@RequestBody List<UUID> userIds, Principal principal) {
        userService.makeAllUser(principal, userIds);
    }

    @PostMapping("/user/block")
    @ResponseStatus(code=HttpStatus.OK)
    public void blockUser(@RequestBody List<UUID> userIds, Principal principal) {
        userService.blockAllUser(principal, userIds);
    }

    @PostMapping("/user/unblock")
    @ResponseStatus(code=HttpStatus.OK)
    public void unblockUser(@RequestBody List<UUID> userIds, Principal principal) {
        userService.unblockAllUser(principal, userIds);
    }
}
