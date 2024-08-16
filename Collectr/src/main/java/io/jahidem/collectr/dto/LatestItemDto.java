package io.jahidem.collectr.dto;

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
public class LatestItemDto {
    private UUID id;
    private String name;
    private List<TagDto> itemTags;
    private CollectionDto collection;
    private UserDto user;
    private LocalDateTime createdAt;

}


