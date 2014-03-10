/// <reference path="A7.Collection.ts" />
/// <reference path="../../declarations/crossroads.d.ts" />
/// <reference path="A7.INavigator.ts" />
/// <reference path="A7.Route.ts" />

module A7 {

    export class Router {

        constructor(public Routes: A7.ICollection<Route> = new A7.Collection<Route>()) {

            var url = window.location.pathname + window.location.search;            

            Routes.ForEach(route => crossroads.addRoute(route.Url, route.Action));

            this.RouteTo(url);
        }

        private processHtml4RelativePath(currentPath: string, relativePath: string): string {
            var baseUrl = currentPath.substring(currentPath.lastIndexOf('/') + 1);

            relativePath = relativePath.replace('./', '');

            return baseUrl + '/' + relativePath;
        }

        private resolveHtml4Path(url: string): string {

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
        }

        RouteTo(url: string, stateData: {} = {}): void {
            var host = window.location.hostname,
                port = window.location.port ? ':' + window.location.port : '',
                path = port ? url.replace(port, '') : url;

            path = this.resolveHtml4Path(path);

            if (path.indexOf(host) != -1) {
                path = path.split(host)[1];
            }

            crossroads.parse(path);
        }

    }



}