/// <reference path="../configuration/configurationmanager.ts" />
/// <reference path="../utilities/objectutility.ts" />

namespace a7 {
    export function component(viewUrl: string = null, loadViewOnInit: boolean = true, selector: string = null) {
        return function (component: Function) { 
            var componentName = resolveComponentName(component);

            selector = selector || autoResolveComponentSelector(component);

            A7.Configuration.ConfigurationManager.RegisterDecoratorComponentOptions(<A7.Configuration.ComponentOptions>{ Name: componentName, Selector: selector, LoadViewOnInit: loadViewOnInit, ViewUrl: viewUrl });
        }

        function resolveComponentName(component: Function): string {
            return A7.Utilities.ObjectUtility.GetObjectName(component.prototype);
        }

        function autoResolveComponentSelector(component: Function): string {
            var componentName = resolveComponentName(component);

            return '#' + componentName.substr(0, 1).toLowerCase() + componentName.substr(1, componentName.length - 1);
        }
    }
}