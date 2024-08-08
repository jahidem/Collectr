package io.jahidem.collectr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public  class ItemFieldDto {
    private String fieldName;
    private String itemFieldType;
}