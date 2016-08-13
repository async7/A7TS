/// <reference path="../configuration/configurationmanager.ts" />

namespace A7.Decorators {
    export function component(viewUrl: string = null, loadViewOnInit: boolean = true, selector: string = null) {
        return function (component: Function) {
            var componentName = resolveComponentName(component),
                componentOption = Configuration.ConfigurationManager.GetComponentOptions().First(x => x.Name == componentName);

            if (componentOption && componentOption.Selector) { //Set Selector from Config
                selector = componentOption.Selector;
            } else { //Set selector from decorator if provided, else auto resolve from component name
                selector = selector || autoResolveComponentSelector(component);
            }

            if (componentOption && componentOption.LoadViewOnInit) {
                loadViewOnInit = componentOption.LoadViewOnInit;
            }

            if (componentOption && componentOption.ViewUrl) {
                viewUrl = componentOption.ViewUrl;
            }

            A7.Configuration.ConfigurationManager.AppConfiguration.Components.push(<A7.Configuration.ComponentOptions>{ Name: componentName, Selector: selector, LoadViewOnInit: loadViewOnInit, ViewUrl: viewUrl });
        }

            function resolveComponentName(component: Function): string {
                return <string>component.prototype.constructor.toString().match(/function\s*(\w+)/)[1];
            }

            function autoResolveComponentSelector(component: Function): string {
                var componentName = resolveComponentName(component);

                return '#' + componentName.substr(0, 1).toLowerCase() + componentName.substr(1, componentName.length - 1);
            }
        }