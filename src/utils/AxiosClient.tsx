import axios from "axios";

export const AxiosClient = axios.create({
  baseURL: "https://e-comm-team-emma25-bn.onrender.com",
  withCredentials: true,
});
