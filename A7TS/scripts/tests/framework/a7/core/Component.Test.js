var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
                var onConfigLoaded = A7.Http.HttpClient.Get("/src/appconfig.json");
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
/// <reference path="../../../../declarations/jqueryui/jqueryui.d.ts" />
/// <reference path="../http/httpclient.ts" />
/// <reference path="../configuration/configurationmanager.ts" />
/// <reference path="../configuration/componentoptions.ts" />
var A7;
(function (A7) {
    var Core;
    (function (Core) {
        var Component = (function () {
            function Component() {
                this._initialized = false;
                var componentName = this.constructor.toString().match(/function\s*(\w+)/)[1];
                this._componentOptions = A7.Configuration.ConfigurationManager.GetComponentOptions();
                //this._$el = $(Configuration.ConfigurationManager.AppConfiguration.);
                //console.log(this.constructor.toString().match(/function\s*(\w+)/)[1]);
            }
            Component.prototype._initialize = function (fnInit, viewUrl) {
                var _this = this;
                if (viewUrl === void 0) { viewUrl = null; }
                var dfd = $.Deferred();
                //viewUrl = viewUrl ||
                if (!this._initialized) {
                    fnInit().then(function () {
                        _this._$el.show();
                        _this._initialized = true;
                        dfd.resolve();
                    });
                }
                else {
                    this._$el.show('fade', 200);
                    dfd.resolve();
                }
                return dfd.promise();
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
            return Component;
        }());
        Core.Component = Component;
    })(Core = A7.Core || (A7.Core = {}));
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
/// <reference path="../configuration/configurationmanager.ts" />
/// <reference path="../utilities/objectutility.ts" />
var A7;
(function (A7) {
    var Decorators;
    (function (Decorators) {
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
        Decorators.component = component;
    })(Decorators = A7.Decorators || (A7.Decorators = {}));
})(A7 || (A7 = {}));
/// <reference path="../../../src/framework/a7/core/component.ts" />
/// <reference path="../../../src/framework/a7/decorators/component.ts" />
var Tests;
(function (Tests) {
    var Components;
    (function (Components) {
        var ConfigAndDecoratorComponent = (function (_super) {
            __extends(ConfigAndDecoratorComponent, _super);
            function ConfigAndDecoratorComponent() {
                _super.call(this);
            }
            ConfigAndDecoratorComponent = __decorate([
                A7.Decorators.component('DecoratorComponent.html', false, '#DecoratorComponent'), 
                __metadata('design:paramtypes', [])
            ], ConfigAndDecoratorComponent);
            return ConfigAndDecoratorComponent;
        }(A7.Core.Component));
        Components.ConfigAndDecoratorComponent = ConfigAndDecoratorComponent;
    })(Components = Tests.Components || (Tests.Components = {}));
})(Tests || (Tests = {}));
/// <reference path="../../../src/framework/a7/core/component.ts" />
/// <reference path="../../../src/framework/a7/decorators/component.ts" />
var Tests;
(function (Tests) {
    var Components;
    (function (Components) {
        var ConfigComponent = (function (_super) {
            __extends(ConfigComponent, _super);
            function ConfigComponent() {
                _super.call(this);
            }
            ConfigComponent = __decorate([
                A7.Decorators.component(), 
                __metadata('design:paramtypes', [])
            ], ConfigComponent);
            return ConfigComponent;
        }(A7.Core.Component));
        Components.ConfigComponent = ConfigComponent;
    })(Components = Tests.Components || (Tests.Components = {}));
})(Tests || (Tests = {}));
/// <reference path="../../../src/framework/a7/core/component.ts" />
/// <reference path="../../../src/framework/a7/decorators/component.ts" />
var Tests;
(function (Tests) {
    var Components;
    (function (Components) {
        var TestForm = (function (_super) {
            __extends(TestForm, _super);
            function TestForm() {
                _super.call(this);
            }
            TestForm = __decorate([
                A7.Decorators.component('/scripts/test/assets/components/testform.html'), 
                __metadata('design:paramtypes', [])
            ], TestForm);
            return TestForm;
        }(A7.Core.Component));
        Components.TestForm = TestForm;
    })(Components = Tests.Components || (Tests.Components = {}));
})(Tests || (Tests = {}));
/// <reference path="../../../../declarations/jasmine/jasmine.d.ts" />
/// <reference path="../../../assets/components/testform.ts" />
/// <reference path="../../../../src/framework/a7/configuration/configurationmanager.ts" />
/// <reference path="../../../../src/framework/a7/configuration/configurationfile.ts" />
/// <reference path="../../../assets/components/configcomponent.ts" />
/// <reference path="../../../assets/components/configanddecoratorcomponent.ts" />
describe('A Component Option', function () {
    beforeEach(function (done) {
        var componentsConfig = [
            { Name: 'ConfigComponent', Selector: '#configSelector', LoadViewOnInit: false, ViewUrl: 'ConfigViewUrl' },
            { Name: 'ConfigAndDecoratorComponent', Selector: '#configAndDecoratorSelector', LoadViewOnInit: false, ViewUrl: 'ConfigAndDecoratorViewUrl' }
        ];
        A7.Configuration.ConfigurationManager.Initialize({
            EnableLogging: true,
            Components: componentsConfig
        }).then(done);
    });
    it('should have only 3 in the config', function () {
        var componentOptions = A7.Configuration.ConfigurationManager.GetAllComponentOptions();
        expect(componentOptions.Count()).toEqual(3, componentOptions);
    });
    it('should override component decorator options with config', function () {
        var configAndDecoratorComponent = A7.Configuration.ConfigurationManager.GetComponentOptions('ConfigAndDecoratorComponent');
        expect(configAndDecoratorComponent.Selector).toEqual('#configAndDecoratorSelector');
        expect(configAndDecoratorComponent.ViewUrl).toEqual('ConfigAndDecoratorViewUrl');
    });
    it('should autocreate component options when config not found', function () {
        var componentOptions = A7.Configuration.ConfigurationManager.GetComponentOptions('TestForm');
        expect(componentOptions).toBeDefined();
        expect(componentOptions.Selector).toBeDefined();
        expect(componentOptions.LoadViewOnInit).toEqual(true);
    });
    it('should autoresolve selector when not in config or decorator', function () {
        var testForm = new Tests.Components.TestForm(), componentOptions = A7.Configuration.ConfigurationManager.GetComponentOptions('TestForm');
        expect(componentOptions.Selector).toEqual('#test1Form');
    });
});
