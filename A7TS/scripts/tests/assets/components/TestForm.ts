﻿/// <reference path="../../../src/framework/a7/core/component.ts" />
/// <reference path="../../../src/framework/a7/decorators/component.ts" />

namespace Tests.Components {

    @A7.Decorators.component('/scripts/test/assets/components/testform.html')
    export class TestForm extends A7.Core.Component {

        constructor() {
            super();
        }        

    }

}