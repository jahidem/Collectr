package io.jahidem.collectr.dto;

import io.jahidem.collectr.model.ItemField;
import io.jahidem.collectr.model.Like;
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
public class ItemResponseDto {
    private UUID id;
    private String name;

    private List<ItemField> itemFields;

    private List<TagDto> itemTags;

    private List<Like> likes;

    private List<CommentDto> comments;
}
