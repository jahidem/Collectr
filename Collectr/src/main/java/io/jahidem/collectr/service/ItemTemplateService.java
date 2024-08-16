package io.jahidem.collectr.service;

import io.jahidem.collectr.model.ItemTemplate;
import io.jahidem.collectr.repository.ItemTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItemTemplateService {
    private final ItemTemplateRepository itemTemplateRepository;

    public ItemTemplate getItemTemplateById(UUID id) {
        return itemTemplateRepository.findById(id).orElseThrow();
    }
}
