import axios from "axios";

class RequestProvider {
    async post<T>(url: string, body: any): Promise<T> {
        try {
            return await (await axios.post(url, body)).data;
        } catch (e) {
            throw e;
        }
    }

    async get<T>(url: string): Promise<T> {
        try {
            return await (await axios.get(url)).data;
        } catch (e) {
            throw e;
        }
    }

    async delete(url: string) {
        try {
            await axios.delete(url);
        } catch (e) {
            throw e;
        }
    }
}

export default new RequestProvider();