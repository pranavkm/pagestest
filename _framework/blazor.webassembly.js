/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Boot.WebAssembly.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../JSInterop/Microsoft.JSInterop.JS/src/dist/Microsoft.JSInterop.js":
/*!***********************************************************************************************!*\
  !*** D:/work/aspnetcore/src/JSInterop/Microsoft.JSInterop.JS/src/dist/Microsoft.JSInterop.js ***!
  \***********************************************************************************************/
/*! exports provided: DotNet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DotNet", function() { return DotNet; });
// This is a single-file self-contained module to avoid the need for a Webpack build
var DotNet;
(function (DotNet) {
    var _a;
    window.DotNet = DotNet; // Ensure reachable from anywhere
    var jsonRevivers = [];
    var JSObject = /** @class */ (function () {
        function JSObject(_jsObject) {
            this._jsObject = _jsObject;
            this._cachedFunctions = new Map();
        }
        JSObject.prototype.findFunction = function (identifier) {
            var cachedFunction = this._cachedFunctions.get(identifier);
            if (cachedFunction) {
                return cachedFunction;
            }
            var result = this._jsObject;
            var lastSegmentValue;
            identifier.split('.').forEach(function (segment) {
                if (segment in result) {
                    lastSegmentValue = result;
                    result = result[segment];
                }
                else {
                    throw new Error("Could not find '" + identifier + "' ('" + segment + "' was undefined).");
                }
            });
            if (result instanceof Function) {
                result = result.bind(lastSegmentValue);
                this._cachedFunctions.set(identifier, result);
                return result;
            }
            else {
                throw new Error("The value '" + identifier + "' is not a function.");
            }
        };
        JSObject.prototype.getWrappedObject = function () {
            return this._jsObject;
        };
        return JSObject;
    }());
    var jsObjectIdKey = "__jsObjectId";
    var pendingAsyncCalls = {};
    var windowJSObjectId = 0;
    var cachedJSObjectsById = (_a = {},
        _a[windowJSObjectId] = new JSObject(window),
        _a);
    cachedJSObjectsById[windowJSObjectId]._cachedFunctions.set('import', function (url) {
        // In most cases developers will want to resolve dynamic imports relative to the base HREF.
        // However since we're the one calling the import keyword, they would be resolved relative to
        // this framework bundle URL. Fix this by providing an absolute URL.
        if (typeof url === 'string' && url.startsWith('./')) {
            url = document.baseURI + url.substr(2);
        }
        return import(/* webpackIgnore: true */ url);
    });
    var nextAsyncCallId = 1; // Start at 1 because zero signals "no response needed"
    var nextJsObjectId = 1; // Start at 1 because zero is reserved for "window"
    var dotNetDispatcher = null;
    /**
     * Sets the specified .NET call dispatcher as the current instance so that it will be used
     * for future invocations.
     *
     * @param dispatcher An object that can dispatch calls from JavaScript to a .NET runtime.
     */
    function attachDispatcher(dispatcher) {
        dotNetDispatcher = dispatcher;
    }
    DotNet.attachDispatcher = attachDispatcher;
    /**
     * Adds a JSON reviver callback that will be used when parsing arguments received from .NET.
     * @param reviver The reviver to add.
     */
    function attachReviver(reviver) {
        jsonRevivers.push(reviver);
    }
    DotNet.attachReviver = attachReviver;
    /**
     * Invokes the specified .NET public method synchronously. Not all hosting scenarios support
     * synchronous invocation, so if possible use invokeMethodAsync instead.
     *
     * @param assemblyName The short name (without key/version or .dll extension) of the .NET assembly containing the method.
     * @param methodIdentifier The identifier of the method to invoke. The method must have a [JSInvokable] attribute specifying this identifier.
     * @param args Arguments to pass to the method, each of which must be JSON-serializable.
     * @returns The result of the operation.
     */
    function invokeMethod(assemblyName, methodIdentifier) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return invokePossibleInstanceMethod(assemblyName, methodIdentifier, null, args);
    }
    DotNet.invokeMethod = invokeMethod;
    /**
     * Invokes the specified .NET public method asynchronously.
     *
     * @param assemblyName The short name (without key/version or .dll extension) of the .NET assembly containing the method.
     * @param methodIdentifier The identifier of the method to invoke. The method must have a [JSInvokable] attribute specifying this identifier.
     * @param args Arguments to pass to the method, each of which must be JSON-serializable.
     * @returns A promise representing the result of the operation.
     */
    function invokeMethodAsync(assemblyName, methodIdentifier) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return invokePossibleInstanceMethodAsync(assemblyName, methodIdentifier, null, args);
    }
    DotNet.invokeMethodAsync = invokeMethodAsync;
    /**
     * Creates a JavaScript object reference that can be passed to .NET via interop calls.
     *
     * @param jsObject The JavaScript Object used to create the JavaScript object reference.
     * @returns The JavaScript object reference (this will be the same instance as the given object).
     * @throws Error if the given value is not an Object.
     */
    function createJSObjectReference(jsObject) {
        var _a;
        if (jsObject && typeof jsObject === 'object') {
            cachedJSObjectsById[nextJsObjectId] = new JSObject(jsObject);
            var result = (_a = {},
                _a[jsObjectIdKey] = nextJsObjectId,
                _a);
            nextJsObjectId++;
            return result;
        }
        else {
            throw new Error("Cannot create a JSObjectReference from the value '" + jsObject + "'.");
        }
    }
    DotNet.createJSObjectReference = createJSObjectReference;
    /**
     * Disposes the given JavaScript object reference.
     *
     * @param jsObjectReference The JavaScript Object reference.
     */
    function disposeJSObjectReference(jsObjectReference) {
        var id = jsObjectReference && jsObjectReference[jsObjectIdKey];
        if (typeof id === 'number') {
            disposeJSObjectReferenceById(id);
        }
    }
    DotNet.disposeJSObjectReference = disposeJSObjectReference;
    /**
     * Parses the given JSON string using revivers to restore args passed from .NET to JS.
     *
     * @param json The JSON stirng to parse.
     */
    function parseJsonWithRevivers(json) {
        return json ? JSON.parse(json, function (key, initialValue) {
            // Invoke each reviver in order, passing the output from the previous reviver,
            // so that each one gets a chance to transform the value
            return jsonRevivers.reduce(function (latestValue, reviver) { return reviver(key, latestValue); }, initialValue);
        }) : null;
    }
    DotNet.parseJsonWithRevivers = parseJsonWithRevivers;
    function invokePossibleInstanceMethod(assemblyName, methodIdentifier, dotNetObjectId, args) {
        var dispatcher = getRequiredDispatcher();
        if (dispatcher.invokeDotNetFromJS) {
            var argsJson = JSON.stringify(args, argReplacer);
            var resultJson = dispatcher.invokeDotNetFromJS(assemblyName, methodIdentifier, dotNetObjectId, argsJson);
            return resultJson ? parseJsonWithRevivers(resultJson) : null;
        }
        else {
            throw new Error('The current dispatcher does not support synchronous calls from JS to .NET. Use invokeMethodAsync instead.');
        }
    }
    function invokePossibleInstanceMethodAsync(assemblyName, methodIdentifier, dotNetObjectId, args) {
        if (assemblyName && dotNetObjectId) {
            throw new Error("For instance method calls, assemblyName should be null. Received '" + assemblyName + "'.");
        }
        var asyncCallId = nextAsyncCallId++;
        var resultPromise = new Promise(function (resolve, reject) {
            pendingAsyncCalls[asyncCallId] = { resolve: resolve, reject: reject };
        });
        try {
            var argsJson = JSON.stringify(args, argReplacer);
            getRequiredDispatcher().beginInvokeDotNetFromJS(asyncCallId, assemblyName, methodIdentifier, dotNetObjectId, argsJson);
        }
        catch (ex) {
            // Synchronous failure
            completePendingCall(asyncCallId, false, ex);
        }
        return resultPromise;
    }
    function getRequiredDispatcher() {
        if (dotNetDispatcher !== null) {
            return dotNetDispatcher;
        }
        throw new Error('No .NET call dispatcher has been set.');
    }
    function completePendingCall(asyncCallId, success, resultOrError) {
        if (!pendingAsyncCalls.hasOwnProperty(asyncCallId)) {
            throw new Error("There is no pending async call with ID " + asyncCallId + ".");
        }
        var asyncCall = pendingAsyncCalls[asyncCallId];
        delete pendingAsyncCalls[asyncCallId];
        if (success) {
            asyncCall.resolve(resultOrError);
        }
        else {
            asyncCall.reject(resultOrError);
        }
    }
    /**
     * Represents the type of result expected from a JS interop call.
     */
    var JSCallResultType;
    (function (JSCallResultType) {
        JSCallResultType[JSCallResultType["Default"] = 0] = "Default";
        JSCallResultType[JSCallResultType["JSObjectReference"] = 1] = "JSObjectReference";
    })(JSCallResultType = DotNet.JSCallResultType || (DotNet.JSCallResultType = {}));
    /**
     * Receives incoming calls from .NET and dispatches them to JavaScript.
     */
    DotNet.jsCallDispatcher = {
        /**
         * Finds the JavaScript function matching the specified identifier.
         *
         * @param identifier Identifies the globally-reachable function to be returned.
         * @param targetInstanceId The instance ID of the target JS object.
         * @returns A Function instance.
         */
        findJSFunction: findJSFunction,
        /**
         * Disposes the JavaScript object reference with the specified object ID.
         *
         * @param id The ID of the JavaScript object reference.
         */
        disposeJSObjectReferenceById: disposeJSObjectReferenceById,
        /**
         * Invokes the specified synchronous JavaScript function.
         *
         * @param identifier Identifies the globally-reachable function to invoke.
         * @param argsJson JSON representation of arguments to be passed to the function.
         * @param resultType The type of result expected from the JS interop call.
         * @param targetInstanceId The instance ID of the target JS object.
         * @returns JSON representation of the invocation result.
         */
        invokeJSFromDotNet: function (identifier, argsJson, resultType, targetInstanceId) {
            var returnValue = findJSFunction(identifier, targetInstanceId).apply(null, parseJsonWithRevivers(argsJson));
            var result = createJSCallResult(returnValue, resultType);
            return result === null || result === undefined
                ? null
                : JSON.stringify(result, argReplacer);
        },
        /**
         * Invokes the specified synchronous or asynchronous JavaScript function.
         *
         * @param asyncHandle A value identifying the asynchronous operation. This value will be passed back in a later call to endInvokeJSFromDotNet.
         * @param identifier Identifies the globally-reachable function to invoke.
         * @param argsJson JSON representation of arguments to be passed to the function.
         * @param resultType The type of result expected from the JS interop call.
         * @param targetInstanceId The ID of the target JS object instance.
         */
        beginInvokeJSFromDotNet: function (asyncHandle, identifier, argsJson, resultType, targetInstanceId) {
            // Coerce synchronous functions into async ones, plus treat
            // synchronous exceptions the same as async ones
            var promise = new Promise(function (resolve) {
                var synchronousResultOrPromise = findJSFunction(identifier, targetInstanceId).apply(null, parseJsonWithRevivers(argsJson));
                resolve(synchronousResultOrPromise);
            });
            // We only listen for a result if the caller wants to be notified about it
            if (asyncHandle) {
                // On completion, dispatch result back to .NET
                // Not using "await" because it codegens a lot of boilerplate
                promise.then(function (result) { return getRequiredDispatcher().endInvokeJSFromDotNet(asyncHandle, true, JSON.stringify([asyncHandle, true, createJSCallResult(result, resultType)], argReplacer)); }, function (error) { return getRequiredDispatcher().endInvokeJSFromDotNet(asyncHandle, false, JSON.stringify([asyncHandle, false, formatError(error)])); });
            }
        },
        /**
         * Receives notification that an async call from JS to .NET has completed.
         * @param asyncCallId The identifier supplied in an earlier call to beginInvokeDotNetFromJS.
         * @param success A flag to indicate whether the operation completed successfully.
         * @param resultOrExceptionMessage Either the operation result or an error message.
         */
        endInvokeDotNetFromJS: function (asyncCallId, success, resultOrExceptionMessage) {
            var resultOrError = success ? resultOrExceptionMessage : new Error(resultOrExceptionMessage);
            completePendingCall(parseInt(asyncCallId), success, resultOrError);
        }
    };
    function formatError(error) {
        if (error instanceof Error) {
            return error.message + "\n" + error.stack;
        }
        else {
            return error ? error.toString() : 'null';
        }
    }
    function findJSFunction(identifier, targetInstanceId) {
        var targetInstance = cachedJSObjectsById[targetInstanceId];
        if (targetInstance) {
            return targetInstance.findFunction(identifier);
        }
        else {
            throw new Error("JS object instance with ID " + targetInstanceId + " does not exist (has it been disposed?).");
        }
    }
    function disposeJSObjectReferenceById(id) {
        delete cachedJSObjectsById[id];
    }
    var DotNetObject = /** @class */ (function () {
        function DotNetObject(_id) {
            this._id = _id;
        }
        DotNetObject.prototype.invokeMethod = function (methodIdentifier) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return invokePossibleInstanceMethod(null, methodIdentifier, this._id, args);
        };
        DotNetObject.prototype.invokeMethodAsync = function (methodIdentifier) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return invokePossibleInstanceMethodAsync(null, methodIdentifier, this._id, args);
        };
        DotNetObject.prototype.dispose = function () {
            var promise = invokePossibleInstanceMethodAsync(null, '__Dispose', this._id, null);
            promise.catch(function (error) { return console.error(error); });
        };
        DotNetObject.prototype.serializeAsArg = function () {
            return { __dotNetObject: this._id };
        };
        return DotNetObject;
    }());
    var dotNetObjectRefKey = '__dotNetObject';
    attachReviver(function reviveDotNetObject(key, value) {
        if (value && typeof value === 'object' && value.hasOwnProperty(dotNetObjectRefKey)) {
            return new DotNetObject(value.__dotNetObject);
        }
        // Unrecognized - let another reviver handle it
        return value;
    });
    attachReviver(function reviveJSObjectReference(key, value) {
        if (value && typeof value === 'object' && value.hasOwnProperty(jsObjectIdKey)) {
            var id = value[jsObjectIdKey];
            var jsObject = cachedJSObjectsById[id];
            if (jsObject) {
                return jsObject.getWrappedObject();
            }
            else {
                throw new Error("JS object instance with ID " + id + " does not exist (has it been disposed?).");
            }
        }
        // Unrecognized - let another reviver handle it
        return value;
    });
    function createJSCallResult(returnValue, resultType) {
        switch (resultType) {
            case JSCallResultType.Default:
                return returnValue;
            case JSCallResultType.JSObjectReference:
                return createJSObjectReference(returnValue);
            default:
                throw new Error("Invalid JS call result type '" + resultType + "'.");
        }
    }
    function argReplacer(key, value) {
        return value instanceof DotNetObject ? value.serializeAsArg() : value;
    }
})(DotNet || (DotNet = {}));
//# sourceMappingURL=Microsoft.JSInterop.js.map

/***/ }),

/***/ "./Boot.WebAssembly.ts":
/*!*****************************!*\
  !*** ./Boot.WebAssembly.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotnet_js_interop_1 = __webpack_require__(/*! @microsoft/dotnet-js-interop */ "../../../JSInterop/Microsoft.JSInterop.JS/src/dist/Microsoft.JSInterop.js");
__webpack_require__(/*! ./GlobalExports */ "./GlobalExports.ts");
var Environment = __webpack_require__(/*! ./Environment */ "./Environment.ts");
var MonoPlatform_1 = __webpack_require__(/*! ./Platform/Mono/MonoPlatform */ "./Platform/Mono/MonoPlatform.ts");
var Renderer_1 = __webpack_require__(/*! ./Rendering/Renderer */ "./Rendering/Renderer.ts");
var SharedMemoryRenderBatch_1 = __webpack_require__(/*! ./Rendering/RenderBatch/SharedMemoryRenderBatch */ "./Rendering/RenderBatch/SharedMemoryRenderBatch.ts");
var BootCommon_1 = __webpack_require__(/*! ./BootCommon */ "./BootCommon.ts");
var RendererEventDispatcher_1 = __webpack_require__(/*! ./Rendering/RendererEventDispatcher */ "./Rendering/RendererEventDispatcher.ts");
var WebAssemblyResourceLoader_1 = __webpack_require__(/*! ./Platform/WebAssemblyResourceLoader */ "./Platform/WebAssemblyResourceLoader.ts");
var WebAssemblyConfigLoader_1 = __webpack_require__(/*! ./Platform/WebAssemblyConfigLoader */ "./Platform/WebAssemblyConfigLoader.ts");
var BootConfig_1 = __webpack_require__(/*! ./Platform/BootConfig */ "./Platform/BootConfig.ts");
var WebAssemblyComponentAttacher_1 = __webpack_require__(/*! ./Platform/WebAssemblyComponentAttacher */ "./Platform/WebAssemblyComponentAttacher.ts");
var ComponentDescriptorDiscovery_1 = __webpack_require__(/*! ./Services/ComponentDescriptorDiscovery */ "./Services/ComponentDescriptorDiscovery.ts");
var started = false;
function boot(options) {
    return __awaiter(this, void 0, void 0, function () {
        var platform, getBaseUri, getLocationHref, environment, bootConfigPromise, discoveredComponents, componentAttacher, bootConfigResult, _a, resourceLoader, ex_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (started) {
                        throw new Error('Blazor has already started.');
                    }
                    started = true;
                    RendererEventDispatcher_1.setEventDispatcher(function (eventDescriptor, eventArgs) {
                        // It's extremely unusual, but an event can be raised while we're in the middle of synchronously applying a
                        // renderbatch. For example, a renderbatch might mutate the DOM in such a way as to cause an <input> to lose
                        // focus, in turn triggering a 'change' event. It may also be possible to listen to other DOM mutation events
                        // that are themselves triggered by the application of a renderbatch.
                        var renderer = Renderer_1.getRendererer(eventDescriptor.browserRendererId);
                        if (renderer.eventDelegator.getHandler(eventDescriptor.eventHandlerId)) {
                            MonoPlatform_1.monoPlatform.invokeWhenHeapUnlocked(function () { return dotnet_js_interop_1.DotNet.invokeMethodAsync('Microsoft.AspNetCore.Components.WebAssembly', 'DispatchEvent', eventDescriptor, JSON.stringify(eventArgs)); });
                        }
                    });
                    // Configure JS interop
                    window['Blazor']._internal.invokeJSFromDotNet = invokeJSFromDotNet;
                    platform = Environment.setPlatform(MonoPlatform_1.monoPlatform);
                    window['Blazor'].platform = platform;
                    window['Blazor']._internal.renderBatch = function (browserRendererId, batchAddress) {
                        // We're going to read directly from the .NET memory heap, so indicate to the platform
                        // that we don't want anything to modify the memory contents during this time. Currently this
                        // is only guaranteed by the fact that .NET code doesn't run during this time, but in the
                        // future (when multithreading is implemented) we might need the .NET runtime to understand
                        // that GC compaction isn't allowed during this critical section.
                        var heapLock = MonoPlatform_1.monoPlatform.beginHeapLock();
                        try {
                            Renderer_1.renderBatch(browserRendererId, new SharedMemoryRenderBatch_1.SharedMemoryRenderBatch(batchAddress));
                        }
                        finally {
                            heapLock.release();
                        }
                    };
                    getBaseUri = window['Blazor']._internal.navigationManager.getBaseURI;
                    getLocationHref = window['Blazor']._internal.navigationManager.getLocationHref;
                    window['Blazor']._internal.navigationManager.getUnmarshalledBaseURI = function () { return BINDING.js_string_to_mono_string(getBaseUri()); };
                    window['Blazor']._internal.navigationManager.getUnmarshalledLocationHref = function () { return BINDING.js_string_to_mono_string(getLocationHref()); };
                    window['Blazor']._internal.navigationManager.listenForNavigationEvents(function (uri, intercepted) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, dotnet_js_interop_1.DotNet.invokeMethodAsync('Microsoft.AspNetCore.Components.WebAssembly', 'NotifyLocationChanged', uri, intercepted)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    environment = options === null || options === void 0 ? void 0 : options.environment;
                    bootConfigPromise = BootConfig_1.BootConfigResult.initAsync(environment);
                    discoveredComponents = ComponentDescriptorDiscovery_1.discoverComponents(document, 'webassembly');
                    componentAttacher = new WebAssemblyComponentAttacher_1.WebAssemblyComponentAttacher(discoveredComponents);
                    window['Blazor']._internal.registeredComponents = {
                        getRegisteredComponentsCount: function () { return componentAttacher.getCount(); },
                        getId: function (index) { return componentAttacher.getId(index); },
                        getAssembly: function (id) { return BINDING.js_string_to_mono_string(componentAttacher.getAssembly(id)); },
                        getTypeName: function (id) { return BINDING.js_string_to_mono_string(componentAttacher.getTypeName(id)); },
                        getParameterDefinitions: function (id) { return BINDING.js_string_to_mono_string(componentAttacher.getParameterDefinitions(id) || ''); },
                        getParameterValues: function (id) { return BINDING.js_string_to_mono_string(componentAttacher.getParameterValues(id) || ''); },
                    };
                    window['Blazor']._internal.attachRootComponentToElement = function (selector, componentId, rendererId) {
                        var element = componentAttacher.resolveRegisteredElement(selector);
                        if (!element) {
                            Renderer_1.attachRootComponentToElement(selector, componentId, rendererId);
                        }
                        else {
                            Renderer_1.attachRootComponentToLogicalElement(rendererId, element, componentId);
                        }
                    };
                    return [4 /*yield*/, bootConfigPromise];
                case 1:
                    bootConfigResult = _b.sent();
                    return [4 /*yield*/, Promise.all([
                            WebAssemblyResourceLoader_1.WebAssemblyResourceLoader.initAsync(bootConfigResult.bootConfig, options || {}),
                            WebAssemblyConfigLoader_1.WebAssemblyConfigLoader.initAsync(bootConfigResult)
                        ])];
                case 2:
                    _a = __read.apply(void 0, [_b.sent(), 1]), resourceLoader = _a[0];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, platform.start(resourceLoader)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    ex_1 = _b.sent();
                    throw new Error("Failed to start platform. Reason: " + ex_1);
                case 6:
                    // Start up the application
                    platform.callEntryPoint(resourceLoader.bootConfig.entryAssembly);
                    return [2 /*return*/];
            }
        });
    });
}
function invokeJSFromDotNet(callInfo, arg0, arg1, arg2) {
    var functionIdentifier = MonoPlatform_1.monoPlatform.readStringField(callInfo, 0);
    var resultType = MonoPlatform_1.monoPlatform.readInt32Field(callInfo, 4);
    var marshalledCallArgsJson = MonoPlatform_1.monoPlatform.readStringField(callInfo, 8);
    var targetInstanceId = MonoPlatform_1.monoPlatform.readUint64Field(callInfo, 20);
    if (marshalledCallArgsJson !== null) {
        var marshalledCallAsyncHandle = MonoPlatform_1.monoPlatform.readUint64Field(callInfo, 12);
        if (marshalledCallAsyncHandle !== 0) {
            dotnet_js_interop_1.DotNet.jsCallDispatcher.beginInvokeJSFromDotNet(marshalledCallAsyncHandle, functionIdentifier, marshalledCallArgsJson, resultType, targetInstanceId);
            return 0;
        }
        else {
            var resultJson = dotnet_js_interop_1.DotNet.jsCallDispatcher.invokeJSFromDotNet(functionIdentifier, marshalledCallArgsJson, resultType, targetInstanceId);
            return resultJson === null ? 0 : BINDING.js_string_to_mono_string(resultJson);
        }
    }
    else {
        var func = dotnet_js_interop_1.DotNet.jsCallDispatcher.findJSFunction(functionIdentifier, targetInstanceId);
        var result = func.call(null, arg0, arg1, arg2);
        switch (resultType) {
            case dotnet_js_interop_1.DotNet.JSCallResultType.Default:
                return result;
            case dotnet_js_interop_1.DotNet.JSCallResultType.JSObjectReference:
                return dotnet_js_interop_1.DotNet.createJSObjectReference(result).__jsObjectId;
            default:
                throw new Error("Invalid JS call result type '" + resultType + "'.");
        }
    }
}
window['Blazor'].start = boot;
if (BootCommon_1.shouldAutoStart()) {
    boot().catch(function (error) {
        if (typeof Module !== 'undefined' && Module.printErr) {
            // Logs it, and causes the error UI to appear
            Module.printErr(error);
        }
        else {
            // The error must have happened so early we didn't yet set up the error UI, so just log to console
            console.error(error);
        }
    });
}


