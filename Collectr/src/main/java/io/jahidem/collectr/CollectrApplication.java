package io.jahidem.collectr;

import io.jahidem.collectr.config.Indexer;
import io.jahidem.collectr.dto.RegisterRequest;
import io.jahidem.collectr.model.CollectionCatagory;
import io.jahidem.collectr.model.Item;
import io.jahidem.collectr.model.ItemTag;
import io.jahidem.collectr.service.AuthenticationService;
import io.jahidem.collectr.service.CollectionCatagoryService;
import io.jahidem.collectr.service.ItemTagService;
import jakarta.persistence.EntityManager;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CollectrApplication {

    public static void main(String[] args) {
        SpringApplication.run(CollectrApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(
            CollectionCatagoryService service,
            ItemTagService tagService,
            AuthenticationService authenticationService
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
                };
                String[] tagsArray = {
                        "art", "antique", "painting", "sculpture",
                        "collectible", "rare", "vintage", "limited edition",
                        "coin", "currency", "gold", "silver",
                        "military", "war", "uniform", "medal",
                        "stamp", "postcard", "philately",
                        "comic", "graphic novel", "superhero", "manga",
                        "gaming", "video game", "console", "pc",
                        "movie", "tv", "film", "actor",
                        "music", "album", "artist", "genre",
                        "toy", "action figure", "collectible figure",
                        "sports", "football", "basketball", "baseball",
                        "vehicle", "car", "motorcycle", "airplane",
                        "nature", "science", "wildlife", "fossil",
                        "book", "literature", "fiction", "nonfiction",
                        "fashion", "clothing", "accessory", "designer",
                        "advertising", "marketing", "logo", "slogan",
                        "food", "drink", "recipe", "restaurant",
                        "travel", "destination", "tourism", "adventure",
                        "technology", "gadget", "software", "hardware",
                        "history", "artifact", "archaeology"
                };

                if (tagService.findAll().isEmpty()) {
                    for (String tag : tagsArray) {
                        ItemTag itemTag = ItemTag.builder()
                                .name(tag)
                                .build();
                        tagService.save(itemTag);
                    }

                }

                if (service.getCollectionCatagories().isEmpty()) {
                    for (String category : categoriesArray) {
                        CollectionCatagory collectionCatagory = CollectionCatagory.builder()
                                .name(category)
                                .build();
                        service.saveCollectionCatagory(collectionCatagory);
                    }

                }

                if (authenticationService.getAuth("admin@mail.com") == null) {
                    authenticationService.registerAdmin(
                            RegisterRequest.builder()
                                    .email("admin@mail.com")
                                    .firstname("Lelouch")
                                    .lastname("vi Britannia")
                                    .password("admin")
                                    .build()
                    );
                }
            } catch (Exception e) {
                System.out.println("\n" + e.getMessage());
            }



        };
    }
    @Bean
    public ApplicationRunner buildIndex(Indexer indexer) throws Exception {
        return (ApplicationArguments args) -> {
            indexer.indexPersistedData("io.jahidem.collectr.model.Item");
        };
    }
}