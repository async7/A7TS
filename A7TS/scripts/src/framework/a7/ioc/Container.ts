/// <reference path="../../../../declarations/inversify/inversify.d.ts" />

namespace A7.Ioc {

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

        GetInstance(type: any): any {
            return this._kernel.get<any>(type);
        }

        Register(serviceType: any, implementationType: any) {
            this._kernel.bind<any>(serviceType).to(implementationType);
        }

        RegisterSingleton(serviceType: any, implementationType: any) {
            this._kernel.bind<any>(serviceType).to(implementationType).inSingletonScope();
        }

        RegisterSelf(instance: any) {
            this._kernel.bind<any>(instance).toSelf();
        }

    }

    export var Container = IocContainer.GetContainer();
}