/***/ }),

/***/ "./BootCommon.ts":
/*!***********************!*\
  !*** ./BootCommon.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Tells you if the script was added without <script src="..." autostart="false"></script>
function shouldAutoStart() {
    return !!(document &&
        document.currentScript &&
        document.currentScript.getAttribute('autostart') !== 'false');
}
exports.shouldAutoStart = shouldAutoStart;


/***/ }),

/***/ "./BootErrors.ts":
/*!***********************!*\
  !*** ./BootErrors.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hasFailed = false;
function showErrorNotification() {
    return __awaiter(this, void 0, void 0, function () {
        var errorUi, errorUiReloads, errorUiDismiss;
        return __generator(this, function (_a) {
            errorUi = document.querySelector('#blazor-error-ui');
            if (errorUi) {
                errorUi.style.display = 'block';
            }
            if (!hasFailed) {
                hasFailed = true;
                errorUiReloads = document.querySelectorAll('#blazor-error-ui .reload');
                errorUiReloads.forEach(function (reload) {
                    reload.onclick = function (e) {
                        location.reload();
                        e.preventDefault();
                    };
                });
                errorUiDismiss = document.querySelectorAll('#blazor-error-ui .dismiss');
                errorUiDismiss.forEach(function (dismiss) {
                    dismiss.onclick = function (e) {
                        var errorUi = document.querySelector('#blazor-error-ui');
                        if (errorUi) {
                            errorUi.style.display = 'none';
                        }
                        e.preventDefault();
                    };
                });
            }
            return [2 /*return*/];
        });
    });
}
exports.showErrorNotification = showErrorNotification;


/***/ }),

/***/ "./DomWrapper.ts":
/*!***********************!*\
  !*** ./DomWrapper.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! @microsoft/dotnet-js-interop */ "../../../JSInterop/Microsoft.JSInterop.JS/src/dist/Microsoft.JSInterop.js");
exports.domFunctions = {
    focus: focus,
};
function focus(element) {
    if (element instanceof HTMLElement) {
        element.focus();
    }
    else {
        throw new Error('Unable to focus an invalid element.');
    }
}


/***/ }),

/***/ "./Environment.ts":
/*!************************!*\
  !*** ./Environment.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function setPlatform(platformInstance) {
    exports.platform = platformInstance;
    return exports.platform;
}
exports.setPlatform = setPlatform;


/***/ }),

/***/ "./GlobalExports.ts":
/*!**************************!*\
  !*** ./GlobalExports.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NavigationManager_1 = __webpack_require__(/*! ./Services/NavigationManager */ "./Services/NavigationManager.ts");
var DomWrapper_1 = __webpack_require__(/*! ./DomWrapper */ "./DomWrapper.ts");
var Virtualize_1 = __webpack_require__(/*! ./Virtualize */ "./Virtualize.ts");
var InputFile_1 = __webpack_require__(/*! ./InputFile */ "./InputFile.ts");
// Make the following APIs available in global scope for invocation from JS
window['Blazor'] = {
    navigateTo: NavigationManager_1.navigateTo,
    _internal: {
        navigationManager: NavigationManager_1.internalFunctions,
        domWrapper: DomWrapper_1.domFunctions,
        Virtualize: Virtualize_1.Virtualize,
        InputFile: InputFile_1.InputFile,
    },
};


/***/ }),

/***/ "./InputFile.ts":
/*!**********************!*\
  !*** ./InputFile.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var MonoPlatform_1 = __webpack_require__(/*! ./Platform/Mono/MonoPlatform */ "./Platform/Mono/MonoPlatform.ts");
exports.InputFile = {
    init: init,
    toImageFile: toImageFile,
    ensureArrayBufferReadyForSharedMemoryInterop: ensureArrayBufferReadyForSharedMemoryInterop,
    readFileData: readFileData,
    readFileDataSharedMemory: readFileDataSharedMemory,
};
function init(callbackWrapper, elem) {
    elem._blazorInputFileNextFileId = 0;
    elem.addEventListener('click', function () {
        // Permits replacing an existing file with a new one of the same file name.
        elem.value = '';
    });
    elem.addEventListener('change', function () {
        // Reduce to purely serializable data, plus an index by ID.
        elem._blazorFilesById = {};
        var fileList = Array.prototype.map.call(elem.files, function (file) {
            var result = {
                id: ++elem._blazorInputFileNextFileId,
                lastModified: new Date(file.lastModified).toISOString(),
                name: file.name,
                size: file.size,
                contentType: file.type,
                readPromise: undefined,
                arrayBuffer: undefined,
            };
            elem._blazorFilesById[result.id] = result;
            // Attach the blob data itself as a non-enumerable property so it doesn't appear in the JSON.
            Object.defineProperty(result, 'blob', { value: file });
            return result;
        });
        callbackWrapper.invokeMethodAsync('NotifyChange', fileList);
    });
}
function toImageFile(elem, fileId, format, maxWidth, maxHeight) {
    return __awaiter(this, void 0, void 0, function () {
        var originalFile, loadedImage, resizedImageBlob, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    originalFile = getFileById(elem, fileId);
                    return [4 /*yield*/, new Promise(function (resolve) {
                            var originalFileImage = new Image();
                            originalFileImage.onload = function () {
                                resolve(originalFileImage);
                            };
                            originalFileImage.src = URL.createObjectURL(originalFile['blob']);
                        })];
                case 1:
                    loadedImage = _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) {
                            var _a;
                            var desiredWidthRatio = Math.min(1, maxWidth / loadedImage.width);
                            var desiredHeightRatio = Math.min(1, maxHeight / loadedImage.height);
                            var chosenSizeRatio = Math.min(desiredWidthRatio, desiredHeightRatio);
                            var canvas = document.createElement('canvas');
                            canvas.width = Math.round(loadedImage.width * chosenSizeRatio);
                            canvas.height = Math.round(loadedImage.height * chosenSizeRatio);
                            (_a = canvas.getContext('2d')) === null || _a === void 0 ? void 0 : _a.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);
                            canvas.toBlob(resolve, format);
                        })];
                case 2:
                    resizedImageBlob = _a.sent();
                    result = {
                        id: ++elem._blazorInputFileNextFileId,
                        lastModified: originalFile.lastModified,
                        name: originalFile.name,
                        size: (resizedImageBlob === null || resizedImageBlob === void 0 ? void 0 : resizedImageBlob.size) || 0,
                        contentType: format,
                        readPromise: undefined,
                        arrayBuffer: undefined,
                    };
                    elem._blazorFilesById[result.id] = result;
                    // Attach the blob data itself as a non-enumerable property so it doesn't appear in the JSON.
                    Object.defineProperty(result, 'blob', { value: resizedImageBlob });
                    return [2 /*return*/, result];
            }
        });
    });
}
function ensureArrayBufferReadyForSharedMemoryInterop(elem, fileId) {
    return __awaiter(this, void 0, void 0, function () {
        var arrayBuffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getArrayBufferFromFileAsync(elem, fileId)];
                case 1:
                    arrayBuffer = _a.sent();
                    getFileById(elem, fileId).arrayBuffer = arrayBuffer;
                    return [2 /*return*/];
            }
        });
    });
}
function readFileData(elem, fileId, startOffset, count) {
    return __awaiter(this, void 0, void 0, function () {
        var arrayBuffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getArrayBufferFromFileAsync(elem, fileId)];
                case 1:
                    arrayBuffer = _a.sent();
                    return [2 /*return*/, btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer, startOffset, count)))];
            }
        });
    });
}
function readFileDataSharedMemory(readRequest) {
    var inputFileElementReferenceId = MonoPlatform_1.monoPlatform.readStringField(readRequest, 0);
    var inputFileElement = document.querySelector("[_bl_" + inputFileElementReferenceId + "]");
    var fileId = MonoPlatform_1.monoPlatform.readInt32Field(readRequest, 4);
    var sourceOffset = MonoPlatform_1.monoPlatform.readUint64Field(readRequest, 8);
    var destination = MonoPlatform_1.monoPlatform.readInt32Field(readRequest, 16);
    var destinationOffset = MonoPlatform_1.monoPlatform.readInt32Field(readRequest, 20);
    var maxBytes = MonoPlatform_1.monoPlatform.readInt32Field(readRequest, 24);
    var sourceArrayBuffer = getFileById(inputFileElement, fileId).arrayBuffer;
    var bytesToRead = Math.min(maxBytes, sourceArrayBuffer.byteLength - sourceOffset);
    var sourceUint8Array = new Uint8Array(sourceArrayBuffer, sourceOffset, bytesToRead);
    var destinationUint8Array = MonoPlatform_1.monoPlatform.toUint8Array(destination);
    destinationUint8Array.set(sourceUint8Array, destinationOffset);
    return bytesToRead;
}
function getFileById(elem, fileId) {
    var file = elem._blazorFilesById[fileId];
    if (!file) {
        throw new Error("There is no file with ID " + fileId + ". The file list may have changed.");
    }
    return file;
}
function getArrayBufferFromFileAsync(elem, fileId) {
    var file = getFileById(elem, fileId);
    // On the first read, convert the FileReader into a Promise<ArrayBuffer>.
    if (!file.readPromise) {
        file.readPromise = new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (err) {
                reject(err);
            };
            reader.readAsArrayBuffer(file['blob']);
        });
    }
    return file.readPromise;
}


/***/ }),

/***/ "./Platform/BootConfig.ts":
/*!********************************!*\
  !*** ./Platform/BootConfig.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BootConfigResult = /** @class */ (function () {
    function BootConfigResult(bootConfig, applicationEnvironment) {
        this.bootConfig = bootConfig;
        this.applicationEnvironment = applicationEnvironment;
    }
    BootConfigResult.initAsync = function (environment) {
        return __awaiter(this, void 0, void 0, function () {
            var bootConfigResponse, applicationEnvironment, bootConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('_framework/blazor.boot.json', {
                            method: 'GET',
                            credentials: 'include',
                            cache: 'no-cache'
                        })];
                    case 1:
                        bootConfigResponse = _a.sent();
                        applicationEnvironment = environment || bootConfigResponse.headers.get('Blazor-Environment') || 'Production';
                        return [4 /*yield*/, bootConfigResponse.json()];
                    case 2:
                        bootConfig = _a.sent();
                        return [2 /*return*/, new BootConfigResult(bootConfig, applicationEnvironment)];
                }
            });
        });
    };
    ;
    return BootConfigResult;
}());
exports.BootConfigResult = BootConfigResult;
var ICUDataMode;
(function (ICUDataMode) {
    ICUDataMode[ICUDataMode["Sharded"] = 0] = "Sharded";
    ICUDataMode[ICUDataMode["All"] = 1] = "All";
    ICUDataMode[ICUDataMode["Invariant"] = 2] = "Invariant";
})(ICUDataMode = exports.ICUDataMode || (exports.ICUDataMode = {}));


/***/ }),

/***/ "./Platform/Mono/MonoDebugger.ts":
/*!***************************************!*\
  !*** ./Platform/Mono/MonoDebugger.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var currentBrowserIsChrome = window.chrome
    && navigator.userAgent.indexOf('Edge') < 0; // Edge pretends to be Chrome
var hasReferencedPdbs = false;
function hasDebuggingEnabled() {
    return hasReferencedPdbs && currentBrowserIsChrome;
}
exports.hasDebuggingEnabled = hasDebuggingEnabled;
function attachDebuggerHotkey(resourceLoader) {
    hasReferencedPdbs = !!resourceLoader.bootConfig.resources.pdb;
    // Use the combination shift+alt+D because it isn't used by the major browsers
    // for anything else by default
    var altKeyName = navigator.platform.match(/^Mac/i) ? 'Cmd' : 'Alt';
    if (hasDebuggingEnabled()) {
        console.info("Debugging hotkey: Shift+" + altKeyName + "+D (when application has focus)");
    }
    // Even if debugging isn't enabled, we register the hotkey so we can report why it's not enabled
    document.addEventListener('keydown', function (evt) {
        if (evt.shiftKey && (evt.metaKey || evt.altKey) && evt.code === 'KeyD') {
            if (!hasReferencedPdbs) {
                console.error('Cannot start debugging, because the application was not compiled with debugging enabled.');
            }
            else if (!currentBrowserIsChrome) {
                console.error('Currently, only Microsoft Edge (80+), or Google Chrome, are supported for debugging.');
            }
            else {
                launchDebugger();
            }
        }
    });
}
exports.attachDebuggerHotkey = attachDebuggerHotkey;
function launchDebugger() {
    // The noopener flag is essential, because otherwise Chrome tracks the association with the
    // parent tab, and then when the parent tab pauses in the debugger, the child tab does so
    // too (even if it's since navigated to a different page). This means that the debugger
    // itself freezes, and not just the page being debugged.
    //
    // We have to construct a link element and simulate a click on it, because the more obvious
    // window.open(..., 'noopener') always opens a new window instead of a new tab.
    var link = document.createElement('a');
    link.href = "_framework/debug?url=" + encodeURIComponent(location.href);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
}


/***/ }),

/***/ "./Platform/Mono/MonoPlatform.ts":
/*!***************************************!*\
  !*** ./Platform/Mono/MonoPlatform.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotnet_js_interop_1 = __webpack_require__(/*! @microsoft/dotnet-js-interop */ "../../../JSInterop/Microsoft.JSInterop.JS/src/dist/Microsoft.JSInterop.js");
