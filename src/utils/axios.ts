import axios from 'axios';

const apiUrl : string | undefined  = process.env.GUARDIAN_API_URL;
const apiKey : string | undefined = process.env.API_KEY;

if (!apiKey) throw new Error('API key for Guardian API was not found');
if (!apiUrl) throw new Error('API Url for Guardian API was not found');

const secure = process.env.NODE_ENV === "production";
const protocol = secure ? "https://" : "http://";

const axiosInstance = axios.create({
  baseURL: `${protocol}${apiUrl}`,
  params: {
      "api-key": apiKey
  }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
