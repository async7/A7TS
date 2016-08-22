/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="selectoption.ts" />

namespace A7.Forms {

    export class Binding {

        static BindToForm<T>($form: JQuery, entity: T, customMapping?: {}): void {
            for (var prop in entity) {
                var matchingFormEls;
                var propertyVal;
                matchingFormEls = $form.find('input[name="' + prop + '"], textarea[name="' + prop + '"], select[name="' + prop + '"]');

                var hasCustomMapping = customMapping ? customMapping[prop] : false;
                if ((matchingFormEls.length > 0) || (hasCustomMapping)) {
                    if (hasCustomMapping)
                        propertyVal = customMapping[prop](entity);
                    else
                        propertyVal = entity[prop];
                }

                $.each(matchingFormEls, function (index, el) {
                    $(el).val(propertyVal);
                });

            }
        }

        static BindFromForm<T>($form: JQuery, entity?: any, customMapping?: {}): T {

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

        static BindSelectOptions($select: JQuery, options: string[] | SelectOption[], selectedValue: string | number = null) {
            var html = '';
            var found = false;
            _.each(<any>options, (option: any) => {
                if (typeof (option) == 'string') {
                    if (option == selectedValue) {
                        html += '<option selected>' + option + '</option>';
                        found = true;
                    }
                    else
                        html += '<option>' + option + '</option>';
                }
                else {
                    if (option.Value == selectedValue) {
                        html += '<option value="' + option.Value + '" selected>' + option.Text + '</option>';
                        found = true;
                    }
                    else
                        html += '<option value="' + option.Value + '">' + option.Text + '</option>';
                }
            });
            if (selectedValue && !found)
                html += '<option value="' + selectedValue + '">' + selectedValue + '</option>';
            $select.append(html);
        }

        static private _getFormValue($el: JQuery) {
            if (this._isCheckBox($el)) {
                return $el.is(":checked");
            } else {
                return $el.val();
            }
        }

        static private _isCheckBox($el: JQuery): boolean {
            return $el.attr("type") == "checkbox";
        }

}
