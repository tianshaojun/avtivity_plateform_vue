import Vue from 'vue'
import Vuex from 'vuex'
import  {getQRCodeLoginMes,getRegister,logout}  from '@/api/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user:{ //用户信息
      info:{}
    },
    boxId:'',
  },
  mutations: {
    //设置用户信息登录
    SET_USER(state,data){
      state.user.info = data
      localStorage.setItem("session",JSON.stringify(data))
    },
    //设置box_id
    SET_IDX(state,data){
      state.boxId= data
    },
  },
  actions: {
    //动态获取用户信息-
    getuser({commit},data){
      return new Promise((resolve, reject) => {
        getQRCodeLoginMes(data).then(res=>{
          const data =res.data
          console.log(data,"storedata")
          commit('SET_USER',data)
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
    })
    },
    // 注册用户信息
    getregister({commit},data){
      return new Promise((resolve, reject) => {
        getRegister(data).then(res=>{
          const data =res.data
          // commit('SET_USER',data)
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    // 二维码登录信息
    // getqrcode({commit},data){
    //   return new Promise((resolve,reject)=>{
    //     QRCodeLogin(data).then(res=>{
    //       const data =res.data
    //       commit('SET_USER',data)
    //       resolve(res)
    //     }).catch(err=>{
    //       reject(err)
    //     })
    //   })
    // }

    // 退出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout({}).then(() => {
          commit('SET_USER', '')
          localStorage.removeItem("session")
          localStorage.removeItem("tab")
          localStorage.clear()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端退出
    WebLogOut({ commit}) {
      return new Promise((resolve) => {
          commit('SET_USER', '')
          localStorage.removeItem("session")
          localStorage.clear()
          resolve()
      })
    },
  },
  getters:{
    userInfo: state => state.user.info,
  }
})

export default store
