/* Node */
import React, { Component } from 'react';

/* Relative */
import { api } from '../../../services/api';

// NOTE: This component will work the EXACT same way as the Movies component works.
// Therefore, the Grid logic will need to be seperated out so we can reuse it here.
class Shows extends Component {
    componentDidMount = () => {
        api.get('/shows/1')
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render () {
        return (
            <p>TV Show page</p>
        );
    }
}

export default Shows;
