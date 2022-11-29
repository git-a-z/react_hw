import * as actions from './actions';

export const initState = {
  profileName: 'Andy (Default Name)',
}

export const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.CHANGE_NAME:
      return {
        ...state,
        profileName: action.payload
      }
    default: return state;
  }
}
