const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchJobs() {
  const res = await fetch(`${API_BASE_URL}/jobs`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = await res.json();
  return data.jobs;
}

export async function fetchCompanies() {
  const res = await fetch(`${API_BASE_URL}/companies`);
  if (!res.ok) throw new Error("Failed to fetch companies");
  const data = await res.json();
  return data.companies;
}
