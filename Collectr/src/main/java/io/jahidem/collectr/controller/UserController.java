package io.jahidem.collectr.controller;

import io.jahidem.collectr.model.User;
import io.jahidem.collectr.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private  final AuthenticationService authenticationService;

    @PostMapping("/auth")
    @ResponseStatus(code = HttpStatus.OK)
    public User getAuthUser(Principal principal) {
        return  authenticationService.getAuth(principal.getName());
    }

}
