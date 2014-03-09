/// <reference path="A7.Collection.ts" />
/// <reference path="A7.AJAX.ts" />
/// <reference path="A7.Router.ts" />
/// <reference path="A7.Navigator.ts" />
/// <reference path="A7.Route.ts" />
/// <reference path="A7.Component.ts" />
/// <reference path="A7.INavigator.ts" />
var A7;
(function (A7) {
    var Page = (function () {
        function Page() {
            var _this = this;
            this._components = new A7.Collection();

            //Default Error Handling
            A7.AJAX.ErrorHandler[500] = function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            };

            //Configure Navigator
            this.Navigator = new A7.Navigator();
            this.Navigator.OnNavigate(function (navigateState) {
                _this._components.ForEach(function (component) {
                    component.Hide();
                });

                _this.Router.RouteTo(navigateState.Url, (navigateState.Data || null));
            });
        }
        Page.prototype.RegisterComponent = function (component) {
            this._components.Add(component);
        };
        return Page;
    })();
    A7.Page = Page;
})(A7 || (A7 = {}));
