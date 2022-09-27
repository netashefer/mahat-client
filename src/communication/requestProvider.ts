import axios from "axios";

// axios.defaults.baseURL = 'http:\\localhost:3012'; //TODO: make it work after activate cors

class RequestProvider {
    async post<T>(url: string, body: any): Promise<T> {
        try {
            return await axios.post("http://localhost:3012/" + url, body);
        } catch (e) {
            throw e;
        }
    }
}

export default new RequestProvider();