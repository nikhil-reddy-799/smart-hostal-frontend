const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (!envUrl) return 'http://localhost:8080/api';
  
  // Ensure it includes /api and remove any trailing slash
  let finalUrl = envUrl.trim().replace(/\/$/, "");
  if (!finalUrl.endsWith("/api")) {
    finalUrl += "/api";
  }
  return finalUrl;
};

const config = {
  API_BASE_URL: getBaseUrl()
}

export default config