var MonoDebugger_1 = __webpack_require__(/*! ./MonoDebugger */ "./Platform/Mono/MonoDebugger.ts");
var BootErrors_1 = __webpack_require__(/*! ../../BootErrors */ "./BootErrors.ts");
var BootConfig_1 = __webpack_require__(/*! ../BootConfig */ "./Platform/BootConfig.ts");
var mono_wasm_add_assembly;
var appBinDirName = 'appBinDir';
var uint64HighOrderShift = Math.pow(2, 32);
var maxSafeNumberHighPart = Math.pow(2, 21) - 1; // The high-order int32 from Number.MAX_SAFE_INTEGER
var currentHeapLock = null;
// Memory access helpers
// The implementations are exactly equivalent to what the global getValue(addr, type) function does,
// except without having to parse the 'type' parameter, and with less risk of mistakes at the call site
function getValueI16(ptr) { return Module.HEAP16[ptr >> 1]; }
function getValueI32(ptr) { return Module.HEAP32[ptr >> 2]; }
function getValueFloat(ptr) { return Module.HEAPF32[ptr >> 2]; }
function getValueU64(ptr) {
    // There is no Module.HEAPU64, and Module.getValue(..., 'i64') doesn't work because the implementation
    // treats 'i64' as being the same as 'i32'. Also we must take care to read both halves as unsigned.
    var heapU32Index = ptr >> 2;
    var highPart = Module.HEAPU32[heapU32Index + 1];
    if (highPart > maxSafeNumberHighPart) {
        throw new Error("Cannot read uint64 with high order part " + highPart + ", because the result would exceed Number.MAX_SAFE_INTEGER.");
    }
    return (highPart * uint64HighOrderShift) + Module.HEAPU32[heapU32Index];
}
exports.monoPlatform = {
    start: function start(resourceLoader) {
        return new Promise(function (resolve, reject) {
            MonoDebugger_1.attachDebuggerHotkey(resourceLoader);
            // dotnet.js assumes the existence of this
            window['Browser'] = {
                init: function () { },
            };
            // Emscripten works by expecting the module config to be a global
            // For compatibility with macOS Catalina, we have to assign a temporary value to window.Module
            // before we start loading the WebAssembly files
            addGlobalModuleScriptTagsToDocument(function () {
                window['Module'] = createEmscriptenModuleInstance(resourceLoader, resolve, reject);
                addScriptTagsToDocument(resourceLoader);
            });
        });
    },
    callEntryPoint: function callEntryPoint(assemblyName) {
        // Instead of using Module.mono_call_assembly_entry_point, we have our own logic for invoking
        // the entrypoint which adds support for async main.
        // Currently we disregard the return value from the entrypoint, whether it's sync or async.
        // In the future, we might want Blazor.start to return a Promise<Promise<value>>, where the
        // outer promise reflects the startup process, and the inner one reflects the possibly-async
        // .NET entrypoint method.
        var invokeEntrypoint = bindStaticMethod('Microsoft.AspNetCore.Components.WebAssembly', 'Microsoft.AspNetCore.Components.WebAssembly.Hosting.EntrypointInvoker', 'InvokeEntrypoint');
        // Note we're passing in null because passing arrays is problematic until https://github.com/mono/mono/issues/18245 is resolved.
        invokeEntrypoint(assemblyName, null);
    },
    toUint8Array: function toUint8Array(array) {
        var dataPtr = getArrayDataPointer(array);
        var length = getValueI32(dataPtr);
        return new Uint8Array(Module.HEAPU8.buffer, dataPtr + 4, length);
    },
    getArrayLength: function getArrayLength(array) {
        return getValueI32(getArrayDataPointer(array));
    },
    getArrayEntryPtr: function getArrayEntryPtr(array, index, itemSize) {
        // First byte is array length, followed by entries
        var address = getArrayDataPointer(array) + 4 + index * itemSize;
        return address;
    },
    getObjectFieldsBaseAddress: function getObjectFieldsBaseAddress(referenceTypedObject) {
        // The first two int32 values are internal Mono data
        return (referenceTypedObject + 8);
    },
    readInt16Field: function readHeapInt16(baseAddress, fieldOffset) {
        return getValueI16(baseAddress + (fieldOffset || 0));
    },
    readInt32Field: function readHeapInt32(baseAddress, fieldOffset) {
        return getValueI32(baseAddress + (fieldOffset || 0));
    },
    readUint64Field: function readHeapUint64(baseAddress, fieldOffset) {
        return getValueU64(baseAddress + (fieldOffset || 0));
    },
    readFloatField: function readHeapFloat(baseAddress, fieldOffset) {
        return getValueFloat(baseAddress + (fieldOffset || 0));
    },
    readObjectField: function readHeapObject(baseAddress, fieldOffset) {
        return getValueI32(baseAddress + (fieldOffset || 0));
    },
    readStringField: function readHeapObject(baseAddress, fieldOffset, readBoolValueAsString) {
        var fieldValue = getValueI32(baseAddress + (fieldOffset || 0));
        if (fieldValue === 0) {
            return null;
        }
        if (readBoolValueAsString) {
            // Some fields are stored as a union of bool | string | null values, but need to read as a string.
            // If the stored value is a bool, the behavior we want is empty string ('') for true, or null for false.
            var unboxedValue = BINDING.unbox_mono_obj(fieldValue);
            if (typeof (unboxedValue) === 'boolean') {
                return unboxedValue ? '' : null;
            }
            return unboxedValue;
        }
        var decodedString;
        if (currentHeapLock) {
            decodedString = currentHeapLock.stringCache.get(fieldValue);
            if (decodedString === undefined) {
                decodedString = BINDING.conv_string(fieldValue);
                currentHeapLock.stringCache.set(fieldValue, decodedString);
            }
        }
        else {
            decodedString = BINDING.conv_string(fieldValue);
        }
        return decodedString;
    },
    readStructField: function readStructField(baseAddress, fieldOffset) {
        return (baseAddress + (fieldOffset || 0));
    },
    beginHeapLock: function () {
        assertHeapIsNotLocked();
        currentHeapLock = new MonoHeapLock();
        return currentHeapLock;
    },
    invokeWhenHeapUnlocked: function (callback) {
        // This is somewhat like a sync context. If we're not locked, just pass through the call directly.
        if (!currentHeapLock) {
            callback();
        }
        else {
            currentHeapLock.enqueuePostReleaseAction(callback);
        }
    }
};
function addScriptTagsToDocument(resourceLoader) {
    var browserSupportsNativeWebAssembly = typeof WebAssembly !== 'undefined' && WebAssembly.validate;
    if (!browserSupportsNativeWebAssembly) {
        throw new Error('This browser does not support WebAssembly.');
    }
    // The dotnet.*.js file has a version or hash in its name as a form of cache-busting. This is needed
    // because it's the only part of the loading process that can't use cache:'no-cache' (because it's
    // not a 'fetch') and isn't controllable by the developer (so they can't put in their own cache-busting
    // querystring). So, to find out the exact URL we have to search the boot manifest.
    var dotnetJsResourceName = Object
        .keys(resourceLoader.bootConfig.resources.runtime)
        .filter(function (n) { return n.startsWith('dotnet.') && n.endsWith('.js'); })[0];
    var dotnetJsContentHash = resourceLoader.bootConfig.resources.runtime[dotnetJsResourceName];
    var scriptElem = document.createElement('script');
    scriptElem.src = "_framework/" + dotnetJsResourceName;
    scriptElem.defer = true;
    // For consistency with WebAssemblyResourceLoader, we only enforce SRI if caching is allowed
    if (resourceLoader.bootConfig.cacheBootResources) {
        scriptElem.integrity = dotnetJsContentHash;
        scriptElem.crossOrigin = 'anonymous';
    }
    // Allow overriding the URI from which the dotnet.*.js file is loaded
    if (resourceLoader.startOptions.loadBootResource) {
        var resourceType = 'dotnetjs';
        var customSrc = resourceLoader.startOptions.loadBootResource(resourceType, dotnetJsResourceName, scriptElem.src, dotnetJsContentHash);
        if (typeof (customSrc) === 'string') {
            scriptElem.src = customSrc;
        }
        else if (customSrc) {
            // Since we must load this via a <script> tag, it's only valid to supply a URI (and not a Request, say)
            throw new Error("For a " + resourceType + " resource, custom loaders must supply a URI string.");
        }
    }
    document.body.appendChild(scriptElem);
}
// Due to a strange behavior in macOS Catalina, we have to delay loading the WebAssembly files
// until after it finishes evaluating a <script> element that assigns a value to window.Module.
// This may be fixed in a later version of macOS/iOS, or even if not it may be possible to reduce
// this to a smaller workaround.
function addGlobalModuleScriptTagsToDocument(callback) {
    var scriptElem = document.createElement('script');
    // This pollutes global but is needed so it can be called from the script.
    // The callback is put in the global scope so that it can be run after the script is loaded.
    // onload cannot be used in this case for non-file scripts.
    window['__wasmmodulecallback__'] = callback;
    scriptElem.type = 'text/javascript';
    scriptElem.text = 'var Module; window.__wasmmodulecallback__(); delete window.__wasmmodulecallback__;';
    document.body.appendChild(scriptElem);
}
function createEmscriptenModuleInstance(resourceLoader, onReady, onError) {
    var _this = this;
    var resources = resourceLoader.bootConfig.resources;
    var module = (window['Module'] || {});
    var suppressMessages = ['DEBUGGING ENABLED'];
    module.print = function (line) { return (suppressMessages.indexOf(line) < 0 && console.log(line)); };
    module.printErr = function (line) {
        // If anything writes to stderr, treat it as a critical exception. The underlying runtime writes
        // to stderr if a truly critical problem occurs outside .NET code. Note that .NET unhandled
        // exceptions also reach this, but via a different code path - see dotNetCriticalError below.
        console.error(line);
        BootErrors_1.showErrorNotification();
    };
    module.preRun = module.preRun || [];
    module.postRun = module.postRun || [];
    module.preloadPlugins = [];
    // Begin loading the .dll/.pdb/.wasm files, but don't block here. Let other loading processes run in parallel.
    var dotnetWasmResourceName = 'dotnet.wasm';
    var assembliesBeingLoaded = resourceLoader.loadResources(resources.assembly, function (filename) { return "_framework/" + filename; }, 'assembly');
    var pdbsBeingLoaded = resourceLoader.loadResources(resources.pdb || {}, function (filename) { return "_framework/" + filename; }, 'pdb');
    var wasmBeingLoaded = resourceLoader.loadResource(
    /* name */ dotnetWasmResourceName, 
    /* url */ "_framework/" + dotnetWasmResourceName, 
    /* hash */ resourceLoader.bootConfig.resources.runtime[dotnetWasmResourceName], 
    /* type */ 'dotnetwasm');
    var dotnetTimeZoneResourceName = 'dotnet.timezones.blat';
    var timeZoneResource;
    if (resourceLoader.bootConfig.resources.runtime.hasOwnProperty(dotnetTimeZoneResourceName)) {
        timeZoneResource = resourceLoader.loadResource(dotnetTimeZoneResourceName, "_framework/" + dotnetTimeZoneResourceName, resourceLoader.bootConfig.resources.runtime[dotnetTimeZoneResourceName], 'globalization');
    }
    var icuDataResource;
    if (resourceLoader.bootConfig.icuDataMode != BootConfig_1.ICUDataMode.Invariant) {
        var applicationCulture = resourceLoader.startOptions.applicationCulture || (navigator.languages && navigator.languages[0]);
        var icuDataResourceName = getICUResourceName(resourceLoader.bootConfig, applicationCulture);
        icuDataResource = resourceLoader.loadResource(icuDataResourceName, "_framework/" + icuDataResourceName, resourceLoader.bootConfig.resources.runtime[icuDataResourceName], 'globalization');
    }
    // Override the mechanism for fetching the main wasm file so we can connect it to our cache
    module.instantiateWasm = function (imports, successCallback) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var compiledInstance, dotnetWasmResource, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, wasmBeingLoaded];
                    case 1:
                        dotnetWasmResource = _a.sent();
                        return [4 /*yield*/, compileWasmModule(dotnetWasmResource, imports)];
                    case 2:
                        compiledInstance = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        module.printErr(ex_1);
                        throw ex_1;
                    case 4:
                        successCallback(compiledInstance);
                        return [2 /*return*/];
                }
            });
        }); })();
        return []; // No exports
    };
    module.preRun.push(function () {
        // By now, emscripten should be initialised enough that we can capture these methods for later use
        mono_wasm_add_assembly = cwrap('mono_wasm_add_assembly', null, ['string', 'number', 'number']);
        MONO.loaded_files = [];
        if (timeZoneResource) {
            loadTimezone(timeZoneResource);
        }
        if (icuDataResource) {
            loadICUData(icuDataResource);
        }
        else {
            // Use invariant culture if the app does not carry icu data.
            MONO.mono_wasm_setenv('DOTNET_SYSTEM_GLOBALIZATION_INVARIANT', '1');
        }
        // Fetch the assemblies and PDBs in the background, telling Mono to wait until they are loaded
        // Mono requires the assembly filenames to have a '.dll' extension, so supply such names regardless
        // of the extensions in the URLs. This allows loading assemblies with arbitrary filenames.
        assembliesBeingLoaded.forEach(function (r) { return addResourceAsAssembly(r, changeExtension(r.name, '.dll')); });
        pdbsBeingLoaded.forEach(function (r) { return addResourceAsAssembly(r, r.name); });
        window['Blazor']._internal.dotNetCriticalError = function (message) {
            module.printErr(BINDING.conv_string(message) || '(null)');
        };
        // Wire-up callbacks for satellite assemblies. Blazor will call these as part of the application
        // startup sequence to load satellite assemblies for the application's culture.
        window['Blazor']._internal.getSatelliteAssemblies = function (culturesToLoadDotNetArray) {
            var culturesToLoad = BINDING.mono_array_to_js_array(culturesToLoadDotNetArray);
            var satelliteResources = resourceLoader.bootConfig.resources.satelliteResources;
            var applicationCulture = resourceLoader.startOptions.applicationCulture || (navigator.languages && navigator.languages[0]);
            if (satelliteResources) {
                var resourcePromises = Promise.all(culturesToLoad
                    .filter(function (culture) { return satelliteResources.hasOwnProperty(culture); })
                    .map(function (culture) { return resourceLoader.loadResources(satelliteResources[culture], function (fileName) { return "_framework/" + fileName; }, 'assembly'); })
                    .reduce(function (previous, next) { return previous.concat(next); }, new Array())
                    .map(function (resource) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, resource.response];
                        case 1: return [2 /*return*/, (_a.sent()).arrayBuffer()];
                    }
                }); }); }));
                return BINDING.js_to_mono_obj(resourcePromises.then(function (resourcesToLoad) {
                    if (resourcesToLoad.length) {
                        window['Blazor']._internal.readSatelliteAssemblies = function () {
                            var array = BINDING.mono_obj_array_new(resourcesToLoad.length);
                            for (var i = 0; i < resourcesToLoad.length; i++) {
                                BINDING.mono_obj_array_set(array, i, BINDING.js_typed_array_to_array(new Uint8Array(resourcesToLoad[i])));
                            }
                            return array;
                        };
                    }
                    return resourcesToLoad.length;
                }));
            }
            return BINDING.js_to_mono_obj(Promise.resolve(0));
        };
        window['Blazor']._internal.getLazyAssemblies = function (assembliesToLoadDotNetArray) {
            var assembliesToLoad = BINDING.mono_array_to_js_array(assembliesToLoadDotNetArray);
            var lazyAssemblies = resourceLoader.bootConfig.resources.lazyAssembly;
            if (!lazyAssemblies) {
                throw new Error("No assemblies have been marked as lazy-loadable. Use the 'BlazorWebAssemblyLazyLoad' item group in your project file to enable lazy loading an assembly.");
            }
            var assembliesMarkedAsLazy = assembliesToLoad.filter(function (assembly) { return lazyAssemblies.hasOwnProperty(assembly); });
            if (assembliesMarkedAsLazy.length != assembliesToLoad.length) {
                var notMarked = assembliesToLoad.filter(function (assembly) { return !assembliesMarkedAsLazy.includes(assembly); });
                throw new Error(notMarked.join() + " must be marked with 'BlazorWebAssemblyLazyLoad' item group in your project file to allow lazy-loading.");
            }
            var pdbPromises;
            if (MonoDebugger_1.hasDebuggingEnabled()) {
                var pdbs = resourceLoader.bootConfig.resources.pdb;
                var pdbsToLoad = assembliesMarkedAsLazy.map(function (a) { return changeExtension(a, '.pdb'); });
                if (pdbs) {
                    pdbPromises = Promise.all(pdbsToLoad
                        .map(function (pdb) { return lazyAssemblies.hasOwnProperty(pdb) ? resourceLoader.loadResource(pdb, "_framework/" + pdb, lazyAssemblies[pdb], 'pdb') : null; })
                        .map(function (resource) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!resource) return [3 /*break*/, 2];
                                return [4 /*yield*/, resource.response];
                            case 1:
                                _a = (_b.sent()).arrayBuffer();
                                return [3 /*break*/, 3];
                            case 2:
                                _a = null;
                                _b.label = 3;
                            case 3: return [2 /*return*/, _a];
                        }
                    }); }); }));
                }
            }
            var resourcePromises = Promise.all(assembliesMarkedAsLazy
                .map(function (assembly) { return resourceLoader.loadResource(assembly, "_framework/" + assembly, lazyAssemblies[assembly], 'assembly'); })
                .map(function (resource) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, resource.response];
                    case 1: return [2 /*return*/, (_a.sent()).arrayBuffer()];
                }
            }); }); }));
            return BINDING.js_to_mono_obj(Promise.all([resourcePromises, pdbPromises]).then(function (values) {
                var resourcesToLoad = values[0];
                var pdbsToLoad = values[1];
                if (resourcesToLoad.length) {
                    window['Blazor']._internal.readLazyAssemblies = function () {
                        var assemblyBytes = BINDING.mono_obj_array_new(resourcesToLoad.length);
                        for (var i = 0; i < resourcesToLoad.length; i++) {
                            var assembly = resourcesToLoad[i];
                            BINDING.mono_obj_array_set(assemblyBytes, i, BINDING.js_typed_array_to_array(new Uint8Array(assembly)));
                        }
                        return assemblyBytes;
                    };
                    window['Blazor']._internal.readLazyPdbs = function () {
                        var pdbBytes = BINDING.mono_obj_array_new(resourcesToLoad.length);
                        for (var i = 0; i < resourcesToLoad.length; i++) {
                            var pdb = pdbsToLoad && pdbsToLoad[i] ? new Uint8Array(pdbsToLoad[i]) : new Uint8Array();
                            BINDING.mono_obj_array_set(pdbBytes, i, BINDING.js_typed_array_to_array(pdb));
                        }
                        return pdbBytes;
                    };
                }
                return resourcesToLoad.length;
            }));
        };
    });
    module.postRun.push(function () {
        if (resourceLoader.bootConfig.debugBuild && resourceLoader.bootConfig.cacheBootResources) {
            resourceLoader.logToConsole();
        }
        resourceLoader.purgeUnusedCacheEntriesAsync(); // Don't await - it's fine to run in background
        if (resourceLoader.bootConfig.icuDataMode == BootConfig_1.ICUDataMode.Sharded) {
            MONO.mono_wasm_setenv('__BLAZOR_SHARDED_ICU', '1');
            if (resourceLoader.startOptions.applicationCulture) {
                // If a culture is specified via start options use that to initialize the Emscripten \  .NET culture.
                MONO.mono_wasm_setenv('LANG', resourceLoader.startOptions.applicationCulture + ".UTF-8");
            }
        }
        MONO.mono_wasm_setenv("MONO_URI_DOTNETRELATIVEORABSOLUTE", "true");
        var timeZone = "UTC";
        try {
            timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
        catch (_a) { }
        MONO.mono_wasm_setenv("TZ", timeZone);
        // Turn off full-gc to prevent browser freezing.
        var mono_wasm_enable_on_demand_gc = cwrap('mono_wasm_enable_on_demand_gc', null, ['number']);
        mono_wasm_enable_on_demand_gc(0);
        var load_runtime = cwrap('mono_wasm_load_runtime', null, ['string', 'number']);
        // -1 enables debugging with logging disabled. 0 disables debugging entirely.
        load_runtime(appBinDirName, MonoDebugger_1.hasDebuggingEnabled() ? -1 : 0);
        MONO.mono_wasm_runtime_ready();
        attachInteropInvoker();
        onReady();
    });
    return module;
    function addResourceAsAssembly(dependency, loadAsName) {
        return __awaiter(this, void 0, void 0, function () {
            var runDependencyId, dataBuffer, data, heapAddress, heapMemory, errorInfo_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        runDependencyId = "blazor:" + dependency.name;
                        addRunDependency(runDependencyId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dependency.response.then(function (r) { return r.arrayBuffer(); })];
                    case 2:
                        dataBuffer = _a.sent();
                        data = new Uint8Array(dataBuffer);
                        heapAddress = Module._malloc(data.length);
                        heapMemory = new Uint8Array(Module.HEAPU8.buffer, heapAddress, data.length);
                        heapMemory.set(data);
                        mono_wasm_add_assembly(loadAsName, heapAddress, data.length);
                        MONO.loaded_files.push(toAbsoluteUrl(dependency.url));
                        return [3 /*break*/, 4];
                    case 3:
                        errorInfo_1 = _a.sent();
                        onError(errorInfo_1);
                        return [2 /*return*/];
                    case 4:
                        removeRunDependency(runDependencyId);
                        return [2 /*return*/];
                }
            });
        });
    }
}
var anchorTagForAbsoluteUrlConversions = document.createElement('a');
function toAbsoluteUrl(possiblyRelativeUrl) {
    anchorTagForAbsoluteUrlConversions.href = possiblyRelativeUrl;
    return anchorTagForAbsoluteUrlConversions.href;
}
function getArrayDataPointer(array) {
    return array + 12; // First byte from here is length, then following bytes are entries
}
function bindStaticMethod(assembly, typeName, method) {
    // Fully qualified name looks like this: "[debugger-test] Math:IntAdd"
    var fqn = "[" + assembly + "] " + typeName + ":" + method;
    return BINDING.bind_static_method(fqn);
}
function attachInteropInvoker() {
    var dotNetDispatcherInvokeMethodHandle = bindStaticMethod('Microsoft.AspNetCore.Components.WebAssembly', 'Microsoft.AspNetCore.Components.WebAssembly.Services.DefaultWebAssemblyJSRuntime', 'InvokeDotNet');
    var dotNetDispatcherBeginInvokeMethodHandle = bindStaticMethod('Microsoft.AspNetCore.Components.WebAssembly', 'Microsoft.AspNetCore.Components.WebAssembly.Services.DefaultWebAssemblyJSRuntime', 'BeginInvokeDotNet');
    var dotNetDispatcherEndInvokeJSMethodHandle = bindStaticMethod('Microsoft.AspNetCore.Components.WebAssembly', 'Microsoft.AspNetCore.Components.WebAssembly.Services.DefaultWebAssemblyJSRuntime', 'EndInvokeJS');
    dotnet_js_interop_1.DotNet.attachDispatcher({
        beginInvokeDotNetFromJS: function (callId, assemblyName, methodIdentifier, dotNetObjectId, argsJson) {
            assertHeapIsNotLocked();
            if (!dotNetObjectId && !assemblyName) {
                throw new Error('Either assemblyName or dotNetObjectId must have a non null value.');
            }
            // As a current limitation, we can only pass 4 args. Fortunately we only need one of
            // 'assemblyName' or 'dotNetObjectId', so overload them in a single slot
            var assemblyNameOrDotNetObjectId = dotNetObjectId
                ? dotNetObjectId.toString()
                : assemblyName;
            dotNetDispatcherBeginInvokeMethodHandle(callId ? callId.toString() : null, assemblyNameOrDotNetObjectId, methodIdentifier, argsJson);
        },
        endInvokeJSFromDotNet: function (asyncHandle, succeeded, serializedArgs) {
            dotNetDispatcherEndInvokeJSMethodHandle(serializedArgs);
        },
        invokeDotNetFromJS: function (assemblyName, methodIdentifier, dotNetObjectId, argsJson) {
            assertHeapIsNotLocked();
            return dotNetDispatcherInvokeMethodHandle(assemblyName ? assemblyName : null, methodIdentifier, dotNetObjectId ? dotNetObjectId.toString() : null, argsJson);
        },
    });
}
function loadTimezone(timeZoneResource) {
    return __awaiter(this, void 0, void 0, function () {
        var runDependencyId, request, arrayBuffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    runDependencyId = "blazor:timezonedata";
                    addRunDependency(runDependencyId);
                    return [4 /*yield*/, timeZoneResource.response];
                case 1:
                    request = _a.sent();
                    return [4 /*yield*/, request.arrayBuffer()];
                case 2:
                    arrayBuffer = _a.sent();
                    Module['FS_createPath']('/', 'usr', true, true);
                    Module['FS_createPath']('/usr/', 'share', true, true);
                    Module['FS_createPath']('/usr/share/', 'zoneinfo', true, true);
                    MONO.mono_wasm_load_data_archive(new Uint8Array(arrayBuffer), '/usr/share/zoneinfo/');
                    removeRunDependency(runDependencyId);
                    return [2 /*return*/];
            }
        });
    });
}
function getICUResourceName(bootConfig, culture) {
    var combinedICUResourceName = 'icudt.dat';
    if (!culture || bootConfig.icuDataMode == BootConfig_1.ICUDataMode.All) {
        return combinedICUResourceName;
    }
    var prefix = culture.split('-')[0];
    if (['en', 'fr', 'it', 'de', 'es'].includes(prefix)) {
        return 'icudt_EFIGS.dat';
    }
    else if (['zh', 'ko', 'ja'].includes(prefix)) {
        return 'icudt_CJK.dat';
    }
    else {
        return 'icudt_no_CJK.dat';
    }
}
function loadICUData(icuDataResource) {
    return __awaiter(this, void 0, void 0, function () {
        var runDependencyId, request, array, _a, offset;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    runDependencyId = "blazor:icudata";
                    addRunDependency(runDependencyId);
                    return [4 /*yield*/, icuDataResource.response];
                case 1:
                    request = _b.sent();
                    _a = Uint8Array.bind;
                    return [4 /*yield*/, request.arrayBuffer()];
                case 2:
                    array = new (_a.apply(Uint8Array, [void 0, _b.sent()]))();
                    offset = MONO.mono_wasm_load_bytes_into_heap(array);
                    if (!MONO.mono_wasm_load_icu_data(offset)) {
                        throw new Error("Error loading ICU asset.");
                    }
                    removeRunDependency(runDependencyId);
                    return [2 /*return*/];
            }
        });
    });
}
function compileWasmModule(wasmResource, imports) {
    return __awaiter(this, void 0, void 0, function () {
        var streamingResult, ex_2, arrayBuffer, arrayBufferResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof WebAssembly['instantiateStreaming'] === 'function')) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, WebAssembly['instantiateStreaming'](wasmResource.response, imports)];
                case 2:
                    streamingResult = _a.sent();
                    return [2 /*return*/, streamingResult.instance];
                case 3:
                    ex_2 = _a.sent();
                    console.info('Streaming compilation failed. Falling back to ArrayBuffer instantiation. ', ex_2);
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, wasmResource.response.then(function (r) { return r.arrayBuffer(); })];
                case 5:
                    arrayBuffer = _a.sent();
                    return [4 /*yield*/, WebAssembly.instantiate(arrayBuffer, imports)];
                case 6:
                    arrayBufferResult = _a.sent();
                    return [2 /*return*/, arrayBufferResult.instance];
            }
        });
    });
}
function changeExtension(filename, newExtensionWithLeadingDot) {
    var lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex < 0) {
        throw new Error("No extension to replace in '" + filename + "'");
    }
    return filename.substr(0, lastDotIndex) + newExtensionWithLeadingDot;
}
function assertHeapIsNotLocked() {
    if (currentHeapLock) {
        throw new Error('Assertion failed - heap is currently locked');
    }
}
var MonoHeapLock = /** @class */ (function () {
    function MonoHeapLock() {
        // Within a given heap lock, it's safe to cache decoded strings since the memory can't change
        this.stringCache = new Map();
    }
    MonoHeapLock.prototype.enqueuePostReleaseAction = function (callback) {
        if (!this.postReleaseActions) {
            this.postReleaseActions = [];
        }
        this.postReleaseActions.push(callback);
    };
    MonoHeapLock.prototype.release = function () {
        var _a;
        if (currentHeapLock !== this) {
            throw new Error('Trying to release a lock which isn\'t current');
        }
        currentHeapLock = null;
        while ((_a = this.postReleaseActions) === null || _a === void 0 ? void 0 : _a.length) {
            var nextQueuedAction = this.postReleaseActions.shift();
            // It's possible that the action we invoke here might itself take a succession of heap locks,
            // but since heap locks must be released synchronously, by the time we get back to this stack
            // frame, we know the heap should no longer be locked.
            nextQueuedAction();
            assertHeapIsNotLocked();
        }
    };
    return MonoHeapLock;
}());


