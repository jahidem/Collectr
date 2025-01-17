package io.jahidem.collectr.controller;


import io.jahidem.collectr.dto.ItemDto;
import io.jahidem.collectr.dto.ItemResponseDto;
import io.jahidem.collectr.dto.LatestItemDto;
import io.jahidem.collectr.service.ItemService;
import io.jahidem.collectr.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    private final SearchService searchService;

    @GetMapping("/collection/{collectionId}")
    @ResponseStatus(code = HttpStatus.OK)
    public List<ItemResponseDto> getItemsByCollectionId(@PathVariable("collectionId") UUID collectionId) {
        return itemService.findAllByCollectionId(collectionId);
    }

    @GetMapping("/search")
    @ResponseStatus(code = HttpStatus.OK)
    public Page<ItemResponseDto> searchItem(@RequestParam String search,
                                            @RequestParam Integer page,
                                            @RequestParam Integer size) {
        return searchService.search(search, page, size);

    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public List<LatestItemDto> getItemsByCollectionId() {
        return itemService.findLatest();
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createItem(@RequestBody ItemDto item) {
        itemService.createItem(item);
    }

    @DeleteMapping("/item/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteItem(@PathVariable("id") UUID id) {
        itemService.deleteById(id);
    }

    @GetMapping("/item/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ItemResponseDto getItem(@PathVariable("id") UUID id) {
        return itemService.getItem(id);
    }

}


