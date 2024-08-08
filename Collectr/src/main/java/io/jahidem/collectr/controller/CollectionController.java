package io.jahidem.collectr.controller;

import io.jahidem.collectr.dto.CreateCollectionRequest;
import io.jahidem.collectr.dto.ItemFieldDto;
import io.jahidem.collectr.model.Collection;
import io.jahidem.collectr.model.ItemField;
import io.jahidem.collectr.model.ItemFieldType;
import io.jahidem.collectr.model.ItemTemplate;
import io.jahidem.collectr.service.AuthenticationService;
import io.jahidem.collectr.service.CollectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/collections")
@RequiredArgsConstructor
public class CollectionController {
    private  final CollectionService collectionService;

    @PostMapping("")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Collection addCollection(@RequestBody CreateCollectionRequest createCollectionRequest) {
        return collectionService.addCollection(createCollectionRequest);

    }

}
