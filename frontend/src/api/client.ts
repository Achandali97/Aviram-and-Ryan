const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3002";

export async function getHello(): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/hello`);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<{ message: string }>;
}

export { API_BASE_URL };
