/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Forms {

    export class Validation {

        static DisplayMessage($input: JQuery, errorMessage: string) {
            //refer to twitter bootstrap validation for html
            var $controlGroup = $input.closest('.form-group'),
                $helpInline;

            if ($controlGroup) {

                $helpInline = $controlGroup.find('.form-control-feedback');

                if ($helpInline.length == 0) {
                    $controlGroup.find("div:eq(0)").append('<span class="form-control-feedback"></span>');

                    $helpInline = $controlGroup.find('.form-control-feedback');
                }

                $controlGroup.addClass('has-error');
                if ($helpInline) $helpInline.html(errorMessage);

            }

        }

        static ClearValidation($input: JQuery) {
            var $controlGroup = $input.closest('.form-group'),
                $helpInline;

            if ($controlGroup) {
                $helpInline = $controlGroup.find('.form-control-feedback');
                $controlGroup
                    .removeClass('has-error')
                    .removeClass('has-success')
                    .removeClass('has-warning');
                if ($helpInline) $helpInline.empty();
            }
        }

        static IsBlank($input: JQuery, errorMessage: string = 'Required Field', displayMessage: boolean = true): boolean {
            //refer to twitter bootstrap validation for html
            var valid = $input.val() ? true : false;

            if (!valid && displayMessage) this.DisplayMessage($input, errorMessage);

            return valid;
        }

        static IsEmail($input: JQuery, errorMessage: string = 'Invalid Email', displayMessage: boolean = true): boolean {
            var value = $input.val(),
                valid = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);

            if (!valid && displayMessage) this.DisplayMessage($input, errorMessage);

            return valid;
        }

        static IsPhone($input: JQuery, errorMessage: string = 'Invalid Phone (XXX) XXX-XXXX', displayMessage: boolean = true): boolean {
            var value = $input.val(),
                phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                valid = phoneRegex.test(value);

            if (valid) {
                $input.val(value.replace(phoneRegex, "($1) $2-$3"));
            } else if (displayMessage) {
                this.DisplayMessage($input, errorMessage);
            }

            return valid;
        }

        static IsChecked($input: JQuery, errorMessage: string = 'Required Field', displayMessage: boolean = true): boolean {
            var valid = $input.is(":checked");
            if (!valid && displayMessage) this.DisplayMessage($input, errorMessage);
            return valid;
        }

        static HasMinimum($input: JQuery, errorMessage: string = 'Value must be {0} characters', displayMessage: boolean = true): boolean {
            var minlength = +$input.attr("data-minlength");
            var valid = $input.val().length >= minlength || !$input.is(":visible");
            if (!valid && displayMessage)
                this.DisplayMessage($input, errorMessage.replace("{0}", minlength.toString()));
            return valid;
        }

        static CanCompare($input: JQuery, errorMessage: string = 'Passwords are not equal', displayMessage: boolean = true): boolean {
            var $target = $("#" + $input.attr("data-target"));
            var valid = $input.val() == $target.val() || !$input.is(":visible");
            if (!valid && displayMessage) this.DisplayMessage($input, errorMessage);
            return valid;
        }

        static FormValid($form: JQuery): boolean {
            var valid = true;

            $('[type="text"], [type="email"], [type="password"], [type="tel"], select, [type="checkbox"]', $form).each(function () {
                var $this = $(this),
                    validateType = $this.attr('data-validator') || '';

                Validation.ClearValidation($this);

                switch (validateType) {
                    case 'required':
                        if (!Validation.IsBlank($this)) valid = false;
                        break;
                    case 'minlength':
                        if (!Validation.HasMinimum($this)) valid = false;
                        break;
                    case 'email':
                        if (!Validation.IsEmail($this)) valid = false;
                        break;
                    case 'tel':
                        if (!Validation.IsPhone($this)) valid = false;
                        break;
                    case 'compare':
                        if (!Validation.CanCompare($this)) valid = false;
                        break;
                    case 'checkbox':
                        if (!Validation.IsChecked($this)) valid = false;
                        break;
                }

                return true;
            });

            return valid;
        }

    }

}