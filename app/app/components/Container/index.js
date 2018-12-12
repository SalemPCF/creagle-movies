/* Node */
import React, { Component } from 'react';

class Container extends Component {
    componentDidMount = () => {
        console.log('container mounted');
    }

    render () {
        const { children } = this.props;

        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {children}
            </div>
        );
    }
}

export default Container;
