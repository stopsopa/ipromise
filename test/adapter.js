// To install all needed stuff for test please visit homepage of test for Promises/A+ 1.1 design pattern
// after that run this test in node.js by
//   promises-aplus-tests test.js

var ipromise = require('../src/ipromise.js');

var promisesAplusTests = require('promises-aplus-tests');

exports.deferred = function (){
    var d = new ipromise();
    return {
        promise : d,
        resolve : d.resolve,
        reject  : d.reject
    };
}