/***/ }),

/***/ "./Platform/Platform.ts":
/*!******************************!*\
  !*** ./Platform/Platform.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./Platform/WebAssemblyComponentAttacher.ts":
/*!**************************************************!*\
  !*** ./Platform/WebAssemblyComponentAttacher.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LogicalElements_1 = __webpack_require__(/*! ../Rendering/LogicalElements */ "./Rendering/LogicalElements.ts");
var WebAssemblyComponentAttacher = /** @class */ (function () {
    function WebAssemblyComponentAttacher(components) {
        this.preregisteredComponents = components;
        var componentsById = {};
        for (var index = 0; index < components.length; index++) {
            var component = components[index];
            componentsById[component.id] = component;
        }
        this.componentsById = componentsById;
    }
    WebAssemblyComponentAttacher.prototype.resolveRegisteredElement = function (id) {
        var parsedId = Number.parseInt(id);
        if (!Number.isNaN(parsedId)) {
            return LogicalElements_1.toLogicalRootCommentElement(this.componentsById[parsedId].start, this.componentsById[parsedId].end);
        }
        else {
            return undefined;
        }
    };
    WebAssemblyComponentAttacher.prototype.getParameterValues = function (id) {
        return this.componentsById[id].parameterValues;
    };
    WebAssemblyComponentAttacher.prototype.getParameterDefinitions = function (id) {
        return this.componentsById[id].parameterDefinitions;
    };
    WebAssemblyComponentAttacher.prototype.getTypeName = function (id) {
        return this.componentsById[id].typeName;
    };
    WebAssemblyComponentAttacher.prototype.getAssembly = function (id) {
        return this.componentsById[id].assembly;
    };
    WebAssemblyComponentAttacher.prototype.getId = function (index) {
        return this.preregisteredComponents[index].id;
    };
    WebAssemblyComponentAttacher.prototype.getCount = function () {
        return this.preregisteredComponents.length;
    };
    return WebAssemblyComponentAttacher;
}());
exports.WebAssemblyComponentAttacher = WebAssemblyComponentAttacher;


/***/ }),

/***/ "./Platform/WebAssemblyConfigLoader.ts":
/*!*********************************************!*\
  !*** ./Platform/WebAssemblyConfigLoader.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebAssemblyConfigLoader = /** @class */ (function () {
    function WebAssemblyConfigLoader() {
    }
    WebAssemblyConfigLoader.initAsync = function (bootConfigResult) {
        return __awaiter(this, void 0, void 0, function () {
            function getConfigBytes(file) {
                return __awaiter(this, void 0, void 0, function () {
                    var response, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, fetch(file, {
                                    method: 'GET',
                                    credentials: 'include',
                                    cache: 'no-cache'
                                })];
                            case 1:
                                response = _b.sent();
                                _a = Uint8Array.bind;
                                return [4 /*yield*/, response.arrayBuffer()];
                            case 2: return [2 /*return*/, new (_a.apply(Uint8Array, [void 0, _b.sent()]))()];
                        }
                    });
                });
            }
            var configFiles;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        window['Blazor']._internal.getApplicationEnvironment = function () { return BINDING.js_string_to_mono_string(bootConfigResult.applicationEnvironment); };
                        return [4 /*yield*/, Promise.all((bootConfigResult.bootConfig.config || [])
                                .filter(function (name) { return name === 'appsettings.json' || name === "appsettings." + bootConfigResult.applicationEnvironment + ".json"; })
                                .map(function (name) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = { name: name };
                                        return [4 /*yield*/, getConfigBytes(name)];
                                    case 1: return [2 /*return*/, (_a.content = _b.sent(), _a)];
                                }
                            }); }); }))];
                    case 1:
                        configFiles = _a.sent();
                        window['Blazor']._internal.getConfig = function (dotNetFileName) {
                            var fileName = BINDING.conv_string(dotNetFileName);
                            var resolvedFile = configFiles.find(function (f) { return f.name === fileName; });
                            return resolvedFile ? BINDING.js_typed_array_to_array(resolvedFile.content) : undefined;
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    return WebAssemblyConfigLoader;
}());
exports.WebAssemblyConfigLoader = WebAssemblyConfigLoader;


/***/ }),

/***/ "./Platform/WebAssemblyResourceLoader.ts":
/*!***********************************************!*\
  !*** ./Platform/WebAssemblyResourceLoader.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var NavigationManager_1 = __webpack_require__(/*! ../Services/NavigationManager */ "./Services/NavigationManager.ts");
var networkFetchCacheMode = 'no-cache';
var WebAssemblyResourceLoader = /** @class */ (function () {
    function WebAssemblyResourceLoader(bootConfig, cacheIfUsed, startOptions) {
        this.bootConfig = bootConfig;
        this.cacheIfUsed = cacheIfUsed;
        this.startOptions = startOptions;
        this.usedCacheKeys = {};
        this.networkLoads = {};
        this.cacheLoads = {};
    }
    WebAssemblyResourceLoader.initAsync = function (bootConfig, startOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var cache;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getCacheToUseIfEnabled(bootConfig)];
                    case 1:
                        cache = _a.sent();
                        return [2 /*return*/, new WebAssemblyResourceLoader(bootConfig, cache, startOptions)];
                }
            });
        });
    };
    WebAssemblyResourceLoader.prototype.loadResources = function (resources, url, resourceType) {
        var _this = this;
        return Object.keys(resources)
            .map(function (name) { return _this.loadResource(name, url(name), resources[name], resourceType); });
    };
    WebAssemblyResourceLoader.prototype.loadResource = function (name, url, contentHash, resourceType) {
        var response = this.cacheIfUsed
            ? this.loadResourceWithCaching(this.cacheIfUsed, name, url, contentHash, resourceType)
            : this.loadResourceWithoutCaching(name, url, contentHash, resourceType);
        return { name: name, url: url, response: response };
    };
    WebAssemblyResourceLoader.prototype.logToConsole = function () {
        var cacheLoadsEntries = Object.values(this.cacheLoads);
        var networkLoadsEntries = Object.values(this.networkLoads);
        var cacheResponseBytes = countTotalBytes(cacheLoadsEntries);
        var networkResponseBytes = countTotalBytes(networkLoadsEntries);
        var totalResponseBytes = cacheResponseBytes + networkResponseBytes;
        if (totalResponseBytes === 0) {
            // We have no perf stats to display, likely because caching is not in use.
            return;
        }
        var linkerDisabledWarning = this.bootConfig.linkerEnabled ? '%c' : '\n%cThis application was built with linking (tree shaking) disabled. Published applications will be significantly smaller.';
        console.groupCollapsed("%cblazor%c Loaded " + toDataSizeString(totalResponseBytes) + " resources" + linkerDisabledWarning, 'background: purple; color: white; padding: 1px 3px; border-radius: 3px;', 'font-weight: bold;', 'font-weight: normal;');
        if (cacheLoadsEntries.length) {
            console.groupCollapsed("Loaded " + toDataSizeString(cacheResponseBytes) + " resources from cache");
            console.table(this.cacheLoads);
            console.groupEnd();
        }
        if (networkLoadsEntries.length) {
            console.groupCollapsed("Loaded " + toDataSizeString(networkResponseBytes) + " resources from network");
            console.table(this.networkLoads);
            console.groupEnd();
        }
        console.groupEnd();
    };
    WebAssemblyResourceLoader.prototype.purgeUnusedCacheEntriesAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cache, cachedRequests, deletionPromises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cache = this.cacheIfUsed;
                        if (!cache) return [3 /*break*/, 3];
                        return [4 /*yield*/, cache.keys()];
                    case 1:
                        cachedRequests = _a.sent();
                        deletionPromises = cachedRequests.map(function (cachedRequest) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!!(cachedRequest.url in this.usedCacheKeys)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, cache.delete(cachedRequest)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(deletionPromises)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WebAssemblyResourceLoader.prototype.loadResourceWithCaching = function (cache, name, url, contentHash, resourceType) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cachedResponse, _a, responseBytes, networkResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Since we are going to cache the response, we require there to be a content hash for integrity
                        // checking. We don't want to cache bad responses. There should always be a hash, because the build
                        // process generates this data.
                        if (!contentHash || contentHash.length === 0) {
                            throw new Error('Content hash is required');
                        }
                        cacheKey = NavigationManager_1.toAbsoluteUri(url + "." + contentHash);
                        this.usedCacheKeys[cacheKey] = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cache.match(cacheKey)];
                    case 2:
                        cachedResponse = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!cachedResponse) return [3 /*break*/, 5];
                        responseBytes = parseInt(cachedResponse.headers.get('content-length') || '0');
                        this.cacheLoads[name] = { responseBytes: responseBytes };
                        return [2 /*return*/, cachedResponse];
                    case 5: return [4 /*yield*/, this.loadResourceWithoutCaching(name, url, contentHash, resourceType)];
                    case 6:
                        networkResponse = _b.sent();
                        this.addToCacheAsync(cache, name, cacheKey, networkResponse); // Don't await - add to cache in background
                        return [2 /*return*/, networkResponse];
                }
            });
        });
    };
    WebAssemblyResourceLoader.prototype.loadResourceWithoutCaching = function (name, url, contentHash, resourceType) {
        // Allow developers to override how the resource is loaded
        if (this.startOptions.loadBootResource) {
            var customLoadResult = this.startOptions.loadBootResource(resourceType, name, url, contentHash);
            if (customLoadResult instanceof Promise) {
                // They are supplying an entire custom response, so just use that
                return customLoadResult;
            }
            else if (typeof customLoadResult === 'string') {
                // They are supplying a custom URL, so use that with the default fetch behavior
                url = customLoadResult;
            }
        }
        // Note that if cacheBootResources was explicitly disabled, we also bypass hash checking
        // This is to give developers an easy opt-out from the entire caching/validation flow if
        // there's anything they don't like about it.
        return fetch(url, {
            cache: networkFetchCacheMode,
            integrity: this.bootConfig.cacheBootResources ? contentHash : undefined
        });
    };
    WebAssemblyResourceLoader.prototype.addToCacheAsync = function (cache, name, cacheKey, response) {
        return __awaiter(this, void 0, void 0, function () {
            var responseData, performanceEntry, responseBytes, responseToCache, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, response.clone().arrayBuffer()];
                    case 1:
                        responseData = _b.sent();
                        performanceEntry = getPerformanceEntry(response.url);
                        responseBytes = (performanceEntry && performanceEntry.encodedBodySize) || undefined;
                        this.networkLoads[name] = { responseBytes: responseBytes };
                        responseToCache = new Response(responseData, {
                            headers: {
                                'content-type': response.headers.get('content-type') || '',
                                'content-length': (responseBytes || response.headers.get('content-length') || '').toString()
                            }
                        });
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, cache.put(cacheKey, responseToCache)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return WebAssemblyResourceLoader;
}());
exports.WebAssemblyResourceLoader = WebAssemblyResourceLoader;
function getCacheToUseIfEnabled(bootConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var relativeBaseHref, cacheName, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // caches will be undefined if we're running on an insecure origin (secure means https or localhost)
                    if (!bootConfig.cacheBootResources || typeof caches === 'undefined') {
                        return [2 /*return*/, null];
                    }
                    // cache integrity is compromised if the first request has been served over http (except localhost)
                    // in this case, we want to disable caching and integrity validation
                    if (window.isSecureContext === false) {
                        return [2 /*return*/, null];
                    }
                    relativeBaseHref = document.baseURI.substring(document.location.origin.length);
                    cacheName = "blazor-resources-" + relativeBaseHref;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, caches.open(cacheName)];
                case 2: 
                // There's a Chromium bug we need to be aware of here: the CacheStorage APIs say that when
                // caches.open(name) returns a promise that succeeds, the value is meant to be a Cache instance.
                // However, if the browser was launched with a --user-data-dir param that's "too long" in some sense,
                // then even through the promise resolves as success, the value given is `undefined`.
                // See https://stackoverflow.com/a/46626574 and https://bugs.chromium.org/p/chromium/issues/detail?id=1054541
                // If we see this happening, return "null" to mean "proceed without caching".
                return [2 /*return*/, (_b.sent()) || null];
                case 3:
                    _a = _b.sent();
                    // There's no known scenario where we should get an exception here, but considering the
                    // Chromium bug above, let's tolerate it and treat as "proceed without caching".
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function countTotalBytes(loads) {
    return loads.reduce(function (prev, item) { return prev + (item.responseBytes || 0); }, 0);
}
function toDataSizeString(byteCount) {
    return (byteCount / (1024 * 1024)).toFixed(2) + " MB";
}
function getPerformanceEntry(url) {
    if (typeof performance !== 'undefined') {
        return performance.getEntriesByName(url)[0];
    }
}


/***/ }),

/***/ "./Rendering/BrowserRenderer.ts":
/*!**************************************!*\
  !*** ./Rendering/BrowserRenderer.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RenderBatch_1 = __webpack_require__(/*! ./RenderBatch/RenderBatch */ "./Rendering/RenderBatch/RenderBatch.ts");
