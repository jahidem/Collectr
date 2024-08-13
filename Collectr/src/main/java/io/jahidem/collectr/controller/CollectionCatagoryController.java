package io.jahidem.collectr.controller;

import io.jahidem.collectr.model.CollectionCatagory;
import io.jahidem.collectr.service.CollectionCatagoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("api/collectionCatagories")
public class CollectionCatagoryController {
    private final CollectionCatagoryService collectionCatagoryService;

    @GetMapping("")
    @ResponseStatus(code= HttpStatus.OK)
    public List<CollectionCatagory> getCollectionCatagories() {
        return collectionCatagoryService.getCollectionCatagories();
    }
}
