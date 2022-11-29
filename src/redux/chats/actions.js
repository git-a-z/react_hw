export const ADD_CHAT = "CHATS::ADD_CHAT";
export const DELETE_CHAT = "CHATS::DELETE_CHAT";

export const addChat = (name) => ({
    type: ADD_CHAT,
    name: name,
    id: Math.floor(Math.random() * 1000),
});

export const deleteChat = (id) => ({
    type: DELETE_CHAT,
    id: id,
});
