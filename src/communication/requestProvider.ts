import axios from "axios";

class RequestProvider {
    async post<T>(url: string, body: any): Promise<T> {
        try {
            return await axios.post(url, body);
        } catch (e) {
            throw e;
        }
    }
}

export default new RequestProvider();