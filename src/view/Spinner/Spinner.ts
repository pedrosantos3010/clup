export interface Spinner {
    start(): Promise<void>;
    stop(): Promise<void>;
}
