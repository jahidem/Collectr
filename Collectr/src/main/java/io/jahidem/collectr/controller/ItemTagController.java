package io.jahidem.collectr.controller;

import io.jahidem.collectr.model.ItemTag;
import io.jahidem.collectr.service.ItemTagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/itemTags")
@RequiredArgsConstructor
public class ItemTagController {
    private final ItemTagService itemTagService;

    @GetMapping("")
    @ResponseStatus(code = HttpStatus.OK)
    public List<ItemTag> getItemTags() {
        return itemTagService.findAll();
    }
}
