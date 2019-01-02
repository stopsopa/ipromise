
import {
    ACTIVITYWALL_LIST_REQUEST,
    ACTIVITYWALL_LIST_SUCCESS,
    ACTIVITYWALL_LIST_FAILURE,
    ACTIVITYWALL_LIST_REMOVE,
    ACTIVITYWALL_LIST_CHANGE,
} from '../../actions/types';

export default (def => (state = def, action) => {
    switch (action.type) {
        case ACTIVITYWALL_LIST_REQUEST:
            return def;
        case ACTIVITYWALL_LIST_SUCCESS:
            return action.payload;
        // case ACTIVITYWALL_LIST_FAILURE:
        //     return action.payload;
        // case ACTIVITYWALL_LIST_REMOVE:
        //     console.log()
        //     return state.filter(item => (item.id != action.payload));
        case ACTIVITYWALL_LIST_CHANGE:
            return state.map(item => {
                if(item.id === action.payload.id){
                    item.enabled = action.payload.enabled
                }
                return item
            });
        default:
            return state;
    }
})(false);

export const getActivityWall = state => state;

// export const getActivityWallById = (state, id) => state.find(item => (item.id == id));
