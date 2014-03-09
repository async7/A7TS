/// <reference path="A7.Collection.ts" />
/// <reference path="A7.AJAX.ts" />
/// <reference path="A7.Router.ts" />
/// <reference path="A7.Navigator.ts" />
/// <reference path="A7.Route.ts" />
/// <reference path="A7.Component.ts" />
/// <reference path="A7.INavigator.ts" />

module A7 {
    export class Page {

        _components: A7.ICollection<Component>;

        constructor () {

            this._components = new A7.Collection<Component>();

            //Default Error Handling            
            A7.AJAX.ErrorHandler[500] = (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                alert(errorThrown);
            };            

            //Configure Navigator
            this.Navigator = new A7.Navigator();
            this.Navigator.OnNavigate((navigateState) => {
               
                this._components.ForEach((component: Component) =>{
                    component.Hide();                    
                });

                this.Router.RouteTo(navigateState.Url, (navigateState.Data || null));

            });

        }

        RegisterComponent(component: Component): void { this._components.Add(component); }

        Navigator: A7.Interfaces.INavigator;

        Router: Router;
        
    }
}