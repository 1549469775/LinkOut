import axios from "axios"

// axios.defaults.baseURL = "http://www.gemclub666.com/fuxi"
// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config) {
  // 处理请求之前的配置
  if (window.localStorage.getItem("token")) {
    config.headers['Authorization'] = window.localStorage.getItem("token")
  }
  return config;
}, function (error) {
  // 请求失败的处理
  return Promise.reject(error);
});

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (res) {
  // 处理响应数据
  if (res.data.code == -1) {
    // Mint.Toast(res.data.msg)
    router.push({
      path: '/login'
    });
  }
  return res;
}, function (error) {
  1
  // 处理响应失败
  return Promise.reject(error);
});

export default axios;