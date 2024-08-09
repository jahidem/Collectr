package io.jahidem.collectr.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jdk.jfr.Relational;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;
    private String description;
    private String imageId;


    @OneToOne(
            mappedBy = "collection",
            cascade = CascadeType.ALL
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

}
