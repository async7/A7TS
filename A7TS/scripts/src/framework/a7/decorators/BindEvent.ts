/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Decorators {

    export function bindEvent(event: string, selector: string, handler: (event: JQueryEventObject) => any = null, handlerReturnsPromise: boolean = false) {
        return function (target: Object, propertyKey: string) {

            var _val = this[propertyKey];
            console.trace(_val);
            var getter = function(...args: any[]){
                 
                var result: any;
                console.trace(args);
                this._$el.on(event, selector, event => {
                    result = handler ? handler(event) : null;
                });

                if (handlerReturnsPromise) {
                    result.then(args[0]);
                } else {
                    args[0](result);
                }
                
            }

            if (delete this[propertyKey]) {

                Object.defineProperty(target, propertyKey, {
                    get: getter,
                    set: function (newVal) { _val = newVal; },
                    enumerable: true,
                    configurable: true
                });

            }

        }
    }

}
