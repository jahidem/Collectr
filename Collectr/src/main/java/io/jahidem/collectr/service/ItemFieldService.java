package io.jahidem.collectr.service;

import io.jahidem.collectr.model.ItemField;
import io.jahidem.collectr.repository.ItemFieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemFieldService {
    private final ItemFieldRepository itemFieldRepository;


}
