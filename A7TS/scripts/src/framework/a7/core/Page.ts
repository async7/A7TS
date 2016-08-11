/// <reference path="../collections/collection.ts" />
/// <reference path="../collections/icollection.ts" />
/// <reference path="../http/httpclient.ts" />
/// <reference path="../routing/router.ts" />
/// <reference path="../routing/route.ts" />
/// <reference path="../navigation/navigator.ts" />

namespace A7.Core {
    export class Page {

        _components: A7.Collections.ICollection<Component>;

        constructor() {

            this._components = new A7.Collections.Collection<Component>();

            //Fix for < IE9 missing console
            if (typeof console == "undefined" || typeof console.log == "undefined")
                console = <any>{ log: function () { } };

            //Default Error Handling            
            A7.Http.HttpClient.ErrorHandler[500] = (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                console.log("[Admin][init] error: ", jqXHR, " ", textStatus, " ", errorThrown);
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

        RegisterComponent(component: Component): void { this._components.Add(component); }

        Navigator: A7.Navigation.INavigator;

        Router: A7.Routing.Router;
        
    }
}