var EventDelegator_1 = __webpack_require__(/*! ./EventDelegator */ "./Rendering/EventDelegator.ts");
var LogicalElements_1 = __webpack_require__(/*! ./LogicalElements */ "./Rendering/LogicalElements.ts");
var ElementReferenceCapture_1 = __webpack_require__(/*! ./ElementReferenceCapture */ "./Rendering/ElementReferenceCapture.ts");
var RendererEventDispatcher_1 = __webpack_require__(/*! ./RendererEventDispatcher */ "./Rendering/RendererEventDispatcher.ts");
var NavigationManager_1 = __webpack_require__(/*! ../Services/NavigationManager */ "./Services/NavigationManager.ts");
var selectValuePropname = '_blazorSelectValue';
var sharedTemplateElemForParsing = document.createElement('template');
var sharedSvgElemForParsing = document.createElementNS('http://www.w3.org/2000/svg', 'g');
var preventDefaultEvents = { submit: true };
var rootComponentsPendingFirstRender = {};
var internalAttributeNamePrefix = '__internal_';
var eventPreventDefaultAttributeNamePrefix = 'preventDefault_';
var eventStopPropagationAttributeNamePrefix = 'stopPropagation_';
var BrowserRenderer = /** @class */ (function () {
    function BrowserRenderer(browserRendererId) {
        var _this = this;
        this.childComponentLocations = {};
        this.browserRendererId = browserRendererId;
        this.eventDelegator = new EventDelegator_1.EventDelegator(function (event, eventHandlerId, eventArgs, eventFieldInfo) {
            raiseEvent(event, _this.browserRendererId, eventHandlerId, eventArgs, eventFieldInfo);
        });
        // We don't yet know whether or not navigation interception will be enabled, but in case it will be,
        // we wire up the navigation manager to the event delegator so it has the option to participate
        // in the synthetic event bubbling process later
        NavigationManager_1.attachToEventDelegator(this.eventDelegator);
    }
    BrowserRenderer.prototype.attachRootComponentToLogicalElement = function (componentId, element) {
        this.attachComponentToElement(componentId, element);
        rootComponentsPendingFirstRender[componentId] = element;
    };
    BrowserRenderer.prototype.updateComponent = function (batch, componentId, edits, referenceFrames) {
        var _a;
        var element = this.childComponentLocations[componentId];
        if (!element) {
            throw new Error("No element is currently associated with component " + componentId);
        }
        // On the first render for each root component, clear any existing content (e.g., prerendered)
        var rootElementToClear = rootComponentsPendingFirstRender[componentId];
        if (rootElementToClear) {
            var rootElementToClearEnd = LogicalElements_1.getLogicalSiblingEnd(rootElementToClear);
            delete rootComponentsPendingFirstRender[componentId];
            if (!rootElementToClearEnd) {
                clearElement(rootElementToClear);
            }
            else {
                clearBetween(rootElementToClear, rootElementToClearEnd);
            }
        }
        var ownerDocument = (_a = LogicalElements_1.getClosestDomElement(element)) === null || _a === void 0 ? void 0 : _a.ownerDocument;
        var activeElementBefore = ownerDocument && ownerDocument.activeElement;
        this.applyEdits(batch, componentId, element, 0, edits, referenceFrames);
        // Try to restore focus in case it was lost due to an element move
        if ((activeElementBefore instanceof HTMLElement) && ownerDocument && ownerDocument.activeElement !== activeElementBefore) {
            activeElementBefore.focus();
        }
    };
    BrowserRenderer.prototype.disposeComponent = function (componentId) {
        delete this.childComponentLocations[componentId];
    };
    BrowserRenderer.prototype.disposeEventHandler = function (eventHandlerId) {
        this.eventDelegator.removeListener(eventHandlerId);
    };
    BrowserRenderer.prototype.attachComponentToElement = function (componentId, element) {
        this.childComponentLocations[componentId] = element;
    };
    BrowserRenderer.prototype.applyEdits = function (batch, componentId, parent, childIndex, edits, referenceFrames) {
        var currentDepth = 0;
        var childIndexAtCurrentDepth = childIndex;
        var permutationList;
        var arrayBuilderSegmentReader = batch.arrayBuilderSegmentReader;
        var editReader = batch.editReader;
        var frameReader = batch.frameReader;
        var editsValues = arrayBuilderSegmentReader.values(edits);
        var editsOffset = arrayBuilderSegmentReader.offset(edits);
        var editsLength = arrayBuilderSegmentReader.count(edits);
        var maxEditIndexExcl = editsOffset + editsLength;
        for (var editIndex = editsOffset; editIndex < maxEditIndexExcl; editIndex++) {
            var edit = batch.diffReader.editsEntry(editsValues, editIndex);
            var editType = editReader.editType(edit);
            switch (editType) {
                case RenderBatch_1.EditType.prependFrame: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    this.insertFrame(batch, componentId, parent, childIndexAtCurrentDepth + siblingIndex, referenceFrames, frame, frameIndex);
                    break;
                }
                case RenderBatch_1.EditType.removeFrame: {
                    var siblingIndex = editReader.siblingIndex(edit);
                    LogicalElements_1.removeLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    break;
                }
                case RenderBatch_1.EditType.setAttribute: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    var element = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (element instanceof Element) {
                        this.applyAttribute(batch, componentId, element, frame);
                    }
                    else {
                        throw new Error('Cannot set attribute on non-element child');
                    }
                    break;
                }
                case RenderBatch_1.EditType.removeAttribute: {
                    // Note that we don't have to dispose the info we track about event handlers here, because the
                    // disposed event handler IDs are delivered separately (in the 'disposedEventHandlerIds' array)
                    var siblingIndex = editReader.siblingIndex(edit);
                    var element = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (element instanceof HTMLElement) {
                        var attributeName = editReader.removedAttributeName(edit);
                        // First try to remove any special property we use for this attribute
                        if (!this.tryApplySpecialProperty(batch, element, attributeName, null)) {
                            // If that's not applicable, it's a regular DOM attribute so remove that
                            element.removeAttribute(attributeName);
                        }
                    }
                    else {
                        throw new Error('Cannot remove attribute from non-element child');
                    }
                    break;
                }
                case RenderBatch_1.EditType.updateText: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    var textNode = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (textNode instanceof Text) {
                        textNode.textContent = frameReader.textContent(frame);
                    }
                    else {
                        throw new Error('Cannot set text content on non-text child');
                    }
                    break;
                }
                case RenderBatch_1.EditType.updateMarkup: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    LogicalElements_1.removeLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    this.insertMarkup(batch, parent, childIndexAtCurrentDepth + siblingIndex, frame);
                    break;
                }
                case RenderBatch_1.EditType.stepIn: {
                    var siblingIndex = editReader.siblingIndex(edit);
                    parent = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    currentDepth++;
                    childIndexAtCurrentDepth = 0;
                    break;
                }
                case RenderBatch_1.EditType.stepOut: {
                    parent = LogicalElements_1.getLogicalParent(parent);
                    currentDepth--;
                    childIndexAtCurrentDepth = currentDepth === 0 ? childIndex : 0; // The childIndex is only ever nonzero at zero depth
                    break;
                }
                case RenderBatch_1.EditType.permutationListEntry: {
                    permutationList = permutationList || [];
                    permutationList.push({
                        fromSiblingIndex: childIndexAtCurrentDepth + editReader.siblingIndex(edit),
                        toSiblingIndex: childIndexAtCurrentDepth + editReader.moveToSiblingIndex(edit),
                    });
                    break;
                }
                case RenderBatch_1.EditType.permutationListEnd: {
                    LogicalElements_1.permuteLogicalChildren(parent, permutationList);
                    permutationList = undefined;
                    break;
                }
                default: {
                    var unknownType = editType; // Compile-time verification that the switch was exhaustive
                    throw new Error("Unknown edit type: " + unknownType);
                }
            }
        }
    };
    BrowserRenderer.prototype.insertFrame = function (batch, componentId, parent, childIndex, frames, frame, frameIndex) {
        var frameReader = batch.frameReader;
        var frameType = frameReader.frameType(frame);
        switch (frameType) {
            case RenderBatch_1.FrameType.element:
                this.insertElement(batch, componentId, parent, childIndex, frames, frame, frameIndex);
                return 1;
            case RenderBatch_1.FrameType.text:
                this.insertText(batch, parent, childIndex, frame);
                return 1;
            case RenderBatch_1.FrameType.attribute:
                throw new Error('Attribute frames should only be present as leading children of element frames.');
            case RenderBatch_1.FrameType.component:
                this.insertComponent(batch, parent, childIndex, frame);
                return 1;
            case RenderBatch_1.FrameType.region:
                return this.insertFrameRange(batch, componentId, parent, childIndex, frames, frameIndex + 1, frameIndex + frameReader.subtreeLength(frame));
            case RenderBatch_1.FrameType.elementReferenceCapture:
                if (parent instanceof Element) {
                    ElementReferenceCapture_1.applyCaptureIdToElement(parent, frameReader.elementReferenceCaptureId(frame));
                    return 0; // A "capture" is a child in the diff, but has no node in the DOM
                }
                else {
                    throw new Error('Reference capture frames can only be children of element frames.');
                }
            case RenderBatch_1.FrameType.markup:
                this.insertMarkup(batch, parent, childIndex, frame);
                return 1;
            default:
                var unknownType = frameType; // Compile-time verification that the switch was exhaustive
                throw new Error("Unknown frame type: " + unknownType);
        }
    };
    BrowserRenderer.prototype.insertElement = function (batch, componentId, parent, childIndex, frames, frame, frameIndex) {
        var frameReader = batch.frameReader;
        var tagName = frameReader.elementName(frame);
        var newDomElementRaw = tagName === 'svg' || LogicalElements_1.isSvgElement(parent) ?
            document.createElementNS('http://www.w3.org/2000/svg', tagName) :
            document.createElement(tagName);
        var newElement = LogicalElements_1.toLogicalElement(newDomElementRaw);
        var inserted = false;
        // Apply attributes
        var descendantsEndIndexExcl = frameIndex + frameReader.subtreeLength(frame);
        for (var descendantIndex = frameIndex + 1; descendantIndex < descendantsEndIndexExcl; descendantIndex++) {
            var descendantFrame = batch.referenceFramesEntry(frames, descendantIndex);
            if (frameReader.frameType(descendantFrame) === RenderBatch_1.FrameType.attribute) {
                this.applyAttribute(batch, componentId, newDomElementRaw, descendantFrame);
            }
            else {
                LogicalElements_1.insertLogicalChild(newDomElementRaw, parent, childIndex);
                inserted = true;
                // As soon as we see a non-attribute child, all the subsequent child frames are
                // not attributes, so bail out and insert the remnants recursively
                this.insertFrameRange(batch, componentId, newElement, 0, frames, descendantIndex, descendantsEndIndexExcl);
                break;
            }
        }
        // this element did not have any children, so it's not inserted yet.
        if (!inserted) {
            LogicalElements_1.insertLogicalChild(newDomElementRaw, parent, childIndex);
        }
        // We handle setting 'value' on a <select> in three different ways:
        // [1] When inserting a corresponding <option>, in case you're dynamically adding options.
        //     This is the case below.
        // [2] After we finish inserting the <select>, in case the descendant options are being
        //     added as an opaque markup block rather than individually. This is the other case below.
        // [3] In case the the value of the select and the option value is changed in the same batch.
        //     We just receive an attribute frame and have to set the select value afterwards.
        if (newDomElementRaw instanceof HTMLOptionElement) {
            // Situation 1
            this.trySetSelectValueFromOptionElement(newDomElementRaw);
        }
        else if (newDomElementRaw instanceof HTMLSelectElement && selectValuePropname in newDomElementRaw) {
            // Situation 2
            var selectValue = newDomElementRaw[selectValuePropname];
            setSelectElementValue(newDomElementRaw, selectValue);
        }
    };
    BrowserRenderer.prototype.trySetSelectValueFromOptionElement = function (optionElement) {
        var selectElem = this.findClosestAncestorSelectElement(optionElement);
        if (selectElem && (selectValuePropname in selectElem) && selectElem[selectValuePropname] === optionElement.value) {
            setSelectElementValue(selectElem, optionElement.value);
            delete selectElem[selectValuePropname];
            return true;
        }
        return false;
    };
    BrowserRenderer.prototype.insertComponent = function (batch, parent, childIndex, frame) {
        var containerElement = LogicalElements_1.createAndInsertLogicalContainer(parent, childIndex);
        // All we have to do is associate the child component ID with its location. We don't actually
        // do any rendering here, because the diff for the child will appear later in the render batch.
        var childComponentId = batch.frameReader.componentId(frame);
        this.attachComponentToElement(childComponentId, containerElement);
    };
    BrowserRenderer.prototype.insertText = function (batch, parent, childIndex, textFrame) {
        var textContent = batch.frameReader.textContent(textFrame);
        var newTextNode = document.createTextNode(textContent);
        LogicalElements_1.insertLogicalChild(newTextNode, parent, childIndex);
    };
    BrowserRenderer.prototype.insertMarkup = function (batch, parent, childIndex, markupFrame) {
        var markupContainer = LogicalElements_1.createAndInsertLogicalContainer(parent, childIndex);
        var markupContent = batch.frameReader.markupContent(markupFrame);
        var parsedMarkup = parseMarkup(markupContent, LogicalElements_1.isSvgElement(parent));
        var logicalSiblingIndex = 0;
        while (parsedMarkup.firstChild) {
            LogicalElements_1.insertLogicalChild(parsedMarkup.firstChild, markupContainer, logicalSiblingIndex++);
        }
    };
    BrowserRenderer.prototype.applyAttribute = function (batch, componentId, toDomElement, attributeFrame) {
        var frameReader = batch.frameReader;
        var attributeName = frameReader.attributeName(attributeFrame);
        var eventHandlerId = frameReader.attributeEventHandlerId(attributeFrame);
        if (eventHandlerId) {
            var eventName = stripOnPrefix(attributeName);
            this.eventDelegator.setListener(toDomElement, eventName, eventHandlerId, componentId);
            return;
        }
        // First see if we have special handling for this attribute
        if (!this.tryApplySpecialProperty(batch, toDomElement, attributeName, attributeFrame)) {
            // If not, treat it as a regular string-valued attribute
            toDomElement.setAttribute(attributeName, frameReader.attributeValue(attributeFrame));
        }
    };
    BrowserRenderer.prototype.tryApplySpecialProperty = function (batch, element, attributeName, attributeFrame) {
        switch (attributeName) {
            case 'value':
                return this.tryApplyValueProperty(batch, element, attributeFrame);
            case 'checked':
                return this.tryApplyCheckedProperty(batch, element, attributeFrame);
            default: {
                if (attributeName.startsWith(internalAttributeNamePrefix)) {
                    this.applyInternalAttribute(batch, element, attributeName.substring(internalAttributeNamePrefix.length), attributeFrame);
                    return true;
                }
                return false;
            }
        }
    };
    BrowserRenderer.prototype.applyInternalAttribute = function (batch, element, internalAttributeName, attributeFrame) {
        var attributeValue = attributeFrame ? batch.frameReader.attributeValue(attributeFrame) : null;
        if (internalAttributeName.startsWith(eventStopPropagationAttributeNamePrefix)) {
            // Stop propagation
            var eventName = stripOnPrefix(internalAttributeName.substring(eventStopPropagationAttributeNamePrefix.length));
            this.eventDelegator.setStopPropagation(element, eventName, attributeValue !== null);
        }
        else if (internalAttributeName.startsWith(eventPreventDefaultAttributeNamePrefix)) {
            // Prevent default
            var eventName = stripOnPrefix(internalAttributeName.substring(eventPreventDefaultAttributeNamePrefix.length));
            this.eventDelegator.setPreventDefault(element, eventName, attributeValue !== null);
        }
        else {
            // The prefix makes this attribute name reserved, so any other usage is disallowed
            throw new Error("Unsupported internal attribute '" + internalAttributeName + "'");
        }
    };
    BrowserRenderer.prototype.tryApplyValueProperty = function (batch, element, attributeFrame) {
        // Certain elements have built-in behaviour for their 'value' property
        var frameReader = batch.frameReader;
        if (element.tagName === 'INPUT' && element.getAttribute('type') === 'time' && !element.getAttribute('step')) {
            var timeValue = attributeFrame ? frameReader.attributeValue(attributeFrame) : null;
            if (timeValue) {
                element['value'] = timeValue.substring(0, 5);
                return true;
            }
        }
        switch (element.tagName) {
            case 'INPUT':
            case 'SELECT':
            case 'TEXTAREA': {
                var value = attributeFrame ? frameReader.attributeValue(attributeFrame) : null;
                if (element instanceof HTMLSelectElement) {
                    setSelectElementValue(element, value);
                    // <select> is special, in that anything we write to .value will be lost if there
                    // isn't yet a matching <option>. To maintain the expected behavior no matter the
                    // element insertion/update order, preserve the desired value separately so
                    // we can recover it when inserting any matching <option> or after inserting an
                    // entire markup block of descendants.
                    element[selectValuePropname] = value;
                }
                else {
                    element.value = value;
                }
                return true;
            }
            case 'OPTION': {
                var value = attributeFrame ? frameReader.attributeValue(attributeFrame) : null;
                if (value || value === '') {
                    element.setAttribute('value', value);
                }
                else {
                    element.removeAttribute('value');
                }
                // See above for why we have this special handling for <select>/<option>
                // Situation 3
                this.trySetSelectValueFromOptionElement(element);
                return true;
            }
            default:
                return false;
        }
    };
    BrowserRenderer.prototype.tryApplyCheckedProperty = function (batch, element, attributeFrame) {
        // Certain elements have built-in behaviour for their 'checked' property
        if (element.tagName === 'INPUT') {
            var value = attributeFrame ? batch.frameReader.attributeValue(attributeFrame) : null;
            element.checked = value !== null;
            return true;
        }
        else {
            return false;
        }
    };
    BrowserRenderer.prototype.findClosestAncestorSelectElement = function (element) {
        while (element) {
            if (element instanceof HTMLSelectElement) {
                return element;
            }
            else {
                element = element.parentElement;
            }
        }
        return null;
    };
    BrowserRenderer.prototype.insertFrameRange = function (batch, componentId, parent, childIndex, frames, startIndex, endIndexExcl) {
        var origChildIndex = childIndex;
        for (var index = startIndex; index < endIndexExcl; index++) {
            var frame = batch.referenceFramesEntry(frames, index);
            var numChildrenInserted = this.insertFrame(batch, componentId, parent, childIndex, frames, frame, index);
            childIndex += numChildrenInserted;
            // Skip over any descendants, since they are already dealt with recursively
            index += countDescendantFrames(batch, frame);
        }
        return (childIndex - origChildIndex); // Total number of children inserted
    };
    return BrowserRenderer;
}());
exports.BrowserRenderer = BrowserRenderer;
function parseMarkup(markup, isSvg) {
    if (isSvg) {
        sharedSvgElemForParsing.innerHTML = markup || ' ';
        return sharedSvgElemForParsing;
    }
    else {
        sharedTemplateElemForParsing.innerHTML = markup || ' ';
        return sharedTemplateElemForParsing.content;
    }
}
function countDescendantFrames(batch, frame) {
    var frameReader = batch.frameReader;
    switch (frameReader.frameType(frame)) {
        // The following frame types have a subtree length. Other frames may use that memory slot
        // to mean something else, so we must not read it. We should consider having nominal subtypes
        // of RenderTreeFramePointer that prevent access to non-applicable fields.
        case RenderBatch_1.FrameType.component:
        case RenderBatch_1.FrameType.element:
        case RenderBatch_1.FrameType.region:
            return frameReader.subtreeLength(frame) - 1;
        default:
            return 0;
    }
}
function raiseEvent(event, browserRendererId, eventHandlerId, eventArgs, eventFieldInfo) {
    if (preventDefaultEvents[event.type]) {
        event.preventDefault();
    }
    var eventDescriptor = {
        browserRendererId: browserRendererId,
        eventHandlerId: eventHandlerId,
        eventArgsType: eventArgs.type,
        eventFieldInfo: eventFieldInfo,
    };
    RendererEventDispatcher_1.dispatchEvent(eventDescriptor, eventArgs.data);
}
function clearElement(element) {
    var childNode;
    while (childNode = element.firstChild) {
        element.removeChild(childNode);
    }
}
function clearBetween(start, end) {
    var logicalParent = LogicalElements_1.getLogicalParent(start);
    if (!logicalParent) {
        throw new Error("Can't clear between nodes. The start node does not have a logical parent.");
    }
    var children = LogicalElements_1.getLogicalChildrenArray(logicalParent);
    var removeStart = children.indexOf(start) + 1;
    var endIndex = children.indexOf(end);
    // We remove the end component comment from the DOM as we don't need it after this point.
    for (var i = removeStart; i <= endIndex; i++) {
        LogicalElements_1.removeLogicalChild(logicalParent, removeStart);
    }
    // We sanitize the start comment by removing all the information from it now that we don't need it anymore
    // as it adds noise to the DOM.
    start.textContent = '!';
}
function stripOnPrefix(attributeName) {
    if (attributeName.startsWith('on')) {
        return attributeName.substring(2);
    }
    throw new Error("Attribute should be an event name, but doesn't start with 'on'. Value: '" + attributeName + "'");
}
function setSelectElementValue(element, value) {
    // There's no sensible way to represent a select option with value 'null', because
    // (1) HTML attributes can't have null values - the closest equivalent is absence of the attribute
    // (2) When picking an <option> with no 'value' attribute, the browser treats the value as being the
    //     *text content* on that <option> element. Trying to suppress that default behavior would involve
    //     a long chain of special-case hacks, as well as being breaking vs 3.x.
    // So, the most plausible 'null' equivalent is an empty string. It's unfortunate that people can't
    // write <option value=@someNullVariable>, and that we can never distinguish between null and empty
    // string in a bound <select>, but that's a limit in the representational power of HTML.
    element.value = value || '';
}


