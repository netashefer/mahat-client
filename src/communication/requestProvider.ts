import axios from "axios";

class RequestProvider {
    async post<T>(url: string, body: any): Promise<T> {
        try {
            return await (await axios.post(url, body)).data;
        } catch (e) {
            throw e;
        }
    }
}

export default new RequestProvider();