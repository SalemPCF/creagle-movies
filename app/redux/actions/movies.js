/* Node */
import { normalize } from 'normalizr';

/* Relative */
import movieSchema from '../../schemas/movie';
import { logError } from '../../helpers';

export const MOVIES = {
    LOAD: {
        INITIAL: 'MOVIES:LOAD:INITIAL',
        SUCCESS: 'MOVIES:LOAD:SUCCESS',
        FAILURE: 'MOVIES:LOAD:FAILURE',
    },
    SCROLL: 'MOVIES:SCROLL',
    SEARCH: {
        SAVE: 'MOVIES:SEARCH:SAVE',
        RESET: 'MOVIES:SEARCH:RESET',
    },
};

const loadMoviesInitial = () => ({ type: MOVIES.LOAD.INITIAL });

const loadMoviesSuccess = (data, page, hasMore, type) => ({
    type: MOVIES.LOAD.SUCCESS,
    payload: {
        data,
        page,
        hasMore,
        type,
    },
});

const loadMoviesFailure = () => ({ type: MOVIES.LOAD.FAILURE });

export const loadMovies = () => async (dispatch, getState, { api }) => {
    const { movies } = getState().pages;
    const { loading, hasMore } = movies;

    // If we're loading or the previous request returned no data,
    // We don't want to send another request.
    if (loading || !hasMore) { return; }

    dispatch(loadMoviesInitial());

    const page = movies.page + 1;

    api.get(`/movies/${page}`, {
        params: {
            sort: 'trending',
            order: -1,
            genre: 'all',
            keywords: '',
        },
    })
        .then(res => res.data)
        .then((data) => {
            const normalized = normalize(data, [movieSchema]);

            const hasMoreData = data.length > 0;

            dispatch(loadMoviesSuccess(normalized, page, hasMoreData, 'page'));
        })
        .catch(() => {
            logError('There was a problem loading movies.');

            dispatch(loadMoviesFailure());
        });
};

export const loadSearchedMovies = () => async (dispatch, getState, { api }) => {
    const { movies } = getState().pages;
    const { loading, hasMore, params } = movies;

    // If we're loading or the previous request returned no data,
    // We don't want to send another request.
    if (loading || !hasMore) { return; }

    dispatch(loadMoviesInitial());

    const searchPage = movies.searchPage + 1;

    api.get(`/movies/${searchPage}`, { params })
        .then(res => res.data)
        .then((data) => {
            const normalized = normalize(data, [movieSchema]);

            const hasMoreData = data.length > 0;

            dispatch(loadMoviesSuccess(normalized, searchPage, hasMoreData, 'searchPage'));
        })
        .catch(() => {
            logError('There was a problem loading searched movies.');

            dispatch(loadMoviesFailure());
        });
};

export const preserveScroll = scrollPosition => ({
    type: MOVIES.SCROLL,
    payload: { scrollPosition },
});

export const saveMoviesSearch = params => ({
    type: MOVIES.SEARCH.SAVE,
    payload: {
        params,
    },
});

export const resetMoviesSearch = () => ({ type: MOVIES.SEARCH.RESET });
