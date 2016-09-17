var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
var A7;
(function (A7) {
    var Cache;
    (function (Cache) {
        var ICacheProvider = (function () {
            function ICacheProvider() {
            }
            return ICacheProvider;
        }());
        Cache.ICacheProvider = ICacheProvider;
    })(Cache = A7.Cache || (A7.Cache = {}));
})(A7 || (A7 = {}));
/// <reference path="../../../../declarations/underscore/underscore.d.ts" />
var A7;
(function (A7) {
    var Collections;
    (function (Collections) {
        var Collection = (function () {
            function Collection(collection) {
                if (collection === void 0) { collection = []; }
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
                if (direction === void 0) { direction = 'asc'; }
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
                return _.reduce(this._collection, iterator, memo);
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
            Collection.prototype.Union = function (list) {
                return new Collection(_.union(this._collection, list));
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
            Collection.prototype.Take = function (count) {
                return new Collection(_.take(this._collection, count));
            };
            Collection.prototype.GroupBy = function (key) {
                var result = _.groupBy(this._collection, key);
                return result;
            };
            Collection.prototype.Sum = function (key) {
                var val = 0;
                _.each(this._collection, function (elem, index) {
                    val += elem[key];
                });
                return val;
            };
            Collection.prototype.Unique = function () {
                return new Collection(_.uniq(this._collection));
            };
            return Collection;
        }());
        Collections.Collection = Collection;
    })(Collections = A7.Collections || (A7.Collections = {}));
})(A7 || (A7 = {}));
/// <reference path="ilist.ts" />
/// <reference path="ilistiterator.ts" />
var A7;
(function (A7) {
    var Collections;
    (function (Collections) {
        var ICollection = (function () {
            function ICollection() {
            }
            return ICollection;
        }());
        Collections.ICollection = ICollection;
    })(Collections = A7.Collections || (A7.Collections = {}));
})(A7 || (A7 = {}));
/// <reference path="../collections/collection.ts" />
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../collections/icollection.ts" />
var A7;
(function (A7) {
    var Http;
    (function (Http) {
        var HttpClient;
        (function (HttpClient) {
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
                        if ((HttpClient.ErrorHandler || [])[jqXHR.status]) {
                            HttpClient.ErrorHandler[jqXHR.status](jqXHR, textStatus, errorThrown);
                        }
                        dfd.reject(jqXHR, textStatus, errorThrown);
                    }
                });
                return dfd.promise();
            }
            HttpClient.ErrorHandler = [];
            function Put(url, data, dataType, cache, contentType) {
                if (dataType === void 0) { dataType = "json"; }
                if (cache === void 0) { cache = false; }
                if (contentType === void 0) { contentType = "application/json"; }
                return executeRequest(url, data, dataType, 'put', false, contentType);
            }
            HttpClient.Put = Put;
            function Get(url, data, dataType, cache, contentType) {
                if (dataType === void 0) { dataType = "json"; }
                if (cache === void 0) { cache = false; }
                if (contentType === void 0) { contentType = "application/x-www-form-urlencoded"; }
                return executeRequest(url, data, dataType, 'get', false, contentType);
            }
            HttpClient.Get = Get;
            function GetCollection(url, data, dataType, cache, contentType) {
                if (dataType === void 0) { dataType = "json"; }
                if (cache === void 0) { cache = false; }
                if (contentType === void 0) { contentType = "application/x-www-form-urlencoded"; }
                var dfd = $.Deferred();
                executeRequest(url, data, dataType, 'get', false, contentType).then(function (results) { return dfd.resolve(new A7.Collections.Collection(results)); }, dfd.reject);
                return dfd.promise();
            }
            HttpClient.GetCollection = GetCollection;
            function GetHtml(url, cache) {
                if (cache === void 0) { cache = false; }
                return this.Get(url, null, 'html', cache);
            }
            HttpClient.GetHtml = GetHtml;
            function Post(url, data, dataType, cache, contentType) {
                if (dataType === void 0) { dataType = "json"; }
                if (cache === void 0) { cache = false; }
                if (contentType === void 0) { contentType = "application/json"; }
                return executeRequest(url, data, dataType, 'post', false, contentType);
            }
            HttpClient.Post = Post;
            function Delete(url, data, dataType, cache, contentType) {
                if (dataType === void 0) { dataType = "json"; }
                if (cache === void 0) { cache = false; }
                if (contentType === void 0) { contentType = "application/json"; }
                return executeRequest(url, data, dataType, 'delete', false, contentType);
            }
            HttpClient.Delete = Delete;
        })(HttpClient = Http.HttpClient || (Http.HttpClient = {}));
    })(Http = A7.Http || (A7.Http = {}));
})(A7 || (A7 = {}));
var A7;
(function (A7) {
    var Configuration;
    (function (Configuration) {
        var ComponentOptions = (function () {
            function ComponentOptions() {
                this.LoadViewOnInit = true;
            }
            return ComponentOptions;
        }());
        Configuration.ComponentOptions = ComponentOptions;
    })(Configuration = A7.Configuration || (A7.Configuration = {}));
})(A7 || (A7 = {}));
/// <reference path="componentoptions.ts" />
var A7;
(function (A7) {
    var Configuration;
    (function (Configuration) {
        var ConfigurationFile = (function () {
            function ConfigurationFile() {
                this.EnableLogging = true;
                this.Components = [];
            }
            return ConfigurationFile;
        }());
        Configuration.ConfigurationFile = ConfigurationFile;
    })(Configuration = A7.Configuration || (A7.Configuration = {}));
})(A7 || (A7 = {}));
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../http/httpclient.ts" />
/// <reference path="configurationfile.ts" />
/// <reference path="../collections/icollection.ts" />
/// <reference path="componentoptions.ts" />
/// <reference path="../collections/collection.ts" />
var A7;
(function (A7) {
    var Configuration;
    (function (Configuration) {
        var ConfigurationManager = (function () {
            function ConfigurationManager() {
            }
            ConfigurationManager.Initialize = function (configFile) {
                var _this = this;
                if (configFile === void 0) { configFile = null; }
                if (configFile) {
                    this.processConfig(configFile);
                    return $.Deferred().resolve(this.AppConfiguration);
                }
                var onConfigLoaded = A7.Http.HttpClient.Get("/scripts/appconfig.json");
                onConfigLoaded.then(function (loadedConfig) {
                    _this.processConfig(loadedConfig);
                });
                return onConfigLoaded;
            };
            ConfigurationManager.GetAllComponentOptions = function () {
                var _this = this;
                if (!this._componentOptions) {
                    var separator = ' |';
                    var componentNameIndex = (new A7.Collections.Collection(this.AppConfiguration.Components)).Select(function (x) { return x.Name; }).ToArray().join(separator) + separator;
                    var decoratorOptions = new A7.Collections.Collection(this._decoratorComponentOptions);
                    var qualifyingDecoratorComponents = decoratorOptions.Where(function (x) { return componentNameIndex.indexOf(x.Name + separator) < 0; });
                    this._componentOptions = new A7.Collections.Collection(this.AppConfiguration.Components);
                    qualifyingDecoratorComponents.ForEach(function (x) {
                        _this._componentOptions.Add(x);
                    });
                }
                return this._componentOptions;
            };
            ConfigurationManager.GetComponentOptions = function (componentName) {
                return this.GetAllComponentOptions().First(function (x) { return x.Name == componentName; });
            };
            ConfigurationManager.RegisterDecoratorComponentOptions = function (componentOptions) {
                this._decoratorComponentOptions.push(componentOptions);
            };
            ConfigurationManager.processConfig = function (config) {
                this.AppConfiguration = config;
                this.AppConfiguration.Components = this.GetAllComponentOptions().ToArray();
            };
            ConfigurationManager._decoratorComponentOptions = [];
            ConfigurationManager.AppConfiguration = new Configuration.ConfigurationFile();
            return ConfigurationManager;
        }());
        Configuration.ConfigurationManager = ConfigurationManager;
    })(Configuration = A7.Configuration || (A7.Configuration = {}));
})(A7 || (A7 = {}));
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../../../../declarations/underscore/underscore.d.ts" />
var A7;
(function (A7) {
    var Utilities;
    (function (Utilities) {
        var ObjectUtility = (function () {
            function ObjectUtility() {
            }
            /**
                 * Test if all properties and values in calling object are equal to provided object
                 * @param {object} objectA - object 1 to source
                 * @param {object} objectB - object 2 to target
                 * @returns {bool} True is returned if objectB has same properties and values as objectA
            */
            ObjectUtility.ObjectsEqual = function (objectA, objectB) {
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
            ObjectUtility.GetObjectName = function (object) {
                return object.constructor.toString().match(/function\s*(\w+)/)[1];
            };
            return ObjectUtility;
        }());
        Utilities.ObjectUtility = ObjectUtility;
    })(Utilities = A7.Utilities || (A7.Utilities = {}));
})(A7 || (A7 = {}));
var A7;
(function (A7) {
    var Logging;
    (function (Logging) {
        var EmptyLogger = (function () {
            function EmptyLogger() {
            }
            return EmptyLogger;
        }());
        Logging.EmptyLogger = EmptyLogger;
    })(Logging = A7.Logging || (A7.Logging = {}));
})(A7 || (A7 = {}));
var A7;
(function (A7) {
    var Logging;
    (function (Logging) {
        var ConsoleLogger = (function () {
            function ConsoleLogger(loggerName) {
                this._loggerName = loggerName;
            }
            ConsoleLogger.prototype.getMessagePrefix = function () {
                return this._loggerName ? "[" + this._loggerName + "] " : '';
            };
            ConsoleLogger.prototype.assert = function (test, message) {
                var optionalParams = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    optionalParams[_i - 2] = arguments[_i];
                }
                console.assert(test, this.getMessagePrefix() + (message || ''), optionalParams);
            };
            ConsoleLogger.prototype.clear = function () {
                console.clear();
            };
            ConsoleLogger.prototype.count = function (countTitle) {
                console.count(this.getMessagePrefix() + (countTitle || ''));
            };
            ConsoleLogger.prototype.debug = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                console.debug(this.getMessagePrefix() + (message || ''));
            };
            ConsoleLogger.prototype.dir = function (value) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                console.dir(value, optionalParams);
            };
            ConsoleLogger.prototype.dirxml = function (value) {
                console.dirxml(value);
            };
            ConsoleLogger.prototype.error = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                console.error(this.getMessagePrefix() + message, optionalParams);
            };
            ConsoleLogger.prototype.group = function (groupTitle) {
                console.group(this.getMessagePrefix() + groupTitle || '');
            };
            ConsoleLogger.prototype.groupCollapsed = function (groupTitle) {
                console.groupCollapsed(this.getMessagePrefix() + groupTitle || '');
            };
            ConsoleLogger.prototype.groupEnd = function () {
                console.groupEnd();
            };
            ConsoleLogger.prototype.info = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                console.info(this.getMessagePrefix() + (message || ''), optionalParams);
            };
            ConsoleLogger.prototype.log = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                console.log(this.getMessagePrefix() + (message || ''), optionalParams);
            };
            ConsoleLogger.prototype.msIsIndependentlyComposed = function (element) {
                return console.msIsIndependentlyComposed(element);
            };
            ConsoleLogger.prototype.profile = function (reportName) {
                console.profile(this.getMessagePrefix() + (reportName || ''));
            };
            ConsoleLogger.prototype.profileEnd = function () {
                console.profileEnd();
            };
            ConsoleLogger.prototype.select = function (element) {
                console.select(element);
            };
            ConsoleLogger.prototype.time = function (timerName) {
                console.time(this.getMessagePrefix() + (timerName || ''));
            };
            ConsoleLogger.prototype.timeEnd = function (timerName) {
                console.timeEnd(this.getMessagePrefix() + (timerName || ''));
            };
            ConsoleLogger.prototype.trace = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                console.trace(this.getMessagePrefix() + (message || ''), optionalParams);
            };
            ConsoleLogger.prototype.warn = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                console.warn(this.getMessagePrefix() + (message || ''), optionalParams);
            };
            return ConsoleLogger;
        }());
        Logging.ConsoleLogger = ConsoleLogger;
    })(Logging = A7.Logging || (A7.Logging = {}));
})(A7 || (A7 = {}));
var A7;
(function (A7) {
    var Logging;
    (function (Logging) {
        var ILogger = (function () {
            function ILogger() {
            }
            return ILogger;
        }());
        Logging.ILogger = ILogger;
    })(Logging = A7.Logging || (A7.Logging = {}));
})(A7 || (A7 = {}));
/// <reference path="emptylogger.ts" />
/// <reference path="consolelogger.ts" />
/// <reference path="ilogger.ts" />
/// <reference path="../configuration/configurationmanager.ts" />
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
var A7;
(function (A7) {
    var Logging;
    (function (Logging) {
        var LogManager = (function () {
            function LogManager() {
            }
            LogManager.GetLogger = function (loggerName) {
                //Fix for < IE9 missing console
                if (typeof console == "undefined" || typeof console.log == "undefined") {
                    return new Logging.EmptyLogger();
                }
                else {
                    var config = A7.Configuration.ConfigurationManager.AppConfiguration;
                    return config.EnableLogging ? new Logging.ConsoleLogger(loggerName) : new Logging.EmptyLogger();
                }
            };
            return LogManager;
        }());
        Logging.LogManager = LogManager;
    })(Logging = A7.Logging || (A7.Logging = {}));
})(A7 || (A7 = {}));
/// <reference path="../../../../declarations/inversify/inversify.d.ts" />
var a7;
(function (a7) {
    function injectable() {
        return inversify.injectable();
    }
    a7.injectable = injectable;
})(a7 || (a7 = {}));
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../../../../declarations/jqueryui/jqueryui.d.ts" />
/// <reference path="../http/httpclient.ts" />
/// <reference path="../configuration/configurationmanager.ts" />
/// <reference path="../configuration/componentoptions.ts" />
/// <reference path="../utilities/objectutility.ts" />
/// <reference path="../logging/logmanager.ts" />
/// <reference path="../logging/ilogger.ts" />
/// <reference path="../decorators/injectable.ts" />
var A7;
(function (A7) {
    var Core;
    (function (Core) {
        var Component = (function () {
            function Component() {
                this._initialized = false;
                var componentName = A7.Utilities.ObjectUtility.GetObjectName(this);
                this._logger = A7.Logging.LogManager.GetLogger(componentName);
                this._componentOptions = A7.Configuration.ConfigurationManager.GetComponentOptions(componentName);
                this._$el = $(this._componentOptions.Selector);
            }
            Component.prototype._initialize = function (fnInit, viewUrl) {
                var _this = this;
                if (fnInit === void 0) { fnInit = null; }
                if (viewUrl === void 0) { viewUrl = null; }
                var onInitialized = $.Deferred(), viewToLoad = viewUrl || this._componentOptions.ViewUrl;
                if (!this._initialized) {
                    var onViewLoaded;
                    if (viewToLoad && (this._componentOptions.LoadViewOnInit || viewUrl)) {
                        onViewLoaded = this._loadView(viewToLoad);
                    }
                    else {
                        onViewLoaded = $.Deferred().resolve().promise();
                    }
                    onViewLoaded.then(function () {
                        if (fnInit) {
                            fnInit().then(function () {
                                _this._$el.show('fade', 200);
                                _this._initialized = true;
                                onInitialized.resolve();
                            });
                        }
                        else {
                            _this._$el.show('fade', 200);
                            onInitialized.resolve();
                        }
                        _this._initialized = true;
                    });
                }
                else {
                    this._$el.show('fade', 200);
                    onInitialized.resolve();
                }
                return onInitialized.promise();
            };
            Component.prototype._loadView = function (url, fromCache) {
                var _this = this;
                if (fromCache === void 0) { fromCache = false; }
                var dfd = $.Deferred();
                A7.Http.HttpClient.GetHtml(url, fromCache).then(function (html) {
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
                for (var _i = 0; _i < arguments.length; _i++) {
                    options[_i - 0] = arguments[_i];
                }
                this._$el.show('fade', 200);
            };
            Component = __decorate([
                a7.injectable()
            ], Component);
            return Component;
        }());
        Core.Component = Component;
    })(Core = A7.Core || (A7.Core = {}));
})(A7 || (A7 = {}));
/// <reference path="../configuration/configurationmanager.ts" />
/// <reference path="../utilities/objectutility.ts" />
var a7;
(function (a7) {
    function component(viewUrl, loadViewOnInit, selector) {
        if (viewUrl === void 0) { viewUrl = null; }
        if (loadViewOnInit === void 0) { loadViewOnInit = true; }
        if (selector === void 0) { selector = null; }
        return function (component) {
            var componentName = resolveComponentName(component);
            selector = selector || autoResolveComponentSelector(component);
            A7.Configuration.ConfigurationManager.RegisterDecoratorComponentOptions({ Name: componentName, Selector: selector, LoadViewOnInit: loadViewOnInit, ViewUrl: viewUrl });
        };
        function resolveComponentName(component) {
            return A7.Utilities.ObjectUtility.GetObjectName(component.prototype);
        }
        function autoResolveComponentSelector(component) {
            var componentName = resolveComponentName(component);
            return '#' + componentName.substr(0, 1).toLowerCase() + componentName.substr(1, componentName.length - 1);
        }
    }
    a7.component = component;
})(a7 || (a7 = {}));
/// <reference path="../../../../declarations/handlebars/handlebars.d.ts" />
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
var a7;
(function (a7) {
    function bindTemplate(selector) {
        if (selector === void 0) { selector = null; }
        return function (target, propertyKey) {
            var _val; // = this[propertyKey];
            var getter = function () {
                if (!_val) {
                    var actualName = propertyKey.indexOf('_') == 0 ? propertyKey.substr(1, propertyKey.length - 1) : propertyKey, camelizedName = propertyKey.substr(0, 1).toLowerCase() + propertyKey.substr(1, propertyKey.length - 1), matchedTemplate = selector ? $(selector) : null;
                    if (!selector || !matchedTemplate.length) {
                        matchedTemplate = this._$el.find('[data-a7-template="' + actualName + '"]');
                    }
                    if (!matchedTemplate.length) {
                        matchedTemplate = this._$el.find('[data-a7-template="' + camelizedName + '"]');
                    }
                    if (!matchedTemplate.length) {
                        this._logger.error('Could not auto bind property ' + propertyKey + '.  Could not find html element via selectors' + selector ? ' ' + selector + ', ' : '' + ' [data-a7-template=' + actualName + '] or [data-a7-template=' + camelizedName + ']');
                    }
                    _val = Handlebars.compile(matchedTemplate.html());
                }
                return _val;
            };
            if (delete this[propertyKey]) {
                Object.defineProperty(target, propertyKey, {
                    get: getter,
                    set: function (newVal) { _val = newVal; },
                    enumerable: true,
                    configurable: true
                });
            }
        };
    }
    a7.bindTemplate = bindTemplate;
})(a7 || (a7 = {}));
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../logging/logmanager.ts" />
var a7;
(function (a7) {
    function bindProperty(selector) {
        if (selector === void 0) { selector = null; }
        return function (target, propertyKey) {
            var _val;
            var getter = function () {
                if (!_val) {
                    var actualName = propertyKey.indexOf('_') == 0 ? propertyKey.substr(1, propertyKey.length - 1) : propertyKey, camelizedName = propertyKey.substr(0, 1).toLowerCase() + propertyKey.substr(1, propertyKey.length - 1);
                    _val = selector ? $(selector) : null;
                    if (!selector || !_val.length) {
                        _val = this._$el.find('[name="' + actualName + '"]');
                    }
                    if (!_val.length) {
                        _val = this._$el.find('[name="' + camelizedName + '"]');
                    }
                    if (!_val.length) {
                        this._logger.error('Could not auto bind property ' + propertyKey + '.  Could not find html element via selectors' + selector ? ' ' + selector + ', ' : '' + ' [name=' + actualName + '] or [name=' + camelizedName + ']');
                    }
                }
                return _val;
            };
            if (delete this[propertyKey]) {
                Object.defineProperty(target, propertyKey, {
                    get: getter,
                    set: function (newVal) { _val = newVal; },
                    enumerable: true,
                    configurable: true
                });
            }
        };
    }
    a7.bindProperty = bindProperty;
})(a7 || (a7 = {}));
/// <reference path="../http/httpclient.ts" />
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
var A7;
(function (A7) {
    var Services;
    (function (Services) {
        var Service = (function () {
            function Service() {
                this.CREATED_EVENT = 'Created';
                this.UPDATED_EVENT = 'Updated';
                this.DELETED_EVENT = 'Deleted';
            }
            Service.prototype.handleWebRequest = function (promise, eventName) {
                if (eventName === void 0) { eventName = null; }
                var dfd = $.Deferred(), __this = this;
                $.when(promise)
                    .done(function (response) {
                    !eventName || $(__this).trigger(eventName, [response]);
                    dfd.resolve(response);
                })
                    .fail(dfd.reject);
                return dfd.promise();
            };
            Service.prototype.GetUrl = function () {
                return this._url;
            };
            Service.prototype.Insert = function (model) {
                return this.handleWebRequest(A7.Http.HttpClient.Post(this._url, model), this.CREATED_EVENT);
            };
            Service.prototype.Update = function (model) {
                return this.handleWebRequest(A7.Http.HttpClient.Put(this._url, model), this.UPDATED_EVENT);
            };
            Service.prototype.DeleteById = function (id) {
                return this.handleWebRequest(A7.Http.HttpClient.Delete(this._url + '/' + id), this.DELETED_EVENT);
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
                this.OnCreate(function (event, response) { fnHandler(event, response, _this.CREATED_EVENT); });
                this.OnUpdate(function (event, response) { fnHandler(event, response, _this.UPDATED_EVENT); });
                this.OnDelete(function (event, response) { fnHandler(event, response, _this.DELETED_EVENT); });
            };
            return Service;
        }());
        Services.Service = Service;
    })(Services = A7.Services || (A7.Services = {}));
})(A7 || (A7 = {}));
var Models;
(function (Models) {
    var User = (function () {
        function User() {
            this.UserName = null;
            this.FirstName = null;
            this.LastName = null;
        }
        return User;
    }());
    Models.User = User;
})(Models || (Models = {}));
/// <reference path="../framework/a7/collections/icollection.ts" />
/// <reference path="../framework/a7/collections/collection.ts" />
/// <reference path="../framework/a7/decorators/injectable.ts" />
/// <reference path="../framework/a7/services/service.ts" />
/// <reference path="../models/user.ts" />
var Services;
(function (Services) {
    var ITestService = (function () {
        function ITestService() {
        }
        return ITestService;
    }());
    Services.ITestService = ITestService;
    var TestService = (function () {
        function TestService() {
        }
        TestService.prototype.GetUsers = function () {
            return new A7.Collections.Collection([
                { UserName: 'bdylan', FirstName: 'Bob', LastName: 'Dylan' },
                { UserName: 'jlenon', FirstName: 'John', LastName: 'Lenon' },
                { UserName: 'jdenver', FirstName: 'John', LastName: 'Denver' }
            ]);
        };
        TestService = __decorate([
            a7.injectable()
        ], TestService);
        return TestService;
    }());
    Services.TestService = TestService;
})(Services || (Services = {}));
/// <reference path="../../../../declarations/inversify/inversify.d.ts" />
var a7;
(function (a7) {
    function inject(serviceIdentifier) {
        return inversify.inject(serviceIdentifier);
    }
    a7.inject = inject;
})(a7 || (a7 = {}));
/// <reference path="../../../src/framework/a7/cache/icacheprovider.ts" />
/// <reference path="../../../src/framework/a7/core/component.ts" />
/// <reference path="../../../src/framework/a7/decorators/component.ts" />
/// <reference path="../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../../../declarations/handlebars/handlebars.d.ts" />
/// <reference path="../../../src/framework/a7/decorators/bindtemplate.ts" />
/// <reference path="../../../src/framework/a7/decorators/bindproperty.ts" />
/// <reference path="../../../src/services/testservice.ts" />
/// <reference path="../../../src/framework/a7/decorators/inject.ts" />
var Tests;
(function (Tests) {
    var Components;
    (function (Components) {
        var TestForm = (function (_super) {
            __extends(TestForm, _super);
            function TestForm(userService, cacheProvider) {
                _super.call(this, "test");
                this._userService = userService;
                this._cacheProvider = cacheProvider;
            }
            TestForm.prototype.Show = function () {
                var _this = this;
                this._initialize().then(function () {
                    _this._searchButton.click(function (e) {
                        var templateMessage = _this._listTemplate({});
                        _this._cacheProvider.Get('Alien', function () { return $.Deferred().resolve('Who is an alien? '); }).then(function (prefix) {
                            alert(prefix + _this._userService.GetUsers().First(function (x) { return x.FirstName == 'John'; }).UserName + ' ' + templateMessage);
                        });
                    });
                });
            };
            __decorate([
                a7.bindProperty()
            ], TestForm.prototype, "_searchButton", void 0);
            __decorate([
                a7.bindTemplate()
            ], TestForm.prototype, "_listTemplate", void 0);
            TestForm = __decorate([
                a7.component('/scripts/tests/assets/components/testform.html'),
                __param(0, a7.inject(Services.ITestService)),
                __param(1, a7.inject(A7.Cache.ICacheProvider))
            ], TestForm);
            return TestForm;
        }(A7.Core.Component));
        Components.TestForm = TestForm;
    })(Components = Tests.Components || (Tests.Components = {}));
})(Tests || (Tests = {}));
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../collections/collection.ts" />
/// <reference path="../decorators/injectable.ts" />
var A7;
(function (A7) {
    var Cache;
    (function (Cache) {
        var BrowserCache = (function () {
            function BrowserCache() {
                this._cache = [];
            }
            BrowserCache.prototype.Get = function (key, fn) {
                if (!this._cache[key])
                    this._cache[key] = fn();
                return this._cache[key];
            };
            BrowserCache.prototype.Remove = function (key) {
                delete this._cache[key];
            };
            BrowserCache.prototype.RemoveByStartsWith = function (keyStartsWith) {
                var _this = this;
                var removeKeys = new A7.Collections.Collection();
                for (var key in this._cache) {
                    if (key.indexOf(keyStartsWith) == 0)
                        removeKeys.Add(key);
                }
                removeKeys.ForEach(function (key) {
                    delete _this._cache[key];
                });
            };
            BrowserCache.prototype.Flush = function () {
                this._cache = [];
            };
            BrowserCache = __decorate([
                a7.injectable()
            ], BrowserCache);
            return BrowserCache;
        }());
        Cache.BrowserCache = BrowserCache;
    })(Cache = A7.Cache || (A7.Cache = {}));
})(A7 || (A7 = {}));
/// <reference path="../../../../declarations/inversify/inversify.d.ts" />
var A7;
(function (A7) {
    var Ioc;
    (function (Ioc) {
        var _container;
        var IocContainer = (function () {
            function IocContainer() {
                this._kernel = new inversify.Kernel();
            }
            IocContainer.GetContainer = function () {
                if (_container)
                    return _container;
                _container = new IocContainer();
                return _container;
            };
            IocContainer.prototype.GetInstance = function (type) {
                return this._kernel.get(type);
            };
            IocContainer.prototype.Register = function (serviceType, implementationType) {
                this._kernel.bind(serviceType).to(implementationType);
            };
            IocContainer.prototype.RegisterSingleton = function (serviceType, implementationType) {
                this._kernel.bind(serviceType).to(implementationType).inSingletonScope();
            };
            IocContainer.prototype.RegisterSelf = function (instance) {
                this._kernel.bind(instance).toSelf();
            };
            return IocContainer;
        }());
        Ioc.Container = IocContainer.GetContainer();
    })(Ioc = A7.Ioc || (A7.Ioc = {}));
})(A7 || (A7 = {}));
var A7;
(function (A7) {
    var Routing;
    (function (Routing) {
        var Route = (function () {
            function Route(url, action) {
                this.Url = url;
                this.Action = action;
            }
            return Route;
        }());
        Routing.Route = Route;
    })(Routing = A7.Routing || (A7.Routing = {}));
})(A7 || (A7 = {}));
var A7;
(function (A7) {
    var Navigation;
    (function (Navigation) {
        var INavigator = (function () {
            function INavigator() {
            }
            return INavigator;
        }());
        Navigation.INavigator = INavigator;
    })(Navigation = A7.Navigation || (A7.Navigation = {}));
})(A7 || (A7 = {}));
/// <reference path="route.ts" />
/// <reference path="../../../../declarations/crossroads/crossroads.d.ts" />
/// <reference path="../navigation/inavigator.ts" />
/// <reference path="../collections/icollection.ts" />
var A7;
(function (A7) {
    var Routing;
    (function (Routing) {
        var Router = (function () {
            function Router(Routes) {
                if (Routes === void 0) { Routes = new A7.Collections.Collection(); }
                this.Routes = Routes;
                var url = window.location.pathname + window.location.search;
                Routes.ForEach(function (route) { return crossroads.addRoute(route.Url, route.Action); });
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
                if (stateData === void 0) { stateData = {}; }
                var host = window.location.hostname, port = window.location.port ? ':' + window.location.port : '', path = port ? url.replace(port, '') : url;
                path = this.resolveHtml4Path(path);
                if (path.indexOf(host) != -1) {
                    path = path.split(host)[1];
                }
                crossroads.parse(path);
            };
            return Router;
        }());
        Routing.Router = Router;
    })(Routing = A7.Routing || (A7.Routing = {}));
})(A7 || (A7 = {}));
/// <reference path="inavigator.ts" />
/// <reference path="../utilities/objectutility.ts" />
var A7;
(function (A7) {
    var Navigation;
    (function (Navigation) {
        var Navigator = (function () {
            function Navigator() {
                var _this = this;
                this.STATE_CHANGE_EVENT = 'statechange';
                this._history = window.History;
                //if history.js compatible with browser bind window statechange event
                if (this._history.enabled) {
                    this._history.Adapter.bind(window, 'statechange', function () {
                        var state = _this._history.getState(); //State.data, State.title, State.url
                        $(_this).trigger(_this.STATE_CHANGE_EVENT, [{ Url: state.url, Title: state.title, Data: (state.data || {}) }]);
                    });
                }
            }
            Navigator.prototype.handleStateChange = function (state, fnHandler) {
                var currentState = this._history.getState();
                //Validate new state request is different than current state prior to pushing new state               
                if (!A7.Utilities.ObjectUtility.ObjectsEqual(state.Data, currentState.data) || state.Url != currentState.url) {
                    fnHandler(state);
                }
            };
            //Pushes a new state to the browser; data can be null or an object, title can be null or a string, url must be a string
            Navigator.prototype.To = function (url, urlParams, title, data) {
                var _this = this;
                if (urlParams === void 0) { urlParams = null; }
                if (title === void 0) { title = ''; }
                if (data === void 0) { data = {}; }
                var baseUrl = window.location.protocol + '//' + window.location.host;
                url += urlParams ? $.param(urlParams) : '';
                if (url.slice(0, baseUrl.length) != baseUrl)
                    url = baseUrl + (url.slice(0, 1) == '/' ? url : url += '/');
                var newstate = { Url: url, Data: data };
                if (title)
                    newstate.Title = title;
                this.handleStateChange(newstate, function (state) {
                    _this._history.pushState(data, title, url);
                });
            };
            Navigator.prototype.RedirectTo = function (url) {
                window.location.href = url;
            };
            //Replaces the existing state with a new state to the browser; data can be null or an object, title can be null or a string, url must be a string
            Navigator.prototype.Replace = function (url, urlParams, title, data) {
                var _this = this;
                if (urlParams === void 0) { urlParams = null; }
                if (title === void 0) { title = ''; }
                if (data === void 0) { data = {}; }
                url += urlParams ? $.param(urlParams) : '';
                this.handleStateChange({ Url: url, Title: title, Data: data }, function (state) {
                    _this._history.replaceState(data, title, url);
                });
            };
            //Go back once through the history (same as hitting the browser's back button)
            Navigator.prototype.Back = function () { this._history.back(); };
            //Go forward once through the history (same as hitting the browser's forward button)
            Navigator.prototype.Forward = function () { this._history.forward(); };
            //If position is negative go back through history position times, if position is positive go forwards through history X times
            Navigator.prototype.Go = function (position) { this._history.go(position); };
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
        }());
        Navigation.Navigator = Navigator;
    })(Navigation = A7.Navigation || (A7.Navigation = {}));
})(A7 || (A7 = {}));
/// <reference path="../collections/collection.ts" />
/// <reference path="../collections/icollection.ts" />
/// <reference path="../http/httpclient.ts" />
/// <reference path="../routing/router.ts" />
/// <reference path="../routing/route.ts" />
/// <reference path="../navigation/navigator.ts" />
/// <reference path="../logging/logmanager.ts" />
/// <reference path="../configuration/configurationmanager.ts" />
var A7;
(function (A7) {
    var Core;
    (function (Core) {
        var Page = (function () {
            function Page() {
                var _this = this;
                this._components = new A7.Collections.Collection();
                this._logger = A7.Logging.LogManager.GetLogger("Page");
                //Default Error Handling            
                A7.Http.HttpClient.ErrorHandler[500] = function (jqXHR, textStatus, errorThrown) {
                    _this._logger.error("Internal Server Error: ", jqXHR, " ", textStatus, " ", errorThrown);
                };
                //Configure Navigator
                this.Navigator = new A7.Navigation.Navigator();
                this.Navigator.OnNavigate(function (navigateState) {
                    _this._components.ForEach(function (component) {
                        component.Hide();
                    });
                    _this.Router.RouteTo(navigateState.Url, (navigateState.Data || null));
                });
            }
            Page.prototype._initialize = function () {
                return A7.Configuration.ConfigurationManager.Initialize();
            };
            Page.prototype.RegisterComponent = function (component) { this._components.Add(component); };
            return Page;
        }());
        Core.Page = Page;
    })(Core = A7.Core || (A7.Core = {}));
})(A7 || (A7 = {}));
/// <reference path="../../tests/assets/components/testform.ts" />
/// <reference path="../services/testservice.ts" />
/// <reference path="../framework/a7/cache/browsercache.ts" />
/// <reference path="../framework/a7/ioc/container.ts" />
/// <reference path="../framework/a7/core/page.ts" />
var TestPage = (function (_super) {
    __extends(TestPage, _super);
    function TestPage() {
        var _this = this;
        _super.call(this);
        this._initialize().then(function (config) {
            A7.Ioc.Container.Register(Services.ITestService, Services.TestService);
            A7.Ioc.Container.RegisterSingleton(A7.Cache.ICacheProvider, A7.Cache.BrowserCache);
            A7.Ioc.Container.RegisterSelf(Tests.Components.TestForm);
            _this._cacheProvider = A7.Ioc.Container.GetInstance(A7.Cache.ICacheProvider);
            var cachedData = _this._cacheProvider.Get('Alien', function () { return $.Deferred().resolve("What's John Lennon's username: "); });
            _this._testForm = A7.Ioc.Container.GetInstance(Tests.Components.TestForm);
            _this._testForm.Show();
        });
    }
    return TestPage;
}(A7.Core.Page));
$(function () { return new TestPage(); });
//# sourceMappingURL=Test.js.map