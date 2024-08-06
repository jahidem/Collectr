package io.jahidem.collectr.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSetting {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String theme;
    @OneToOne
    @JoinColumn(
            name = "user_id"
    )
    private User user;
}
