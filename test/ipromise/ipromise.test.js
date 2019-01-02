'use strict';

const ipromise = require('../../src/ipromise');

it('ipromise', async done => {

    const data = 'test';

    const promise = new ipromise();

    setTimeout(()  => promise.resolve(data), 50);

    const result = await promise;

    expect(result).toEqual(data);

    done();
});
