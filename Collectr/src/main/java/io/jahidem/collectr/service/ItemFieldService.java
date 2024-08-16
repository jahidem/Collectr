package io.jahidem.collectr.service;

import io.jahidem.collectr.repository.ItemFieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemFieldService {
    private final ItemFieldRepository itemFieldRepository;


}
