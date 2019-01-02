
import React from 'react';

import './Notification.scss';

const Notification = ({
    list,
    add,
    remove
}) => (
    <div className="react-notification" key="k">
        {list.map(item => (
            <div
                key={item.id}
                className={item.type}
                onClick={() => remove(item.id)}
            >
                <div dangerouslySetInnerHTML={{ __html: item.msg }} />
            </div>
        ))}
    </div>
);

export default Notification;