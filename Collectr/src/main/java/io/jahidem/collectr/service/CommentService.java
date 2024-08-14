package io.jahidem.collectr.service;

import io.jahidem.collectr.dto.CommentRequest;
import io.jahidem.collectr.model.Comment;
import io.jahidem.collectr.repository.AppUserRepository;
import io.jahidem.collectr.repository.CommentRepository;
import io.jahidem.collectr.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {
    public final CommentRepository commentRepository;
    private final AppUserRepository appUserRepository;
    private final ItemRepository itemRepository;

    public void save(CommentRequest comment) {
        commentRepository.save(Comment.builder()
                        .value(comment.getComment())
                        .user(appUserRepository.findById(comment.getUserId()).get())
                        .item(itemRepository.findById(comment.getItemId()).get())
                .build());
    }
}
