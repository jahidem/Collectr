package io.jahidem.collectr.service;

import io.jahidem.collectr.dto.CollectionCatagoryDto;
import io.jahidem.collectr.dto.CollectionDto;
import io.jahidem.collectr.dto.CreateCollectionRequest;
import io.jahidem.collectr.dto.ItemFieldDto;
import io.jahidem.collectr.model.*;
import io.jahidem.collectr.repository.*;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CollectionService {
    private final ItemFieldRepository itemFieldRepository;
    private final CollectionRepository collectionRepository;
    private final ItemTemplateRepository itemTemplateRepository;
    private final AppUserRepository appUserRepository;
    private final CollectionCatagoryRepository  collectionCatagoryRepository;

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
        itemFieldRepository.saveAll(itemFields);


        User user = appUserRepository.findByEmail(email).orElseThrow();
        Collection collection = Collection.builder()
                .user(user)
                .title(createCollectionRequest.getTitle())
                .description(createCollectionRequest.getDescription())
                .catagory(collectionCatagoryRepository
                        .findById(createCollectionRequest
                                .getCollectionCatagoryId()).orElse(null))
                .imageId(createCollectionRequest.getImageId())
                .build();
        collectionRepository.save(collection);
        itemTemplate.setCollection(collection);
        itemTemplateRepository.save(itemTemplate);
        return  collection;
}
    public List<CollectionDto> findTopByItemCount(){
        List<Collection> collections = collectionRepository.findTopByItemCount();
        collections = collections.subList(0, Math.min(5, collections.size()));
        return collections.stream().map(
            collection -> CollectionDto.builder()
                    .title(collection.getTitle())
                    .description(collection.getDescription())
                    .id(collection.getId())
                    .imageId(collection.getImageId())
                    .catagory(
                            CollectionCatagoryDto.builder()
                                    .name(collection.getCatagory().getName())
                                    .build())
                    .build()
        ).collect(Collectors.toList());
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

    public Collection getCollection(UUID id) {
        return collectionRepository.findById(id).orElseThrow();
    }
}