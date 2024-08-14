package io.jahidem.collectr.dto;

import io.jahidem.collectr.model.Collection;
import io.jahidem.collectr.model.ItemField;
import io.jahidem.collectr.model.ItemTag;
import io.jahidem.collectr.model.Like;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemResponseDto {
    private UUID id;
    private String name;

    private List<ItemField> itemFields;

    private List<TagDto> itemTags;

    private List<Like> likes;
}
