import axios from "axios";
export const baseURL = "http://localhost:3001";

// axios实例
const axiosIns = axios.create({
  baseURL
});

// 响应拦截器
axiosIns.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, "网络错误");
  }
);

export default axiosIns;
