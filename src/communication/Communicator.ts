class Communicator {
    private baseURL;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    protected getFullURL(url: string) {
        return `${this.baseURL}/${url}`;
    }
}

export default Communicator;