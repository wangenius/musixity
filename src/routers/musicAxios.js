//在index.js中引入axios
import axios from "axios";
//创建一个实例
const instance = axios.create({
    baseURL: 'http://39.96.54.181:3000',
    //请求延时为3000毫秒
    timeout: 6000,
    withCredentials:true,
})

//拦截器 请求拦截
instance.interceptors.request.use(config =>{
    //配置项  携带的数据(部分接口需要拿到token)
    let token = localStorage.getItem('token');
    //如果有token 就把token的值给配置文件的headers中
    if(token){
        // config.headers.token = token;
        //如果token有其他的名字 如：a-token
        config.headers = {
            "a-token": token
        }
    }
    return config;
}, err =>{
    return Promise.reject(err);
});

//拦截器 响应拦截
instance.interceptors.response.use(res =>{
    return res;
}, err =>{
    return Promise.reject(err);
});

//整体导出
export default instance;