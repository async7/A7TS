/// <reference path="../collections/collection.ts" />
/// <reference path="../collections/icollection.ts" />
/// <reference path="../http/httpclient.ts" />
/// <reference path="../routing/router.ts" />
/// <reference path="../routing/route.ts" />
/// <reference path="../navigation/navigator.ts" />
/// <reference path="../logging/logmanager.ts" />
/// <reference path="../configuration/configurationmanager.ts" />

namespace A7.Core {
    export class Page {

        private _components: A7.Collections.ICollection<Component>;
        private _logger: A7.Logging.ILogger;

        constructor() {
                
            this._components = new A7.Collections.Collection<Component>();
            this._logger = Logging.LogManager.GetLogger("Page");

            //Default Error Handling            
            A7.Http.HttpClient.ErrorHandler[500] = (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                this._logger.error("Internal Server Error: ", jqXHR, " ", textStatus, " ", errorThrown);
            };            

            //Configure Navigator
            this.Navigator = new A7.Navigation.Navigator();
            this.Navigator.OnNavigate((navigateState) => {
               
                this._components.ForEach((component: Component) =>{
                    component.Hide();                    
                });

                this.Router.RouteTo(navigateState.Url, (navigateState.Data || null));

            });

        }

        protected _initialize(): JQueryPromise<Configuration.ConfigurationFile> {
            return Configuration.ConfigurationManager.Initialize();
        }

        RegisterComponent(component: Component): void { this._components.Add(component); }

        Navigator: A7.Navigation.INavigator;

        Router: A7.Routing.Router;
        
    }
}