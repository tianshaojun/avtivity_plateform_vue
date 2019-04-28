// 壹加
import axios from 'axios'
// 全局配置
// axios.defaults.baseURL = '/api/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//拦截器
axios.interceptors.request.use(function(config){
  return config
},function(error){
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // Do something with response data
  /*console.log('拦截器：finish.response:' + JSON.stringify(response))*/
  if(response.data.code==403){
    // 错误


  }else if(response.data.code==500){
    // 错误

  }else if(response.data.code==405){
    // 错误
  }else{
    return response
  }

}, function (error) {
  // window.location.href='/404'
  return Promise.reject(error)
})


export default axios
// 壹加end
