import router from './router'
import store from './store'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'

// import { getToken } from '@/utils/auth' // 验权
import { getUserInfo } from '@/api/index' // 验权

import { Loading } from 'element-ui';

const whiteList = ['/','/agreement'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  // next()
  // NProgress.start()
  console.log(to.path)
  if (to.path) {
    window._hmt.push(['_trackPageview', '/#' + to.path]);
  }
  if (getUserInfo() || to.path=='/helpviews' || to.path=='/home'||to.path=='/') {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({path:'/'})

    }
  }
})

router.afterEach(() => {
  // NProgress.done() // 结束Progress
})
