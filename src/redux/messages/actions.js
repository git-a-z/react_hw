export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';
export const DELETE_CHAT_MESSAGES = "CHATS::DELETE_CHAT_MESSAGES";

export const addMessage = (chatId, text, author) => ({
    type: ADD_MESSAGE,
    chatId,
    text,
    author
});

export const deleteChatMessages = (chatId) => ({
    type: DELETE_CHAT_MESSAGES,
    chatId
});
