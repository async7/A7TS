/// <reference path="../collections/collection.ts" />

namespace A7.Core {

    export class ComponentConfigManager {

        private _componentConfigs: Collections.ICollection<ComponentConfig>;
        private VIEW_PATH_ROOT: string = '';

        constructor(componentConfigs: ComponentConfig[]) {
            this._componentConfigs = new A7.Collections.Collection<ComponentConfig>(componentConfigs);
        }
        
        //public GetConfig(component: Object) {

        //    var config = this._componentConfigs.First(x => x.Component == component);

        //    if (!config) {
        //        config = new ComponentConfig(component);
        //    }

            
        //}

        //private getComponentName(component: Object): string {
        //    return this.constructor.toString().match(/function\s*(\w+)/)[1];
        //}

        //private resolveViewPath(config: ComponentConfig): string {
            
        //}
        
    }

}