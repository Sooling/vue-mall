//引入axios
import axios from 'axios'

//导出request函数
//参数config是一个对象
export const request = function(config) {
    //创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/n3',
        timeout: 5000
    });

    // 拦截器
    //请求拦截使用场景举例
    //1.比如config中的一些信息不符合服务器的要求
    //2.比如每次发送网路请求时，都希望在界面中显示一个请求图标
    //3.某些网络请求（比如登陆（token）），必须携带一些特殊信息
    // instance.interceptors.request.use(config => {
    //     // console.log(config);
    //     // 注意：拦截之后一定要将配置信息config返回出去
    //     //否则真正发送请求时拿不到配置信息
    //     return config;
    // }, err => {
    //     console.log(err)
    // })

    // 响应拦截
    instance.interceptors.response.use(res => {
        //拦截了响应信息必须返回出去
        //这样才能真正接收到响应信息
        //当然可以对响应信息做过滤处理 res.data
        return res.data;
    }, err => {
        return err;
    })

    //返回axios实例
    return instance(config);
};
