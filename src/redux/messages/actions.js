import { AUTHORS } from '../../components/Message/Authors';

export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';
export const DELETE_CHAT_MESSAGES = 'CHATS::DELETE_CHAT_MESSAGES';

export const addMessage = (chatId, text, author) => ({
    type: ADD_MESSAGE,
    chatId,
    text,
    author
});

export const addMessageWithMiddleware = (chatId, text, author) => (dispatch, getState) => {
    dispatch(addMessage(chatId, text, author));

    if (author !== AUTHORS.BOT && author !== AUTHORS.ME) {
        setTimeout(() => dispatch(addMessage(chatId,
            `Message from BOT: ${author} wrote something to you!`, AUTHORS.BOT)), 1000);
    }
};

export const deleteChatMessages = (chatId) => ({
    type: DELETE_CHAT_MESSAGES,
    chatId
});
