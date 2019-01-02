
import {
    loaderError,
    loaderOff,
    notificationAdd
} from '../actions';

// import {bucketsFailure, bucketsSuccess} from "./buckets";

export default dispatch => {

    const json = json => {

        if (json.error) {

            dispatch(notificationAdd(json.error, 'error'))
        }
    }

    return exception => {

        /**
         * php method: AbstractController::noCacheResponseJsonError()
         */

        if (exception && exception.res && ([409, 403].indexOf(exception.res.status) > -1) ) {

            if (typeof exception.res.json === 'function') {

                return exception.res.json().then(json);
            }

            return Promise.resolve(json(exception.res.json));
        }

        dispatch(loaderError(`Server error: [${exception.res.status} - ${exception.res.statusText}]`));

        return 'failure';
    }
}

// return fetchJson('/admin/buckets', {
//     method: 'post'
// })
//     .then(json => {
//         dispatch(bucketsSuccess(json));
//     }, e => {
//
//         errorHandler(dispatch)(e);
//         dispatch(bucketsFailure());
//     })
// ;
