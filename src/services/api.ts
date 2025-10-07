// src/services/api.ts

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3000/api/v1"
    : "http://localhost:3000/api/v1";

export class ApiService {
  private static baseURL = API_BASE_URL;

  private static log(method: string, url: string, payload?: unknown, response?: any, status?: number) {
    const color = status
      ? status >= 200 && status < 300
        ? "color: #28a745; font-weight: bold;" // green for success
        : "color: #dc3545; font-weight: bold;" // red for error
      : "color: #0b82f0; font-weight: bold;"; // blue for request

    const label = response
      ? `[API Response] ${method.toUpperCase()} ${url} (status: ${status})`
      : `[API Request] ${method.toUpperCase()} ${url}`;

    console.groupCollapsed(`%c${label}`, color);
    if (payload) console.log("Payload:", payload);
    if (response) console.log("Response:", response);
    console.groupEnd();
  }

  static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem("auth_token");

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    // log request
    this.log(config.method || "GET", url, config.body);

    try {
      const response = await fetch(url, config);
      const responseData = await response.json().catch(() => ({}));

      // log response
      this.log(config.method || "GET", url, config.body, responseData, response.status);

      if (!response.ok) {
        throw new Error(
          responseData.message || `HTTP error! status: ${response.status}`
        );
      }

      return responseData;
    } catch (error) {
      console.error("[API Error]", error);
      throw error;
    }
  }

  static get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", ...options });
  }

  static post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  static put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  static patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  static delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE", ...options });
  }
}
