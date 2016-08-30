/// <reference path="../../tests/assets/components/testform.ts" />
/// <reference path="../services/testservice.ts" />
/// <reference path="../framework/a7/cache/browsercache.ts" />
/// <reference path="../framework/a7/ioc/container.ts" />
/// <reference path="../framework/a7/core/page.ts" />


class TestPage extends A7.Core.Page {


    _cacheProvider: A7.Cache.ICacheProvider;
    _testForm: Tests.Components.TestForm;

    constructor() {
        super();

        this._initialize().then(config => {

            A7.Ioc.Container.Register(Services.ITestService, Services.TestService);
            A7.Ioc.Container.RegisterSingleton(A7.Cache.ICacheProvider, A7.Cache.BrowserCache);
            A7.Ioc.Container.RegisterSelf(Tests.Components.TestForm);

            this._cacheProvider = A7.Ioc.Container.GetInstance(A7.Cache.ICacheProvider);

             var   cachedData = this._cacheProvider.Get<string>('Alien', () => $.Deferred().resolve("What's John Lennon's username: "));

             this._testForm = A7.Ioc.Container.GetInstance(Tests.Components.TestForm);

             this._testForm.Show();

        });

    }

}

$(() => new TestPage());