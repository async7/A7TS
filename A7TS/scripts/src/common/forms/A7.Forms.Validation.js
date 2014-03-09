/// <reference path="../../../declarations/jquery.d.ts" />
var A7;
(function (A7) {
    (function (Forms) {
        var Validation = (function () {
            function Validation() {
            }
            Validation.DisplayMessage = function ($input, errorMessage) {
                //refer to twitter bootstrap validation for html
                var $controlGroup = $input.closest('.control-group'), $helpInline;

                if ($controlGroup) {
                    $helpInline = $controlGroup.find('.help-inline');

                    if (!$helpInline.length) {
                        $controlGroup.find('.controls').each(function () {
                            return $(this).append('<span class="help-inline"></span>');
                        });
                        $helpInline = $controlGroup.find('.help-inline');
                    }

                    $controlGroup.addClass('error');
                    if ($helpInline)
                        $helpInline.html(errorMessage);
                }
            };

            Validation.ClearValidation = function ($input) {
                var $controlGroup = $input.closest('.control-group'), $helpInline;

                if ($controlGroup) {
                    $helpInline = $controlGroup.find('.help-inline');
                    $controlGroup.removeClass('error').removeClass('success').removeClass('warning');
                    if ($helpInline)
                        $helpInline.empty();
                }
            };

            Validation.IsBlank = function ($input, errorMessage, displayMessage) {
                if (typeof errorMessage === "undefined") { errorMessage = 'Required Field'; }
                if (typeof displayMessage === "undefined") { displayMessage = true; }
                //refer to twitter bootstrap validation for html
                var valid = $input.val() ? true : false;

                if (!valid && displayMessage)
                    this.DisplayMessage($input, errorMessage);

                return valid;
            };

            Validation.IsEmail = function ($input, errorMessage, displayMessage) {
                if (typeof errorMessage === "undefined") { errorMessage = 'Invalid Email'; }
                if (typeof displayMessage === "undefined") { displayMessage = true; }
                var value = $input.val(), valid = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);

                if (!valid && displayMessage)
                    this.DisplayMessage($input, errorMessage);

                return valid;
            };

            Validation.IsPhone = function ($input, errorMessage, displayMessage) {
                if (typeof errorMessage === "undefined") { errorMessage = 'Invalid Phone (XXX) XXX-XXXX'; }
                if (typeof displayMessage === "undefined") { displayMessage = true; }
                var value = $input.val(), phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, valid = phoneRegex.test(value);

                if (valid) {
                    $input.val(value.replace(phoneRegex, "($1) $2-$3"));
                } else if (displayMessage) {
                    this.DisplayMessage($input, errorMessage);
                }

                return valid;
            };

            Validation.FormValid = function ($form) {
                var valid = true;

                $('[type="text"], [type="email"], [type="password"], [type="tel"]', $form).each(function () {
                    var $this = $(this), validateType = $this.attr('data-validator') || '';

                    Validation.ClearValidation($this);

                    switch (validateType) {
                        case 'required':
                            if (!Validation.IsBlank($this))
                                valid = false;
                            break;
                        case 'email':
                            if (!Validation.IsEmail($this))
                                valid = false;
                            break;
                        case 'tel':
                            if (!Validation.IsPhone($this))
                                valid = false;
                            break;
                    }

                    return true;
                });

                return valid;
            };
            return Validation;
        })();
        Forms.Validation = Validation;
    })(A7.Forms || (A7.Forms = {}));
    var Forms = A7.Forms;
})(A7 || (A7 = {}));
