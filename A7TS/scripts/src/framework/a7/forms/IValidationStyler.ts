/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Forms {

    export interface IValidationStyler {

        ClearValidation($form: JQuery);
        RenderValidation($form: JQuery, validationResult: ValidationResult);

    }

}