package io.jahidem.collectr.model;

import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.security.Permission;
import java.util.List;

public enum Role {
    USER, ADMIN;
}
