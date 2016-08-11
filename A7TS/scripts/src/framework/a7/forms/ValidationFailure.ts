/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Forms {

    export class ValidationFailure {
        Element: JQuery;
        Message: string;
        Type: ValidationType;
        Context: string;
    }

    export enum ValidationType {
        CUSTOM,
        REQUIRED,
        EMAIL,
        PHONE,
        MIN_LENGTH,
        REGEX
    }

}