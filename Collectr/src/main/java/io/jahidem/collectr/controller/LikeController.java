package io.jahidem.collectr.controller;

import io.jahidem.collectr.dto.LikeRequest;
import io.jahidem.collectr.model.Like;
import io.jahidem.collectr.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class LikeController {
    private final LikeService likeService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void like(@RequestBody LikeRequest like) {
        likeService.addLike(like.getUserId(), like.getItemId());
    }

    @DeleteMapping("/like/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public void unlike(@PathVariable("id") UUID id) {
        likeService.deleteLike(id);
    }
}
