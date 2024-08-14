package io.jahidem.collectr.service;

import io.jahidem.collectr.model.Like;
import io.jahidem.collectr.repository.AppUserRepository;
import io.jahidem.collectr.repository.ItemRepository;
import io.jahidem.collectr.repository.LikeRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final AppUserRepository appUserRepository;
    private final ItemRepository itemRepository;

    public void addLike(UUID userId, UUID itemId) {
        likeRepository.save(Like.builder()
                        .user(appUserRepository.findById(userId).get())
                        .item(itemRepository.findById(itemId).get())
                .build());
    }

    public void deleteLike(UUID id) {
        likeRepository.deleteById(id);
    }
}
