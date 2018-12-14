import React, { Component, createRef } from 'react';

import { debounce } from '../../../helpers/debounce';

class SizeTracker extends Component {
    state = { width: 0, height: 0 };

    el = createRef();

    componentDidMount () {
        setTimeout(() => {
            this.updateSize();
        }, 10);

        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize);
    }

    componentDidUpdate (prevProps) {
        console.log({
            prev: prevProps.className,
            now: this.props.className,
        });
    }

    updateSize = () => {
        const { clientWidth, clientHeight } = this.el.current;

        console.log({ clientWidth, clientHeight });
        console.dir(this.el.current);

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
