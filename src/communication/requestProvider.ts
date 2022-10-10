import axios, { AxiosRequestHeaders } from "axios";

class RequestProvider {	  
    async post<T>(url: string, body: any, headers?: AxiosRequestHeaders): Promise<T> {
        try {
            return await (await axios.post(url, body, {headers})).data;
        } catch (e) {
            throw e;
        }
    }

    async get<T>(url: string, headers?: AxiosRequestHeaders): Promise<T> {
        try {
        	return await (await axios.get(url, {headers})).data;
        } catch (e) {
            throw e;
        }
    }

    async delete(url: string, headers?: AxiosRequestHeaders) {
        try {
            await axios.delete(url, {headers});
        } catch (e) {
            throw e;
        }
    }

    async put<T>(url: string, body: any, headers?: AxiosRequestHeaders): Promise<T> {
        try {
            return await (await axios.put(url, body, {headers})).data;
        } catch (e) {
            throw e;
        }
    }
}

export default new RequestProvider();