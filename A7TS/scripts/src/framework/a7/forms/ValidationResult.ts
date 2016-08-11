/// <reference path="../collections/icollection.ts" />

namespace A7.Forms {

    export class ValidationResult {

        IsValid: boolean;
        Failures: Collections.ICollection<ValidationFailure>;

    }

}