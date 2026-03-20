package com.innerroot.service.chat;

import com.innerroot.model.ChatHistory;
import com.innerroot.repository.ChatHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatHistoryService {

    private final ChatHistoryRepository chatHistoryRepository;

    public void saveMessage(String sessionId, String sender, String content) {
        ChatHistory history = ChatHistory.builder()
                .sessionId(sessionId)
                .sender(sender)
                .content(content)
                .build();
        chatHistoryRepository.save(history);
    }

    public List<ChatHistory> getHistory(String sessionId) {
        return chatHistoryRepository.findBySessionIdOrderByTimestampAsc(sessionId);
    }
}
