package io.jahidem.collectr.service;

import io.jahidem.collectr.dto.*;
import io.jahidem.collectr.model.*;
import io.jahidem.collectr.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final ItemTagRepository itemTagRepository;
    private final ItemFieldRepository itemFieldRepository;
    private final CollectionRepository collectionRepository;
    private final AppUserRepository appUserRepository;

    public List<ItemResponseDto> findAllByCollectionId(UUID collectionId) {
        return itemRepository.findAllByCollectionId(collectionId).stream().map(
                item -> ItemResponseDto.builder()
                        .id(item.getId())
                        .name(item.getName())
                        .itemTags(item.getItemTags().stream().map(
                                itemTag -> TagDto.builder()
                                        .id(itemTag.getId())
                                        .name(itemTag.getName())
                                        .build()
                        ).collect(Collectors.toList()))
                        .itemFields(item.getItemFields())
                        .build()
        ).collect(Collectors.toList());
    }

    public void createItem(ItemDto itemDto) {

        List<ItemTag> itemTags = itemDto.getTags().stream()
                .map(tag -> itemTagRepository.findById(tag.getId()).orElse(null))
                .collect(Collectors.toList());

        Item item = Item.builder()
                .name(itemDto.getName())
                .itemTags(itemTags)
                .collection(collectionRepository.findById(itemDto.getCollectionId()).orElse(null))
                .build();
        final Item savedItem = itemRepository.save(item);

        List<ItemField> itemFields = itemDto.getItemFields().stream()
                .map(field -> ItemField.builder()
                        .fieldValue(field.getFieldValue())
                        .item(savedItem)
                        .build())
                .collect(Collectors.toList());

        List<ItemField> templateFields = savedItem.getCollection().getItemTemplate().getItemFields();
        for(int i=0;i<Math.min( templateFields.size(), templateFields.size());i++) {
            ItemField itemField = itemFields.get(i);
            itemField.setFieldName(templateFields.get(i).getFieldName());
            itemField.setItemFieldType(templateFields.get(i).getItemFieldType());
        }
        itemFieldRepository.saveAll(itemFields);
    }

    public void deleteById(UUID id) {
        itemRepository.deleteById(id);
    }

    public List<LatestItemDto> findLatest() {
        List<Item> items = itemRepository.findAllByOrderByCreatedAtDesc();
        return items.stream().map(item -> {
                    User user = item.getCollection().getUser();
                    Collection collection = item.getCollection();

                    return LatestItemDto.builder()
                            .id(item.getId())
                            .name(item.getName())
                            .collection(
                                    CollectionDto.builder()
                                            .id(collection.getId())
                                            .title(collection.getTitle())
                                            .build())
                            .user(
                                    UserDto.builder()
                                            .id(user.getId())
                                            .email(user.getEmail())
                                            .build()
                            )
                            .itemTags(item.getItemTags().stream().map(
                                    itemTag -> TagDto.builder()
                                            .id(itemTag.getId())
                                            .name(itemTag.getName())
                                            .build()
                            ).collect(Collectors.toList()))
                            .createdAt(item.getCreatedAt())
                            .build();
                }
        ).collect(Collectors.toList());
    }

    public ItemResponseDto getItem(UUID id) {
        Item item = itemRepository.findById(id).orElse(null);
        return ItemResponseDto.builder()
                .id(item.getId())
                .name(item.getName())
                .itemTags(item.getItemTags().stream().map(
                        itemTag -> TagDto.builder()
                                .id(itemTag.getId())
                                .name(itemTag.getName())
                                .build()
                ).collect(Collectors.toList()))
                .itemFields(item.getItemFields())
                .likes(item.getLikes())
                .build();
    }
}