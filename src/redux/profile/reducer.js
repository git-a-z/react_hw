import * as actions from './actions';

export const initState = {
    profileName: 'Andy (Default Name)',
    isAuth: false,
}

export const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.CHANGE_NAME:
            return {
                ...state,
                profileName: action.payload
            }
        case actions.IS_AUTH:
            return { ...state, isAuth: action.payload }
        default: return state;
    }
}
