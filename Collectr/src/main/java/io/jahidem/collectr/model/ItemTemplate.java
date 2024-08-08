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
public class ItemTemplate{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToMany(
            mappedBy = "itemTemplate",
            cascade = CascadeType.ALL
    )
    private List<ItemField> itemFields;

    @OneToOne
    @JoinColumn(
            name = "collection_id"
    )
    private Collection collection;
}
