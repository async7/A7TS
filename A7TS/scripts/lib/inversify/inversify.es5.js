/**
 * inversify v.2.0.0-rc.1 - A lightweight IoC container written in TypeScript.
 * Copyright (c) 2015 Remo H. Jansen
 * MIT inversify.io/LICENSE
 * http://inversify.io
 */
"use strict";

(function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && define.amd) {
        define([], f);
    } else {
        var g;if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }g.inversify = f();
    }
})(function () {
    var define, module, exports;return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND", f);
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
    })({ 1: [function (require, module, exports) {
            "use strict";
            var METADATA_KEY = require("../constants/metadata_keys");
            var ERROR_MSGS = require("../constants/error_msgs");
            function tagParameter(annotationTarget, propertyName, parameterIndex, metadata) {
                var metadataKey = METADATA_KEY.TAGGED;
                return _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
            }
            exports.tagParameter = tagParameter;
            function tagProperty(annotationTarget, propertyName, metadata) {
                var metadataKey = METADATA_KEY.TAGGED_PROP;
                return _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
            }
            exports.tagProperty = tagProperty;
            function _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex) {
                var paramsOrPropertiesMetadata = {};
                var isParameterDecorator = typeof parameterIndex === "number";
                var key = parameterIndex !== undefined && isParameterDecorator ? parameterIndex.toString() : propertyName;
                if (isParameterDecorator === true && propertyName !== undefined) {
                    throw new Error(ERROR_MSGS.INVALID_DECORATOR_OPERATION);
                }
                if (Reflect.hasOwnMetadata(metadataKey, annotationTarget) === true) {
                    paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
                }
                var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
                if (Array.isArray(paramOrPropertyMetadata) !== true) {
                    paramOrPropertyMetadata = [];
                } else {
                    for (var i = 0; i < paramOrPropertyMetadata.length; i++) {
                        var m = paramOrPropertyMetadata[i];
                        if (m.key === metadata.key) {
                            throw new Error(ERROR_MSGS.DUPLICATED_METADATA + " " + m.key);
                        }
                    }
                }
                paramOrPropertyMetadata.push(metadata);
                paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
                Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
                return annotationTarget;
            }
            function _decorate(decorators, target) {
                Reflect.decorate(decorators, target);
            }
            function _param(paramIndex, decorator) {
                return function (target, key) {
                    decorator(target, key, paramIndex);
                };
            }
            function decorate(decorator, target, parameterIndex) {
                if (typeof parameterIndex === "number") {
                    _decorate([_param(parameterIndex, decorator)], target);
                } else {
                    _decorate([decorator], target);
                }
            }
            exports.decorate = decorate;
        }, { "../constants/error_msgs": 13, "../constants/metadata_keys": 14 }], 2: [function (require, module, exports) {
            "use strict";
            var metadata_1 = require("../planning/metadata");
            var decorator_utils_1 = require("./decorator_utils");
            var METADATA_KEY = require("../constants/metadata_keys");
            function inject(serviceIdentifier) {
                return function (target, targetKey, index) {
                    var metadata = new metadata_1["default"](METADATA_KEY.INJECT_TAG, serviceIdentifier);
                    return decorator_utils_1.tagParameter(target, targetKey, index, metadata);
                };
            }
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = inject;
        }, { "../constants/metadata_keys": 14, "../planning/metadata": 22, "./decorator_utils": 1 }], 3: [function (require, module, exports) {
            "use strict";
            var METADATA_KEY = require("../constants/metadata_keys");
            var ERRORS_MSGS = require("../constants/error_msgs");
            function injectable() {
                return function (target) {
                    if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target) === true) {
                        throw new Error(ERRORS_MSGS.DUPLICATED_INJECTABLE_DECORATOR);
                    }
                    var types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
                    Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);
                    return target;
                };
            }
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = injectable;
        }, { "../constants/error_msgs": 13, "../constants/metadata_keys": 14 }], 4: [function (require, module, exports) {
            "use strict";
            var metadata_1 = require("../planning/metadata");
            var decorator_utils_1 = require("./decorator_utils");
            var METADATA_KEY = require("../constants/metadata_keys");
            function multiInject(serviceIdentifier) {
                return function (target, targetKey, index) {
                    var metadata = new metadata_1["default"](METADATA_KEY.MULTI_INJECT_TAG, serviceIdentifier);
                    return decorator_utils_1.tagParameter(target, targetKey, index, metadata);
                };
            }
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = multiInject;
        }, { "../constants/metadata_keys": 14, "../planning/metadata": 22, "./decorator_utils": 1 }], 5: [function (require, module, exports) {
            "use strict";
            var metadata_1 = require("../planning/metadata");
            var decorator_utils_1 = require("./decorator_utils");
            var METADATA_KEY = require("../constants/metadata_keys");
            function named(name) {
                return function (target, targetKey, index) {
                    var metadata = new metadata_1["default"](METADATA_KEY.NAMED_TAG, name);
                    if (typeof index === "number") {
                        return decorator_utils_1.tagParameter(target, targetKey, index, metadata);
                    } else {
                        return decorator_utils_1.tagProperty(target, targetKey, metadata);
                    }
                };
            }
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = named;
        }, { "../constants/metadata_keys": 14, "../planning/metadata": 22, "./decorator_utils": 1 }], 6: [function (require, module, exports) {
            "use strict";
            var INJECTION = Symbol();
            function _proxyGetter(proto, key, resolve) {
                function getter() {
                    if (!Reflect.hasMetadata(INJECTION, this, key)) {
                        Reflect.defineMetadata(INJECTION, resolve(), this, key);
                    }
                    return Reflect.getMetadata(INJECTION, this, key);
                }
                function setter(newVal) {
                    Reflect.defineMetadata(INJECTION, newVal, this, key);
                }
                Object.defineProperty(proto, key, {
                    configurable: true,
                    enumerable: true,
                    get: getter,
                    set: setter
                });
            }
            function makePropertyInjectDecorator(kernel) {
                return function (serviceIdentifier) {
                    return function (proto, key) {
                        var resolve = function resolve() {
                            return kernel.get(serviceIdentifier);
                        };
                        _proxyGetter(proto, key, resolve);
                    };
                };
            }
            exports.makePropertyInjectDecorator = makePropertyInjectDecorator;
            function makePropertyInjectNamedDecorator(kernel) {
                return function (serviceIdentifier, named) {
                    return function (proto, key) {
                        var resolve = function resolve() {
                            return kernel.getNamed(serviceIdentifier, named);
                        };
                        _proxyGetter(proto, key, resolve);
                    };
                };
            }
            exports.makePropertyInjectNamedDecorator = makePropertyInjectNamedDecorator;
            function makePropertyInjectTaggedDecorator(kernel) {
                return function (serviceIdentifier, key, value) {
                    return function (proto, propertyName) {
                        var resolve = function resolve() {
                            return kernel.getTagged(serviceIdentifier, key, value);
                        };
                        _proxyGetter(proto, propertyName, resolve);
                    };
                };
            }
            exports.makePropertyInjectTaggedDecorator = makePropertyInjectTaggedDecorator;
            function makePropertyMultiInjectDecorator(kernel) {
                return function (serviceIdentifier) {
                    return function (proto, key) {
                        var resolve = function resolve() {
                            return kernel.getAll(serviceIdentifier);
                        };
                        _proxyGetter(proto, key, resolve);
                    };
                };
            }
            exports.makePropertyMultiInjectDecorator = makePropertyMultiInjectDecorator;
        }, {}], 7: [function (require, module, exports) {
            "use strict";
            var metadata_1 = require("../planning/metadata");
            var decorator_utils_1 = require("./decorator_utils");
            function tagged(metadataKey, metadataValue) {
                return function (target, targetKey, index) {
                    var metadata = new metadata_1["default"](metadataKey, metadataValue);
                    if (typeof index === "number") {
                        return decorator_utils_1.tagParameter(target, targetKey, index, metadata);
                    } else {
                        return decorator_utils_1.tagProperty(target, targetKey, metadata);
                    }
                };
            }
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = tagged;
        }, { "../planning/metadata": 22, "./decorator_utils": 1 }], 8: [function (require, module, exports) {
            "use strict";
            var metadata_1 = require("../planning/metadata");
            var decorator_utils_1 = require("./decorator_utils");
            var METADATA_KEY = require("../constants/metadata_keys");
            function targetName(name) {
                return function (target, targetKey, index) {
                    var metadata = new metadata_1["default"](METADATA_KEY.NAME_TAG, name);
                    return decorator_utils_1.tagParameter(target, targetKey, index, metadata);
                };
            }
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = targetName;
        }, { "../constants/metadata_keys": 14, "../planning/metadata": 22, "./decorator_utils": 1 }], 9: [function (require, module, exports) {
            "use strict";
            var binding_scope_1 = require("./binding_scope");
            var binding_type_1 = require("./binding_type");
            var guid_1 = require("../utils/guid");
            var Binding = (function () {
                function Binding(serviceIdentifier) {
                    this.guid = guid_1["default"]();
                    this.activated = false;
                    this.serviceIdentifier = serviceIdentifier;
                    this.scope = binding_scope_1["default"].Transient;
                    this.type = binding_type_1["default"].Invalid;
                    this.constraint = function (request) {
                        return true;
                    };
                    this.implementationType = null;
                    this.cache = null;
                    this.factory = null;
                    this.provider = null;
                    this.onActivation = null;
                }
                Binding.prototype.clone = function () {
                    var clone = new Binding(this.serviceIdentifier);
                    clone.activated = false;
                    clone.implementationType = this.implementationType;
                    clone.dynamicValue = this.dynamicValue;
                    clone.scope = this.scope;
                    clone.type = this.type;
                    clone.factory = this.factory;
                    clone.provider = this.provider;
                    clone.constraint = this.constraint;
                    clone.onActivation = this.onActivation;
                    clone.cache = this.cache;
                    return clone;
                };
                return Binding;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = Binding;
        }, { "../utils/guid": 36, "./binding_scope": 11, "./binding_type": 12 }], 10: [function (require, module, exports) {
            "use strict";
            var BindingCount;
            (function (BindingCount) {
                BindingCount[BindingCount["NoBindingsAvailable"] = 0] = "NoBindingsAvailable";
                BindingCount[BindingCount["OnlyOneBindingAvailable"] = 1] = "OnlyOneBindingAvailable";
                BindingCount[BindingCount["MultipleBindingsAvailable"] = 2] = "MultipleBindingsAvailable";
            })(BindingCount || (BindingCount = {}));
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = BindingCount;
        }, {}], 11: [function (require, module, exports) {
            "use strict";
            var BindingScope;
            (function (BindingScope) {
                BindingScope[BindingScope["Transient"] = 0] = "Transient";
                BindingScope[BindingScope["Singleton"] = 1] = "Singleton";
            })(BindingScope || (BindingScope = {}));
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = BindingScope;
        }, {}], 12: [function (require, module, exports) {
            "use strict";
            var BindingType;
            (function (BindingType) {
                BindingType[BindingType["Invalid"] = 0] = "Invalid";
                BindingType[BindingType["Instance"] = 1] = "Instance";
                BindingType[BindingType["ConstantValue"] = 2] = "ConstantValue";
                BindingType[BindingType["DynamicValue"] = 3] = "DynamicValue";
                BindingType[BindingType["Constructor"] = 4] = "Constructor";
                BindingType[BindingType["Factory"] = 5] = "Factory";
                BindingType[BindingType["Function"] = 6] = "Function";
                BindingType[BindingType["Provider"] = 7] = "Provider";
            })(BindingType || (BindingType = {}));
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = BindingType;
        }, {}], 13: [function (require, module, exports) {
            "use strict";
            exports.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
            exports.DUPLICATED_METADATA = "Metadadata key was used more than once in a parameter:";
            exports.NULL_ARGUMENT = "NULL argument";
            exports.KEY_NOT_FOUND = "Key Not Found";
            exports.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
            exports.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
            exports.NOT_REGISTERED = "No bindings found for serviceIdentifier:";
            exports.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
            exports.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
            exports.CIRCULAR_DEPENDENCY = "Circular dependency found between services:";
            exports.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
            exports.INVALID_BINDING_TYPE = "Invalid binding type:";
            exports.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
            exports.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Return must be an Array!";
            exports.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
            exports.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " + "must be applied to the parameters of a class constructor or a class property.";
            exports.ARGUMENTS_LENGTH_MISMATCH_1 = "The number of constructor arguments in the derived class ";
            exports.ARGUMENTS_LENGTH_MISMATCH_2 = " must be >= than the number of constructor arguments of its base class.";
        }, {}], 14: [function (require, module, exports) {
            "use strict";
            exports.NAMED_TAG = "named";
            exports.NAME_TAG = "name";
            exports.INJECT_TAG = "inject";
            exports.MULTI_INJECT_TAG = "multi_inject";
            exports.TAGGED = "inversify:tagged";
            exports.TAGGED_PROP = "inversify:tagged_props";
            exports.PARAM_TYPES = "inversify:paramtypes";
            exports.DESIGN_PARAM_TYPES = "design:paramtypes";
        }, {}], 15: [function (require, module, exports) {
            "use strict";
            var kernel_1 = require("./kernel/kernel");
            exports.Kernel = kernel_1["default"];
            var kernel_module_1 = require("./kernel/kernel_module");
            exports.KernelModule = kernel_module_1["default"];
            var injectable_1 = require("./annotation/injectable");
            exports.injectable = injectable_1["default"];
            var tagged_1 = require("./annotation/tagged");
            exports.tagged = tagged_1["default"];
            var named_1 = require("./annotation/named");
            exports.named = named_1["default"];
            var inject_1 = require("./annotation/inject");
            exports.inject = inject_1["default"];
            var multi_inject_1 = require("./annotation/multi_inject");
            exports.multiInject = multi_inject_1["default"];
            var target_name_1 = require("./annotation/target_name");
            exports.targetName = target_name_1["default"];
            var decorator_utils_1 = require("./annotation/decorator_utils");
            exports.decorate = decorator_utils_1.decorate;
            var constraint_helpers_1 = require("./syntax/constraint_helpers");
            exports.traverseAncerstors = constraint_helpers_1.traverseAncerstors;
            exports.taggedConstraint = constraint_helpers_1.taggedConstraint;
            exports.namedConstraint = constraint_helpers_1.namedConstraint;
            exports.typeConstraint = constraint_helpers_1.typeConstraint;
            var guid_1 = require("./utils/guid");
            exports.guid = guid_1["default"];
            var property_injectors_1 = require("./annotation/property_injectors");
            exports.makePropertyInjectDecorator = property_injectors_1.makePropertyInjectDecorator;
            exports.makePropertyMultiInjectDecorator = property_injectors_1.makePropertyMultiInjectDecorator;
            exports.makePropertyInjectTaggedDecorator = property_injectors_1.makePropertyInjectTaggedDecorator;
            exports.makePropertyInjectNamedDecorator = property_injectors_1.makePropertyInjectNamedDecorator;
        }, { "./annotation/decorator_utils": 1, "./annotation/inject": 2, "./annotation/injectable": 3, "./annotation/multi_inject": 4, "./annotation/named": 5, "./annotation/property_injectors": 6, "./annotation/tagged": 7, "./annotation/target_name": 8, "./kernel/kernel": 16, "./kernel/kernel_module": 17, "./syntax/constraint_helpers": 35, "./utils/guid": 36 }], 16: [function (require, module, exports) {
            "use strict";
            var binding_count_1 = require("../bindings/binding_count");
            var binding_1 = require("../bindings/binding");
            var lookup_1 = require("./lookup");
            var planner_1 = require("../planning/planner");
            var resolver_1 = require("../resolution/resolver");
            var ERROR_MSGS = require("../constants/error_msgs");
            var METADATA_KEY = require("../constants/metadata_keys");
            var binding_to_syntax_1 = require("../syntax/binding_to_syntax");
            var metadata_1 = require("../planning/metadata");
            var target_1 = require("../planning/target");
            var request_1 = require("../planning/request");
            var kernel_snapshot_1 = require("./kernel_snapshot");
            var guid_1 = require("../utils/guid");
            var Kernel = (function () {
                function Kernel() {
                    this.guid = guid_1["default"]();
                    this._planner = new planner_1["default"]();
                    this._resolver = new resolver_1["default"]();
                    this._bindingDictionary = new lookup_1["default"]();
                    this._middleware = null;
                    this._snapshots = [];
                }
                Kernel.prototype.load = function () {
                    var _this = this;
                    var modules = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        modules[_i - 0] = arguments[_i];
                    }
                    var getBindFunction = function getBindFunction(moduleId) {
                        return function (serviceIdentifier) {
                            var _bind = _this.bind.bind(_this);
                            var bindingToSyntax = _bind(serviceIdentifier);
                            bindingToSyntax._binding.moduleId = moduleId;
                            return bindingToSyntax;
                        };
                    };
                    modules.forEach(function (module) {
                        var bindFunction = getBindFunction(module.guid);
                        module.registry(bindFunction);
                    });
                };
                Kernel.prototype.unload = function () {
                    var _this = this;
                    var modules = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        modules[_i - 0] = arguments[_i];
                    }
                    modules.forEach(function (module) {
                        _this._bindingDictionary.removeByModuleId(module.guid);
                    });
                };
                Kernel.prototype.bind = function (serviceIdentifier) {
                    var binding = new binding_1["default"](serviceIdentifier);
                    this._bindingDictionary.add(serviceIdentifier, binding);
                    return new binding_to_syntax_1["default"](binding);
                };
                Kernel.prototype.unbind = function (serviceIdentifier) {
                    try {
                        this._bindingDictionary.remove(serviceIdentifier);
                    } catch (e) {
                        throw new Error(ERROR_MSGS.CANNOT_UNBIND + " " + this.getServiceIdentifierAsString(serviceIdentifier));
                    }
                };
                Kernel.prototype.unbindAll = function () {
                    this._bindingDictionary = new lookup_1["default"]();
                };
                Kernel.prototype.isBound = function (serviceIdentifier) {
                    var bindings = this._planner.getBindings(this, serviceIdentifier);
                    return bindings.length > 0;
                };
                Kernel.prototype.get = function (serviceIdentifier) {
                    return this._get({
                        contextInterceptor: function contextInterceptor(context) {
                            return context;
                        },
                        multiInject: false,
                        serviceIdentifier: serviceIdentifier,
                        target: null
                    })[0];
                };
                Kernel.prototype.getNamed = function (serviceIdentifier, named) {
                    return this.getTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
                };
                Kernel.prototype.getTagged = function (serviceIdentifier, key, value) {
                    var metadata = new metadata_1["default"](key, value);
                    var target = new target_1["default"](null, serviceIdentifier, metadata);
                    return this._get({
                        contextInterceptor: function contextInterceptor(context) {
                            return context;
                        },
                        multiInject: false,
                        serviceIdentifier: serviceIdentifier,
                        target: target
                    })[0];
                };
                Kernel.prototype.snapshot = function () {
                    this._snapshots.push(kernel_snapshot_1["default"].of(this._bindingDictionary.clone(), this._middleware));
                };
                Kernel.prototype.restore = function () {
                    if (this._snapshots.length === 0) {
                        throw new Error(ERROR_MSGS.NO_MORE_SNAPSHOTS_AVAILABLE);
                    }
                    var snapshot = this._snapshots.pop();
                    this._bindingDictionary = snapshot.bindings;
                    this._middleware = snapshot.middleware;
                };
                Kernel.prototype.getServiceIdentifierAsString = function (serviceIdentifier) {
                    var type = typeof serviceIdentifier;
                    if (type === "function") {
                        var _serviceIdentifier = serviceIdentifier;
                        return _serviceIdentifier.name;
                    } else if (type === "symbol") {
                        return serviceIdentifier.toString();
                    } else {
                        var _serviceIdentifier = serviceIdentifier;
                        return _serviceIdentifier;
                    }
                };
                Kernel.prototype.applyMiddleware = function () {
                    var middlewares = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        middlewares[_i - 0] = arguments[_i];
                    }
                    var previous = this._middleware ? this._middleware : this._planAndResolve.bind(this);
                    this._middleware = middlewares.reduce(function (prev, curr) {
                        return curr(prev);
                    }, previous);
                };
                Kernel.prototype.getAll = function (serviceIdentifier) {
                    return this._get({
                        contextInterceptor: function contextInterceptor(context) {
                            return context;
                        },
                        multiInject: true,
                        serviceIdentifier: serviceIdentifier,
                        target: null
                    });
                };
                Kernel.prototype._get = function (args) {
                    var result = null;
                    if (this._middleware) {
                        result = this._middleware(args);
                    } else {
                        result = this._planAndResolve(args);
                    }
                    if (Array.isArray(result) === false) {
                        throw new Error(ERROR_MSGS.INVALID_MIDDLEWARE_RETURN);
                    }
                    return result;
                };
                Kernel.prototype._planAndResolve = function (args) {
                    var contexts = this._plan(args.multiInject, args.serviceIdentifier, args.target);
                    var results = this._resolve(contexts, args.contextInterceptor);
                    return results;
                };
                Kernel.prototype._getActiveBindings = function (multiInject, serviceIdentifier, target) {
                    var bindings = this._planner.getBindings(this, serviceIdentifier);
                    if (target !== null) {
                        var request = new request_1["default"](serviceIdentifier, this._planner.createContext(this), null, bindings, target);
                        bindings = this._planner.getActiveBindings(request, target);
                    }
                    switch (bindings.length) {
                        case binding_count_1["default"].NoBindingsAvailable:
                            throw new Error(ERROR_MSGS.NOT_REGISTERED + " " + this.getServiceIdentifierAsString(serviceIdentifier));
                        case binding_count_1["default"].OnlyOneBindingAvailable:
                            if (multiInject === false) {
                                return bindings;
                            }
                        case binding_count_1["default"].MultipleBindingsAvailable:
                        default:
                            if (multiInject === false) {
                                throw new Error(ERROR_MSGS.AMBIGUOUS_MATCH + " " + this.getServiceIdentifierAsString(serviceIdentifier));
                            } else {
                                return bindings;
                            }
                    }
                };
                Kernel.prototype._plan = function (multiInject, serviceIdentifier, target) {
                    var _this = this;
                    var bindings = this._getActiveBindings(multiInject, serviceIdentifier, target);
                    var contexts = bindings.map(function (binding) {
                        return _this._createContext(binding, target);
                    });
                    return contexts;
                };
                Kernel.prototype._createContext = function (binding, target) {
                    var context = this._planner.createContext(this);
                    this._planner.createPlan(context, binding, target);
                    return context;
                };
                Kernel.prototype._resolve = function (contexts, contextInterceptor) {
                    var _this = this;
                    var results = contexts.map(function (context) {
                        return _this._resolver.resolve(contextInterceptor(context));
                    });
                    return results;
                };
                return Kernel;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = Kernel;
        }, { "../bindings/binding": 9, "../bindings/binding_count": 10, "../constants/error_msgs": 13, "../constants/metadata_keys": 14, "../planning/metadata": 22, "../planning/planner": 24, "../planning/request": 26, "../planning/target": 27, "../resolution/resolver": 28, "../syntax/binding_to_syntax": 32, "../utils/guid": 36, "./kernel_snapshot": 18, "./lookup": 20 }], 17: [function (require, module, exports) {
            "use strict";
            var guid_1 = require("../utils/guid");
            var KernelModule = (function () {
                function KernelModule(registry) {
                    this.guid = guid_1["default"]();
                    this.registry = registry;
                }
                return KernelModule;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = KernelModule;
        }, { "../utils/guid": 36 }], 18: [function (require, module, exports) {
            "use strict";
            var KernelSnapshot = (function () {
                function KernelSnapshot() {}
                KernelSnapshot.of = function (bindings, middleware) {
                    var snapshot = new KernelSnapshot();
                    snapshot.bindings = bindings;
                    snapshot.middleware = middleware;
                    return snapshot;
                };
                return KernelSnapshot;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = KernelSnapshot;
        }, {}], 19: [function (require, module, exports) {
            "use strict";
            var guid_1 = require("../utils/guid");
            var KeyValuePair = (function () {
                function KeyValuePair(serviceIdentifier, value) {
                    this.serviceIdentifier = serviceIdentifier;
                    this.value = new Array();
                    this.value.push(value);
                    this.guid = guid_1["default"]();
                }
                return KeyValuePair;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = KeyValuePair;
        }, { "../utils/guid": 36 }], 20: [function (require, module, exports) {
            "use strict";
            var key_value_pair_1 = require("./key_value_pair");
            var ERROR_MSGS = require("../constants/error_msgs");
            var Lookup = (function () {
                function Lookup() {
                    this._dictionary = [];
                }
                Lookup.prototype.add = function (serviceIdentifier, value) {
                    if (serviceIdentifier === null || serviceIdentifier === undefined) {
                        throw new Error(ERROR_MSGS.NULL_ARGUMENT);
                    }
                    ;
                    if (value === null || value === undefined) {
                        throw new Error(ERROR_MSGS.NULL_ARGUMENT);
                    }
                    ;
                    var index = this.getIndexByKey(serviceIdentifier);
                    if (index !== -1) {
                        this._dictionary[index].value.push(value);
                    } else {
                        this._dictionary.push(new key_value_pair_1["default"](serviceIdentifier, value));
                    }
                };
                Lookup.prototype.get = function (serviceIdentifier) {
                    if (serviceIdentifier === null || serviceIdentifier === undefined) {
                        throw new Error(ERROR_MSGS.NULL_ARGUMENT);
                    }
                    var index = this.getIndexByKey(serviceIdentifier);
                    if (index !== -1) {
                        return this._dictionary[index].value;
                    } else {
                        throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
                    }
                };
                Lookup.prototype.remove = function (serviceIdentifier) {
                    if (serviceIdentifier === null || serviceIdentifier === undefined) {
                        throw new Error(ERROR_MSGS.NULL_ARGUMENT);
                    }
                    var index = this.getIndexByKey(serviceIdentifier);
                    if (index !== -1) {
                        this._dictionary.splice(index, 1);
                    } else {
                        throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
                    }
                };
                Lookup.prototype.removeByModuleId = function (moduleId) {
                    this._dictionary.forEach(function (keyValuePair) {
                        keyValuePair.value = keyValuePair.value.filter(function (binding) {
                            return binding.moduleId !== moduleId;
                        });
                    });
                    this._dictionary = this._dictionary.filter(function (keyValuePair) {
                        return keyValuePair.value.length > 0;
                    });
                };
                Lookup.prototype.hasKey = function (serviceIdentifier) {
                    if (serviceIdentifier === null || serviceIdentifier === undefined) {
                        throw new Error(ERROR_MSGS.NULL_ARGUMENT);
                    }
                    var index = this.getIndexByKey(serviceIdentifier);
                    if (index !== -1) {
                        return true;
                    } else {
                        return false;
                    }
                };
                Lookup.prototype.clone = function () {
                    var l = new Lookup();
                    for (var _i = 0, _a = this._dictionary; _i < _a.length; _i++) {
                        var entry = _a[_i];
                        for (var _b = 0, _c = entry.value; _b < _c.length; _b++) {
                            var binding = _c[_b];
                            l.add(entry.serviceIdentifier, binding.clone());
                        }
                    }
                    return l;
                };
                Lookup.prototype.getIndexByKey = function (serviceIdentifier) {
                    var index = -1;
                    for (var i = 0; i < this._dictionary.length; i++) {
                        var keyValuePair = this._dictionary[i];
                        if (keyValuePair.serviceIdentifier === serviceIdentifier) {
                            index = i;
                        }
                    }
                    return index;
                };
                return Lookup;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = Lookup;
        }, { "../constants/error_msgs": 13, "./key_value_pair": 19 }], 21: [function (require, module, exports) {
            "use strict";
            var guid_1 = require("../utils/guid");
            var Context = (function () {
                function Context(kernel) {
                    this.guid = guid_1["default"]();
                    this.kernel = kernel;
                }
                Context.prototype.addPlan = function (plan) {
                    this.plan = plan;
                };
                return Context;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = Context;
        }, { "../utils/guid": 36 }], 22: [function (require, module, exports) {
            "use strict";
            var Metadata = (function () {
                function Metadata(key, value) {
                    this.key = key;
                    this.value = value;
                }
                return Metadata;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = Metadata;
        }, {}], 23: [function (require, module, exports) {
            "use strict";
            var Plan = (function () {
                function Plan(parentContext, rootRequest) {
                    this.parentContext = parentContext;
                    this.rootRequest = rootRequest;
                }
                return Plan;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = Plan;
        }, {}], 24: [function (require, module, exports) {
            "use strict";
            var plan_1 = require("./plan");
            var context_1 = require("./context");
            var request_1 = require("./request");
            var target_1 = require("./target");
            var METADATA_KEY = require("../constants/metadata_keys");
            var ERROR_MSGS = require("../constants/error_msgs");
            var binding_type_1 = require("../bindings/binding_type");
            var Planner = (function () {
                function Planner() {}
                Planner.prototype.createContext = function (kernel) {
                    return new context_1["default"](kernel);
                };
                Planner.prototype.createPlan = function (context, binding, target) {
                    var _this = this;
                    var rootRequest = new request_1["default"](binding.serviceIdentifier, context, null, binding, target);
                    var plan = new plan_1["default"](context, rootRequest);
                    context.addPlan(plan);
                    var dependencies = this._getDependencies(binding.implementationType);
                    dependencies.forEach(function (dependency) {
                        _this._createSubRequest(rootRequest, dependency);
                    });
                    return plan;
                };
                Planner.prototype.getBindings = function (kernel, serviceIdentifier) {
                    var bindings = [];
                    var _kernel = kernel;
                    var _bindingDictionary = _kernel._bindingDictionary;
                    if (_bindingDictionary.hasKey(serviceIdentifier)) {
                        bindings = _bindingDictionary.get(serviceIdentifier);
                    }
                    return bindings;
                };
                Planner.prototype.getActiveBindings = function (parentRequest, target) {
                    var bindings = this.getBindings(parentRequest.parentContext.kernel, target.serviceIdentifier);
                    var activeBindings = [];
                    if (bindings.length > 1 && target.isArray() === false) {
                        activeBindings = bindings.filter(function (binding) {
                            var request = new request_1["default"](binding.serviceIdentifier, parentRequest.parentContext, parentRequest, binding, target);
                            return binding.constraint(request);
                        });
                    } else {
                        activeBindings = bindings;
                    }
                    return activeBindings;
                };
                Planner.prototype._createSubRequest = function (parentRequest, target) {
                    try {
                        var activeBindings = this.getActiveBindings(parentRequest, target);
                        if (activeBindings.length === 0) {
                            var serviceIdentifier = parentRequest.parentContext.kernel.getServiceIdentifierAsString(target.serviceIdentifier);
                            throw new Error(ERROR_MSGS.NOT_REGISTERED + " " + serviceIdentifier);
                        } else if (activeBindings.length > 1 && target.isArray() === false) {
                            var serviceIdentifier = parentRequest.parentContext.kernel.getServiceIdentifierAsString(target.serviceIdentifier);
                            throw new Error(ERROR_MSGS.AMBIGUOUS_MATCH + " " + serviceIdentifier);
                        } else {
                            this._createChildRequest(parentRequest, target, activeBindings);
                        }
                    } catch (error) {
                        if (error instanceof RangeError) {
                            this._throwWhenCircularDependenciesFound(parentRequest.parentContext.plan.rootRequest);
                        } else {
                            throw new Error(error.message);
                        }
                    }
                };
                Planner.prototype._createChildRequest = function (parentRequest, target, bindings) {
                    var _this = this;
                    var childRequest = parentRequest.addChildRequest(target.serviceIdentifier, bindings, target);
                    var subChildRequest = childRequest;
                    bindings.forEach(function (binding) {
                        if (target.isArray()) {
                            subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
                        }
                        if (binding.type === binding_type_1["default"].Instance) {
                            var subDependencies = _this._getDependencies(binding.implementationType);
                            subDependencies.forEach(function (d, index) {
                                _this._createSubRequest(subChildRequest, d);
                            });
                        }
                    });
                };
                Planner.prototype._throwWhenCircularDependenciesFound = function (request, previousServiceIdentifiers) {
                    var _this = this;
                    if (previousServiceIdentifiers === void 0) {
                        previousServiceIdentifiers = [];
                    }
                    previousServiceIdentifiers.push(request.serviceIdentifier);
                    request.childRequests.forEach(function (childRequest) {
                        var serviceIdentifier = request.parentContext.kernel.getServiceIdentifierAsString(childRequest.serviceIdentifier);
                        if (previousServiceIdentifiers.indexOf(serviceIdentifier) === -1) {
                            if (childRequest.childRequests.length > 0) {
                                _this._throwWhenCircularDependenciesFound(childRequest, previousServiceIdentifiers);
                            } else {
                                previousServiceIdentifiers.push(serviceIdentifier);
                            }
                        } else {
                            var tailServiceIdentifier = request.parentContext.kernel.getServiceIdentifierAsString(request.serviceIdentifier);
                            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY + " " + serviceIdentifier + " and " + tailServiceIdentifier);
                        }
                    });
                };
                Planner.prototype._getDependencies = function (func) {
                    if (func === null) {
                        return [];
                    }
                    var constructorName = func.name;
                    var targetsTypes = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, func);
                    if (targetsTypes === undefined) {
                        var msg = ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
                        throw new Error(msg);
                    }
                    var targetsMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED, func) || [];
                    var targets = [];
                    var _loop_1 = function _loop_1(i) {
                        var targetType = targetsTypes[i];
                        var targetMetadata = targetsMetadata[i.toString()] || [];
                        var targetMetadataMap = {};
                        targetMetadata.forEach(function (m) {
                            targetMetadataMap[m.key.toString()] = m.value;
                        });
                        var inject = targetMetadataMap[METADATA_KEY.INJECT_TAG];
                        var multiInject = targetMetadataMap[METADATA_KEY.MULTI_INJECT_TAG];
                        var targetName = targetMetadataMap[METADATA_KEY.NAME_TAG];
                        targetType = inject || multiInject ? inject || multiInject : targetType;
                        if (targetType === Object || targetType === Function || targetType === undefined) {
                            var msg = ERROR_MSGS.MISSING_INJECT_ANNOTATION + " argument " + i + " in class " + constructorName + ".";
                            throw new Error(msg);
                        }
                        var target = new target_1["default"](targetName, targetType);
                        target.metadata = targetMetadata;
                        targets.push(target);
                    };
                    for (var i = 0; i < func.length; i++) {
                        _loop_1(i);
                    }
                    var baseClassHasDepencencies = this._baseClassDepencencyCount(func);
                    if (targets.length < baseClassHasDepencencies) {
                        var error = ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH_1 + constructorName + ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH_2;
                        throw new Error(error);
                    }
                    return targets;
                };
                Planner.prototype._baseClassDepencencyCount = function (func) {
                    var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
                    if (baseConstructor !== Object) {
                        var targetsTypes = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, baseConstructor);
                        if (targetsTypes === undefined) {
                            var baseConstructorName = baseConstructor.name;
                            var msg = ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION + " " + baseConstructorName + ".";
                            throw new Error(msg);
                        }
                        if (baseConstructor.length > 0 && targetsTypes) {
                            return baseConstructor.length;
                        } else {
                            return this._baseClassDepencencyCount(baseConstructor);
                        }
                    } else {
                        return 0;
                    }
                };
                return Planner;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = Planner;
        }, { "../bindings/binding_type": 12, "../constants/error_msgs": 13, "../constants/metadata_keys": 14, "./context": 21, "./plan": 23, "./request": 26, "./target": 27 }], 25: [function (require, module, exports) {
            "use strict";
            var QueryableString = (function () {
                function QueryableString(str) {
                    this.str = str;
                }
                QueryableString.prototype.startsWith = function (searchString) {
                    return this.str.indexOf(searchString) === 0;
                };
                QueryableString.prototype.endsWith = function (searchString) {
                    var reverseString = "";
                    var reverseSearchString = searchString.split("").reverse().join("");
                    reverseString = this.str.split("").reverse().join("");
                    return this.startsWith.call({ str: reverseString }, reverseSearchString);
                };
                QueryableString.prototype.contains = function (searchString) {
                    return this.str.indexOf(searchString) !== -1;
                };
                QueryableString.prototype.equals = function (compareString) {
                    return this.str === compareString;
                };
                QueryableString.prototype.value = function () {
                    return this.str;
                };
                return QueryableString;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = QueryableString;
        }, {}], 26: [function (require, module, exports) {
            "use strict";
            var guid_1 = require("../utils/guid");
            var Request = (function () {
                function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
                    if (target === void 0) {
                        target = null;
                    }
                    this.guid = guid_1["default"]();
                    this.serviceIdentifier = serviceIdentifier;
                    this.parentContext = parentContext;
                    this.parentRequest = parentRequest;
                    this.target = target;
                    this.childRequests = [];
                    this.bindings = Array.isArray(bindings) ? bindings : bindings ? [bindings] : [];
                }
                Request.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
                    var child = new Request(serviceIdentifier, this.parentContext, this, bindings, target);
                    this.childRequests.push(child);
                    return child;
                };
                return Request;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = Request;
        }, { "../utils/guid": 36 }], 27: [function (require, module, exports) {
            "use strict";
            var metadata_1 = require("../planning/metadata");
            var queryable_string_1 = require("./queryable_string");
            var METADATA_KEY = require("../constants/metadata_keys");
            var guid_1 = require("../utils/guid");
            var Target = (function () {
                function Target(name, serviceIdentifier, namedOrTagged) {
                    this.guid = guid_1["default"]();
                    this.serviceIdentifier = serviceIdentifier;
                    this.name = new queryable_string_1["default"](name || "");
                    this.metadata = new Array();
                    var metadataItem = null;
                    if (typeof namedOrTagged === "string") {
                        metadataItem = new metadata_1["default"](METADATA_KEY.NAMED_TAG, namedOrTagged);
                    } else if (namedOrTagged instanceof metadata_1["default"]) {
                        metadataItem = namedOrTagged;
                    }
                    if (metadataItem !== null) {
                        this.metadata.push(metadataItem);
                    }
                }
                Target.prototype.hasTag = function (key) {
                    for (var i = 0; i < this.metadata.length; i++) {
                        var m = this.metadata[i];
                        if (m.key === key) {
                            return true;
                        }
                    }
                    return false;
                };
                Target.prototype.isArray = function () {
                    return this.hasTag(METADATA_KEY.MULTI_INJECT_TAG);
                };
                Target.prototype.matchesArray = function (name) {
                    return this.matchesTag(METADATA_KEY.MULTI_INJECT_TAG)(name);
                };
                Target.prototype.isNamed = function () {
                    return this.hasTag(METADATA_KEY.NAMED_TAG);
                };
                Target.prototype.isTagged = function () {
                    if (this.metadata.length > 1) {
                        return true;
                    } else if (this.metadata.length === 1) {
                        return !this.hasTag(METADATA_KEY.NAMED_TAG);
                    } else {
                        return false;
                    }
                };
                Target.prototype.matchesNamedTag = function (name) {
                    return this.matchesTag(METADATA_KEY.NAMED_TAG)(name);
                };
                Target.prototype.matchesTag = function (key) {
                    var _this = this;
                    return function (value) {
                        for (var i = 0; i < _this.metadata.length; i++) {
                            var m = _this.metadata[i];
                            if (m.key === key && m.value === value) {
                                return true;
                            }
                        }
                        return false;
                    };
                };
                return Target;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = Target;
        }, { "../constants/metadata_keys": 14, "../planning/metadata": 22, "../utils/guid": 36, "./queryable_string": 25 }], 28: [function (require, module, exports) {
            "use strict";
            var binding_scope_1 = require("../bindings/binding_scope");
            var binding_type_1 = require("../bindings/binding_type");
            var ERROR_MSGS = require("../constants/error_msgs");
            var Resolver = (function () {
                function Resolver() {}
                Resolver.prototype.resolve = function (context) {
                    var rootRequest = context.plan.rootRequest;
                    return this._resolve(rootRequest);
                };
                Resolver.prototype._resolve = function (request) {
                    var _this = this;
                    var bindings = request.bindings;
                    var childRequests = request.childRequests;
                    if (request.target && request.target.isArray() && (!request.parentRequest.target || !request.parentRequest.target.matchesArray(request.target.serviceIdentifier))) {
                        return childRequests.map(function (childRequest) {
                            return _this._resolve(childRequest);
                        });
                    } else {
                        var result = null;
                        var binding = bindings[0];
                        var isSingleton = binding.scope === binding_scope_1["default"].Singleton;
                        if (isSingleton && binding.activated === true) {
                            return binding.cache;
                        }
                        switch (binding.type) {
                            case binding_type_1["default"].ConstantValue:
                                result = binding.cache;
                                break;
                            case binding_type_1["default"].DynamicValue:
                                result = binding.dynamicValue();
                                break;
                            case binding_type_1["default"].Constructor:
                                result = binding.implementationType;
                                break;
                            case binding_type_1["default"].Factory:
                                result = binding.factory(request.parentContext);
                                break;
                            case binding_type_1["default"].Function:
                                result = binding.cache;
                                break;
                            case binding_type_1["default"].Provider:
                                result = binding.provider(request.parentContext);
                                break;
                            case binding_type_1["default"].Instance:
                                var constr = binding.implementationType;
                                if (childRequests.length > 0) {
                                    var injections = childRequests.map(function (childRequest) {
                                        return _this._resolve(childRequest);
                                    });
                                    result = this._createInstance(constr, injections);
                                } else {
                                    result = new constr();
                                }
                                break;
                            case binding_type_1["default"].Invalid:
                            default:
                                var serviceIdentifier = request.parentContext.kernel.getServiceIdentifierAsString(request.serviceIdentifier);
                                throw new Error(ERROR_MSGS.INVALID_BINDING_TYPE + " " + serviceIdentifier);
                        }
                        if (typeof binding.onActivation === "function") {
                            result = binding.onActivation(request.parentContext, result);
                        }
                        if (isSingleton) {
                            binding.cache = result;
                            binding.activated = true;
                        }
                        return result;
                    }
                };
                Resolver.prototype._createInstance = function (Func, injections) {
                    return new (Func.bind.apply(Func, [void 0].concat(injections)))();
                };
                return Resolver;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = Resolver;
        }, { "../bindings/binding_scope": 11, "../bindings/binding_type": 12, "../constants/error_msgs": 13 }], 29: [function (require, module, exports) {
            "use strict";
            var binding_scope_1 = require("../bindings/binding_scope");
            var binding_when_on_syntax_1 = require("./binding_when_on_syntax");
            var BindingInSyntax = (function () {
                function BindingInSyntax(binding) {
                    this._binding = binding;
                }
                BindingInSyntax.prototype.inSingletonScope = function () {
                    this._binding.scope = binding_scope_1["default"].Singleton;
                    return new binding_when_on_syntax_1["default"](this._binding);
                };
                return BindingInSyntax;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = BindingInSyntax;
        }, { "../bindings/binding_scope": 11, "./binding_when_on_syntax": 33 }], 30: [function (require, module, exports) {
            "use strict";
            var binding_in_syntax_1 = require("./binding_in_syntax");
            var binding_when_syntax_1 = require("./binding_when_syntax");
            var binding_on_syntax_1 = require("./binding_on_syntax");
            var BindingInWhenOnSyntax = (function () {
                function BindingInWhenOnSyntax(binding) {
                    this._binding = binding;
                    this._bindingWhenSyntax = new binding_when_syntax_1["default"](this._binding);
                    this._bindingOnSyntax = new binding_on_syntax_1["default"](this._binding);
                    this._bindingInSyntax = new binding_in_syntax_1["default"](binding);
                }
                BindingInWhenOnSyntax.prototype.inSingletonScope = function () {
                    return this._bindingInSyntax.inSingletonScope();
                };
                BindingInWhenOnSyntax.prototype.when = function (constraint) {
                    return this._bindingWhenSyntax.when(constraint);
                };
                BindingInWhenOnSyntax.prototype.whenTargetNamed = function (name) {
                    return this._bindingWhenSyntax.whenTargetNamed(name);
                };
                BindingInWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
                    return this._bindingWhenSyntax.whenTargetTagged(tag, value);
                };
                BindingInWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
                    return this._bindingWhenSyntax.whenInjectedInto(parent);
                };
                BindingInWhenOnSyntax.prototype.whenParentNamed = function (name) {
                    return this._bindingWhenSyntax.whenParentNamed(name);
                };
                BindingInWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
                    return this._bindingWhenSyntax.whenParentTagged(tag, value);
                };
                BindingInWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
                    return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
                };
                BindingInWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
                    return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
                };
                BindingInWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
                    return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
                };
                BindingInWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
                    return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
                };
                BindingInWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
                    return this._bindingWhenSyntax.whenNoAncestorNamed(name);
                };
                BindingInWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
                    return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
                };
                BindingInWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
                    return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
                };
                BindingInWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
                    return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
                };
                BindingInWhenOnSyntax.prototype.onActivation = function (handler) {
                    return this._bindingOnSyntax.onActivation(handler);
                };
                return BindingInWhenOnSyntax;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = BindingInWhenOnSyntax;
        }, { "./binding_in_syntax": 29, "./binding_on_syntax": 31, "./binding_when_syntax": 34 }], 31: [function (require, module, exports) {
            "use strict";
            var binding_when_syntax_1 = require("./binding_when_syntax");
            var BindingOnSyntax = (function () {
                function BindingOnSyntax(binding) {
                    this._binding = binding;
                }
                BindingOnSyntax.prototype.onActivation = function (handler) {
                    this._binding.onActivation = handler;
                    return new binding_when_syntax_1["default"](this._binding);
                };
                return BindingOnSyntax;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = BindingOnSyntax;
        }, { "./binding_when_syntax": 34 }], 32: [function (require, module, exports) {
            "use strict";
            var binding_in_when_on_syntax_1 = require("./binding_in_when_on_syntax");
            var binding_when_on_syntax_1 = require("./binding_when_on_syntax");
            var binding_type_1 = require("../bindings/binding_type");
            var ERROR_MSGS = require("../constants/error_msgs");
            var BindingToSyntax = (function () {
                function BindingToSyntax(binding) {
                    this._binding = binding;
                }
                BindingToSyntax.prototype.to = function (constructor) {
                    this._binding.type = binding_type_1["default"].Instance;
                    this._binding.implementationType = constructor;
                    return new binding_in_when_on_syntax_1["default"](this._binding);
                };
                BindingToSyntax.prototype.toSelf = function () {
                    return this.to(this._binding.serviceIdentifier);
                };
                BindingToSyntax.prototype.toConstantValue = function (value) {
                    this._binding.type = binding_type_1["default"].ConstantValue;
                    this._binding.cache = value;
                    this._binding.dynamicValue = null;
                    this._binding.implementationType = null;
                    return new binding_when_on_syntax_1["default"](this._binding);
                };
                BindingToSyntax.prototype.toDynamicValue = function (func) {
                    this._binding.type = binding_type_1["default"].DynamicValue;
                    this._binding.cache = null;
                    this._binding.dynamicValue = func;
                    this._binding.implementationType = null;
                    return new binding_when_on_syntax_1["default"](this._binding);
                };
                BindingToSyntax.prototype.toConstructor = function (constructor) {
                    this._binding.type = binding_type_1["default"].Constructor;
                    this._binding.implementationType = constructor;
                    return new binding_when_on_syntax_1["default"](this._binding);
                };
                BindingToSyntax.prototype.toFactory = function (factory) {
                    this._binding.type = binding_type_1["default"].Factory;
                    this._binding.factory = factory;
                    return new binding_when_on_syntax_1["default"](this._binding);
                };
                BindingToSyntax.prototype.toFunction = function (func) {
                    if (typeof func !== "function") {
                        throw new Error(ERROR_MSGS.INVALID_FUNCTION_BINDING);
                    }
                    ;
                    var bindingWhenOnSyntax = this.toConstantValue(func);
                    this._binding.type = binding_type_1["default"].Function;
                    return bindingWhenOnSyntax;
                };
                BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
                    this._binding.type = binding_type_1["default"].Factory;
                    this._binding.factory = function (context) {
                        return function () {
                            return context.kernel.get(serviceIdentifier);
                        };
                    };
                    return new binding_when_on_syntax_1["default"](this._binding);
                };
                BindingToSyntax.prototype.toProvider = function (provider) {
                    this._binding.type = binding_type_1["default"].Provider;
                    this._binding.provider = provider;
                    return new binding_when_on_syntax_1["default"](this._binding);
                };
                return BindingToSyntax;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = BindingToSyntax;
        }, { "../bindings/binding_type": 12, "../constants/error_msgs": 13, "./binding_in_when_on_syntax": 30, "./binding_when_on_syntax": 33 }], 33: [function (require, module, exports) {
            "use strict";
            var binding_when_syntax_1 = require("./binding_when_syntax");
            var binding_on_syntax_1 = require("./binding_on_syntax");
            var BindingWhenOnSyntax = (function () {
                function BindingWhenOnSyntax(binding) {
                    this._binding = binding;
                    this._bindingWhenSyntax = new binding_when_syntax_1["default"](this._binding);
                    this._bindingOnSyntax = new binding_on_syntax_1["default"](this._binding);
                }
                BindingWhenOnSyntax.prototype.when = function (constraint) {
                    return this._bindingWhenSyntax.when(constraint);
                };
                BindingWhenOnSyntax.prototype.whenTargetNamed = function (name) {
                    return this._bindingWhenSyntax.whenTargetNamed(name);
                };
                BindingWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
                    return this._bindingWhenSyntax.whenTargetTagged(tag, value);
                };
                BindingWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
                    return this._bindingWhenSyntax.whenInjectedInto(parent);
                };
                BindingWhenOnSyntax.prototype.whenParentNamed = function (name) {
                    return this._bindingWhenSyntax.whenParentNamed(name);
                };
                BindingWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
                    return this._bindingWhenSyntax.whenParentTagged(tag, value);
                };
                BindingWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
                    return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
                };
                BindingWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
                    return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
                };
                BindingWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
                    return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
                };
                BindingWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
                    return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
                };
                BindingWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
                    return this._bindingWhenSyntax.whenNoAncestorNamed(name);
                };
                BindingWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
                    return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
                };
                BindingWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
                    return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
                };
                BindingWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
                    return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
                };
                BindingWhenOnSyntax.prototype.onActivation = function (handler) {
                    return this._bindingOnSyntax.onActivation(handler);
                };
                return BindingWhenOnSyntax;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = BindingWhenOnSyntax;
        }, { "./binding_on_syntax": 31, "./binding_when_syntax": 34 }], 34: [function (require, module, exports) {
            "use strict";
            var binding_on_syntax_1 = require("./binding_on_syntax");
            var constraint_helpers_1 = require("./constraint_helpers");
            var BindingWhenSyntax = (function () {
                function BindingWhenSyntax(binding) {
                    this._binding = binding;
                }
                BindingWhenSyntax.prototype.when = function (constraint) {
                    this._binding.constraint = constraint;
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenTargetNamed = function (name) {
                    this._binding.constraint = constraint_helpers_1.namedConstraint(name);
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenTargetTagged = function (tag, value) {
                    this._binding.constraint = constraint_helpers_1.taggedConstraint(tag)(value);
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenInjectedInto = function (parent) {
                    this._binding.constraint = function (request) {
                        return constraint_helpers_1.typeConstraint(parent)(request.parentRequest);
                    };
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenParentNamed = function (name) {
                    this._binding.constraint = function (request) {
                        return constraint_helpers_1.namedConstraint(name)(request.parentRequest);
                    };
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenParentTagged = function (tag, value) {
                    this._binding.constraint = function (request) {
                        return constraint_helpers_1.taggedConstraint(tag)(value)(request.parentRequest);
                    };
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
                    this._binding.constraint = function (request) {
                        return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
                    };
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenNoAncestorIs = function (ancestor) {
                    this._binding.constraint = function (request) {
                        return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
                    };
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenAnyAncestorNamed = function (name) {
                    this._binding.constraint = function (request) {
                        return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
                    };
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenNoAncestorNamed = function (name) {
                    this._binding.constraint = function (request) {
                        return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
                    };
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
                    this._binding.constraint = function (request) {
                        return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
                    };
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
                    this._binding.constraint = function (request) {
                        return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
                    };
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
                    this._binding.constraint = function (request) {
                        return constraint_helpers_1.traverseAncerstors(request, constraint);
                    };
                    return new binding_on_syntax_1["default"](this._binding);
                };
                BindingWhenSyntax.prototype.whenNoAncestorMatches = function (constraint) {
                    this._binding.constraint = function (request) {
                        return !constraint_helpers_1.traverseAncerstors(request, constraint);
                    };
                    return new binding_on_syntax_1["default"](this._binding);
                };
                return BindingWhenSyntax;
            })();
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = BindingWhenSyntax;
        }, { "./binding_on_syntax": 31, "./constraint_helpers": 35 }], 35: [function (require, module, exports) {
            "use strict";
            var METADATA_KEY = require("../constants/metadata_keys");
            var traverseAncerstors = function traverseAncerstors(_x, _x2) {
                var _again = true;

                _function: while (_again) {
                    var request = _x,
                        constraint = _x2;
                    _again = false;

                    var parent = request.parentRequest;
                    if (parent !== null) {
                        if (constraint(parent)) {
                            return true;
                        } else {
                            _x = parent;
                            _x2 = constraint;
                            _again = true;
                            parent = undefined;
                            continue _function;
                        }
                    } else {
                        return false;
                    }
                }
            };
            exports.traverseAncerstors = traverseAncerstors;
            var taggedConstraint = function taggedConstraint(key) {
                return function (value) {
                    return function (request) {
                        return request.target.matchesTag(key)(value);
                    };
                };
            };
            exports.taggedConstraint = taggedConstraint;
            var namedConstraint = taggedConstraint(METADATA_KEY.NAMED_TAG);
            exports.namedConstraint = namedConstraint;
            var typeConstraint = function typeConstraint(type) {
                return function (request) {
                    var binding = request.bindings[0];
                    if (typeof type === "string") {
                        var serviceIdentifier = binding.serviceIdentifier;
                        return serviceIdentifier === type;
                    } else {
                        var constructor = request.bindings[0].implementationType;
                        return type === constructor;
                    }
                };
            };
            exports.typeConstraint = typeConstraint;
        }, { "../constants/metadata_keys": 14 }], 36: [function (require, module, exports) {
            "use strict";
            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                }
                return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
            }
            Object.defineProperty(exports, "__esModule", { value: true });
            exports["default"] = guid;
        }, {}] }, {}, [15])(15);
});

//# sourceMappingURL=inversify.js.map

