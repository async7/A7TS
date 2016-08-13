/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../http/httpclient.ts" />
/// <reference path="configurationfile.ts" />
/// <reference path="../collections/icollection.ts" />
/// <reference path="componentoptions.ts" />
/// <reference path="../collections/collection.ts" />


namespace A7.Configuration {

    export class ConfigurationManager {

        public static AppConfiguration: ConfigurationFile = new ConfigurationFile();

        public static Initialize(configFile: ConfigurationFile = null): JQueryPromise<ConfigurationFile> {

            if (configFile) {

                this.AppConfiguration.EnableLogging = configFile.EnableLogging;
                this.resovleComponentOptions(configFile);

                return $.Deferred().resolve(this.AppConfiguration);
            }

            var onConfigLoaded = Http.HttpClient.Get<ConfigurationFile>("/src/appconfig.json");

            onConfigLoaded.then(loadedConfig => {

                this.AppConfiguration.EnableLogging = loadedConfig.EnableLogging;
                this.resovleComponentOptions(loadedConfig);

            });

            return onConfigLoaded;
        }

        public static GetComponentOptions(): A7.Collections.ICollection<ComponentOptions> {
            return new Collections.Collection(this.AppConfiguration.Components);
        }

        private static resovleComponentOptions(configFile: ConfigurationFile) {
            var configComponents = new A7.Collections.Collection(configFile.Components);
            var decoratorComponents = this.GetComponentOptions();

            configComponents.ForEach(configFileComponent => {
                decoratorComponents = decoratorComponents.Where(x => x.Name != configFileComponent.Name);
            });

            //this.AppConfiguration.Components = [];
            this.AppConfiguration.Components.concat(configComponents.ToArray());
            //this.AppConfiguration.Components.concat(decoratorComponents.ToArray());
        }
    }

}