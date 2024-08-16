package io.jahidem.collectr.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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
