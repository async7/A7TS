/// <reference path="../framework/a7/core/page.ts" />
/// <reference path="../../tests/assets/components/testform.ts" />


class TestPage extends A7.Core.Page {

    constructor() {
        super();

        this._initialize().then(config => {

            var testForm = new Tests.Components.TestForm();

            testForm.Show();

        });

    }

}

$(() => new TestPage());