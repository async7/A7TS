/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Forms {

    export class Bs3ValidationStyler implements IValidationStyler 
    {
        private _parentSelector: string;

        constructor(parentSelector: string = ".form-group")
        {
            this._parentSelector = parentSelector;
        }

        ClearValidation($input: JQuery) {

            var $controlGroup = $input.closest(this._parentSelector),
                $helpInline;

            if ($controlGroup) {
                $helpInline = $controlGroup.find('.form-error, .text-danger');

                if ($helpInline) {
                    $.each($helpInline, function () {
                        var $this = $(this);
                        $this.remove();
                    });
                }

                $controlGroup
                    .removeClass('has-error')
                    .removeClass('has-success')
                    .removeClass('has-warning');
                //if ($helpInline) $helpInline.empty();
            }
        }

        RenderValidation($form: JQuery, validationResult: ValidationResult) {

            validationResult.Failures.ForEach(x => {
                this.ClearValidation(x.Element);
                var $failedInput = $form.find(x.Element),
                    $controlGroup = $failedInput.closest(this._parentSelector),
                $helpInline;

                if ($controlGroup) {
                    $helpInline = $controlGroup.find('.form-error, .text-danger');

                    if ($helpInline.length == 0) {
                        $controlGroup.find("div:eq(0)").append('<span class="form-error text-danger">'+x.Message+'</span>');

                        $helpInline = $controlGroup.find('.form-error, .text-danger');
                    }

                    $controlGroup.addClass('has-error');
                    if ($helpInline) $helpInline.html(x.Message);
                }
            });
        }

    }

}