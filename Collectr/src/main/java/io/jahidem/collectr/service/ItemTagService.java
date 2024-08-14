package io.jahidem.collectr.service;

import io.jahidem.collectr.model.ItemTag;
import io.jahidem.collectr.repository.ItemTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemTagService {
    private final ItemTagRepository itemTagRepository;

    public List<ItemTag> findAll() {
        return  itemTagRepository.findAllByOrderByNameAsc();
    }
    public void save(ItemTag itemTag) {
        itemTagRepository.save(itemTag);
    }
}
