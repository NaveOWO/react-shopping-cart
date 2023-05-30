import { Options } from "../type/api";

export default class HTTPClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getCombinedOptions(options: Options) {
    const fetchOptions = {
      headers: options.headers ?? {
        "Content-Type": "application/json",
      },
      ...options,
    };

    return fetchOptions;
  }

  private async request<T>(url: string, options: Options): Promise<T> {
    const response = await fetch(
      `${this.baseUrl}/${url}`,
      this.getCombinedOptions(options)
    );

    if (!response.ok) {
      throw Error(response.status.toString());
    }

    const data = await response.json();
    return data;
  }

  get<T>(url: string, options: Options = {}) {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  post<T>(url: string, options: Options = {}) {
    return this.request<T>(url, {
      ...options,
      method: "POST",
    });
  }

  patch<T>(url: string, options: Options = {}) {
    return this.request<T>(url, {
      ...options,
      method: "PATCH",
    });
  }

  delete<T>(url: string, options: Options = {}) {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }
}

export const client = new HTTPClient("");
