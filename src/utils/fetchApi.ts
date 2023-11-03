import axios from "axios";
import { config } from "../config";
import { interceptor } from "./interceptor";

class FetchApi {
  private api;

  constructor() {
    this.api = axios.create({
      baseURL: config.BASE_API,
      headers: {
        "app-id": config.token,
      }
    });
    this.api.interceptors.response.use(interceptor)
  }

  async get(url: string, config?: any) {
    return await this.api.get(url, config)
  }

  async delete(url: string, config?: any) {
    return await this.api.delete(url, config);
  }

  async post(url: string, body: any) {
    return await this.api.post(url, body);
  }

  async put(url: string, body: any) {
    return await this.api.put(url, body);
  }
}

export const fetchApi = new FetchApi();