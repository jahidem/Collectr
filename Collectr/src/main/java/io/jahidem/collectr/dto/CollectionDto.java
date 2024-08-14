package io.jahidem.collectr.dto;

import io.jahidem.collectr.model.CollectionCatagory;
import io.jahidem.collectr.model.ItemTemplate;
import io.jahidem.collectr.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CollectionDto {
    private UUID id;

    private String title;
    private String description;
    private String imageId;

    private ItemTemplate itemTemplate;
    private CollectionCatagoryDto catagory;
    private User user;

    List<ItemDto> items;

    private LocalDateTime createdAt;
}
