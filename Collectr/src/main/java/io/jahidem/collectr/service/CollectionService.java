package io.jahidem.collectr.service;

import io.jahidem.collectr.dto.CreateCollectionRequest;
import io.jahidem.collectr.dto.ItemFieldDto;
import io.jahidem.collectr.model.Collection;
import io.jahidem.collectr.model.ItemField;
import io.jahidem.collectr.model.ItemFieldType;
import io.jahidem.collectr.model.ItemTemplate;
import io.jahidem.collectr.repository.CollectionRepository;
import io.jahidem.collectr.repository.ItemFieldRepository;
import io.jahidem.collectr.repository.ItemTemplateRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CollectionService {
    private final ItemFieldRepository itemFieldRepository;
    private final CollectionRepository collectionRepository;
    private final ItemTemplateRepository itemTemplateRepository;

    public Collection addCollection(CreateCollectionRequest createCollectionRequest) {

        List<ItemField> itemFields = new ArrayList<>();
        for( ItemFieldDto itemTemplateDto: createCollectionRequest.getItemFields()){
            itemFields.add(ItemField.builder()
                            .fieldName(itemTemplateDto.getFieldName())
                            .itemFieldType(ItemFieldType.valueOf(itemTemplateDto.getItemFieldType()))
                            .build());
        }
        itemFields = itemFieldRepository.saveAll(itemFields);

        ItemTemplate itemTemplate = ItemTemplate.builder()
                .itemFields(itemFields)
                .build();
        itemTemplate = itemTemplateRepository.save(itemTemplate);

        Collection collection = Collection.builder()
                .title(createCollectionRequest.getTitle())
                .description(createCollectionRequest.getDescription())
                .imageId(createCollectionRequest.getImageId())
                .itemTemplate(itemTemplate)
                .itemTemplate(itemTemplate)
                .build();

        return  collection;
}

}