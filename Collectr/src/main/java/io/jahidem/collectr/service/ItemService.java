package io.jahidem.collectr.service;

import io.jahidem.collectr.model.Item;
import io.jahidem.collectr.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    public List<Item> findAllByCollectionId(UUID collectionId) {
        return itemRepository.findAllByCollectionId(collectionId);
    }
}
