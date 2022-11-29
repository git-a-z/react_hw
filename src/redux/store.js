import { createStore, combineReducers } from 'redux';
import { profileReducer } from './profile/reducer';
import { chatsReducer } from './chats/reduser';
import { messagesReducer } from './messages/reduser';

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
