import * as actions from './actions';
import { AUTHORS } from '../../components/Message/Authors';

export const initState = {
    // to be stored like this {[chatId]: {id, name, penpal}}
    chatList: {
        0: {
            id: 0,
            name: 'Chat',
            penpal: AUTHORS.ALICE,
        },
        1: {
            id: 1,
            name: 'Chat',
            penpal: AUTHORS.KATE,
        },
    },
}

export const chatsReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.ADD_CHAT:
            return {
                ...state,
                chatList: {
                    ...state.chatList,
                    [action.id]: {
                        id: action.id,
                        name: 'Chat',
                        penpal: action.name,
                    },
                },
            }
        case actions.DELETE_CHAT:
            const newChatList = { ...state.chatList };
            delete newChatList[action.id];
            return {
                ...state,
                chatList: {
                    ...newChatList,
                },
            }
        default: return state;
    }
}
