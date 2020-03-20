export interface ReconnectSettings {
    debug: boolean;
    reconnectInterval: number;
    timeoutInterval: number;
    binaryType: string;
    automaticOpen?: boolean;
    maxReconnectInterval?: number;
    reconnectDecay?: number;
    maxReconnectAttempts?: null;
}
export default class ReconnectWebSocket {
    binaryType: string;
    protocols: any;
    protocol: string;
    ws: WebSocket;
    addEventListener: any;
    removeEventListener: any;
    dispatchEvent: any;
    private readonly url;
    private readonly eventTarget;
    private readonly CONNECTING;
    private readonly OPEN;
    private readonly CLOSING;
    private readonly CLOSED;
    private reconnectAttempts;
    private readyState;
    private timedOut;
    private forcedClose;
    private maxReconnectAttempts;
    private debug;
    private debugAll;
    /**
     *
     * @param {string} url
     * @param protocols
     * @param {ReconnectSettings} options
     */
    constructor(url: string, protocols: any, options: ReconnectSettings);
    /**
     *
     * @param {ReconnectSettings} options
     */
    initSettings(options: ReconnectSettings): void;
    /**
     *
     * @param {boolean} reconnectAttempt
     */
    open(reconnectAttempt: boolean): void;
    addSocketListener(): void;
    /**
     *
     * @param {ArrayLike<number> | ArrayBuffer} data
     */
    send(data: ArrayLike<number> | ArrayBuffer): void;
    /**
     *
     * @param code
     * @param {string} reason
     */
    close(code: any, reason: string): void;
    refresh(): void;
    onOpen(event: Event): void;
    onClose(event: Event): void;
    onConnecting(event: Event): void;
    onMessage(event: Event): void;
    onError(event: Event): void;
}
