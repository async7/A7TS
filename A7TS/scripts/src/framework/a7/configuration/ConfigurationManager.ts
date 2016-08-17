/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../http/httpclient.ts" />
/// <reference path="configurationfile.ts" />
/// <reference path="../collections/icollection.ts" />
/// <reference path="componentoptions.ts" />
/// <reference path="../collections/collection.ts" />


namespace A7.Configuration {

    export class ConfigurationManager {

        private static _decoratorComponentOptions: ComponentOptions[] = [];
        private static _componentOptions: A7.Collections.ICollection<ComponentOptions>;

        public static AppConfiguration: ConfigurationFile = new ConfigurationFile();

        public static Initialize(configFile: ConfigurationFile = null): JQueryPromise<ConfigurationFile> {

            if (configFile) {
                this.processConfig(configFile);
                return $.Deferred().resolve(this.AppConfiguration);
            }

            var onConfigLoaded = Http.HttpClient.Get<ConfigurationFile>("/scripts/appconfig.json");

            onConfigLoaded.then(loadedConfig => {
                this.processConfig(loadedConfig);
            });

            return onConfigLoaded;
        }

        public static GetAllComponentOptions(): A7.Collections.ICollection<ComponentOptions> {

            if (!this._componentOptions) {

                var separator = ' |';
                var componentNameIndex = (new Collections.Collection(this.AppConfiguration.Components)).Select(x => x.Name).ToArray().join(separator) + separator;
                var decoratorOptions = new A7.Collections.Collection(this._decoratorComponentOptions);
                var qualifyingDecoratorComponents = decoratorOptions.Where(x => componentNameIndex.indexOf(x.Name + separator) < 0);

                this._componentOptions = new Collections.Collection(this.AppConfiguration.Components);

                qualifyingDecoratorComponents.ForEach(x => {  
                    this._componentOptions.Add(x);
                });

            }

            return this._componentOptions;
        }

        public static GetComponentOptions(componentName: string): ComponentOptions {
            return this.GetAllComponentOptions().First(x => x.Name == componentName);
        }

        public static RegisterDecoratorComponentOptions(componentOptions: ComponentOptions) {
            this._decoratorComponentOptions.push(componentOptions);
        }

        private static processConfig(config: ConfigurationFile) {
            this.AppConfiguration = config;
            this.AppConfiguration.Components = this.GetAllComponentOptions().ToArray();
        }

    }

}