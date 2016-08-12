/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../http/httpclient.ts" />


namespace A7.Configuration {

    export function GetAppConfiguration(): JQueryPromise<ConfigurationFile> {
        return Http.HttpClient.Get<ConfigurationFile>("/src/appconfig.json");
    }

}