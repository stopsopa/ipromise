
***
[![Promises/A+ 1.0 compliant][A+logo]][A+]



# ipromise.js 

Standalone, lightweight and multiplatform javascript implementatnion of 
[Promises/A+][A+] design pattern (ready to use in browser and in node.js)

 [A+]: http://promises-aplus.github.com/promises-spec
 [A+logo]: http://promises-aplus.github.com/promises-spec/assets/logo-small.png

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


### License

The MIT License (MIT)
Copyright (c) 2014 Szymon Działowski
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

