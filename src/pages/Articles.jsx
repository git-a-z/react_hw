import { style } from './style';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import React from 'react'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import * as actions from '../redux/articles/actions';
import { setArticleList, setLoading, setError, setErrorMessage } from '../redux/articles/selectors';
import { MyButton } from '../components/Button/Button';

export function Articles() {
    const articleList = useSelector(setArticleList, shallowEqual);
    const loading = useSelector(setLoading, shallowEqual);
    const error = useSelector(setError, shallowEqual);
    const errorMessage = useSelector(setErrorMessage, shallowEqual);
    const dispatch = useDispatch();
    const url = 'https://api.spaceflightnewsapi.net/v3/articles';

    const setArticles = useCallback(() => {
        dispatch(actions.setError(false));
        dispatch(actions.setLoading(true));
        dispatch(actions.setArticlesWithMiddleware(url));
    }, [dispatch]);

    useEffect(() => {
        // setArticles()
        console.log('Articles. useEffect');
    }, [])

    return (
        <>
            <h1>Articles</h1>
            {loading && <p>Loading....</p>}
            <MyButton onClick={setArticles}>
                Get data from api
            </MyButton>
            {!loading && (
                <List sx={style} component="nav" aria-label="mailbox folders">
                    {articleList.map((article, i) => (
                        <div key={i}>
                            <ListItem button divider>
                                <ListItemText primary={article.title} />
                            </ListItem>
                        </div>
                    ))}
                </List>
            )}
            {error && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
    )
}
