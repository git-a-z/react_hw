export const GET_ARTICLES = 'ARTICLES::GET_ARTICLES';
export const SET_LOADING = 'ARTICLES::SET_LOADING';
export const SET_ERROR = 'ARTICLES::SET_ERROR';
export const SET_ERROR_MESSAGE = 'ARTICLES::SET_ERROR_MESSAGE';

export const getArticles = (data) => ({
    type: GET_ARTICLES,
    data,
});

export const getArticlesWithMiddleware = (url) => async (dispatch, getState) => {
    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            dispatch(getArticles(data));
        } else {
            dispatch(setError(true));
            dispatch(setErrorMessage(`Error: ${response.status}`));
        }
    } catch (error) {
        dispatch(setError(true));
        dispatch(setErrorMessage(`Error: ${error.message}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const setLoading = (loading) => ({
    type: SET_LOADING,
    loading,
});

export const setError = (error) => ({
    type: SET_ERROR,
    error,
});

export const setErrorMessage = (errorMessage) => ({
    type: SET_ERROR_MESSAGE,
    errorMessage,
});
