/// <reference path="../../../src/framework/a7/core/component.ts" />
/// <reference path="../../../src/framework/a7/decorators/component.ts" />
/// <reference path="../../../src/framework/a7/decorators/bindevent.ts" />
/// <reference path="../../../declarations/jquery/jquery.d.ts" />

namespace Tests.Components {

    @A7.Decorators.component('/scripts/tests/assets/components/testform.html')
    export class TestForm extends A7.Core.Component {

        @A7.Decorators.bindEvent('click', 'button', e => console.log($(e.target).selector))
        OnBtnClick: (handler: () => void ) => void;

        constructor() {
            super();
           
        }        

        Show() {
            this._initialize().then(() => {
                this.OnBtnClick(() => {
                    console.trace('Worked');
                });
            });
        }

    }

}