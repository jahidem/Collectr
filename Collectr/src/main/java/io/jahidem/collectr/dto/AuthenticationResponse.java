package io.jahidem.collectr.dto;

import io.jahidem.collectr.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationResponse{
        private String token;
        private User user;
}
