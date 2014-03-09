/// <reference path="../../declarations/underscore.d.ts" />
var A7;
(function (A7) {
    var Collection = (function () {
        function Collection(collection) {
            if (typeof collection === "undefined") { collection = []; }
            this._collection = collection;
        }
        Collection.prototype.Select = function (iterator) {
            return new Collection(_.map(this._collection, iterator) || []);
        };

        Collection.prototype.Where = function (iterator) {
            return new Collection(_.filter(this._collection, iterator) || []);
        };

        Collection.prototype.ForEach = function (iterator) {
            _.forEach(this._collection, iterator);
        };

        Collection.prototype.OrderByProperty = function (propertyName, direction) {
            if (typeof direction === "undefined") { direction = 'asc'; }
            this._collection = _.sortBy(this._collection, propertyName);
            if (direction == 'desc')
                this._collection.reverse();
            return this;
        };

        Collection.prototype.OrderByIterator = function (iterator) {
            this._collection = _.sortBy(this._collection, iterator);
            return this;
        };

        Collection.prototype.Pluck = function (propertyName) {
            return new Collection(_.pluck(this._collection, propertyName) || []);
        };

        Collection.prototype.Reduce = function (iterator, memo) {
            return new Collection(_.reduce(this._collection, iterator, memo) || []);
        };

        Collection.prototype.Any = function (iterator) {
            return _.some(this._collection, iterator);
        };

        Collection.prototype.Contains = function (value) {
            return _.contains(this._collection, value);
        };

        Collection.prototype.First = function (iterator) {
            return _.find(this._collection, iterator);
        };

        Collection.prototype.Reverse = function () {
            return new Collection(this._collection.reverse());
        };

        //alias: for Count
        Collection.prototype.Length = function () {
            return this.Count();
        };

        Collection.prototype.Count = function () {
            return this._collection.length;
        };

        Collection.prototype.Item = function (index) {
            return this._collection[index];
        };

        Collection.prototype.Push = function (item) {
            this._collection.push(item);
        };

        //alias: for Push
        Collection.prototype.Add = function (item) {
            this.Push(item);
        };

        Collection.prototype.ToArray = function () {
            return this._collection;
        };
        return Collection;
    })();
    A7.Collection = Collection;
})(A7 || (A7 = {}));
/// <reference path="A7.Collection.ts" />
/// <reference path="../../declarations/jquery.d.ts" />
var A7;
(function (A7) {
    (function (AJAX) {
        function executeRequest(url, data, dataType, httpVerb, cache, contentType) {
            var dfd = $.Deferred();

            if (contentType == 'application/json')
                data = JSON.stringify(data);

            $.ajax(url, {
                type: httpVerb,
                data: data,
                dataType: dataType,
                contentType: contentType,
                cache: cache,
                success: function (result) {
                    dfd.resolve(result);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if ((AJAX.ErrorHandler || [])[jqXHR.status]) {
                        AJAX.ErrorHandler[jqXHR.status](jqXHR, textStatus, errorThrown);
                    }
                    dfd.reject(jqXHR, textStatus, errorThrown);
                }
            });

            return dfd.promise();
        }

        AJAX.ErrorHandler = [];

        function Put(url, data, dataType, cache, contentType) {
            if (typeof dataType === "undefined") { dataType = "json"; }
            if (typeof cache === "undefined") { cache = false; }
            if (typeof contentType === "undefined") { contentType = "application/json"; }
            return executeRequest(url, data, dataType, 'put', false, contentType);
        }
        AJAX.Put = Put;

        function Get(url, data, dataType, cache, contentType) {
            if (typeof dataType === "undefined") { dataType = "json"; }
            if (typeof cache === "undefined") { cache = false; }
            if (typeof contentType === "undefined") { contentType = "application/x-www-form-urlencoded"; }
            return executeRequest(url, data, dataType, 'get', false, contentType);
        }
        AJAX.Get = Get;

        function GetCollection(url, data, dataType, cache, contentType) {
            if (typeof dataType === "undefined") { dataType = "json"; }
            if (typeof cache === "undefined") { cache = false; }
            if (typeof contentType === "undefined") { contentType = "application/x-www-form-urlencoded"; }
            var dfd = $.Deferred();

            executeRequest(url, data, dataType, 'get', false, contentType).then(function (results) {
                return dfd.resolve(new A7.Collection(results));
            }, dfd.reject);

            return dfd.promise();
        }
        AJAX.GetCollection = GetCollection;

        function GetHtml(url, cache) {
            if (typeof cache === "undefined") { cache = false; }
            return this.Get(url, null, 'html', cache);
        }
        AJAX.GetHtml = GetHtml;

        function Post(url, data, dataType, cache, contentType) {
            if (typeof dataType === "undefined") { dataType = "json"; }
            if (typeof cache === "undefined") { cache = false; }
            if (typeof contentType === "undefined") { contentType = "application/json"; }
            return executeRequest(url, data, dataType, 'post', false, contentType);
        }
        AJAX.Post = Post;

        function Delete(url, data, dataType, cache, contentType) {
            if (typeof dataType === "undefined") { dataType = "json"; }
            if (typeof cache === "undefined") { cache = false; }
            if (typeof contentType === "undefined") { contentType = "application/json"; }
            return executeRequest(url, data, dataType, 'delete', false, contentType);
        }
        AJAX.Delete = Delete;
    })(A7.AJAX || (A7.AJAX = {}));
    var AJAX = A7.AJAX;
})(A7 || (A7 = {}));
///<reference path="A7.AJAX.ts" />
///<reference path="../../declarations/jquery.d.ts" />
var A7;
(function (A7) {
    var Service = (function () {
        function Service(url) {
            this.CREATED_EVENT = 'Created';
            this.UPDATED_EVENT = 'Updated';
            this.DELETED_EVENT = 'Deleted';
            this._url = url;
        }
        Service.prototype.handleWebRequest = function (promise, eventName) {
            if (typeof eventName === "undefined") { eventName = null; }
            var dfd = $.Deferred(), __this = this;

            $.when(promise).done(function (response) {
                !eventName || $(__this).trigger(eventName, [response]);
                dfd.resolve(response);
            }).fail(dfd.reject);

            return dfd.promise();
        };

        Service.prototype.GetById = function (id) {
            return this.handleWebRequest(A7.AJAX.Get(this._url + '/' + id));
        };

        Service.prototype.Insert = function (model) {
            return this.handleWebRequest(A7.AJAX.Post(this._url, model), this.CREATED_EVENT);
        };

        Service.prototype.Update = function (model) {
            return this.handleWebRequest(A7.AJAX.Put(this._url, model), this.UPDATED_EVENT);
        };

        Service.prototype.DeleteById = function (id) {
            return this.handleWebRequest(A7.AJAX.Delete(this._url + '/' + id), this.DELETED_EVENT);
        };

        Service.prototype.OnCreate = function (fnHandler) {
            $(this).on(this.CREATED_EVENT, fnHandler);
        };

        Service.prototype.OnUpdate = function (fnHandler) {
            $(this).on(this.UPDATED_EVENT, fnHandler);
        };

        Service.prototype.OnDelete = function (fnHandler) {
            $(this).on(this.DELETED_EVENT, fnHandler);
        };

        Service.prototype.OnModified = function (fnHandler) {
            var _this = this;
            this.OnCreate(function (event, response) {
                fnHandler(event, response, _this.CREATED_EVENT);
            });
            this.OnUpdate(function (event, response) {
                fnHandler(event, response, _this.UPDATED_EVENT);
            });
            this.OnDelete(function (event, response) {
                fnHandler(event, response, _this.DELETED_EVENT);
            });
        };
        return Service;
    })();
    A7.Service = Service;
})(A7 || (A7 = {}));
/// <reference path="../common/A7.Collection.ts" />
/// <reference path="../common/A7.Service.ts" />
/// <reference path="../models/Log.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Services;
(function (Services) {
    var LogService = (function (_super) {
        __extends(LogService, _super);
        function LogService(url) {
            if (typeof url === "undefined") { url = 'api/log'; }
            _super.call(this, url);
        }
        LogService.prototype.Get = function (onlyLatestLog) {
            if (typeof onlyLatestLog === "undefined") { onlyLatestLog = false; }
            var url = this._url + '?onlylatestlog={onlylatestlog}';
            url = url.replace(/{onlyLatestLog}/gi, onlyLatestLog.toString());
            return A7.AJAX.GetCollection(url);
        };

        LogService.prototype.Insert = function (log) {
            return _super.prototype.Insert.call(this, log);
        };
        return LogService;
    })(A7.Service);
    Services.LogService = LogService;
})(Services || (Services = {}));
/// <reference path="../../../declarations/jquery.d.ts" />
/// <reference path="cache/A7.Cache.ICacheProvider.ts" />
/// <reference path="A7.AJAX.ts" />
/// <reference path="../../declarations/jquery.d.ts" />
var A7;
(function (A7) {
    var Component = (function () {
        function Component(selector, cacheProvider) {
            if (typeof cacheProvider === "undefined") { cacheProvider = null; }
            this._initialized = false;
            this._$el = $(selector);
            this._cacheProvider = cacheProvider;
        }
        Component.prototype._Initialize = function (fnInit) {
            var _this = this;
            var dfd = $.Deferred();

            if (!this._initialized) {
                fnInit().then(function () {
                    _this._$el.show();
                    _this._initialized = true;
                    dfd.resolve();
                });
            } else {
                this._$el.show();
                dfd.resolve();
            }

            return dfd.promise();
        };

        Component.prototype._LoadView = function (url, fromCache) {
            if (typeof fromCache === "undefined") { fromCache = false; }
            var _this = this;
            var dfd = $.Deferred();
            A7.AJAX.GetHtml(url, fromCache).then(function (html) {
                _this._$el.html(html);
                dfd.resolve();
            });
            return dfd.promise();
        };

        Component.prototype.Hide = function () {
            this._$el.hide();
        };

        Component.prototype.Show = function () {
            var options = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                options[_i] = arguments[_i + 0];
            }
            this._$el.show(options);
        };
        return Component;
    })();
    A7.Component = Component;
})(A7 || (A7 = {}));
var Components;
(function (Components) {
    /// <reference path="../../../declarations/moment.d.ts" />
    /// <reference path="../../services/LogService.ts" />
    /// <reference path="../../common/A7.Component.ts" />
    (function (Home) {
        var RecentLogTable = (function (_super) {
            __extends(RecentLogTable, _super);
            function RecentLogTable(selector, logService) {
                _super.call(this, selector);

                this._logService = logService;
                this._$tbody = this._$el.find('tbody');

                this.renderRecentLogTable();
            }
            RecentLogTable.prototype.renderRecentLogTable = function () {
                var _this = this;
                this._logService.Get(true).then(function (logs) {
                    var html = logs.Select(function (log) {
                        return '<tr><td>' + _this.renderLogType(log) + '</td><td>' + log.Source + '</td><td>' + moment(log.PostedDate).calendar() + '</td><td>' + log.Message + '</td></tr>';
                    }).ToArray().join('');
                    _this._$tbody.html(html);
                });
            };

            RecentLogTable.prototype.renderLogType = function (log) {
                var html = '<span class="label label-{labelType}">' + log.LogType + '</span>', labelType = 'default';

                switch (log.LogType.toUpperCase()) {
                    case 'DEBUG':
                        labelType = 'primary';
                        break;
                    case 'INFO':
                        labelType = 'info';
                        break;
                    case 'WARN':
                        labelType = 'warning';
                        break;
                    case 'ERROR':
                        labelType = 'danger';
                        break;
                    case 'FATAL':
                        labelType = 'danger';
                        break;
                    default:
                        labelType = 'default';
                }

                return html.replace('{labelType}', labelType);
            };
            return RecentLogTable;
        })(A7.Component);
        Home.RecentLogTable = RecentLogTable;
    })(Components.Home || (Components.Home = {}));
    var Home = Components.Home;
})(Components || (Components = {}));
/// <reference path="../../declarations/crossroads.d.ts" />
var A7;
(function (A7) {
    var Route = (function () {
        function Route(url, action) {
            this.Url = url;
            this.Action = action;
        }
        return Route;
    })();
    A7.Route = Route;
})(A7 || (A7 = {}));
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
/// <reference path="../../../declarations/jquery.d.ts" />
/// <reference path="../../../declarations/underscore.d.ts" />
var A7;
(function (A7) {
    (function (Utilities) {
        var ObjectUtility = (function () {
            function ObjectUtility() {
            }
            ObjectUtility.ObjectsEqual = /**
            * Test if all properties and values in calling object are equal to provided object
            * @param {object} objectA - object 1 to source
            * @param {object} objectB - object 2 to target
            * @returns {bool} True is returned if objectB has same properties and values as objectA
            */
            function (objectA, objectB) {
                for (var prop in objectA)
                    if (objectB[prop] != objectA[prop])
                        return false;

                return true;
            };

            ObjectUtility.ExtendObject = function (objectToExtend, extendWith) {
                _.extend(objectToExtend, extendWith);
            };

            ObjectUtility.Map = function (source, dest) {
                var destProps = [];

                for (var prop in dest) {
                    destProps.push(prop);
                }

                for (var prop in source) {
                    if ($.inArray(prop, destProps) > -1)
                        dest[prop] = source[prop];
                }
                return dest;
            };
            return ObjectUtility;
        })();
        Utilities.ObjectUtility = ObjectUtility;
    })(A7.Utilities || (A7.Utilities = {}));
    var Utilities = A7.Utilities;
})(A7 || (A7 = {}));
/// <reference path="utililties/A7.Utilities.ObjectUtility.ts" />
/// <reference path="../../declarations/jquery.d.ts" />
/// <reference path="A7.INavigator.ts" />
var A7;
(function (A7) {
    var Navigator = (function () {
        function Navigator() {
            var _this = this;
            this.STATE_CHANGE_EVENT = 'statechange';
            this._history = (window).History;

            if (this._history.enabled) {
                this._history.Adapter.bind(window, 'statechange', function () {
                    var state = _this._history.getState();
                    $(_this).trigger(_this.STATE_CHANGE_EVENT, [{ Url: state.url, Title: state.title, Data: (state.data || {}) }]);
                });
            }
        }
        Navigator.prototype.handleStateChange = function (state, fnHandler) {
            var currentState = this._history.getState();

            if (!A7.Utilities.ObjectUtility.ObjectsEqual(state.Data, currentState.data) || state.Url != currentState.url) {
                fnHandler(state);
            }
        };

        //Pushes a new state to the browser; data can be null or an object, title can be null or a string, url must be a string
        Navigator.prototype.To = function (url, urlParams, title, data) {
            if (typeof urlParams === "undefined") { urlParams = null; }
            if (typeof title === "undefined") { title = ''; }
            if (typeof data === "undefined") { data = {}; }
            var _this = this;
            var baseUrl = window.location.protocol + '//' + window.location.host;

            url += urlParams ? $.param(urlParams) : '';

            if (url.slice(0, baseUrl.length) != baseUrl)
                url = baseUrl + (url.slice(0, 1) == '/' ? url : url += '/');

            this.handleStateChange({ Url: url, Title: title, Data: data }, function (state) {
                _this._history.pushState(data, title, url);
            });
        };

        Navigator.prototype.RedirectTo = function (url) {
            window.location.href = url;
        };

        //Replaces the existing state with a new state to the browser; data can be null or an object, title can be null or a string, url must be a string
        Navigator.prototype.Replace = function (url, urlParams, title, data) {
            if (typeof urlParams === "undefined") { urlParams = null; }
            if (typeof title === "undefined") { title = ''; }
            if (typeof data === "undefined") { data = {}; }
            var _this = this;
            url += urlParams ? $.param(urlParams) : '';
            this.handleStateChange({ Url: url, Title: title, Data: data }, function (state) {
                _this._history.replaceState(data, title, url);
            });
        };

        //Go back once through the history (same as hitting the browser's back button)
        Navigator.prototype.Back = function () {
            this._history.back();
        };

        //Go forward once through the history (same as hitting the browser's forward button)
        Navigator.prototype.Forward = function () {
            this._history.forward();
        };

        //If position is negative go back through history position times, if position is positive go forwards through history X times
        Navigator.prototype.Go = function (position) {
            this._history.go(position);
        };

        //Gets the current state of the browser, returns an object with data, title and url
        Navigator.prototype.GetState = function () {
            var state = this._history.getState();
            return { Url: state.url, Title: state.title, Data: state.Data };
        };

        Navigator.prototype.OnNavigate = function (fnHandler) {
            $(this).on(this.STATE_CHANGE_EVENT, function (event, navigateState) {
                fnHandler.call(this, navigateState);
            });
        };
        return Navigator;
    })();
    A7.Navigator = Navigator;
})(A7 || (A7 = {}));
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
/// <reference path="../components/home/RecentLogTable.ts" />
/// <reference path="../../declarations/jquery.d.ts" />
/// <reference path="../common/A7.Page.ts" />
var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        _super.call(this);

        this._logService = new Services.LogService('/api/log');
        this._recentLogTable = new Components.Home.RecentLogTable('#logTable', this._logService);
    }
    return HomePage;
})(A7.Page);

$(function () {
    return new HomePage();
});
//# sourceMappingURL=HomePage.js.map
