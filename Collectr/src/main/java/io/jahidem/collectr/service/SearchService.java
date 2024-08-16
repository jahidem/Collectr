package io.jahidem.collectr.service;

import io.jahidem.collectr.model.Item;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchService {
    private final EntityManager entityManager;

    public List<Item> search(String search, int page, int size) {
        SearchSession searchSession = Search.session( entityManager );

        SearchResult<Item> result = searchSession.search( Item.class )
                .where( f -> f.match()
                        .fields( "name",
                                "collection.title" , "collection.description", "collection.catagory.name",
                                "itemTags.name",
                                "comments.value")
                        .matching( search ).fuzzy(search.length() > 3 ? 1 : 0)  )
                .fetch( page * size , size);
        return result.hits();
    }
}
