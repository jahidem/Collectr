package io.jahidem.collectr.service;

import io.jahidem.collectr.dto.CommentDto;
import io.jahidem.collectr.dto.ItemResponseDto;
import io.jahidem.collectr.dto.TagDto;
import io.jahidem.collectr.dto.UserDto;
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
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchService {
    private final EntityManager entityManager;

    public Page<ItemResponseDto> search(String search, int page, int size) {
        SearchSession searchSession = Search.session(entityManager);

        SearchResult<Item> result = searchSession.search(Item.class)
                .where(f -> f.match()
                        .fields("name",
                                "collection.title", "collection.description", "collection.catagory.name",
                                "itemTags.name",
                                "comments.value")
                        .matching(search).fuzzy(search.length() > 3 ? 1 : 0))
                .fetch(page * size, size);

        List<ItemResponseDto> itemResponseDtos = result.hits().stream().map(
                item -> ItemResponseDto.builder()
                        .id(item.getId())
                        .name(item.getName())
                        .itemTags(item.getItemTags().stream().map(
                                itemTag -> TagDto.builder()
                                        .id(itemTag.getId())
                                        .name(itemTag.getName())
                                        .build()
                        ).collect(Collectors.toList()))
                        .likes(item.getLikes())
                        .user(UserDto.builder()
                                .id(item.getCollection().getUser().getId())
                                .email(item.getCollection().getUser().getEmail())
                                .build())
                        .comments(item.getComments().stream().map(
                                comment -> CommentDto.builder()
                                        .id(comment.getId())
                                        .value(comment.getValue())
                                        .user(UserDto.builder()
                                                .id(comment.getUser().getId())
                                                .email(comment.getUser().getEmail())
                                                .build())
                                        .build()
                        ).collect(Collectors.toList()))
                        .build()
        ).collect(Collectors.toList());

        long totalHitCount = result.total().hitCount();
        Pageable paging = PageRequest.of(page, size);
        return new PageImpl<>(itemResponseDtos, paging, totalHitCount);

    }
}
