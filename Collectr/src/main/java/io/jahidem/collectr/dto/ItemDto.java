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
public class ItemDto {
    private String name;
    private List<TagDto> tags;
    private List<ItemFieldObjDto> itemFields;
    private UUID collectionId;

}


