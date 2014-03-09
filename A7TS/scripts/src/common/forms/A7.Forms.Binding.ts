/// <reference path="../../../declarations/jquery.d.ts" />

module A7 {
    export module Forms {
        export class Binding {
            static BindToForm<T>($form: JQuery, entity: T, customMapping?: { }): void {
                for (var prop in entity) {
                    var matchingFormEls;
                    var propertyVal;
                    matchingFormEls = $form.find('input[name="' + prop + '"], textarea[name="' + prop + '"], select[name="' + prop + '"]');

                    if (matchingFormEls.length > 0) {
                        if (customMapping ? customMapping[prop] : false)
                            propertyVal = customMapping[prop](entity);
                        else
                            propertyVal = entity[prop];
                    }

                    $.each(matchingFormEls, function (index, el) {
                        $(el).val(propertyVal);
                    });

                }
            }

            static _getFormValue($el: JQuery) {
                if (this._isCheckBox($el)) {
                    return $el.is(":checked");
                } else {
                    return $el.val();
                }
            }

            static _isCheckBox($el: JQuery): boolean {
                return $el.attr("type") == "checkbox";
            }                        

            static BindFromForm<T>($form: JQuery, entity?: any, customMapping?: { }): T {
                
                if (!entity) {
                    entity = {};
                    $('input, select, textarea', $form).each(function (idx, element) {
                        var $element = $(element);
                        entity[$element.attr('name')] = A7.Forms.Binding._getFormValue($element);
                    });
                } else {
                    for (var prop in entity) {

                        var matchingFormEls, propertyVal;

                        matchingFormEls = $form.find('input[name="' + prop + '"], textarea[name="' + prop + '"], select[name="' + prop + '"]');

                        if (matchingFormEls.length > 0) {
                            var elVal = this._getFormValue($(matchingFormEls[0]));

                            if (!(customMapping || [])[prop]) entity[prop] = elVal;
                            else entity[prop] = customMapping[prop]($form, elVal);
                        }

                    }
                }

                return entity;

            }
        }
    }
}
