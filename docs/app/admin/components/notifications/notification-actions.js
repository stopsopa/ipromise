
export const types = {
    NOTIFICATION_ADD: "NOTIFICATION_ADD",
    NOTIFICATION_REMOVE: "NOTIFICATION_REMOVE",
    NOTIFICATION_UPDATE: "NOTIFICATION_UPDATE"
};

import {
    fetchJson, fetchData
} from 'transport';

import {
    getNotificationState
} from '../../_redux/reducers';

const generateId = (function () {

    let i = 0;

    let max = 1000;

    return () => {

        i += 1;

        if (i > max) {

            i %= max;
        }

        return i;
    }
}());

function isObject(a) {
    return (!!a) && (a.constructor === Object);
    // return Object.prototype.toString.call(a) === '[object Object]'; // better in node.js to dealing with RowDataPacket object
};

const animationTime = 400;
const delay = 90;

const def= {
    time: 5000,
    msg: '',
    type: '' // warning, error or empty string (default green state)
};

export const notificationRemove = id => (dispatch, getState) => {

    const list = getNotificationState(getState());

    const found = list.find(item => (item.id == id));

    return new Promise(resolve => {

        if ( ! found ) {

            return resolve();
        }

        const payload = { ...found };

        payload.type = payload.type.replace(/(\s|^)show(\s|$)/g, ' ');

        dispatch({
            type: types.NOTIFICATION_UPDATE,
            payload : {...payload, ...{type:payload.type + ' hide show'}}
        });

        setTimeout(() => dispatch({
            type: types.NOTIFICATION_UPDATE,
            payload : {...payload, ...{type:payload.type + ' hide'}}
        }), delay);

        setTimeout(() => {

            dispatch({
                type: types.NOTIFICATION_REMOVE,
                payload: id
            });

            resolve(payload);

        }, animationTime + (3 * delay) );
    });
}

/**
 *  notificationAdd('message') - explicit message, default green type, default delay (def: 5000 ms)
 *  notificationAdd('message', 1000) - explicit message, default green type, explicit delay
 *  notificationAdd('message', 'error', 1000) - explicit message, explicit green type, explicit delay
 *  notificationAdd({ // or pass an object
 *      msg: 'message',
 *      type: 'error',
 *      time: 5000
 *  }) - explicit message, default green type, default delay
 */
export const notificationAdd = (...args) => (dispatch, getState) => {

    getNotificationState(getState());

    const id = generateId();

    let payload = {...def};

    let firstString = true;

    args.forEach(arg => {
        if (isObject(arg)) {
            payload = {...payload, ...arg};
        }
        else if (Number.isInteger(arg)) {
            payload.time = arg;
        }
        else {
            if (firstString) {
                payload = {...payload, ...{msg: (typeof arg === 'string') ? arg : JSON.stringify(arg)}}
                firstString = false;
            }
            else {
                payload = {...payload, ...{type: (typeof arg === 'string') ? arg : JSON.stringify(arg)}}
            }
        }
    });

    payload.id = id;

    if (payload.time < animationTime) {

        payload.time = animationTime;
    }

    dispatch({
        type: types.NOTIFICATION_ADD,
        payload
    });

    setTimeout(() => dispatch({
        type: types.NOTIFICATION_UPDATE,
        payload : {...payload, ...{type:payload.type + ' show'}}
    }), 50);

    return new Promise(resolve => setTimeout(
        () => dispatch(notificationRemove(id)).then(resolve),
        payload.time
    ));
};
