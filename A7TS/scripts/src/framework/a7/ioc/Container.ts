/// <reference path="../../../../declarations/inversify/inversify.d.ts" />

namespace A7.Ioc {

    export var Container = IocContainer.GetContainer();
    var _container: IocContainer;

    class IocContainer {

        private _kernel: inversify.interfaces.Kernel;

        constructor() {
            this._kernel = new inversify.Kernel();
        }

        static GetContainer(): IocContainer {
            if (_container) return _container;

            _container = new IocContainer();

            return _container;
        }

        GetInstance<T>(type: T) {
            this._kernel.get<T>(type);
        }

        Register<TService>(serviceType: TService, implementationType: any) {
            this._kernel.bind<TService>(serviceType).to(implementationType);
        }

        RegisterSingleton<TService>(serviceType: TService, implementationType: any) {
            this._kernel.bind<TService>(serviceType).to(implementationType).inSingletonScope();
        }

        RegisterSelf<TInstance>(instance: TInstance) {
            this._kernel.bind<TInstance>(instance).toSelf();
        }

    }

}