package io.jahidem.collectr.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.IndexedEmbedded;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class Collection {

    @JsonIgnore
    @OneToMany(mappedBy = "collection",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    List<Item> items;
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @FullTextField(analyzer = "english")
    private String title;
    @FullTextField(analyzer = "english")
    private String description;
    private String imageId;
    @OneToOne(
            mappedBy = "collection",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private ItemTemplate itemTemplate;

    @IndexedEmbedded(includeDepth = 1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "catagory_id"
    )
    private CollectionCatagory catagory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @CreationTimestamp
    @Column(
            updatable = false
    )
    private LocalDateTime createdAt;

}
