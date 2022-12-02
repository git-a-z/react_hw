import * as actions from './actions';

export const initState = {
    articleList: [],
    loading: false,
    error: false,
    errorMessage: '',
}

export const articlesReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_ARTICLES:
            return {
                ...state,
                articleList: action.data,
            }
        case actions.SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            }
        case actions.SET_ERROR:
            return {
                ...state,
                error: action.error,
            }
        case actions.SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage,
            }
        default: return state;
    }
}
