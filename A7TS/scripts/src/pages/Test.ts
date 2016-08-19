/// <reference path="../../tests/assets/components/testform.ts" />
/// <reference path="../services/testservice.ts" />
/// <reference path="../framework/a7/cache/browsercache.ts" />
/// <reference path="../framework/a7/ioc/container.ts" />
/// <reference path="../framework/a7/core/page.ts" />


class TestPage extends A7.Core.Page {

    constructor() {
        super();

        this._initialize().then(config => {

            A7.Ioc.Container.Register<Services.ITestService>(Services.ITestService, Services.TestService);
            A7.Ioc.Container.RegisterSingleton<A7.Cache.ICacheProvider>(A7.Cache.ICacheProvider, A7.Cache.BrowserCache);
            A7.Ioc.Container.RegisterSelf<Tests.Components.TestForm>(Tests.Components.TestForm);

            var cacheProvider = A7.Ioc.Container.GetInstance<A7.Cache.ICacheProvider>(A7.Cache.ICacheProvider),
                cachedData = cacheProvider.Get<string>('Alien', () => $.Deferred().resolve("What's John Lennon's username: "));

            var testForm = A7.Ioc.Container.GetInstance<Tests.Components.TestForm>(Tests.Components.TestForm);

            testForm.Show();

        });

    }

}

$(() => new TestPage());