 /// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../http/httpclient.ts" />
/// <reference path="configurationfile.ts" />


namespace A7.Configuration {

    export class ConfigurationManager {

        public static AppConfiguration: ConfigurationFile = new ConfigurationFile();

        public static Initialize(): JQueryPromise<ConfigurationFile> {
            var onConfigLoaded = Http.HttpClient.Get<ConfigurationFile>("/src/appconfig.json");

            onConfigLoaded.then(config => this.AppConfiguration = config);
        
        return onConfigLoaded;
        }
    }

}