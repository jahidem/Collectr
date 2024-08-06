package io.jahidem.collectr.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String tags;

    @OneToMany(
            mappedBy = "item"
    )
    private List<ItemField> itemFields;
    @ManyToOne
    @JoinColumn(
            name = "collection_id"
    )
    private Collection collection;
}
