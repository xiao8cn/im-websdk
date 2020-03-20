(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["IM"] = factory();
	else
		root["IM"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = msgToUint;
/* harmony export (immutable) */ __webpack_exports__["c"] = uintToMsg;
/* harmony export (immutable) */ __webpack_exports__["a"] = generateEvent;
/**
 *
 * @param {object} json
 * @returns {ArrayLike<number> | ArrayBuffer}
 */
function msgToUint(json) {
    try {
        const data = btoa(encodeURIComponent(JSON.stringify(json)));
        const charList = data.split('');
        const uintArray = [];
        for (const item of charList) {
            uintArray.push(item.charCodeAt(0));
        }
        return new Uint8Array(uintArray);
    }
    catch (err) {
        console.log(`msgToUint err${err}`);
        return new Uint8Array([]);
    }
}
/**
 *
 * @param {ArrayLike<number> | ArrayBuffer} uintArray
 * @returns {any}
 */
function uintToMsg(uintArray) {
    try {
        const encodedString = String.fromCharCode.apply(null, new Uint8Array(uintArray));
        const decodedString = decodeURIComponent(atob(encodedString));
        return JSON.parse(decodedString);
    }
    catch (err) {
        console.log(`uintToMsg err${err}`);
        return {};
    }
}
/**
 *
 * @param {string} eventName
 * @param args
 * @returns {CustomEvent}
 */
function generateEvent(eventName, args) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, false, false, args);
    return event;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reconnect_websocket__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);


class IM {
    /**
     *
     * @param {InitParams} config
     */
    constructor(config) {
        this.callbacks = {};
        this.timeout = 20;
        this.canRequest = false;
        this.reqNo = `${Math.random().toString(16).substring(2)}_${Date.now()}`;
        this.SEND_MESSAGE_CMD = 'send_message';
        this.SEND_GROUP_MESSAGE_CMD = 'send_message_multi';
        this.GET_OFFLINE_MESSAGE_CMD = 'send_message_offline';
        this.RECEIPT_MESSAGE_CMD = 'send_message_receipt';
        this.initTimeoutTicker();
        if (config.onMessage) {
            this.onMessage = config.onMessage;
        }
        if (config.onConnected) {
            this.onConnected = config.onConnected;
        }
        if (config.onClosed) {
            this.onClosed = config.onClosed;
        }
        if (config.onError) {
            this.onError = config.onError;
        }
    }
    /**
     *
     * @param {string} url
     * @param {(error: null, response: object) => void} cb
     */
    connectWSServer(url, cb) {
        this.ws = new __WEBPACK_IMPORTED_MODULE_0__reconnect_websocket__["a" /* default */](url, null, {
            binaryType: 'arraybuffer',
            debug: false,
            reconnectInterval: 4000,
            timeoutInterval: 5000
        });
        this.ws.onOpen = (data) => {
            this.canRequest = true;
            if (cb) {
                cb(null, data);
            }
            this.onConnected(data);
        };
        this.ws.onClose = (data) => {
            this.canRequest = false;
            this.onClosed(data);
        };
        this.ws.onMessage = (data) => {
            const newData = Object(__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* uintToMsg */])(data.data);
            if (this.callbacks[newData.cmd] && this.callbacks[newData.cmd][newData.resNo]) {
                this.callbacks[newData.cmd][newData.resNo](null, newData);
                delete this.callbacks[newData.cmd][newData.resNo];
            }
            else {
                this.onMessage(newData);
            }
        };
        this.ws.onError = (data) => {
            this.onError(data);
        };
        window.onbeforeunload = () => {
            this.ws.close();
        };
        window.onunload = () => {
            this.ws.close();
        };
    }
    /**
     *
     * @param {string} cmd
     * @param {object} data
     * @param cb
     * @returns {boolean}
     */
    request(cmd, data, cb) {
        if (!this.canRequest) {
            return;
        }
        if (typeof cb === 'function') {
            cb.deadline = Date.now() + 1000 * 10;
            if (!this.callbacks[cmd]) {
                this.callbacks[cmd] = {};
            }
            this.callbacks[cmd][this.reqNo] = cb;
        }
        this.send(cmd, this.reqNo, data);
    }
    send(cmd, reqNo, params) {
        const msg = {
            cmd, reqNo, params
        };
        this.ws.send(Object(__WEBPACK_IMPORTED_MODULE_1__helper__["b" /* msgToUint */])(msg));
    }
    /**
     *
     * @param {object} params
     * @param {() => void} cb
     */
    sendMessage(params, cb) {
        this.request(this.SEND_MESSAGE_CMD, params, cb);
    }
    /**
     *
     * @param {object} params
     * @param {() => void} cb
     */
    sendGroupMessage(params, cb) {
        this.request(this.SEND_GROUP_MESSAGE_CMD, params, cb);
    }
    /**
     *
     * @param {object} params
     * @param {() => void} cb
     */
    getOfflineMessage(params, cb) {
        this.request(this.GET_OFFLINE_MESSAGE_CMD, params, cb);
    }
    /**
     *
     * @param {object} params
     * @param {() => void} cb
     */
    receipt(params, cb) {
        this.request(this.RECEIPT_MESSAGE_CMD, params, cb);
    }
    closeConnection() {
        this.ws.close();
    }
    close() {
        this.ws.close();
    }
    initTimeoutTicker() {
        setInterval(() => {
            const now = Date.now();
            for (const cmd of Object.keys(this.callbacks)) {
                const cbs = this.callbacks[cmd];
                for (const reqNo of Object.keys(cbs)) {
                    const cb = cbs[reqNo];
                    if (now > cb.deadline) {
                        cb(null, { data: { code: '0', msg: '请求超时', status: false } });
                        delete this.callbacks[cmd][reqNo];
                    }
                }
            }
        }, 1000 * this.timeout);
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = IM;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);

