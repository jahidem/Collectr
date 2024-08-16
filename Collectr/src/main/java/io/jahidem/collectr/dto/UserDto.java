package io.jahidem.collectr.dto;

import io.jahidem.collectr.model.Role;
import io.jahidem.collectr.model.UserSetting;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private UUID id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Role role;
    private UserSetting setting;

}
