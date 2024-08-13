package io.jahidem.collectr.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private SelectField selectField;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "item_id"
    )
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "item_template_id"
    )
    private ItemTemplate itemTemplate;

}
