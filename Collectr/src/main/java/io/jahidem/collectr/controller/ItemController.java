package io.jahidem.collectr.controller;


import io.jahidem.collectr.model.Item;
import io.jahidem.collectr.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @GetMapping("/collection/{collectionId}")
    @ResponseStatus(code= HttpStatus.OK)
    public List<Item> getItemsByCollectionId(@PathVariable("collectionId") UUID collectionId) {
        return itemService.findAllByCollectionId(collectionId);
    }

}
