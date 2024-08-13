package io.jahidem.collectr.controller;

import io.jahidem.collectr.model.ItemTemplate;
import io.jahidem.collectr.service.ItemTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/itemTemplates")
@RequiredArgsConstructor
public class ItemTemplateController {
    private final ItemTemplateService itemTemplateService;

    @GetMapping("/{templateId}")
    @ResponseStatus(code= HttpStatus.OK)
    public ItemTemplate getItemTemplate(@PathVariable UUID templateId) {
        return itemTemplateService.getItemTemplateById(templateId);
    }
}
