/* Relative */
import { logError } from '../../helpers';

export const SHOW = {
    LOAD: {
        INITIAL: 'SHOW:LOAD:INITIAL',
        SUCCESS: 'SHOW:LOAD:SUCCESS',
        FAILURE: 'SHOW:LOAD:FAILURE',
        UNLOAD: 'SHOW:LOAD:UNLOAD',
    },
};

const loadShowInitial = () => ({ type: SHOW.LOAD.INITIAL });

const loadShowSuccess = data => ({
    type: SHOW.LOAD.SUCCESS,
    payload: { data },
});

const loadShowFailure = () => ({ type: SHOW.LOAD.FAILURE });

export const loadShow = id => (dispatch, getState, { api }) => {
    dispatch(loadShowInitial());

    // Shows works slightly differently to the way movies work.
    // Shows require you to send another request to the /show api
    // to retrieve all the data you need to start torrenting.
    // This means we can't use the normalization
    // because the data stored from each id will be different.
    api.get(`/show/${id}`)
        .then(res => res.data)
        .then((data) => {
            dispatch(loadShowSuccess(data));
        })
        .catch(() => {
            logError('There was a problem loading this show.');

            dispatch(loadShowFailure());
        });
};

export const unloadShow = () => ({ type: SHOW.LOAD.UNLOAD });
