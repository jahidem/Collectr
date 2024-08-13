package io.jahidem.collectr;

import io.jahidem.collectr.model.CollectionCatagory;
import io.jahidem.collectr.service.CollectionCatagoryService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class CollectrApplication {

    public static void main(String[] args) {
        SpringApplication.run(CollectrApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(
            CollectionCatagoryService service
    ) {
        return args -> {
            try {
                String[] categoriesArray = {
                        "Art and Antiques",
                        "Collectible Objects",
                        "Coins and Currency",
                        "Militaria",
                        "Stamps and Postcards",
                        "Comics and Graphic Novels",
                        "Gaming",
                        "Movies and Television",
                        "Music",
                        "Toys and Action Figures",
                        "Sports",
                        "Vehicles",
                        "Nature and Science",
                        "Books and Literature",
                        "Fashion",
                        "Advertising",
                        "Food and Drink",
                        "Travel",
                        "Technology",
                        "Historical Artifacts"
                };                if(service.getCollectionCatagories().isEmpty()){
                    for(String category : categoriesArray) {
                        CollectionCatagory collectionCatagory = CollectionCatagory.builder()
                                .name(category)
                                .build();
                        service.saveCollectionCatagory(collectionCatagory);
                    }

                }
            } catch (Exception e) {
                System.out.println("\n" + e.getMessage());
            }
        };
    }
}