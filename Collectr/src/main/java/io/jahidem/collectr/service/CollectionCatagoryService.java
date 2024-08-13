package io.jahidem.collectr.service;

import io.jahidem.collectr.model.CollectionCatagory;
import io.jahidem.collectr.repository.CollectionCatagoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CollectionCatagoryService {
    private final CollectionCatagoryRepository collectionCatagoryRepository;

    public List<CollectionCatagory> getCollectionCatagories(){
        return collectionCatagoryRepository.findAllByOrderByNameAsc();
    }

    public  void saveCollectionCatagory(CollectionCatagory collectionCatagory){
        collectionCatagoryRepository.save(collectionCatagory);
    }
}
