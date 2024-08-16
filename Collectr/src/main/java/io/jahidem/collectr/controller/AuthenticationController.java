package io.jahidem.collectr.controller;

import io.jahidem.collectr.dto.AuthenticationResponse;
import io.jahidem.collectr.dto.LoginRequest;
import io.jahidem.collectr.dto.RegisterRequest;
import io.jahidem.collectr.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AuthenticationResponse register(@RequestBody RegisterRequest registerRequest) {
        return authenticationService.register(registerRequest);
    }

    @PostMapping("/login")
    @ResponseStatus(code = HttpStatus.OK)
    public AuthenticationResponse login(@RequestBody LoginRequest loginRequest) {
        return authenticationService.login(loginRequest);
    }
}
