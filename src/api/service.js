import axios from 'axios'
import { Message, MessageBox,Loading } from 'element-ui'
import store from '@/store'

import Qs from 'qs'

//本次请求状态码非200 是否提示
let errorMessage = true;
// 创建axios实例
const service = axios.create({
  // baseUrl: 'api/' , //请求域名
  timeout: 60000 //请求超时时间
})

// var loadinginstace;
// request拦截器
service.interceptors.request.use(
  config => {
    // loadinginstace = Loading.service({ fullscreen: true })
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    //   console.log(store.state.user.info.sessionKey,"store.state.user.info")
    config.responseType= 'text'// default
    // //设置token
    try{
      if (store.state.user.info.sessionKey) {
        config.data.sessionKey = store.state.user.info.sessionKey
      }
    }catch(err){}
    //设置当前请求是否是错误提示
    try{
      errorMessage = config.setting.errorMessage;
    }catch(err){
      errorMessage = true;
    }
    //设置请求参数
    // config.data = Qs.stringify(config.data);
    return config
  },
  error => {
    // loadinginstace.close();
    // Do something with api error
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    // loadinginstace.close()
    /*code为非200是抛错 可结合自己业务进行修改 */
    const res = response.data
    if (res.code !== 200) {
      if(res.code==2533){
        console.log("拦截器里面")
        document.querySelector('.tncode').click()
      }
      // //登陆信息过期
      if(res.code ==1001){
        MessageBox.confirm(res.msg,'提示',{
          confirmButtonText: '重新登录',
          showClose:false,
          showCancelButton:false,
          closeOnClickModal:false,
          type: 'warning',
        }).then(() => {
          console.log(store,'是否登录过期')
          store.dispatch('WebLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }).catch(err => {})
      }else if(res.code == 40163){
        console.log("err")
      }
      else if(errorMessage){
        if(res.code!==2533){
          //提示错误信息
          Message({
            message: res.msg ||  '网络错误',
            type: 'error',
            center:true,
            duration: 2 * 1000
          })
        }
      }
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    // loadinginstace.close()
    Message({
      message: '网络错误',
      type: 'error',
      duration: 2 * 1000
    })

    return Promise.reject(error)
  }
)

export default service
