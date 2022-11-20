import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { initState } from './profile/initState'
import { profileReducer } from './profile/profileReducer'

export const store = createStore(
  profileReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ &&
  // window.__REDUX_DEVTOOLS_EXTENSION__()
  initState,
  composeWithDevTools()
)