const defaultReconnectSettings = {
    debug: false,
    automaticOpen: true,
    reconnectInterval: 1000,
    maxReconnectInterval: 30000,
    reconnectDecay: 1.5,
    timeoutInterval: 2000,
    maxReconnectAttempts: null,
    binaryType: 'blob'
};
class ReconnectWebSocket {
    /**
     *
     * @param {string} url
     * @param protocols
     * @param {ReconnectSettings} options
     */
    constructor(url, protocols, options) {
        this.reconnectAttempts = 0;
        this.url = url;
        this.initSettings(options);
        this.readyState = WebSocket.CONNECTING;
        this.protocol = '';
        this.protocols = protocols;
        this.eventTarget = document.createElement('div');
        this.addSocketListener();
        this.addEventListener = this.eventTarget.addEventListener.bind(this.eventTarget);
        this.removeEventListener = this.eventTarget.removeEventListener.bind(this.eventTarget);
        this.dispatchEvent = this.eventTarget.dispatchEvent.bind(this.eventTarget);
        if (defaultReconnectSettings.automaticOpen === true) {
            this.open(false);
        }
        this.debugAll = false;
        this.CONNECTING = WebSocket.CONNECTING;
        this.OPEN = WebSocket.OPEN;
        this.CLOSING = WebSocket.CLOSING;
        this.CLOSED = WebSocket.CLOSED;
    }
    /**
     *
     * @param {ReconnectSettings} options
     */
    initSettings(options) {
        for (const key of Object.keys(options)) {
            if (typeof options[key] !== 'undefined') {
                this[key] = options[key];
            }
            else {
                this[key] = defaultReconnectSettings[key];
            }
        }
    }
    /**
     *
     * @param {boolean} reconnectAttempt
     */
    open(reconnectAttempt) {
        if (!('WebSocket' in window)) {
            throw new Error('WebSocket not supported by current browser!');
        }
        this.ws = new WebSocket(this.url, this.protocols || []);
        this.ws.binaryType = this.binaryType;
        if (reconnectAttempt) {
            if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts) {
                return;
            }
        }
        else {
            this.eventTarget.dispatchEvent(Object(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* generateEvent */])('connecting'));
            this.reconnectAttempts = 0;
        }
        if (this.debug || this.debugAll) {
            console.debug('ReconnectingWebSocket', 'attempt-connect', this.url);
        }
        const localWs = this.ws;
        const timeout = setTimeout(() => {
            if (this.debug || this.debugAll) {
                console.debug('ReconnectingWebSocket', 'connection-timeout', this.url);
            }
            this.timedOut = true;
            localWs.close();
            this.timedOut = false;
        }, defaultReconnectSettings.timeoutInterval);
        this.ws.onopen = () => {
            clearTimeout(timeout);
            if (this.debug || this.debugAll) {
                console.debug('ReconnectingWebSocket', 'onopen', this.url);
            }
            this.protocol = this.ws.protocol;
            this.readyState = WebSocket.OPEN;
            this.reconnectAttempts = 0;
            const e = Object(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* generateEvent */])('open');
            Object.assign(e, { isReconnect: reconnectAttempt });
            reconnectAttempt = false;
            this.eventTarget.dispatchEvent(e);
        };
        this.ws.onclose = (event) => {
            clearTimeout(timeout);
            this.ws = null;
            if (this.forcedClose) {
                this.readyState = WebSocket.CLOSED;
                this.eventTarget.dispatchEvent(Object(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* generateEvent */])('close'));
            }
            else {
                this.readyState = WebSocket.CONNECTING;
                const e = Object(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* generateEvent */])('connecting');
                Object.assign(e, {
                    code: event.code,
                    reason: event.reason,
                    wasClean: event.wasClean
                });
                this.eventTarget.dispatchEvent(e);
                if (!reconnectAttempt && !this.timedOut) {
                    if (this.debug || this.debugAll) {
                        console.debug('ReconnectingWebSocket', 'onclose', this.url);
                    }
                    this.eventTarget.dispatchEvent(Object(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* generateEvent */])('close'));
                }
                const timeouts = defaultReconnectSettings.reconnectInterval * Math.pow(defaultReconnectSettings.reconnectDecay, this.reconnectAttempts);
                setTimeout(() => {
                    this.reconnectAttempts++;
                    this.open(true);
                }, timeouts > defaultReconnectSettings.maxReconnectInterval ? defaultReconnectSettings.maxReconnectInterval : timeouts);
            }
        };
        this.ws.onmessage = (event) => {
            if (this.debug || this.debugAll) {
                console.debug('ReconnectingWebSocket', 'onmessage', this.url, event.data);
            }
            const e = Object(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* generateEvent */])('message');
            Object.assign(e, { data: event.data });
            this.eventTarget.dispatchEvent(e);
        };
        this.ws.onerror = (event) => {
            if (this.debug || this.debugAll) {
                console.debug('ReconnectingWebSocket', 'onerror', this.url, event);
            }
            this.eventTarget.dispatchEvent(Object(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* generateEvent */])('error'));
        };
    }
    addSocketListener() {
        this.eventTarget.addEventListener('open', (event) => {
            this.onOpen(event);
        });
        this.eventTarget.addEventListener('close', (event) => {
            this.onClose(event);
        });
        this.eventTarget.addEventListener('connecting', (event) => {
            this.onConnecting(event);
        });
        this.eventTarget.addEventListener('message', (event) => {
            this.onMessage(event);
        });
        this.eventTarget.addEventListener('error', (event) => {
            this.onError(event);
        });
    }
    /**
     *
     * @param {ArrayLike<number> | ArrayBuffer} data
     */
    send(data) {
        if (this.ws) {
            if (this.debug || this.debugAll) {
                console.debug('ReconnectingWebSocket', 'send', this.url, data);
            }
            return this.ws.send(data);
        }
        else {
            throw new Error('INVALID_STATE_ERR : Pausing to reconnect websocket');
        }
    }
    /**
     *
     * @param code
     * @param {string} reason
     */
    close(code, reason) {
        if (typeof code === 'undefined') {
            code = 1000;
        }
        this.forcedClose = true;
        if (this.ws) {
            this.ws.close(code, reason);
        }
    }
    refresh() {
        if (this.ws) {
            this.ws.close();
        }
    }
    onOpen(event) { }
    onClose(event) { }
    onConnecting(event) { }
    onMessage(event) { }
    onError(event) { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ReconnectWebSocket;



/***/ })
/******/ ]);
});