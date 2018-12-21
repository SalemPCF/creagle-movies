import React, { Component, createRef } from 'react';
import { flushToStyleTag } from 'aphrodite';

import { debounce } from '../../../helpers/debounce';

class SizeTracker extends Component {
    state = { width: 0, height: 0 };

    el = createRef();

    componentDidMount () {
        flushToStyleTag();

        this.observer = new ResizeObserver(this.updateSize);
        this.observer.observe(this.el.current);
    }

    componentWillUnmount () {
        this.observer.disconnect();
    }

    updateSize = () => {
        const { clientWidth, clientHeight } = this.el.current;

        this.setState({
            width: clientWidth,
            height: clientHeight,
        });
    }

    handleResize = debounce(() => {
        this.updateSize();
    }, 250)

    render () {
        const { children, ...props } = this.props;
        const { width, height } = this.state;

        return (
            <div ref={this.el} {...props}>
                {children({ width, height })}
            </div>
        );
    }
}

export default SizeTracker;
