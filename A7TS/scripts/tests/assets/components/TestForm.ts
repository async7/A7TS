/// <reference path="../../../src/framework/a7/cache/icacheprovider.ts" />
/// <reference path="../../../src/framework/a7/core/component.ts" />
/// <reference path="../../../src/framework/a7/decorators/component.ts" />
/// <reference path="../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../../../declarations/handlebars/handlebars.d.ts" />
/// <reference path="../../../src/framework/a7/decorators/bindtemplate.ts" />
/// <reference path="../../../src/framework/a7/decorators/bindproperty.ts" />
/// <reference path="../../../src/services/testservice.ts" />
/// <reference path="../../../src/framework/a7/decorators/inject.ts" />

namespace Tests.Components {    

    @a7.component('/scripts/tests/assets/components/testform.html')
    export class TestForm extends A7.Core.Component {

        @a7.bindProperty()
        private _searchButton: JQuery;
        
        @a7.bindTemplate()
        private _listTemplate: HandlebarsTemplateDelegate;

        private _userService: Services.ITestService;
        private _cacheProvider: A7.Cache.ICacheProvider;

        constructor(
            @a7.inject(Services.ITestService) userService: Services.ITestService,
            @a7.inject(A7.Cache.ICacheProvider) cacheProvider: A7.Cache.ICacheProvider
        ) {
            super();

            this._userService = userService;
            this._cacheProvider = cacheProvider;
        }        

        Show() {
            this._initialize().then(() => {

                this._searchButton.click(e => {
                    var templateMessage = this._listTemplate({});
                    this._cacheProvider.Get<string>('Alien', () => $.Deferred().resolve('Who is an alien? ')).then(prefix => {
                        alert(prefix + this._userService.GetUsers().First(x => x.FirstName == 'John').UserName + ' ' + templateMessage);
                    });
                });

            });
        }

    }

}