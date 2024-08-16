package io.jahidem.collectr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateCollectionRequest {
    List<ItemFieldDto> itemFields;
    private String title;
    private String description;
    private String imageId;
    private UUID collectionCatagoryId;
}