/***/ }),

/***/ "./Rendering/ElementReferenceCapture.ts":
/*!**********************************************!*\
  !*** ./Rendering/ElementReferenceCapture.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dotnet_js_interop_1 = __webpack_require__(/*! @microsoft/dotnet-js-interop */ "../../../JSInterop/Microsoft.JSInterop.JS/src/dist/Microsoft.JSInterop.js");
function applyCaptureIdToElement(element, referenceCaptureId) {
    element.setAttribute(getCaptureIdAttributeName(referenceCaptureId), '');
}
exports.applyCaptureIdToElement = applyCaptureIdToElement;
function getElementByCaptureId(referenceCaptureId) {
    var selector = "[" + getCaptureIdAttributeName(referenceCaptureId) + "]";
    return document.querySelector(selector);
}
function getCaptureIdAttributeName(referenceCaptureId) {
    return "_bl_" + referenceCaptureId;
}
// Support receiving ElementRef instances as args in interop calls
var elementRefKey = '__internalId'; // Keep in sync with ElementRef.cs
dotnet_js_interop_1.DotNet.attachReviver(function (key, value) {
    if (value && typeof value === 'object' && value.hasOwnProperty(elementRefKey) && typeof value[elementRefKey] === 'string') {
        return getElementByCaptureId(value[elementRefKey]);
    }
    else {
        return value;
    }
});


/***/ }),

/***/ "./Rendering/EventDelegator.ts":
/*!*************************************!*\
  !*** ./Rendering/EventDelegator.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet_1 = __webpack_require__(/*! ./EventForDotNet */ "./Rendering/EventForDotNet.ts");
var EventFieldInfo_1 = __webpack_require__(/*! ./EventFieldInfo */ "./Rendering/EventFieldInfo.ts");
var nonBubblingEvents = toLookup([
    'abort',
    'blur',
    'change',
    'error',
    'focus',
    'load',
    'loadend',
    'loadstart',
    'mouseenter',
    'mouseleave',
    'progress',
    'reset',
    'scroll',
    'submit',
    'unload',
    'toggle',
    'DOMNodeInsertedIntoDocument',
    'DOMNodeRemovedFromDocument',
]);
var disableableEventNames = toLookup(['click', 'dblclick', 'mousedown', 'mousemove', 'mouseup']);
// Responsible for adding/removing the eventInfo on an expando property on DOM elements, and
// calling an EventInfoStore that deals with registering/unregistering the underlying delegated
// event listeners as required (and also maps actual events back to the given callback).
var EventDelegator = /** @class */ (function () {
    function EventDelegator(onEvent) {
        this.onEvent = onEvent;
        this.afterClickCallbacks = [];
        var eventDelegatorId = ++EventDelegator.nextEventDelegatorId;
        this.eventsCollectionKey = "_blazorEvents_" + eventDelegatorId;
        this.eventInfoStore = new EventInfoStore(this.onGlobalEvent.bind(this));
    }
    EventDelegator.prototype.setListener = function (element, eventName, eventHandlerId, renderingComponentId) {
        var infoForElement = this.getEventHandlerInfosForElement(element, true);
        var existingHandler = infoForElement.getHandler(eventName);
        if (existingHandler) {
            // We can cheaply update the info on the existing object and don't need any other housekeeping
            // Note that this also takes care of updating the eventHandlerId on the existing handler object
            this.eventInfoStore.update(existingHandler.eventHandlerId, eventHandlerId);
        }
        else {
            // Go through the whole flow which might involve registering a new global handler
            var newInfo = { element: element, eventName: eventName, eventHandlerId: eventHandlerId, renderingComponentId: renderingComponentId };
            this.eventInfoStore.add(newInfo);
            infoForElement.setHandler(eventName, newInfo);
        }
    };
    EventDelegator.prototype.getHandler = function (eventHandlerId) {
        return this.eventInfoStore.get(eventHandlerId);
    };
    EventDelegator.prototype.removeListener = function (eventHandlerId) {
        // This method gets called whenever the .NET-side code reports that a certain event handler
        // has been disposed. However we will already have disposed the info about that handler if
        // the eventHandlerId for the (element,eventName) pair was replaced during diff application.
        var info = this.eventInfoStore.remove(eventHandlerId);
        if (info) {
            // Looks like this event handler wasn't already disposed
            // Remove the associated data from the DOM element
            var element = info.element;
            var elementEventInfos = this.getEventHandlerInfosForElement(element, false);
            if (elementEventInfos) {
                elementEventInfos.removeHandler(info.eventName);
            }
        }
    };
    EventDelegator.prototype.notifyAfterClick = function (callback) {
        // This is extremely special-case. It's needed so that navigation link click interception
        // can be sure to run *after* our synthetic bubbling process. If a need arises, we can
        // generalise this, but right now it's a purely internal detail.
        this.afterClickCallbacks.push(callback);
        this.eventInfoStore.addGlobalListener('click'); // Ensure we always listen for this
    };
    EventDelegator.prototype.setStopPropagation = function (element, eventName, value) {
        var infoForElement = this.getEventHandlerInfosForElement(element, true);
        infoForElement.stopPropagation(eventName, value);
    };
    EventDelegator.prototype.setPreventDefault = function (element, eventName, value) {
        var infoForElement = this.getEventHandlerInfosForElement(element, true);
        infoForElement.preventDefault(eventName, value);
    };
    EventDelegator.prototype.onGlobalEvent = function (evt) {
        if (!(evt.target instanceof Element)) {
            return;
        }
        // Scan up the element hierarchy, looking for any matching registered event handlers
        var candidateElement = evt.target;
        var eventArgs = null; // Populate lazily
        var eventIsNonBubbling = nonBubblingEvents.hasOwnProperty(evt.type);
        var stopPropagationWasRequested = false;
        while (candidateElement) {
            var handlerInfos = this.getEventHandlerInfosForElement(candidateElement, false);
            if (handlerInfos) {
                var handlerInfo = handlerInfos.getHandler(evt.type);
                if (handlerInfo && !eventIsDisabledOnElement(candidateElement, evt.type)) {
                    // We are going to raise an event for this element, so prepare info needed by the .NET code
                    if (!eventArgs) {
                        eventArgs = EventForDotNet_1.EventForDotNet.fromDOMEvent(evt);
                    }
                    var eventFieldInfo = EventFieldInfo_1.EventFieldInfo.fromEvent(handlerInfo.renderingComponentId, evt);
                    this.onEvent(evt, handlerInfo.eventHandlerId, eventArgs, eventFieldInfo);
                }
                if (handlerInfos.stopPropagation(evt.type)) {
                    stopPropagationWasRequested = true;
                }
                if (handlerInfos.preventDefault(evt.type)) {
                    evt.preventDefault();
                }
            }
            candidateElement = (eventIsNonBubbling || stopPropagationWasRequested) ? null : candidateElement.parentElement;
        }
        // Special case for navigation interception
        if (evt.type === 'click') {
            this.afterClickCallbacks.forEach(function (callback) { return callback(evt); });
        }
    };
    EventDelegator.prototype.getEventHandlerInfosForElement = function (element, createIfNeeded) {
        if (element.hasOwnProperty(this.eventsCollectionKey)) {
            return element[this.eventsCollectionKey];
        }
        else if (createIfNeeded) {
            return (element[this.eventsCollectionKey] = new EventHandlerInfosForElement());
        }
        else {
            return null;
        }
    };
    EventDelegator.nextEventDelegatorId = 0;
    return EventDelegator;
}());
exports.EventDelegator = EventDelegator;
// Responsible for adding and removing the global listener when the number of listeners
// for a given event name changes between zero and nonzero
var EventInfoStore = /** @class */ (function () {
    function EventInfoStore(globalListener) {
        this.globalListener = globalListener;
        this.infosByEventHandlerId = {};
        this.countByEventName = {};
    }
    EventInfoStore.prototype.add = function (info) {
        if (this.infosByEventHandlerId[info.eventHandlerId]) {
            // Should never happen, but we want to know if it does
            throw new Error("Event " + info.eventHandlerId + " is already tracked");
        }
        this.infosByEventHandlerId[info.eventHandlerId] = info;
        this.addGlobalListener(info.eventName);
    };
    EventInfoStore.prototype.get = function (eventHandlerId) {
        return this.infosByEventHandlerId[eventHandlerId];
    };
    EventInfoStore.prototype.addGlobalListener = function (eventName) {
        if (this.countByEventName.hasOwnProperty(eventName)) {
            this.countByEventName[eventName]++;
        }
        else {
            this.countByEventName[eventName] = 1;
            // To make delegation work with non-bubbling events, register a 'capture' listener.
            // We preserve the non-bubbling behavior by only dispatching such events to the targeted element.
            var useCapture = nonBubblingEvents.hasOwnProperty(eventName);
            document.addEventListener(eventName, this.globalListener, useCapture);
        }
    };
    EventInfoStore.prototype.update = function (oldEventHandlerId, newEventHandlerId) {
        if (this.infosByEventHandlerId.hasOwnProperty(newEventHandlerId)) {
            // Should never happen, but we want to know if it does
            throw new Error("Event " + newEventHandlerId + " is already tracked");
        }
        // Since we're just updating the event handler ID, there's no need to update the global counts
        var info = this.infosByEventHandlerId[oldEventHandlerId];
        delete this.infosByEventHandlerId[oldEventHandlerId];
        info.eventHandlerId = newEventHandlerId;
        this.infosByEventHandlerId[newEventHandlerId] = info;
    };
    EventInfoStore.prototype.remove = function (eventHandlerId) {
        var info = this.infosByEventHandlerId[eventHandlerId];
        if (info) {
            delete this.infosByEventHandlerId[eventHandlerId];
            var eventName = info.eventName;
            if (--this.countByEventName[eventName] === 0) {
                delete this.countByEventName[eventName];
                document.removeEventListener(eventName, this.globalListener);
            }
        }
        return info;
    };
    return EventInfoStore;
}());
var EventHandlerInfosForElement = /** @class */ (function () {
    function EventHandlerInfosForElement() {
        // Although we *could* track multiple event handlers per (element, eventName) pair
        // (since they have distinct eventHandlerId values), there's no point doing so because
        // our programming model is that you declare event handlers as attributes. An element
        // can only have one attribute with a given name, hence only one event handler with
        // that name at any one time.
        // So to keep things simple, only track one EventHandlerInfo per (element, eventName)
        this.handlers = {};
        this.preventDefaultFlags = null;
        this.stopPropagationFlags = null;
    }
    EventHandlerInfosForElement.prototype.getHandler = function (eventName) {
        return this.handlers.hasOwnProperty(eventName) ? this.handlers[eventName] : null;
    };
    EventHandlerInfosForElement.prototype.setHandler = function (eventName, handler) {
        this.handlers[eventName] = handler;
    };
    EventHandlerInfosForElement.prototype.removeHandler = function (eventName) {
        delete this.handlers[eventName];
    };
    EventHandlerInfosForElement.prototype.preventDefault = function (eventName, setValue) {
        if (setValue !== undefined) {
            this.preventDefaultFlags = this.preventDefaultFlags || {};
            this.preventDefaultFlags[eventName] = setValue;
        }
        return this.preventDefaultFlags ? this.preventDefaultFlags[eventName] : false;
    };
    EventHandlerInfosForElement.prototype.stopPropagation = function (eventName, setValue) {
        if (setValue !== undefined) {
            this.stopPropagationFlags = this.stopPropagationFlags || {};
            this.stopPropagationFlags[eventName] = setValue;
        }
        return this.stopPropagationFlags ? this.stopPropagationFlags[eventName] : false;
    };
    return EventHandlerInfosForElement;
}());
function toLookup(items) {
    var result = {};
    items.forEach(function (value) {
        result[value] = true;
    });
    return result;
}
function eventIsDisabledOnElement(element, eventName) {
    // We want to replicate the normal DOM event behavior that, for 'interactive' elements
    // with a 'disabled' attribute, certain mouse events are suppressed
    return (element instanceof HTMLButtonElement || element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)
        && disableableEventNames.hasOwnProperty(eventName)
        && element.disabled;
}


/***/ }),

/***/ "./Rendering/EventFieldInfo.ts":
/*!*************************************!*\
  !*** ./Rendering/EventFieldInfo.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventFieldInfo = /** @class */ (function () {
    function EventFieldInfo(componentId, fieldValue) {
        this.componentId = componentId;
        this.fieldValue = fieldValue;
    }
    EventFieldInfo.fromEvent = function (componentId, event) {
        var elem = event.target;
        if (elem instanceof Element) {
            var fieldData = getFormFieldData(elem);
            if (fieldData) {
                return new EventFieldInfo(componentId, fieldData.value);
            }
        }
        // This event isn't happening on a form field that we can reverse-map back to some incoming attribute
        return null;
    };
    return EventFieldInfo;
}());
exports.EventFieldInfo = EventFieldInfo;
function getFormFieldData(elem) {
    // The logic in here should be the inverse of the logic in BrowserRenderer's tryApplySpecialProperty.
    // That is, we're doing the reverse mapping, starting from an HTML property and reconstructing which
    // "special" attribute would have been mapped to that property.
    if (elem instanceof HTMLInputElement) {
        return (elem.type && elem.type.toLowerCase() === 'checkbox')
            ? { value: elem.checked }
            : { value: elem.value };
    }
    if (elem instanceof HTMLSelectElement || elem instanceof HTMLTextAreaElement) {
        return { value: elem.value };
    }
    return null;
}


/***/ }),

/***/ "./Rendering/EventForDotNet.ts":
/*!*************************************!*\
  !*** ./Rendering/EventForDotNet.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet = /** @class */ (function () {
    function EventForDotNet(type, data) {
        this.type = type;
        this.data = data;
    }
    EventForDotNet.fromDOMEvent = function (event) {
        var element = event.target;
        switch (event.type) {
            case 'input':
            case 'change': {
                if (isTimeBasedInput(element)) {
                    var normalizedValue = normalizeTimeBasedValue(element);
                    return new EventForDotNet('change', { type: event.type, value: normalizedValue });
                }
                var targetIsCheckbox = isCheckbox(element);
                var newValue = targetIsCheckbox ? !!element['checked'] : element['value'];
                return new EventForDotNet('change', { type: event.type, value: newValue });
            }
            case 'copy':
            case 'cut':
            case 'paste':
                return new EventForDotNet('clipboard', { type: event.type });
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
                return new EventForDotNet('drag', parseDragEvent(event));
            case 'focus':
            case 'blur':
            case 'focusin':
            case 'focusout':
                return new EventForDotNet('focus', { type: event.type });
            case 'keydown':
            case 'keyup':
            case 'keypress':
                return new EventForDotNet('keyboard', parseKeyboardEvent(event));
            case 'contextmenu':
            case 'click':
            case 'mouseover':
            case 'mouseout':
            case 'mousemove':
            case 'mousedown':
            case 'mouseup':
            case 'dblclick':
                return new EventForDotNet('mouse', parseMouseEvent(event));
            case 'error':
                return new EventForDotNet('error', parseErrorEvent(event));
            case 'loadstart':
            case 'timeout':
            case 'abort':
            case 'load':
            case 'loadend':
            case 'progress':
                return new EventForDotNet('progress', parseProgressEvent(event));
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchenter':
            case 'touchleave':
            case 'touchstart':
                return new EventForDotNet('touch', parseTouchEvent(event));
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointerenter':
            case 'pointerleave':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
                return new EventForDotNet('pointer', parsePointerEvent(event));
            case 'wheel':
            case 'mousewheel':
                return new EventForDotNet('wheel', parseWheelEvent(event));
            case 'toggle':
                return new EventForDotNet('toggle', { type: event.type });
            default:
                return new EventForDotNet('unknown', { type: event.type });
        }
    };
    return EventForDotNet;
}());
exports.EventForDotNet = EventForDotNet;
function parseDragEvent(event) {
    return __assign(__assign({}, parseMouseEvent(event)), { dataTransfer: event.dataTransfer });
}
function parseWheelEvent(event) {
    return __assign(__assign({}, parseMouseEvent(event)), { deltaX: event.deltaX, deltaY: event.deltaY, deltaZ: event.deltaZ, deltaMode: event.deltaMode });
}
function parseErrorEvent(event) {
    return {
        type: event.type,
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
    };
}
function parseProgressEvent(event) {
    return {
        type: event.type,
        lengthComputable: event.lengthComputable,
        loaded: event.loaded,
        total: event.total,
    };
}
function parseTouchEvent(event) {
    function parseTouch(touchList) {
        var touches = [];
        for (var i = 0; i < touchList.length; i++) {
            var touch = touchList[i];
            touches.push({
                identifier: touch.identifier,
                clientX: touch.clientX,
                clientY: touch.clientY,
                screenX: touch.screenX,
                screenY: touch.screenY,
                pageX: touch.pageX,
                pageY: touch.pageY,
            });
        }
        return touches;
    }
    return {
        type: event.type,
        detail: event.detail,
        touches: parseTouch(event.touches),
        targetTouches: parseTouch(event.targetTouches),
        changedTouches: parseTouch(event.changedTouches),
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
    };
}
function parseKeyboardEvent(event) {
    return {
        type: event.type,
        key: event.key,
        code: event.code,
        location: event.location,
        repeat: event.repeat,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
    };
}
function parsePointerEvent(event) {
    return __assign(__assign({}, parseMouseEvent(event)), { pointerId: event.pointerId, width: event.width, height: event.height, pressure: event.pressure, tiltX: event.tiltX, tiltY: event.tiltY, pointerType: event.pointerType, isPrimary: event.isPrimary });
}
function parseMouseEvent(event) {
    return {
        type: event.type,
        detail: event.detail,
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        offsetX: event.offsetX,
        offsetY: event.offsetY,
        button: event.button,
        buttons: event.buttons,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
    };
}
function isCheckbox(element) {
    return !!element && element.tagName === 'INPUT' && element.getAttribute('type') === 'checkbox';
}
var timeBasedInputs = [
    'date',
    'datetime-local',
    'month',
    'time',
    'week',
];
function isTimeBasedInput(element) {
    return timeBasedInputs.indexOf(element.getAttribute('type')) !== -1;
}
function normalizeTimeBasedValue(element) {
    var value = element.value;
    var type = element.type;
    switch (type) {
        case 'date':
        case 'datetime-local':
        case 'month':
            return value;
        case 'time':
            return value.length === 5 ? value + ':00' : value; // Convert hh:mm to hh:mm:00
        case 'week':
            // For now we are not going to normalize input type week as it is not trivial
            return value;
    }
    throw new Error("Invalid element type '" + type + "'.");
}


/***/ }),

