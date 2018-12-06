/* Node */
import React, { createContext } from 'react';

const RemoteContext = createContext();

export default RemoteContext;

export const withRemote = Component => props => (
    <RemoteContext.Consumer>
        {remote => <Component remote={remote} {...props} />}
    </RemoteContext.Consumer>
);
