/// <reference path="A7.Collection.ts" />
/// <reference path="../../declarations/crossroads.d.ts" />
/// <reference path="A7.INavigator.ts" />
/// <reference path="A7.Route.ts" />
var A7;
(function (A7) {
    var Router = (function () {
        function Router(Routes) {
            if (typeof Routes === "undefined") { Routes = new A7.Collection(); }
            this.Routes = Routes;
            var url = window.location.pathname + window.location.search;

            Routes.ForEach(function (route) {
                return crossroads.addRoute(route.Url, route.Action);
            });

            this.RouteTo(url);
        }
        Router.prototype.processHtml4RelativePath = function (currentPath, relativePath) {
            var baseUrl = currentPath.substring(currentPath.lastIndexOf('/') + 1);

            relativePath = relativePath.replace('./', '');

            return baseUrl + '/' + relativePath;
        };

        Router.prototype.resolveHtml4Path = function (url) {
            //test if html4 browser (i.e., does not have pushstate)
            if (!(window.history && history.pushState) && url.indexOf('#') != -1) {
                //History.js logic for html4 browsers [root url]#[new url]
                //  new url relative path - prefixed with './' or no slash
                //  new url absolute path - prefixed with '/'
                var newPath = url.split('#')[1];

                if (newPath.indexOf('/') != 0) {
                    return this.processHtml4RelativePath(url, newPath);
                }
            }
            return url;
        };

        Router.prototype.RouteTo = function (url, stateData) {
            if (typeof stateData === "undefined") { stateData = {}; }
            var host = window.location.hostname, port = window.location.port ? ':' + window.location.port : '', path = port ? url.replace(port, '') : url;

            path = this.resolveHtml4Path(path);

            if (path.indexOf(host) != -1) {
                path = path.split(host)[1];
            }

            crossroads.parse(path);
        };
        return Router;
    })();
    A7.Router = Router;
})(A7 || (A7 = {}));