/***/ "./Rendering/LogicalElements.ts":
/*!**************************************!*\
  !*** ./Rendering/LogicalElements.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  A LogicalElement plays the same role as an Element instance from the point of view of the
  API consumer. Inserting and removing logical elements updates the browser DOM just the same.

  The difference is that, unlike regular DOM mutation APIs, the LogicalElement APIs don't use
  the underlying DOM structure as the data storage for the element hierarchy. Instead, the
  LogicalElement APIs take care of tracking hierarchical relationships separately. The point
  of this is to permit a logical tree structure in which parent/child relationships don't
  have to be materialized in terms of DOM element parent/child relationships. And the reason
  why we want that is so that hierarchies of Blazor components can be tracked even when those
  components' render output need not be a single literal DOM element.

  Consumers of the API don't need to know about the implementation, but how it's done is:
  - Each LogicalElement is materialized in the DOM as either:
    - A Node instance, for actual Node instances inserted using 'insertLogicalChild' or
      for Element instances promoted to LogicalElement via 'toLogicalElement'
    - A Comment instance, for 'logical container' instances inserted using 'createAndInsertLogicalContainer'
  - Then, on that instance (i.e., the Node or Comment), we store an array of 'logical children'
    instances, e.g.,
      [firstChild, secondChild, thirdChild, ...]
    ... plus we store a reference to the 'logical parent' (if any)
  - The 'logical children' array means we can look up in O(1):
    - The number of logical children (not currently implemented because not required, but trivial)
    - The logical child at any given index
  - Whenever a logical child is added or removed, we update the parent's array of logical children
*/
Object.defineProperty(exports, "__esModule", { value: true });
var logicalChildrenPropname = createSymbolOrFallback('_blazorLogicalChildren');
var logicalParentPropname = createSymbolOrFallback('_blazorLogicalParent');
var logicalEndSiblingPropname = createSymbolOrFallback('_blazorLogicalEnd');
function toLogicalRootCommentElement(start, end) {
    // Now that we support start/end comments as component delimiters we are going to be setting up
    // adding the components rendered output as siblings of the start/end tags (between).
    // For that to work, we need to appropriately configure the parent element to be a logical element
    // with all their children being the child elements.
    // For example, imagine you have
    // <app>
    // <div><p>Static content</p></div>
    // <!-- start component
    // <!-- end component
    // <footer>Some other content</footer>
    // <app>
    // We want the parent element to be something like
    // *app
    // |- *div
    // |- *component
    // |- *footer
    if (!start.parentNode) {
        throw new Error("Comment not connected to the DOM " + start.textContent);
    }
    var parent = start.parentNode;
    var parentLogicalElement = toLogicalElement(parent, /* allow existing contents */ true);
    var children = getLogicalChildrenArray(parentLogicalElement);
    Array.from(parent.childNodes).forEach(function (n) { return children.push(n); });
    start[logicalParentPropname] = parentLogicalElement;
    // We might not have an end comment in the case of non-prerendered components.
    if (end) {
        start[logicalEndSiblingPropname] = end;
        toLogicalElement(end);
    }
    return toLogicalElement(start);
}
exports.toLogicalRootCommentElement = toLogicalRootCommentElement;
function toLogicalElement(element, allowExistingContents) {
    // Normally it's good to assert that the element has started empty, because that's the usual
    // situation and we probably have a bug if it's not. But for the element that contain prerendered
    // root components, we want to let them keep their content until we replace it.
    if (element.childNodes.length > 0 && !allowExistingContents) {
        throw new Error('New logical elements must start empty, or allowExistingContents must be true');
    }
    if (!(logicalChildrenPropname in element)) { // If it's already a logical element, leave it alone
        element[logicalChildrenPropname] = [];
    }
    return element;
}
exports.toLogicalElement = toLogicalElement;
function createAndInsertLogicalContainer(parent, childIndex) {
    var containerElement = document.createComment('!');
    insertLogicalChild(containerElement, parent, childIndex);
    return containerElement;
}
exports.createAndInsertLogicalContainer = createAndInsertLogicalContainer;
function insertLogicalChild(child, parent, childIndex) {
    var childAsLogicalElement = child;
    if (child instanceof Comment) {
        var existingGrandchildren = getLogicalChildrenArray(childAsLogicalElement);
        if (existingGrandchildren && getLogicalChildrenArray(childAsLogicalElement).length > 0) {
            // There's nothing to stop us implementing support for this scenario, and it's not difficult
            // (after inserting 'child' itself, also iterate through its logical children and physically
            // put them as following-siblings in the DOM). However there's no scenario that requires it
            // presently, so if we did implement it there'd be no good way to have tests for it.
            throw new Error('Not implemented: inserting non-empty logical container');
        }
    }
    if (getLogicalParent(childAsLogicalElement)) {
        // Likewise, we could easily support this scenario too (in this 'if' block, just splice
        // out 'child' from the logical children array of its previous logical parent by using
        // Array.prototype.indexOf to determine its previous sibling index).
        // But again, since there's not currently any scenario that would use it, we would not
        // have any test coverage for such an implementation.
        throw new Error('Not implemented: moving existing logical children');
    }
    var newSiblings = getLogicalChildrenArray(parent);
    if (childIndex < newSiblings.length) {
        // Insert
        var nextSibling = newSiblings[childIndex];
        nextSibling.parentNode.insertBefore(child, nextSibling);
        newSiblings.splice(childIndex, 0, childAsLogicalElement);
    }
    else {
        // Append
        appendDomNode(child, parent);
        newSiblings.push(childAsLogicalElement);
    }
    childAsLogicalElement[logicalParentPropname] = parent;
    if (!(logicalChildrenPropname in childAsLogicalElement)) {
        childAsLogicalElement[logicalChildrenPropname] = [];
    }
}
exports.insertLogicalChild = insertLogicalChild;
function removeLogicalChild(parent, childIndex) {
    var childrenArray = getLogicalChildrenArray(parent);
    var childToRemove = childrenArray.splice(childIndex, 1)[0];
    // If it's a logical container, also remove its descendants
    if (childToRemove instanceof Comment) {
        var grandchildrenArray = getLogicalChildrenArray(childToRemove);
        if (grandchildrenArray) {
            while (grandchildrenArray.length > 0) {
                removeLogicalChild(childToRemove, 0);
            }
        }
    }
    // Finally, remove the node itself
    var domNodeToRemove = childToRemove;
    domNodeToRemove.parentNode.removeChild(domNodeToRemove);
}
exports.removeLogicalChild = removeLogicalChild;
function getLogicalParent(element) {
    return element[logicalParentPropname] || null;
}
exports.getLogicalParent = getLogicalParent;
function getLogicalSiblingEnd(element) {
    return element[logicalEndSiblingPropname] || null;
}
exports.getLogicalSiblingEnd = getLogicalSiblingEnd;
function getLogicalChild(parent, childIndex) {
    return getLogicalChildrenArray(parent)[childIndex];
}
exports.getLogicalChild = getLogicalChild;
function isSvgElement(element) {
    return getClosestDomElement(element).namespaceURI === 'http://www.w3.org/2000/svg';
}
exports.isSvgElement = isSvgElement;
function getLogicalChildrenArray(element) {
    return element[logicalChildrenPropname];
}
exports.getLogicalChildrenArray = getLogicalChildrenArray;
function permuteLogicalChildren(parent, permutationList) {
    // The permutationList must represent a valid permutation, i.e., the list of 'from' indices
    // is distinct, and the list of 'to' indices is a permutation of it. The algorithm here
    // relies on that assumption.
    // Each of the phases here has to happen separately, because each one is designed not to
    // interfere with the indices or DOM entries used by subsequent phases.
    // Phase 1: track which nodes we will move
    var siblings = getLogicalChildrenArray(parent);
    permutationList.forEach(function (listEntry) {
        listEntry.moveRangeStart = siblings[listEntry.fromSiblingIndex];
        listEntry.moveRangeEnd = findLastDomNodeInRange(listEntry.moveRangeStart);
    });
    // Phase 2: insert markers
    permutationList.forEach(function (listEntry) {
        var marker = listEntry.moveToBeforeMarker = document.createComment('marker');
        var insertBeforeNode = siblings[listEntry.toSiblingIndex + 1];
        if (insertBeforeNode) {
            insertBeforeNode.parentNode.insertBefore(marker, insertBeforeNode);
        }
        else {
            appendDomNode(marker, parent);
        }
    });
    // Phase 3: move descendants & remove markers
    permutationList.forEach(function (listEntry) {
        var insertBefore = listEntry.moveToBeforeMarker;
        var parentDomNode = insertBefore.parentNode;
        var elementToMove = listEntry.moveRangeStart;
        var moveEndNode = listEntry.moveRangeEnd;
        var nextToMove = elementToMove;
        while (nextToMove) {
            var nextNext = nextToMove.nextSibling;
            parentDomNode.insertBefore(nextToMove, insertBefore);
            if (nextToMove === moveEndNode) {
                break;
            }
            else {
                nextToMove = nextNext;
            }
        }
        parentDomNode.removeChild(insertBefore);
    });
    // Phase 4: update siblings index
    permutationList.forEach(function (listEntry) {
        siblings[listEntry.toSiblingIndex] = listEntry.moveRangeStart;
    });
}
exports.permuteLogicalChildren = permuteLogicalChildren;
function getClosestDomElement(logicalElement) {
    if (logicalElement instanceof Element) {
        return logicalElement;
    }
    else if (logicalElement instanceof Comment) {
        return logicalElement.parentNode;
    }
    else {
        throw new Error('Not a valid logical element');
    }
}
exports.getClosestDomElement = getClosestDomElement;
function getLogicalNextSibling(element) {
    var siblings = getLogicalChildrenArray(getLogicalParent(element));
    var siblingIndex = Array.prototype.indexOf.call(siblings, element);
    return siblings[siblingIndex + 1] || null;
}
function appendDomNode(child, parent) {
    // This function only puts 'child' into the DOM in the right place relative to 'parent'
    // It does not update the logical children array of anything
    if (parent instanceof Element) {
        parent.appendChild(child);
    }
    else if (parent instanceof Comment) {
        var parentLogicalNextSibling = getLogicalNextSibling(parent);
        if (parentLogicalNextSibling) {
            // Since the parent has a logical next-sibling, its appended child goes right before that
            parentLogicalNextSibling.parentNode.insertBefore(child, parentLogicalNextSibling);
        }
        else {
            // Since the parent has no logical next-sibling, keep recursing upwards until we find
            // a logical ancestor that does have a next-sibling or is a physical element.
            appendDomNode(child, getLogicalParent(parent));
        }
    }
    else {
        // Should never happen
        throw new Error("Cannot append node because the parent is not a valid logical element. Parent: " + parent);
    }
}
// Returns the final node (in depth-first evaluation order) that is a descendant of the logical element.
// As such, the entire subtree is between 'element' and 'findLastDomNodeInRange(element)' inclusive.
function findLastDomNodeInRange(element) {
    if (element instanceof Element) {
        return element;
    }
    var nextSibling = getLogicalNextSibling(element);
    if (nextSibling) {
        // Simple case: not the last logical sibling, so take the node before the next sibling
        return nextSibling.previousSibling;
    }
    else {
        // Harder case: there's no logical next-sibling, so recurse upwards until we find
        // a logical ancestor that does have one, or a physical element
        var logicalParent = getLogicalParent(element);
        return logicalParent instanceof Element
            ? logicalParent.lastChild
            : findLastDomNodeInRange(logicalParent);
    }
}
function createSymbolOrFallback(fallback) {
    return typeof Symbol === 'function' ? Symbol() : fallback;
}


/***/ }),

/***/ "./Rendering/RenderBatch/RenderBatch.ts":
/*!**********************************************!*\
  !*** ./Rendering/RenderBatch/RenderBatch.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EditType;
(function (EditType) {
    // The values must be kept in sync with the .NET equivalent in RenderTreeEditType.cs
    EditType[EditType["prependFrame"] = 1] = "prependFrame";
    EditType[EditType["removeFrame"] = 2] = "removeFrame";
    EditType[EditType["setAttribute"] = 3] = "setAttribute";
    EditType[EditType["removeAttribute"] = 4] = "removeAttribute";
    EditType[EditType["updateText"] = 5] = "updateText";
    EditType[EditType["stepIn"] = 6] = "stepIn";
    EditType[EditType["stepOut"] = 7] = "stepOut";
    EditType[EditType["updateMarkup"] = 8] = "updateMarkup";
    EditType[EditType["permutationListEntry"] = 9] = "permutationListEntry";
    EditType[EditType["permutationListEnd"] = 10] = "permutationListEnd";
})(EditType = exports.EditType || (exports.EditType = {}));
var FrameType;
(function (FrameType) {
    // The values must be kept in sync with the .NET equivalent in RenderTreeFrameType.cs
    FrameType[FrameType["element"] = 1] = "element";
    FrameType[FrameType["text"] = 2] = "text";
    FrameType[FrameType["attribute"] = 3] = "attribute";
    FrameType[FrameType["component"] = 4] = "component";
    FrameType[FrameType["region"] = 5] = "region";
    FrameType[FrameType["elementReferenceCapture"] = 6] = "elementReferenceCapture";
    FrameType[FrameType["markup"] = 8] = "markup";
})(FrameType = exports.FrameType || (exports.FrameType = {}));


/***/ }),

/***/ "./Rendering/RenderBatch/SharedMemoryRenderBatch.ts":
/*!**********************************************************!*\
  !*** ./Rendering/RenderBatch/SharedMemoryRenderBatch.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(/*! ../../Environment */ "./Environment.ts");
// Used when running on Mono WebAssembly for shared-memory interop. The code here encapsulates
// our knowledge of the memory layout of RenderBatch and all referenced types.
//
// In this implementation, all the DTO types are really heap pointers at runtime, hence all
// the casts to 'any' whenever we pass them to platform.read.
var SharedMemoryRenderBatch = /** @class */ (function () {
    function SharedMemoryRenderBatch(batchAddress) {
        this.batchAddress = batchAddress;
        this.arrayRangeReader = arrayRangeReader;
        this.arrayBuilderSegmentReader = arrayBuilderSegmentReader;
        this.diffReader = diffReader;
        this.editReader = editReader;
        this.frameReader = frameReader;
    }
    // Keep in sync with memory layout in RenderBatch.cs
    SharedMemoryRenderBatch.prototype.updatedComponents = function () {
        return Environment_1.platform.readStructField(this.batchAddress, 0);
    };
    SharedMemoryRenderBatch.prototype.referenceFrames = function () {
        return Environment_1.platform.readStructField(this.batchAddress, arrayRangeReader.structLength);
    };
    SharedMemoryRenderBatch.prototype.disposedComponentIds = function () {
        return Environment_1.platform.readStructField(this.batchAddress, arrayRangeReader.structLength * 2);
    };
    SharedMemoryRenderBatch.prototype.disposedEventHandlerIds = function () {
        return Environment_1.platform.readStructField(this.batchAddress, arrayRangeReader.structLength * 3);
    };
    SharedMemoryRenderBatch.prototype.updatedComponentsEntry = function (values, index) {
        return arrayValuesEntry(values, index, diffReader.structLength);
    };
    SharedMemoryRenderBatch.prototype.referenceFramesEntry = function (values, index) {
        return arrayValuesEntry(values, index, frameReader.structLength);
    };
    SharedMemoryRenderBatch.prototype.disposedComponentIdsEntry = function (values, index) {
        var pointer = arrayValuesEntry(values, index, /* int length */ 4);
        return Environment_1.platform.readInt32Field(pointer);
    };
    SharedMemoryRenderBatch.prototype.disposedEventHandlerIdsEntry = function (values, index) {
        var pointer = arrayValuesEntry(values, index, /* long length */ 8);
        return Environment_1.platform.readUint64Field(pointer);
    };
    return SharedMemoryRenderBatch;
}());
exports.SharedMemoryRenderBatch = SharedMemoryRenderBatch;
// Keep in sync with memory layout in ArrayRange.cs
var arrayRangeReader = {
    structLength: 8,
    values: function (arrayRange) { return Environment_1.platform.readObjectField(arrayRange, 0); },
    count: function (arrayRange) { return Environment_1.platform.readInt32Field(arrayRange, 4); },
};
// Keep in sync with memory layout in ArrayBuilderSegment
var arrayBuilderSegmentReader = {
    structLength: 12,
    values: function (arrayBuilderSegment) {
        // Evaluate arrayBuilderSegment->_builder->_items, i.e., two dereferences needed
        var builder = Environment_1.platform.readObjectField(arrayBuilderSegment, 0);
        var builderFieldsAddress = Environment_1.platform.getObjectFieldsBaseAddress(builder);
        return Environment_1.platform.readObjectField(builderFieldsAddress, 0);
    },
    offset: function (arrayBuilderSegment) { return Environment_1.platform.readInt32Field(arrayBuilderSegment, 4); },
    count: function (arrayBuilderSegment) { return Environment_1.platform.readInt32Field(arrayBuilderSegment, 8); },
};
// Keep in sync with memory layout in RenderTreeDiff.cs
var diffReader = {
    structLength: 4 + arrayBuilderSegmentReader.structLength,
    componentId: function (diff) { return Environment_1.platform.readInt32Field(diff, 0); },
    edits: function (diff) { return Environment_1.platform.readStructField(diff, 4); },
    editsEntry: function (values, index) { return arrayValuesEntry(values, index, editReader.structLength); },
};
// Keep in sync with memory layout in RenderTreeEdit.cs
var editReader = {
    structLength: 20,
    editType: function (edit) { return Environment_1.platform.readInt32Field(edit, 0); },
    siblingIndex: function (edit) { return Environment_1.platform.readInt32Field(edit, 4); },
    newTreeIndex: function (edit) { return Environment_1.platform.readInt32Field(edit, 8); },
    moveToSiblingIndex: function (edit) { return Environment_1.platform.readInt32Field(edit, 8); },
    removedAttributeName: function (edit) { return Environment_1.platform.readStringField(edit, 16); },
};
// Keep in sync with memory layout in RenderTreeFrame.cs
var frameReader = {
    structLength: 36,
    frameType: function (frame) { return Environment_1.platform.readInt16Field(frame, 4); },
    subtreeLength: function (frame) { return Environment_1.platform.readInt32Field(frame, 8); },
    elementReferenceCaptureId: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    componentId: function (frame) { return Environment_1.platform.readInt32Field(frame, 12); },
    elementName: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    textContent: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    markupContent: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    attributeName: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    attributeValue: function (frame) { return Environment_1.platform.readStringField(frame, 24, true); },
    attributeEventHandlerId: function (frame) { return Environment_1.platform.readUint64Field(frame, 8); },
};
function arrayValuesEntry(arrayValues, index, itemSize) {
    return Environment_1.platform.getArrayEntryPtr(arrayValues, index, itemSize);
}


/***/ }),

/***/ "./Rendering/Renderer.ts":
/*!*******************************!*\
  !*** ./Rendering/Renderer.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/camelcase */
__webpack_require__(/*! ../Platform/Platform */ "./Platform/Platform.ts");
__webpack_require__(/*! ../Environment */ "./Environment.ts");
var BrowserRenderer_1 = __webpack_require__(/*! ./BrowserRenderer */ "./Rendering/BrowserRenderer.ts");
var LogicalElements_1 = __webpack_require__(/*! ./LogicalElements */ "./Rendering/LogicalElements.ts");
var browserRenderers = {};
var shouldResetScrollAfterNextBatch = false;
function attachRootComponentToLogicalElement(browserRendererId, logicalElement, componentId) {
    var browserRenderer = browserRenderers[browserRendererId];
    if (!browserRenderer) {
        browserRenderer = browserRenderers[browserRendererId] = new BrowserRenderer_1.BrowserRenderer(browserRendererId);
    }
    browserRenderer.attachRootComponentToLogicalElement(componentId, logicalElement);
}
exports.attachRootComponentToLogicalElement = attachRootComponentToLogicalElement;
function attachRootComponentToElement(elementSelector, componentId, browserRendererId) {
    var element = document.querySelector(elementSelector);
    if (!element) {
        throw new Error("Could not find any element matching selector '" + elementSelector + "'.");
    }
    // 'allowExistingContents' to keep any prerendered content until we do the first client-side render
    // Only client-side Blazor supplies a browser renderer ID
    attachRootComponentToLogicalElement(browserRendererId || 0, LogicalElements_1.toLogicalElement(element, /* allow existing contents */ true), componentId);
}
exports.attachRootComponentToElement = attachRootComponentToElement;
function getRendererer(browserRendererId) {
    return browserRenderers[browserRendererId];
}
exports.getRendererer = getRendererer;
function renderBatch(browserRendererId, batch) {
    var browserRenderer = browserRenderers[browserRendererId];
    if (!browserRenderer) {
        throw new Error("There is no browser renderer with ID " + browserRendererId + ".");
    }
    var arrayRangeReader = batch.arrayRangeReader;
    var updatedComponentsRange = batch.updatedComponents();
    var updatedComponentsValues = arrayRangeReader.values(updatedComponentsRange);
    var updatedComponentsLength = arrayRangeReader.count(updatedComponentsRange);
    var referenceFrames = batch.referenceFrames();
    var referenceFramesValues = arrayRangeReader.values(referenceFrames);
    var diffReader = batch.diffReader;
    for (var i = 0; i < updatedComponentsLength; i++) {
        var diff = batch.updatedComponentsEntry(updatedComponentsValues, i);
        var componentId = diffReader.componentId(diff);
        var edits = diffReader.edits(diff);
        browserRenderer.updateComponent(batch, componentId, edits, referenceFramesValues);
    }
    var disposedComponentIdsRange = batch.disposedComponentIds();
    var disposedComponentIdsValues = arrayRangeReader.values(disposedComponentIdsRange);
    var disposedComponentIdsLength = arrayRangeReader.count(disposedComponentIdsRange);
    for (var i = 0; i < disposedComponentIdsLength; i++) {
        var componentId = batch.disposedComponentIdsEntry(disposedComponentIdsValues, i);
        browserRenderer.disposeComponent(componentId);
    }
    var disposedEventHandlerIdsRange = batch.disposedEventHandlerIds();
    var disposedEventHandlerIdsValues = arrayRangeReader.values(disposedEventHandlerIdsRange);
    var disposedEventHandlerIdsLength = arrayRangeReader.count(disposedEventHandlerIdsRange);
    for (var i = 0; i < disposedEventHandlerIdsLength; i++) {
        var eventHandlerId = batch.disposedEventHandlerIdsEntry(disposedEventHandlerIdsValues, i);
        browserRenderer.disposeEventHandler(eventHandlerId);
    }
    resetScrollIfNeeded();
}
exports.renderBatch = renderBatch;
function resetScrollAfterNextBatch() {
    shouldResetScrollAfterNextBatch = true;
}
exports.resetScrollAfterNextBatch = resetScrollAfterNextBatch;
function resetScrollIfNeeded() {
    if (shouldResetScrollAfterNextBatch) {
        shouldResetScrollAfterNextBatch = false;
        // This assumes the scroller is on the window itself. There isn't a general way to know
        // if some other element is playing the role of the primary scroll region.
        window.scrollTo && window.scrollTo(0, 0);
    }
}


