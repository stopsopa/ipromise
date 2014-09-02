
***

<a href="http://promisesaplus.com/" style="z-index: 100;">
    <img src="http://promisesaplus.com/assets/logo-small.png" alt="Promises/A+ logo"
         title="Promises/A+ 1.1 compliant" align="right" />
</a>
# ipromise.js 2.2.2

Standalone, lightweight and multiplatform javascript implementatnion of Promise/A+ design pattern (ready to use in browser and in node.js)

***



## Tests

To run test install libraries from https://github.com/promises-aplus/promises-tests and run test by 

    promises-aplus-tests test.js

## Api

Creating an object of promise:
```javascript

var promise = new ipromise();

```

Api for end user:

```javascript

promise
    .done(function(fn, fn, fn ,[fn, fn], fn, ...){
        // action on done
    })
    .fail(function(fn, fn, fn ,[fn, fn], fn, ...){
        // action on fail
    })
    .always(function(fn, fn, fn ,[fn, fn], fn, ...){
        // action on done and on fail
    });

```

Api for promise provider:

if you want o to resolve promise:

```javascript

promise.resolve(arg1, arg2, ...)

```

if you want o to feject promise:

```javascript

promise.reject(arg1, arg2, ...)

```


.. and of course method "then":

```javascript

var promise2 = promise.then(
    function done(arg1, arg2, ...){}, 
    function fail(arg1, arg2, ...){}
);

```

