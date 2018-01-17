(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lib/core/decorators/register-property'), require('@angular/core'), require('lib/core/adapters/adapter.model'), require('lib/core/endpoint.model'), require('lib/core/rest-manager.service'), require('lib/core/model/object.model'), require('lib/core/model/list.model')) :
	typeof define === 'function' && define.amd ? define(['exports', 'lib/core/decorators/register-property', '@angular/core', 'lib/core/adapters/adapter.model', 'lib/core/endpoint.model', 'lib/core/rest-manager.service', 'lib/core/model/object.model', 'lib/core/model/list.model'], factory) :
	(factory((global['ng-data-rest'] = {}),global.registerProperty,global.core,global.Adapter,global.endpoint_model,global.restManager_service,global.object_model,global.list_model));
}(this, (function (exports,registerProperty,core,Adapter,endpoint_model,restManager_service,object_model,list_model) { 'use strict';

registerProperty = registerProperty && registerProperty.hasOwnProperty('default') ? registerProperty['default'] : registerProperty;
Adapter = Adapter && Adapter.hasOwnProperty('default') ? Adapter['default'] : Adapter;
object_model = object_model && object_model.hasOwnProperty('default') ? object_model['default'] : object_model;
list_model = list_model && list_model.hasOwnProperty('default') ? list_model['default'] : list_model;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

var Buffer = (function () {
    function Buffer() {
        this.list = [];
    }
    Object.defineProperty(Buffer.prototype, "delegate", {
        set: /**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            this._delegate = d;
            while (this.list.length) {
                d.newValue(this.list.shift());
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} v
     * @return {?}
     */
    Buffer.prototype.add = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        if (this._delegate) {
            this._delegate.newValue(v);
        }
        else {
            this.list.push(v);
        }
    };
    /**
     * @return {?}
     */
    Buffer.prototype.size = /**
     * @return {?}
     */
    function () {
        return this.list.length;
    };
    return Buffer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FactoryBase = (function () {
    function FactoryBase(core$$1, objectInfo) {
        this.core = core$$1;
        this.objectInfo = objectInfo;
    }
    Object.defineProperty(FactoryBase.prototype, "endpoint", {
        get: /**
         * @return {?}
         */
        function () {
            return this.objectInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FactoryBase.prototype, "service", {
        get: /**
         * @return {?}
         */
        function () {
            return this.core;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FactoryBase.prototype, "adapter", {
        get: /**
         * @return {?}
         */
        function () {
            return this.core.adapter;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FactoryBase.prototype.getInstance = /**
     * @return {?}
     */
    function () {
        return new this.objectInfo.creator(this);
    };
    return FactoryBase;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var registerHash = {};
var RestManagerService$1 = (function () {
    function RestManagerService$$1(_adapter) {
        this._adapter = _adapter;
        this.registered = {};
        registerHash[DEFAULT_QUEUE].delegate = this;
    }
    Object.defineProperty(RestManagerService$$1.prototype, "adapter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._adapter;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} endpoint
     * @return {?}
     */
    RestManagerService$$1.prototype.newValue = /**
     * @param {?} endpoint
     * @return {?}
     */
    function (endpoint) {
        this.registered[endpoint.name] = new FactoryBase(this, endpoint);
    };
    /**
     * @template T
     * @param {?} TCreator
     * @return {?}
     */
    RestManagerService$$1.prototype.retrieve = /**
     * @template T
     * @param {?} TCreator
     * @return {?}
     */
    function (TCreator) {
        var /** @type {?} */ factory = this.registered[TCreator.name];
        if (factory == undefined) {
            throw new Error("Model " + TCreator.name + " is not registered");
        }
        return factory;
    };
    RestManagerService$$1.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    RestManagerService$$1.ctorParameters = function () { return [
        { type: Adapter, },
    ]; };
    return RestManagerService$$1;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DEFAULT_QUEUE = 'default';
/**
 * @param {?} data
 * @return {?}
 */
function RegisterRest(data) {
    if (!data.queue) {
        data.queue = DEFAULT_QUEUE;
    }
    var /** @type {?} */ buffer = registerHash[data.queue];
    if (!buffer) {
        buffer = registerHash[data.queue] = new Buffer();
    }
    return function (TCreator) {
        var /** @type {?} */ endpoint = new endpoint_model.EndpointModel(TCreator);
        endpoint.namespace = data.namespace;
        endpoint.endpoint = data.endpoint;
        buffer.add(endpoint);
        return TCreator;
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RestService = (function () {
    function RestService(service) {
        this.service = service;
    }
    /**
     * @template T
     * @param {?} TCreator
     * @return {?}
     */
    RestService.prototype.getObject = /**
     * @template T
     * @param {?} TCreator
     * @return {?}
     */
    function (TCreator) {
        return this.service.retrieve(TCreator).getInstance();
    };
    /**
     * @template T
     * @param {?} TCreator
     * @param {?=} options
     * @return {?}
     */
    RestService.prototype.query = /**
     * @template T
     * @param {?} TCreator
     * @param {?=} options
     * @return {?}
     */
    function (TCreator, options) {
        if (options === void 0) { options = {}; }
        var /** @type {?} */ factory = this.service.retrieve(TCreator);
        return /** @type {?} */ (this.service.adapter.retrieveListElements(factory, options));
    };
    /**
     * @template T
     * @param {?} TCreator
     * @param {?} pk
     * @return {?}
     */
    RestService.prototype.queryRecord = /**
     * @template T
     * @param {?} TCreator
     * @param {?} pk
     * @return {?}
     */
    function (TCreator, pk) {
        var /** @type {?} */ factory = this.service.retrieve(TCreator);
        return /** @type {?} */ (this.service.adapter.retrieveElement(factory, pk));
    };
    RestService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    RestService.ctorParameters = function () { return [
        { type: restManager_service.RestManagerService, },
    ]; };
    return RestService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/*
import { SampleComponent } from './sample.component';
import { SampleDirective } from './sample.directive';
import { SamplePipe } from './sample.pipe';
import { SampleService } from './sample.service';

export * from './sample.component';
export * from './sample.directive';
export * from './sample.pipe';
export * from './sample.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SampleComponent,
    SampleDirective,
    SamplePipe
  ],
  exports: [
    SampleComponent,
    SampleDirective,
    SamplePipe
  ]
})
export class SampleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SampleModule,
      providers: [SampleService]
    };
  }
}
*/

exports.JsonProperty = registerProperty;
exports.RegisterRest = RegisterRest;
exports.RestService = RestService;
exports.ObjectModel = object_model;
exports.ListModel = list_model;

Object.defineProperty(exports, '__esModule', { value: true });

})));
