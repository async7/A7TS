/// <reference path="../../../declarations/jquery.d.ts" />
var A7;
(function (A7) {
    (function (Forms) {
        var Binding = (function () {
            function Binding() {
            }
            Binding.BindToForm = function ($form, entity, customMapping) {
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
            };

            Binding._getFormValue = function ($el) {
                if (this._isCheckBox($el)) {
                    return $el.is(":checked");
                } else {
                    return $el.val();
                }
            };

            Binding._isCheckBox = function ($el) {
                return $el.attr("type") == "checkbox";
            };

            Binding.BindFromForm = function ($form, entity, customMapping) {
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

                            if (!(customMapping || [])[prop])
                                entity[prop] = elVal;
                            else
                                entity[prop] = customMapping[prop]($form, elVal);
                        }
                    }
                }

                return entity;
            };
            return Binding;
        })();
        Forms.Binding = Binding;
    })(A7.Forms || (A7.Forms = {}));
    var Forms = A7.Forms;
})(A7 || (A7 = {}));
