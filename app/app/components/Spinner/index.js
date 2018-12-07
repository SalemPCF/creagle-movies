/* Node */
import { SyncLoader } from 'react-spinners';
import React from 'react';

/* Relative */
import defaultProps from './defaultProps';
import propTypes from './propTypes';

export const Spinner = ({ size, color }) => (
    <div className="spinner">
        <SyncLoader
            size={size}
            margin="8px"
            color={color}
        />
    </div>
);

Spinner.propTypes = propTypes;

Spinner.defaultProps = defaultProps;
