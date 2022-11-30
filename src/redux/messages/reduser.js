import * as actions from './actions';
import { AUTHORS } from '../../components/Message/Authors';

const initState = {
    // to be stored like this {[chatId]: [{id, text, author}]}
    messageList: {
        0: [
            {
                id: 0,
                text: 'Hello, hello, hello!',
                author: AUTHORS.ALICE,
            },
            {
                id: 1,
                text: 'Well, hello to you too, Alice!',
                author: AUTHORS.ME,
            },
        ],
        1: [
            {
                id: 0,
                text: 'Hi!',
                author: AUTHORS.KATE,
            },
            {
                id: 1,
                text: 'Wow! Long time no see!',
                author: AUTHORS.ME,
            },
        ]
    },
};

export const messagesReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.ADD_MESSAGE: {
            const currentList = state.messageList[action.chatId] || [];
            return {
                ...state,
                messageList: {
                    ...state.messageList,
                    [action.chatId]: [
                        ...currentList,
                        {
                            ...action,
                            id: currentList.length,
                        },
                    ],
                },
            };
        }
        case actions.DELETE_CHAT_MESSAGES:
            return {
                ...state,
                messageList: {
                    ...state.messageList,
                    [action.chatId]: [],
                },
            }
        default: return state;
    }
};
