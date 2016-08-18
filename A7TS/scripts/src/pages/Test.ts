/// <reference path="../framework/a7/core/page.ts" />
/// <reference path="../../tests/assets/components/testform.ts" />
/// <reference path="../../declarations/inversify/inversify.d.ts" />
/// <reference path="../services/testservice.ts" />
/// <reference path="../framework/a7/cache/browsercache.ts" />


class TestPage extends A7.Core.Page {

    constructor() {
        super();

        this._initialize().then(config => {

            var kernel = new inversify.Kernel();

            kernel.bind<Services.ITestService>(Services.ITestService).to(Services.TestService);
            kernel.bind<A7.Cache.ICacheProvider>(A7.Cache.ICacheProvider).to(A7.Cache.BrowserCache).inSingletonScope();
            kernel.bind<Tests.Components.TestForm>(Tests.Components.TestForm).toSelf();

            var cacheProvider = kernel.get(A7.Cache.ICacheProvider),
                cachedData = cacheProvider.Get<string>('Alien', () => $.Deferred().resolve("What's John Lennon's username: "));

              var testForm = kernel.get(Tests.Components.TestForm);

            testForm.Show();

        });

    }

}

$(() => new TestPage());