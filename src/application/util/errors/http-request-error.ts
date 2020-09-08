class HttpRequestError extends Error {
    public status:number;
    constructor(message: string,status: number) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, HttpRequestError.prototype);
    }
}

export default HttpRequestError;