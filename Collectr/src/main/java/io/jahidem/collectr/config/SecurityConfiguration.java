package io.jahidem.collectr.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static io.jahidem.collectr.model.Role.ADMIN;
import static io.jahidem.collectr.model.Role.USER;
import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;


import io.jahidem.collectr.model.Role;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {


    private final  JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authorizeHttpRequests(auth ->
                    auth
                            .requestMatchers("/auth/**").permitAll()
                            .requestMatchers("/admin/**").hasRole(ADMIN.name())
                                .requestMatchers(POST, "/user/**").hasAnyRole(ADMIN.name(), USER.name())
                                .requestMatchers(PUT, "/user/**").hasAnyRole(ADMIN.name(), USER.name())
                                .requestMatchers(DELETE, "/user/**").hasAnyRole(ADMIN.name(), USER.name())
                            .anyRequest().authenticated()

                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);


        return  http.build();
    }
}
