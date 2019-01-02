
import React from 'react';

import './LayoutPadding.scss';

export default ({ children, className , ...props }) => {

    let cls = 'layout-padding';

    if (className) {

        cls += ` ${className}`;
    }

    return (
        <div className={cls} {...props}>
            {children}
        </div>
    );
}