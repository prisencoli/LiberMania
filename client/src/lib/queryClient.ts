import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

type RequestMethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type ApiRequestOptions = {
  method?: RequestMethodType;
  body?: any;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

export const apiRequest = async <TData>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<TData> => {
  const {
    method = "GET",
    body,
    headers = {},
    signal,
  } = options;

  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
    signal,
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, requestOptions);

  // Handle API-level errors
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "An unexpected error occurred",
    }));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  // For 204 No Content, return empty object instead of trying to parse empty body
  if (response.status === 204) {
    return {} as TData;
  }

  return response.json();
};