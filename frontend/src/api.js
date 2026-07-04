const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function getToken() {
  return localStorage.getItem("admin_token");
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Xatolik yuz berdi");
  return data;
}

export const api = {
  baseUrl: BASE_URL,

  getPosts: (category) =>
    request(`/api/posts${category && category !== "Barchasi" ? `?category=${encodeURIComponent(category)}` : ""}`),

  getStats: () => request("/api/stats"),

  login: (username, password) =>
    request("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }),

  createPost: (formData) =>
    request("/api/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData, // FormData - Content-Type avtomatik qo'yiladi
    }),

  deletePost: (id) =>
    request(`/api/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    }),

  createLead: (name, phone) =>
    request("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    }),

  getLeads: () =>
    request("/api/leads", {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),

  deleteLead: (id) =>
    request(`/api/leads/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    }),

  updateStats: (stats) =>
    request("/api/stats", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(stats),
    }),
};
