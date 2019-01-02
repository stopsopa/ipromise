/**
 * Copy this file to your project
 */

import { fake as fakeFlag } from 'public.config';

const fake = [
    {
        path: /^\/pages$/,
        data: () => Promise.resolve({
            "data": [
                {
                    "_id": "58f762a2cbb458229c0974f8",
                    "_created": "2017-04-19T14:14:10.074+01:00",
                    "_modified": "2017-10-11T09:50:02.945+01:00",
                    "url": "http://domain.com/api/v1/core/es/status",
                    "interval": 1,
                    "laststatus": 200
                },

                {
                    "_id": "58f762a8cbb458229c0974f9",
                    "_created": "2017-04-19T14:14:16.75+01:00",
                    "_modified": "2017-10-11T09:50:02.944+01:00",
                    "url": "http://domain-b.com/api/v1/core/jr/status",
                    "interval": 1,
                    "laststatus": 404
                },
                {
                    "_id": "58f762adcbb458229c0974fa",
                    "_created": "2017-04-19T14:14:21.299+01:00",
                    "_modified": "2017-10-11T09:50:02.943+01:00",
                    "url": "http://domain-c.com/api/v1/core/jr/status/content",
                    "interval": 1,
                    "laststatus": 200
                },
                {
                    "_id": "59162c35cbb4581e4d66769b",
                    "_created": "2017-05-12T22:42:13.14+01:00",
                    "_modified": "2017-10-11T09:50:02.943+01:00",
                    "url": "http://domain-d.com",
                    "interval": 1,
                    "laststatus": 200
                }
            ]
        })
    }
];

export const fakeTest = url => {

    if (fakeFlag) {

        let tmp;

        try {

            Object.keys(fake).forEach(k => {
                if (fake[k].path.test(url)) {
                    tmp = k;
                    throw 'break';
                }
            });
        }
        catch (e) {}

        return tmp;
    }

    return false;
};
export const fakeReturn = (url, ...rest) => {

    const key = fakeTest(url);

    if (key) {

        log.dump('fakeReturn(), path: ' + fake[key].path + ' url: "' + url + '"');

        const ret = {};

        ret.json = () => fake[key].data(...rest);

        return Promise.resolve(ret);
    }
};
