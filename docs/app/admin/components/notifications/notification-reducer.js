
const { types : {
    NOTIFICATION_ADD,
    NOTIFICATION_REMOVE,
    NOTIFICATION_UPDATE
} } = require('./notification-actions');

export default (state = [], action) => {
    switch (action.type) {
        case NOTIFICATION_ADD:
            return [...[action.payload], ...state];
        case NOTIFICATION_REMOVE:
            return state.filter(item => (item.id !== action.payload));
        case NOTIFICATION_UPDATE:
            return state.map(item => {

                if (item.id === action.payload.id) {

                    item = {...item, ...action.payload}
                }

                return item;
            });
        default:
            return state;
    }
};

export const getNotificationState = state => state;