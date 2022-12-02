export function getArticleList(state) {
    return state.articles.articleList;
}

export function setLoading(state) {
    return state.articles.loading;
}

export function setError(state) {
    return state.articles.error;
}

export function setErrorMessage(state) {
    return state.articles.errorMessage;
}
