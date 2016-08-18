/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../logging/logmanager.ts" />


namespace A7.Decorators {

    export function bindProperty(selector: string = null) {

        return function (target: any, propertyKey: string) {
            var _val: JQuery;

            var getter = function () {

                if (!_val) {

                    var actualName = propertyKey.indexOf('_') == 0 ? propertyKey.substr(1, propertyKey.length - 1) : propertyKey,
                        camelizedName = propertyKey.substr(0, 1).toLowerCase() + propertyKey.substr(1, propertyKey.length - 1);

                    _val = selector ? $(selector) : null;

                    if (!selector || !_val.length) {
                        _val = this._$el.find('[name="' + actualName + '"]');
                    }

                    if (!_val.length) {
                        _val = this._$el.find('[name="' + camelizedName + '"]');
                    }

                    if (!_val.length) {
                        this._logger.error('Could not auto bind property ' + propertyKey + '.  Could not find html element via selectors' + selector ? ' ' + selector + ', ' : '' + ' [name=' + actualName + '] or [name=' + camelizedName + ']');
                    }

                }

                return _val

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
