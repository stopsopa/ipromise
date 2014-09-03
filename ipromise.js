/**
 * @author Szymon Działowski
 * @ver 1.0 - 2014-09-02
 * @homepage https://github.com/stopsopa/ipromise
 * 
 * Copyright (c) 2014 Szymon Działowski
 * Released under the MIT license
 * http://en.wikipedia.org/wiki/MIT_License
 */
;(function (name, context, definition) {
    if (typeof global === 'object')  
        global[name] = definition;
    
    if (typeof module === 'object' && module.exports) 
        module.exports = definition;
    
    context[name] = definition;
    
})('ipromise', this, (function (_, un) {
    
    // statuses
    for (var i in _) _[_[i]] = i;

    // tools
    function _aconv(a) {
        return Array.prototype.slice.call( a, 0 );
    };
    function isArray (a) {
        return toString.call(a) == '[object Array]';
    };
    function isObject (a) {
        return toString.call(a) == '[object Object]';
    };
    function isFunction (a) {
        return toString.call(a) == '[object Function]';
    };   

    var _tick = (function () {
        try {
            return process.nextTick;
        } catch (e) {}

        try {        
            return setImmediate;
        } catch (e) {}

        return function (f) {
            setTimeout(f, 0);
        };    
    })();

    function _flatcycle(list, args) {
        var e;
        for (var i = 0 ; i < args.length ; ++i ) {
            e = args[i];
            if (isFunction(e))  // If onFulfilled is not a function, it must be ignored. - http://promisesaplus.com/#point-24 / onRejected is not a function, it must be ignored. - http://promisesaplus.com/#point-25
                list.push(e);                                    
            else if (isArray(e)) 
                _flatcycle(list, e);            
        }
        return list;
    };
    function _flat(args) { return _flatcycle([], _aconv(args)); };
    function _stack(stack, args, status) {
        var a = _flat(args);
        for (var i = 0 ; i < a.length ; ++i ) {
            a[i].status = status;
            stack.push(a[i]);
        }
    };
    function _resolve(promise, x) {
        var then, call = true;

        try {
            if (promise === x) // If promise and x refer to the same object, reject promise with a TypeError as the reason. - http://promisesaplus.com/#point-48
                throw new TypeError('promise and x are the same object'); // If promise and x refer to the same object, reject promise with a TypeError as the reason. - http://promisesaplus.com/#point-48

            if (isObject(x) || isFunction(x)) {
                    then = x.then;
                    if (isFunction(then)) {
                        try {
                            then.call(x, function (y) {
                                if (call) {
                                    _resolve(promise, y);
                                    call = false;
                                }
                            }, function (r) {
                                if (call) {
                                    promise.reject(r);
                                    call = false;
                                }
                            });                         
                        }
                        catch (e) {
                            if (call) {
                                promise.reject(e);
                            }                         
                        }                    
                    } 
                    else {
                        promise.resolve(x);
                    }
            }
            else {
                promise.resolve(x);
            }               
        }
        catch (e) {
            promise.reject(e);
        }
    }
    return function deferred() { 
        
        if (this.constructor != deferred) 
            return new deferred();
                    
        var state = _.PENDING; // pending, resolved, or rejected // A promise must be in one of three states: pending, fulfilled, or rejected. - http://promisesaplus.com/#point-11
        var argscache, // must have a value, which must not change. - http://promisesaplus.com/#point-16 / must have a reason, which must not change. - http://promisesaplus.com/#point-19
            stack = [];

        function call(fn, x) {
            _tick(function () { // onFulfilled or onRejected must not be called until the execution context stack contains only platform code. [3.1]. - http://promisesaplus.com/#point-34
                if (fn.promise) {
                    try {
                        // If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x) - http://promisesaplus.com/#point-41
                        // it must be called after promise is fulfilled, with promise’s value as its first argument. - http://promisesaplus.com/#point-27 and http://promisesaplus.com/#point-31                                                            
                        _resolve(fn.promise, fn.apply(un, argscache));
                    }
                    catch (e) { // http://promisesaplus.com/#point-48                                    
                        fn.promise.reject(e); // If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason. - http://promisesaplus.com/#point-42
                    }
                    return;
                }
                fn.apply(un, argscache);
            });
        }
        function _calllist(l, s) {
            for (var i = 0 ; i < l.length ; ++i ) {
                if (s) {
                    (l[i].status & s) && call(l[i])                                        
                }
                else {
                    call(l[i])                    
                }
            }
        }

        this.done = function () {
            switch (state) {
                case _.PENDING:
                    _stack(stack, arguments, _.DONE) // it must not be called before promise is fulfilled. - http://promisesaplus.com/#point-28
                    break;
                case _.RESOLVED:
                    _calllist(_flat(arguments))
                    break;
            }
            return this;
        };
        this.fail = function () {
            switch (state) {
                case _.PENDING: 
                    _stack(stack, arguments, _.FAIL) // it must not be called before promise is rejected. - http://promisesaplus.com/#point-32    
                    break;
                case _.REJECTED:
                    _calllist(_flat(arguments))
                    break;
            }
            return this;
        };
        // A promise must provide a then method to access its current or eventual value or reason. - http://promisesaplus.com/#point-21
        // then may be called multiple times on the same promise. - http://promisesaplus.com/#point-36
        this.then = function (onFulfilled, onRejected) { // A promise’s then method accepts two arguments: - http://promisesaplus.com/#point-22
            var prms = new deferred();

            // Both onFulfilled and onRejected are optional arguments: - http://promisesaplus.com/#point-23
            isFunction(onFulfilled) || (onFulfilled = function () { // If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1. - http://promisesaplus.com/#point-43
                prms.resolve.apply(un, arguments); 
            });

            isFunction(onRejected) || (onRejected = function () { // If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1. - http://promisesaplus.com/#point-44
                prms.reject.apply(un, arguments); 
            });

            onFulfilled.promise = onRejected.promise = prms; 

            // If/when promise is fulfilled, all respective onFulfilled callbacks must execute in the order of their originating calls to then. - http://promisesaplus.com/#point-37
            // If/when promise is rejected, all respective onRejected callbacks must execute in the order of their originating calls to then. - http://promisesaplus.com/#point-38
            this.done(onFulfilled).fail(onRejected);  

            return prms; // then must return a promise - http://promisesaplus.com/#point-40
        }
        this.always = function () {
            if (state == _.PENDING) 
                _stack(stack, arguments, _.DONE | _.FAIL)             
            else // if (state & (_.RESOLVED | _.REJECTED)) 
                _calllist(_flat(arguments))
            return this;
        };
        this.resolve = function () { // When pending, a promise: may transition to either the fulfilled or rejected state. - http://promisesaplus.com/#point-12  
            if (state == _.PENDING) { // must not transition to any other state. - http://promisesaplus.com/#point-15             
                state     = _.RESOLVED;
                argscache = _aconv(arguments);
                _calllist(stack, _.DONE);  
                delete stack; // i don't need stack anymore
            }
            return this;                           
        };
        this.reject = function () { // When pending, a promise: may transition to either the fulfilled or rejected state. - http://promisesaplus.com/#point-12 
            if (state == _.PENDING) { // must not transition to any other state. - http://promisesaplus.com/#point-18                  
                state     = _.REJECTED;
                argscache = _aconv(arguments);
                _calllist(stack, _.FAIL);  
                delete stack; // i don't need stack anymore
            }
            return this;             
        };
        this.state = function () {
            return _[state].toLowerCase();
        };
        return this;
    };
})({
    PENDING  : 1,
    RESOLVED : 2,
    REJECTED : 4,
    DONE     : 8,
    FAIL     : 16
}));         
