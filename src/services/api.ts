const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data as T;
}

export const api = {
  get: async <T>(path: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return handleResponse<T>(response);
  },

  post: async <T>(path: string, body: unknown): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },
};
