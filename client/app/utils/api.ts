import { json } from "@remix-run/node";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

export async function getAPIData() {
  const response = await fetch(`${API_BASE_URL}/api/data`);
  if (!response.ok) {
    throw new Error("Failed to fetch data from API");
  }
  const data = await response.json();
  return json(data);
}
