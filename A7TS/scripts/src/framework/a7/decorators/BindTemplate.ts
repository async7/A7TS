/// <reference path="../../../../declarations/handlebars/handlebars.d.ts" />
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Decorators {

    export function bindTemplate(selector: string = null) {
        return function (target: any, propertyKey: string) {
            var _val = this[propertyKey];

            var getter = function () {
                if (!Handlebars.templates[propertyKey]) {
                    selector = selector || '[data-a7-template="' + propertyKey + '"]';
                    Handlebars.templates[propertyKey] = Handlebars.compile($(selector).html());
                }

                return Handlebars.templates[propertyKey];
            }

            if (delete this[propertyKey]) {

                Object.defineProperty(target, propertyKey, {
                    get: getter,
                    set: function (newVal) { _val = newVal; },
                    enumerable: true,
                    configurable: true
                });

            }

        };
    }

}