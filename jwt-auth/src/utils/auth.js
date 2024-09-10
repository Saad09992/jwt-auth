// utils/auth.js
export function isTokenValid() {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("token-expiry");

  if (token && expiry && new Date().getTime() < expiry) {
    return true;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("token-expiry");
  }
}
