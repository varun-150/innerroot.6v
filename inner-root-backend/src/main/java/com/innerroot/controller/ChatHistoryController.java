package com.innerroot.controller;

import com.innerroot.model.ChatHistory;
import com.innerroot.service.chat.ChatHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ChatHistoryController {

    private final ChatHistoryService chatHistoryService;

    @GetMapping("/history/{sessionId}")
    public List<ChatHistory> getChatHistory(@PathVariable String sessionId) {
        return chatHistoryService.getHistory(sessionId);
    }
}
