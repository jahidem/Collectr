package io.jahidem.collectr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateCollectionRequest {
    private String title;
    private String description;
    private String imageId;

    List<ItemFieldDto> itemFields;
}



