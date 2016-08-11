/// <reference path="../collections/icollection.ts" />
/// <reference path="../collections/collection.ts" />
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="ivalidationstyler.ts" />
/// <reference path="validationfailure.ts" />
/// <reference path="validationresult.ts" />

namespace A7.Forms {

    export class Validator {

        static Validate($form: JQuery, validationFailureStyle: IValidationStyler = null, customValidation: ($form: JQuery) => JQueryPromise<ValidationResult> = null): JQueryPromise<ValidationResult> {
            var dfd = $.Deferred<ValidationResult>(),
                elements = this.getElementsToValidate($form),
                failures = new Collections.Collection<ValidationFailure>([]),
                promise = dfd.promise();

            elements.ForEach(x => {
                var validateResults = this.validateElement(x);

                validateResults.ForEach(validateResult => {
                    if (!validateResult.IsValid) {
                        failures.Add(validateResult.Failures.Item(0));
                    } else {
                        validationFailureStyle.ClearValidation(x);
                    }
                });
            });

            if (customValidation) {
                customValidation($form).then(x => {
                    x.Failures.ForEach(f => failures.Add(f));
                    failures.Length() > 0 ? dfd.reject(<ValidationResult>{ IsValid: false, Failures: failures }) : dfd.resolve(<ValidationResult>{ IsValid: true, Failures: failures });
                });
            } else {
                failures.Length() > 0 ? dfd.reject(<ValidationResult>{ IsValid: false, Failures: failures }) : dfd.resolve(<ValidationResult>{ IsValid: true, Failures: failures });
            }

            if (validationFailureStyle) promise.fail(result => validationFailureStyle.RenderValidation($form, <A7.Forms.ValidationResult>result));

            return promise;
        }

        static IsBlank($element: JQuery, errorMessage: string = 'Required Field', context: string = null): ValidationResult {
            return this.createValidationResult($element, errorMessage, context, ValidationType.REQUIRED, (x) => x.val() ? true : false);
        }

        static IsEmail($element: JQuery, errorMessage: string = 'Invalid Email', context: string = null): ValidationResult {
            var emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
            return this.createValidationResult($element, errorMessage, context, ValidationType.EMAIL, (x) => emailRegex.test(x.val()));
        }

        static IsPhoneNumber($element: JQuery, errorMessage: string = 'Invalid Phone', context: string = null): ValidationResult {
            var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            return this.createValidationResult($element, errorMessage, context, ValidationType.PHONE, (x) => phoneRegex.test(x.val()));
        }

        static HasMinimumLength($element: JQuery, minimumLength: number, errorMessage: string = 'Value Must Be {0} Characters', context: string = null): ValidationResult {
            return this.createValidationResult($element, errorMessage, context, ValidationType.MIN_LENGTH, (x) => x.val().length >= minimumLength);
        }

        static MatchesRegexPattern($element: JQuery, regexPattern: RegExp, errorMessage: string = 'Invalid Value', context: string = null): ValidationResult {
            return this.createValidationResult($element, errorMessage, context, ValidationType.REGEX, (x) => regexPattern.test(x.val()));
        }

        private static validateElement($element: JQuery, errorMessage: string = null, context: string = null): Collections.ICollection<ValidationResult> {
            var validateTypes = ($element.attr('data-validator') || '').split(' '),
                regexPattern = new RegExp($element.attr('data-pattern') || ''),
                minimumLength = <number>($element.attr("data-minlength") || 0),
                validationResult = <ValidationResult>{ IsValid: true, Failures: new Collections.Collection([]) },
                errorMessage = errorMessage || $element.attr('data-validator-message');

            return (new Collections.Collection(validateTypes)).Select(validateType => {
                switch (validateType) {
                    case 'required':
                        validationResult = errorMessage ? Validator.IsBlank($element, errorMessage) : Validator.IsBlank($element);
                        break;
                    case 'minlength':
                        validationResult = errorMessage ? Validator.HasMinimumLength($element, minimumLength, errorMessage) : Validator.HasMinimumLength($element, minimumLength);
                        break;
                    case 'email':
                        validationResult = errorMessage ? Validator.IsEmail($element, errorMessage) : Validator.IsEmail($element);
                        break;
                    case 'tel':
                        validationResult = errorMessage ? Validator.IsPhoneNumber($element, errorMessage) : Validator.IsPhoneNumber($element);
                        break;
                    case "regex":
                        validationResult = Validator.MatchesRegexPattern($element, regexPattern, errorMessage, context);
                        break;
                }
                return validationResult;
            });
        }

        private static getElementsToValidate($form: JQuery): Collections.ICollection<JQuery> {
            var $inputs = new Collections.Collection<JQuery>();

            $('[type="text"], [type="email"], [type="password"], [type="tel"], textarea, select', $form).each(function () {
                var $this = $(this);
                $inputs.Add($this);
            });

            return $inputs;
        }

        private static createValidationResult($element: JQuery, errorMessage: string, context: string, validationType: ValidationType, validate: ($element) => boolean) {
            var valid = validate($element),
                validationResult = <ValidationResult>{
                    IsValid: valid,
                    Failures: valid ? null : <Collections.ICollection<ValidationFailure>>(new Collections.Collection<ValidationFailure>([<ValidationFailure>{
                        Element: $element,
                        Message: errorMessage,
                        Type: validationType,
                        Context: context
                    }]))
                };

            return validationResult;
        }

    }

}