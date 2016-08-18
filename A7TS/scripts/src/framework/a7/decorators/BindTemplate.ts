/// <reference path="../../../../declarations/handlebars/handlebars.d.ts" />
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Decorators {

    export function bindTemplate(selector: string = null) {
        return function (target: any, propertyKey: string) {
            var _val: HandlebarsTemplateDelegate; // = this[propertyKey];

            var getter = function () {

                if (!_val) {
                    
                    var actualName = propertyKey.indexOf('_') == 0 ? propertyKey.substr(1, propertyKey.length - 1) : propertyKey,
                        camelizedName = propertyKey.substr(0, 1).toLowerCase() + propertyKey.substr(1, propertyKey.length - 1),
                         matchedTemplate = selector ? $(selector) : null;

                    if (!selector || !matchedTemplate.length) {
                        matchedTemplate = this._$el.find('[data-a7-template="' + actualName + '"]');
                    }

                    if (!matchedTemplate.length) {
                        matchedTemplate = this._$el.find('[data-a7-template="' + camelizedName + '"]');
                    }

                    if (!matchedTemplate.length) {
                        this._logger.error('Could not auto bind property ' + propertyKey + '.  Could not find html element via selectors' + selector ? ' ' + selector + ', ' : '' + ' [data-a7-template=' + actualName + '] or [data-a7-template=' + camelizedName + ']');
                    }

                    _val = Handlebars.compile(matchedTemplate.html());
                }

                return _val;
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