/***/ }),

/***/ "./Rendering/RendererEventDispatcher.ts":
/*!**********************************************!*\
  !*** ./Rendering/RendererEventDispatcher.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var eventDispatcherInstance;
function dispatchEvent(eventDescriptor, eventArgs) {
    if (!eventDispatcherInstance) {
        throw new Error('eventDispatcher not initialized. Call \'setEventDispatcher\' to configure it.');
    }
    eventDispatcherInstance(eventDescriptor, eventArgs);
}
exports.dispatchEvent = dispatchEvent;
function setEventDispatcher(newDispatcher) {
    eventDispatcherInstance = newDispatcher;
}
exports.setEventDispatcher = setEventDispatcher;


/***/ }),

/***/ "./Services/ComponentDescriptorDiscovery.ts":
/*!**************************************************!*\
  !*** ./Services/ComponentDescriptorDiscovery.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function discoverComponents(document, type) {
    switch (type) {
        case 'webassembly':
            return discoverWebAssemblyComponents(document);
        case 'server':
            return discoverServerComponents(document);
    }
}
exports.discoverComponents = discoverComponents;
function discoverServerComponents(document) {
    var componentComments = resolveComponentComments(document, 'server');
    var discoveredComponents = [];
    for (var i = 0; i < componentComments.length; i++) {
        var componentComment = componentComments[i];
        var entry = new ServerComponentDescriptor(componentComment.type, componentComment.start, componentComment.end, componentComment.sequence, componentComment.descriptor);
        discoveredComponents.push(entry);
    }
    return discoveredComponents.sort(function (a, b) { return a.sequence - b.sequence; });
}
function discoverWebAssemblyComponents(document) {
    var componentComments = resolveComponentComments(document, 'webassembly');
    var discoveredComponents = [];
    for (var i = 0; i < componentComments.length; i++) {
        var componentComment = componentComments[i];
        var entry = new WebAssemblyComponentDescriptor(componentComment.type, componentComment.start, componentComment.end, componentComment.assembly, componentComment.typeName, componentComment.parameterDefinitions, componentComment.parameterValues);
        discoveredComponents.push(entry);
    }
    return discoveredComponents.sort(function (a, b) { return a.id - b.id; });
}
function resolveComponentComments(node, type) {
    if (!node.hasChildNodes()) {
        return [];
    }
    var result = [];
    var childNodeIterator = new ComponentCommentIterator(node.childNodes);
    while (childNodeIterator.next() && childNodeIterator.currentElement) {
        var componentComment = getComponentComment(childNodeIterator, type);
        if (componentComment) {
            result.push(componentComment);
        }
        else {
            var childResults = resolveComponentComments(childNodeIterator.currentElement, type);
            for (var j = 0; j < childResults.length; j++) {
                var childResult = childResults[j];
                result.push(childResult);
            }
        }
    }
    return result;
}
var blazorCommentRegularExpression = /\W*Blazor:[^{]*(?<descriptor>.*)$/;
function getComponentComment(commentNodeIterator, type) {
    var candidateStart = commentNodeIterator.currentElement;
    if (!candidateStart || candidateStart.nodeType !== Node.COMMENT_NODE) {
        return;
    }
    if (candidateStart.textContent) {
        var componentStartComment = new RegExp(blazorCommentRegularExpression);
        var definition = componentStartComment.exec(candidateStart.textContent);
        var json = definition && definition.groups && definition.groups['descriptor'];
        if (json) {
            try {
                var componentComment = parseCommentPayload(json);
                switch (type) {
                    case 'webassembly':
                        return createWebAssemblyComponentComment(componentComment, candidateStart, commentNodeIterator);
                    case 'server':
                        return createServerComponentComment(componentComment, candidateStart, commentNodeIterator);
                }
            }
            catch (error) {
                throw new Error("Found malformed component comment at " + candidateStart.textContent);
            }
        }
        else {
            return;
        }
    }
}
function parseCommentPayload(json) {
    var payload = JSON.parse(json);
    var type = payload.type;
    if (type !== 'server' && type !== 'webassembly') {
        throw new Error("Invalid component type '" + type + "'.");
    }
    return payload;
}
function createServerComponentComment(payload, start, iterator) {
    var type = payload.type, descriptor = payload.descriptor, sequence = payload.sequence, prerenderId = payload.prerenderId;
    if (type !== 'server') {
        return undefined;
    }
    if (!descriptor) {
        throw new Error('descriptor must be defined when using a descriptor.');
    }
    if (sequence === undefined) {
        throw new Error('sequence must be defined when using a descriptor.');
    }
    if (!Number.isInteger(sequence)) {
        throw new Error("Error parsing the sequence '" + sequence + "' for component '" + JSON.stringify(payload) + "'");
    }
    if (!prerenderId) {
        return {
            type: type,
            sequence: sequence,
            descriptor: descriptor,
            start: start,
        };
    }
    else {
        var end = getComponentEndComment(prerenderId, iterator);
        if (!end) {
            throw new Error("Could not find an end component comment for '" + start + "'");
        }
        return {
            type: type,
            sequence: sequence,
            descriptor: descriptor,
            start: start,
            prerenderId: prerenderId,
            end: end,
        };
    }
}
function createWebAssemblyComponentComment(payload, start, iterator) {
    var type = payload.type, assembly = payload.assembly, typeName = payload.typeName, parameterDefinitions = payload.parameterDefinitions, parameterValues = payload.parameterValues, prerenderId = payload.prerenderId;
    if (type !== 'webassembly') {
        return undefined;
    }
    if (!assembly) {
        throw new Error('assembly must be defined when using a descriptor.');
    }
    if (!typeName) {
        throw new Error('typeName must be defined when using a descriptor.');
    }
    if (!prerenderId) {
        return {
            type: type,
            assembly: assembly,
            typeName: typeName,
            // Parameter definitions and values come Base64 encoded from the server, since they contain random data and can make the
            // comment invalid. We could unencode them in .NET Code, but that would be slower to do and we can leverage the fact that
            // JS provides a native function that will be much faster and that we are doing this work while we are fetching
            // blazor.boot.json
            parameterDefinitions: parameterDefinitions && atob(parameterDefinitions),
            parameterValues: parameterValues && atob(parameterValues),
            start: start,
        };
    }
    else {
        var end = getComponentEndComment(prerenderId, iterator);
        if (!end) {
            throw new Error("Could not find an end component comment for '" + start + "'");
        }
        return {
            type: type,
            assembly: assembly,
            typeName: typeName,
            // Same comment as above.
            parameterDefinitions: parameterDefinitions && atob(parameterDefinitions),
            parameterValues: parameterValues && atob(parameterValues),
            start: start,
            prerenderId: prerenderId,
            end: end,
        };
    }
}
function getComponentEndComment(prerenderedId, iterator) {
    while (iterator.next() && iterator.currentElement) {
        var node = iterator.currentElement;
        if (node.nodeType !== Node.COMMENT_NODE) {
            continue;
        }
        if (!node.textContent) {
            continue;
        }
        var definition = new RegExp(blazorCommentRegularExpression).exec(node.textContent);
        var json = definition && definition[1];
        if (!json) {
            continue;
        }
        validateEndComponentPayload(json, prerenderedId);
        return node;
    }
    return undefined;
}
function validateEndComponentPayload(json, prerenderedId) {
    var payload = JSON.parse(json);
    if (Object.keys(payload).length !== 1) {
        throw new Error("Invalid end of component comment: '" + json + "'");
    }
    var prerenderedEndId = payload.prerenderId;
    if (!prerenderedEndId) {
        throw new Error("End of component comment must have a value for the prerendered property: '" + json + "'");
    }
    if (prerenderedEndId !== prerenderedId) {
        throw new Error("End of component comment prerendered property must match the start comment prerender id: '" + prerenderedId + "', '" + prerenderedEndId + "'");
    }
}
var ComponentCommentIterator = /** @class */ (function () {
    function ComponentCommentIterator(childNodes) {
        this.childNodes = childNodes;
        this.currentIndex = -1;
        this.length = childNodes.length;
    }
    ComponentCommentIterator.prototype.next = function () {
        this.currentIndex++;
        if (this.currentIndex < this.length) {
            this.currentElement = this.childNodes[this.currentIndex];
            return true;
        }
        else {
            this.currentElement = undefined;
            return false;
        }
    };
    return ComponentCommentIterator;
}());
var ServerComponentDescriptor = /** @class */ (function () {
    function ServerComponentDescriptor(type, start, end, sequence, descriptor) {
        this.type = type;
        this.start = start;
        this.end = end;
        this.sequence = sequence;
        this.descriptor = descriptor;
    }
    ServerComponentDescriptor.prototype.toRecord = function () {
        var result = { type: this.type, sequence: this.sequence, descriptor: this.descriptor };
        return result;
    };
    return ServerComponentDescriptor;
}());
exports.ServerComponentDescriptor = ServerComponentDescriptor;
var WebAssemblyComponentDescriptor = /** @class */ (function () {
    function WebAssemblyComponentDescriptor(type, start, end, assembly, typeName, parameterDefinitions, parameterValues) {
        this.id = WebAssemblyComponentDescriptor.globalId++;
        this.type = type;
        this.assembly = assembly;
        this.typeName = typeName;
        this.parameterDefinitions = parameterDefinitions;
        this.parameterValues = parameterValues;
        this.start = start;
        this.end = end;
    }
    WebAssemblyComponentDescriptor.globalId = 1;
    return WebAssemblyComponentDescriptor;
}());
exports.WebAssemblyComponentDescriptor = WebAssemblyComponentDescriptor;


/***/ }),

/***/ "./Services/NavigationManager.ts":
/*!***************************************!*\
  !*** ./Services/NavigationManager.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! @microsoft/dotnet-js-interop */ "../../../JSInterop/Microsoft.JSInterop.JS/src/dist/Microsoft.JSInterop.js");
var Renderer_1 = __webpack_require__(/*! ../Rendering/Renderer */ "./Rendering/Renderer.ts");
var hasEnabledNavigationInterception = false;
var hasRegisteredNavigationEventListeners = false;
// Will be initialized once someone registers
var notifyLocationChangedCallback = null;
// These are the functions we're making available for invocation from .NET
exports.internalFunctions = {
    listenForNavigationEvents: listenForNavigationEvents,
    enableNavigationInterception: enableNavigationInterception,
    navigateTo: navigateTo,
    getBaseURI: function () { return document.baseURI; },
    getLocationHref: function () { return location.href; },
};
function listenForNavigationEvents(callback) {
    notifyLocationChangedCallback = callback;
    if (hasRegisteredNavigationEventListeners) {
        return;
    }
    hasRegisteredNavigationEventListeners = true;
    window.addEventListener('popstate', function () { return notifyLocationChanged(false); });
}
function enableNavigationInterception() {
    hasEnabledNavigationInterception = true;
}
function attachToEventDelegator(eventDelegator) {
    // We need to respond to clicks on <a> elements *after* the EventDelegator has finished
    // running its simulated bubbling process so that we can respect any preventDefault requests.
    // So instead of registering our own native event, register using the EventDelegator.
    eventDelegator.notifyAfterClick(function (event) {
        if (!hasEnabledNavigationInterception) {
            return;
        }
        if (event.button !== 0 || eventHasSpecialKey(event)) {
            // Don't stop ctrl/meta-click (etc) from opening links in new tabs/windows
            return;
        }
        if (event.defaultPrevented) {
            return;
        }
        // Intercept clicks on all <a> elements where the href is within the <base href> URI space
        // We must explicitly check if it has an 'href' attribute, because if it doesn't, the result might be null or an empty string depending on the browser
        var anchorTarget = findClosestAncestor(event.target, 'A');
        var hrefAttributeName = 'href';
        if (anchorTarget && anchorTarget.hasAttribute(hrefAttributeName)) {
            var targetAttributeValue = anchorTarget.getAttribute('target');
            var opensInSameFrame = !targetAttributeValue || targetAttributeValue === '_self';
            if (!opensInSameFrame) {
                return;
            }
            var href = anchorTarget.getAttribute(hrefAttributeName);
            var absoluteHref = toAbsoluteUri(href);
            if (isWithinBaseUriSpace(absoluteHref)) {
                event.preventDefault();
                performInternalNavigation(absoluteHref, true);
            }
        }
    });
}
exports.attachToEventDelegator = attachToEventDelegator;
function navigateTo(uri, forceLoad, replace) {
    if (replace === void 0) { replace = false; }
    var absoluteUri = toAbsoluteUri(uri);
    if (!forceLoad && isWithinBaseUriSpace(absoluteUri)) {
        // It's an internal URL, so do client-side navigation
        performInternalNavigation(absoluteUri, false, replace);
    }
    else if (forceLoad && location.href === uri) {
        // Force-loading the same URL you're already on requires special handling to avoid
        // triggering browser-specific behavior issues.
        // For details about what this fixes and why, see https://github.com/dotnet/aspnetcore/pull/10839
        var temporaryUri = uri + '?';
        history.replaceState(null, '', temporaryUri);
        location.replace(uri);
    }
    else if (replace) {
        history.replaceState(null, '', absoluteUri);
    }
    else {
        // It's either an external URL, or forceLoad is requested, so do a full page load
        location.href = uri;
    }
}
exports.navigateTo = navigateTo;
function performInternalNavigation(absoluteInternalHref, interceptedLink, replace) {
    if (replace === void 0) { replace = false; }
    // Since this was *not* triggered by a back/forward gesture (that goes through a different
    // code path starting with a popstate event), we don't want to preserve the current scroll
    // position, so reset it.
    // To avoid ugly flickering effects, we don't want to change the scroll position until the
    // we render the new page. As a best approximation, wait until the next batch.
    Renderer_1.resetScrollAfterNextBatch();
    if (!replace) {
        history.pushState(null, /* ignored title */ '', absoluteInternalHref);
    }
    else {
        history.replaceState(null, /* ignored title */ '', absoluteInternalHref);
    }
    notifyLocationChanged(interceptedLink);
}
function notifyLocationChanged(interceptedLink) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!notifyLocationChangedCallback) return [3 /*break*/, 2];
                    return [4 /*yield*/, notifyLocationChangedCallback(location.href, interceptedLink)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
var testAnchor;
function toAbsoluteUri(relativeUri) {
    testAnchor = testAnchor || document.createElement('a');
    testAnchor.href = relativeUri;
    return testAnchor.href;
}
exports.toAbsoluteUri = toAbsoluteUri;
function findClosestAncestor(element, tagName) {
    return !element
        ? null
        : element.tagName === tagName
            ? element
            : findClosestAncestor(element.parentElement, tagName);
}
function isWithinBaseUriSpace(href) {
    var baseUriWithTrailingSlash = toBaseUriWithTrailingSlash(document.baseURI); // TODO: Might baseURI really be null?
    return href.startsWith(baseUriWithTrailingSlash);
}
function toBaseUriWithTrailingSlash(baseUri) {
    return baseUri.substr(0, baseUri.lastIndexOf('/') + 1);
}
function eventHasSpecialKey(event) {
    return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
}


/***/ }),

/***/ "./Virtualize.ts":
/*!***********************!*\
  !*** ./Virtualize.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Virtualize = {
    init: init,
    dispose: dispose,
};
var observersByDotNetId = {};
function findClosestScrollContainer(element) {
    if (!element) {
        return null;
    }
    var style = getComputedStyle(element);
    if (style.overflowY !== 'visible') {
        return element;
    }
    return findClosestScrollContainer(element.parentElement);
}
function init(dotNetHelper, spacerBefore, spacerAfter, rootMargin) {
    if (rootMargin === void 0) { rootMargin = 50; }
    // Overflow anchoring can cause an ongoing scroll loop, because when we resize the spacers, the browser
    // would update the scroll position to compensate. Then the spacer would remain visible and we'd keep on
    // trying to resize it.
    var scrollContainer = findClosestScrollContainer(spacerBefore);
    (scrollContainer || document.documentElement).style.overflowAnchor = 'none';
    var intersectionObserver = new IntersectionObserver(intersectionCallback, {
        root: scrollContainer,
        rootMargin: rootMargin + "px",
    });
    intersectionObserver.observe(spacerBefore);
    intersectionObserver.observe(spacerAfter);
    var mutationObserverBefore = createSpacerMutationObserver(spacerBefore);
    var mutationObserverAfter = createSpacerMutationObserver(spacerAfter);
    observersByDotNetId[dotNetHelper._id] = {
        intersectionObserver: intersectionObserver,
        mutationObserverBefore: mutationObserverBefore,
        mutationObserverAfter: mutationObserverAfter,
    };
    function createSpacerMutationObserver(spacer) {
        // Without the use of thresholds, IntersectionObserver only detects binary changes in visibility,
        // so if a spacer gets resized but remains visible, no additional callbacks will occur. By unobserving
        // and reobserving spacers when they get resized, the intersection callback will re-run if they remain visible.
        var mutationObserver = new MutationObserver(function () {
            intersectionObserver.unobserve(spacer);
            intersectionObserver.observe(spacer);
        });
        mutationObserver.observe(spacer, { attributes: true });
        return mutationObserver;
    }
    function intersectionCallback(entries) {
        entries.forEach(function (entry) {
            var _a;
            if (!entry.isIntersecting) {
                return;
            }
            var spacerBeforeRect = spacerBefore.getBoundingClientRect();
            var spacerAfterRect = spacerAfter.getBoundingClientRect();
            var spacerSeparation = spacerAfterRect.top - spacerBeforeRect.bottom;
            var containerSize = (_a = entry.rootBounds) === null || _a === void 0 ? void 0 : _a.height;
            if (entry.target === spacerBefore) {
                dotNetHelper.invokeMethodAsync('OnSpacerBeforeVisible', entry.intersectionRect.top - entry.boundingClientRect.top, spacerSeparation, containerSize);
            }
            else if (entry.target === spacerAfter && spacerAfter.offsetHeight > 0) {
                // When we first start up, both the "before" and "after" spacers will be visible, but it's only relevant to raise a
                // single event to load the initial data. To avoid raising two events, skip the one for the "after" spacer if we know
                // it's meaningless to talk about any overlap into it.
                dotNetHelper.invokeMethodAsync('OnSpacerAfterVisible', entry.boundingClientRect.bottom - entry.intersectionRect.bottom, spacerSeparation, containerSize);
            }
        });
    }
}
function dispose(dotNetHelper) {
    var observers = observersByDotNetId[dotNetHelper._id];
    if (observers) {
        observers.intersectionObserver.disconnect();
        observers.mutationObserverBefore.disconnect();
        observers.mutationObserverAfter.disconnect();
        dotNetHelper.dispose();
        delete observersByDotNetId[dotNetHelper._id];
    }
}


/***/ })

/******/ });
//# sourceMappingURL=blazor.webassembly.js.map