package io.jahidem.collectr.service;

import io.jahidem.collectr.dto.CreateCollectionRequest;
import io.jahidem.collectr.dto.ItemFieldDto;
import io.jahidem.collectr.model.*;
import io.jahidem.collectr.repository.AppUserRepository;
import io.jahidem.collectr.repository.CollectionRepository;
import io.jahidem.collectr.repository.ItemFieldRepository;
import io.jahidem.collectr.repository.ItemTemplateRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CollectionService {
    private final ItemFieldRepository itemFieldRepository;
    private final CollectionRepository collectionRepository;
    private final ItemTemplateRepository itemTemplateRepository;
    private final AppUserRepository appUserRepository;

    public Collection addCollection(CreateCollectionRequest createCollectionRequest, String email) {
        ItemTemplate itemTemplate = new ItemTemplate();
        itemTemplate = itemTemplateRepository.save(itemTemplate);

        List<ItemField> itemFields = new ArrayList<>();
        for( ItemFieldDto itemTemplateDto: createCollectionRequest.getItemFields()){
            itemFields.add(ItemField.builder()
                            .itemTemplate(itemTemplate)
                            .fieldName(itemTemplateDto.getFieldName())
                            .itemFieldType(ItemFieldType.valueOf(itemTemplateDto.getItemFieldType()))
                            .build());
        }
        itemFields = itemFieldRepository.saveAll(itemFields);


        User user = appUserRepository.findByEmail(email).orElseThrow();
        Collection collection = Collection.builder()
                .user(user)
                .title(createCollectionRequest.getTitle())
                .description(createCollectionRequest.getDescription())
                .imageId(createCollectionRequest.getImageId())
                .itemTemplate(itemTemplate)
                .build();
        collectionRepository.save(collection);
        return  collection;
}

    public List<Collection> getCollections(String email) {
        User user = appUserRepository.findByEmail(email).orElseThrow();
        return collectionRepository.findAllByUser(user);
    }
    public List<Collection> getCollections(UUID id) {
        User user = appUserRepository.findById(id).orElseThrow();
        return collectionRepository.findAllByUser(user);
    }

    public void deleteCollection(UUID id) {
        collectionRepository.deleteById(id);
    }
}