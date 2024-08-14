package io.jahidem.collectr.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jdk.jfr.Relational;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

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

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;
    private String description;
    private String imageId;


    @OneToOne(
            mappedBy = "collection",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private ItemTemplate itemTemplate;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "catagory_id"
    )
    private CollectionCatagory catagory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "collection",
    cascade = CascadeType.ALL,
    fetch = FetchType.LAZY)
    List<Item> items;

    @CreationTimestamp
    @Column(
            updatable = false
    )
    private LocalDateTime createdAt;

}
