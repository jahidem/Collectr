package io.jahidem.collectr.controller;

import io.jahidem.collectr.dto.CommentRequest;
import io.jahidem.collectr.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/comments")
@CrossOrigin
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void save(@RequestBody CommentRequest comment) {
        commentService.save(comment);

    }
}
