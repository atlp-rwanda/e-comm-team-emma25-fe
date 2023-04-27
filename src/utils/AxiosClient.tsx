import axios from "axios";
// https://e-comm-team-emma25-bn.onrender.com/docs/#/
export const AxiosClient = axios.create({
  baseURL: process.env.BACKEND_LINK as string,
  // withCredentials: true,
});
