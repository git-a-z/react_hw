import * as actions from './actions';
import { AUTHORS } from '../../components/Message/Authors';

const initChats = [{
    id: 0,
    name: "Chat",
    penpal: AUTHORS.ALICE,
},
{
    id: 1,
    name: "Chat",
    penpal: AUTHORS.KATE,
}];

export const initState = {
    chatList: initChats,
}

export const chatsReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.ADD_CHAT:
            return {
                ...state,
                chatList: [
                    ...state.chatList,
                    {
                        id: state.chatList.length,
                        name: "Chat",
                        penpal: action.name,
                    },
                ],
            }
        case actions.DELETE_CHAT:
            return {
                ...state,
                chatList: [
                    ...state.chatList.filter((item) => item.id !== action.id)
                ]
            }
        default: return state;
    }
}
