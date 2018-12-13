/* Node */
import { normalize } from 'normalizr';

/* Relative */
import showSchema from '../../schemas/show';
import { logError } from '../../helpers';

export const SHOWS = {
    LOAD: {
        INITIAL: 'SHOWS:LOAD:INITIAL',
        SUCCESS: 'SHOWS:LOAD:SUCCESS',
        FAILURE: 'SHOWS:LOAD:FAILURE',
    },
    SCROLL: 'SHOWS:SCROLL',
};

const loadShowsInitial = () => ({ type: SHOWS.LOAD.INITIAL });

const loadShowsSuccess = (data, page) => ({
    type: SHOWS.LOAD.SUCCESS,
    payload: {
        data,
        page,
    },
});

const loadShowsFailure = () => ({ type: SHOWS.LOAD.FAILURE });

export const loadShows = () => async (dispatch, getState, { api }) => {
    const showsPage = getState().pages.shows;

    if (showsPage.loading) { return; }

    dispatch(loadShowsInitial());

    const page = showsPage.page + 1;

    api.get(`/shows/${page}`, {
        params: {
            sort: 'trending',
            order: -1,
            genre: 'all',
            keywords: '',
        },
    })
        .then(res => res.data)
        .then((data) => {
            const normalized = normalize(data, [showSchema]);

            dispatch(loadShowsSuccess(normalized, page));
        })
        .catch(() => {
            logError('There was a problem loading shows.');

            dispatch(loadShowsFailure());
        });
};

export const preserveScroll = scrollPosition => ({
    type: SHOWS.SCROLL,
    payload: { scrollPosition },
});
