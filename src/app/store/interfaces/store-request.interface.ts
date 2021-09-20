export interface IStoreRequest<P = any, R = any, E = any> {
    params?: P;
    callback: (error?: E, data?: R) => void;
}