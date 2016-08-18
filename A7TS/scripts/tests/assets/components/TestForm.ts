/// <reference path="../../../src/framework/a7/core/component.ts" />
/// <reference path="../../../src/framework/a7/decorators/component.ts" />
/// <reference path="../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../../../declarations/handlebars/handlebars.d.ts" />
/// <reference path="../../../src/framework/a7/decorators/bindtemplate.ts" />
/// <reference path="../../../src/framework/a7/decorators/bindproperty.ts" />

namespace Tests.Components {

    @A7.Decorators.component('/scripts/tests/assets/components/testform.html')
    export class TestForm extends A7.Core.Component {

        @A7.Decorators.bindProperty()
        private _searchButton: JQuery;

        @A7.Decorators.bindTemplate()
        private _listTemplate: HandlebarsTemplateDelegate;

        constructor() {
            super();
           
        }        

        Show() {
            this._initialize().then(() => {

                this._searchButton.click(e => {
                    alert(this._listTemplate({}));
                });

            });
        }

    }

}