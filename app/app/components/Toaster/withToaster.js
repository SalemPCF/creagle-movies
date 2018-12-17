import React from 'react';
import { ToastContext } from './ToastContext';

export const withToaster = (Comp) => {
    const WrappedComp = props => (
        <ToastContext.Consumer>
            {toast => (
                <Comp
                    toast={toast}
                    {...props}
                />
            )}
        </ToastContext.Consumer>
    );

    WrappedComp.displayName = `withToaster(${Comp.displayName || Comp.name})`;

    return WrappedComp;
};
