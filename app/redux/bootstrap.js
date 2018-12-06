/* Node */
import { compose as defaultCompose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/* Relative */
import { api } from '../services/api';
import reducer from './reducers';

// You can use a compose function to apply multiple store enhancers at once.
// Redux devtools provides us a compose function that has the devtools middleware
// already composed in, so we're going to use that if it exists, otherwise just
// use the default compose function that uses the same API.
// eslint-disable-next-line no-underscore-dangle
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || defaultCompose;

// Create our store, giving it our root reducer,
// and any enhancements we want, such as middleware.
const store = createStore(
    reducer,
    compose(applyMiddleware(
        // Thunk middleware allows us to perform async actions.
        // We provide it with the API so we can perform HTTP
        // requests.
        thunk.withExtraArgument({ api }),
    )),
);

export default store;
