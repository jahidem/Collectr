package io.jahidem.collectr.model;

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
public class SelectField {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Integer selected;
    private String selectFieldOptions;

    @OneToOne
    @JoinColumn(
            name = "item_field_id"
    )
    private ItemField itemField;

}
