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
public class ItemField {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String fieldName;
    @Enumerated(EnumType.STRING)
    private ItemFieldType itemFieldType;

    private Integer integerField;
    private String stringField;
    private String multilineStringField;
    private Boolean booleanField;
    @OneToOne(
            mappedBy = "itemField",
            cascade = CascadeType.ALL
    )
    private SelectField selectField;

    @ManyToOne
    @JoinColumn(
            name = "item_id"
    )
    private Item item;

    @ManyToOne
    @JoinColumn(
            name = "item_template_id"
    )
    private ItemTemplate itemTemplate;

}
