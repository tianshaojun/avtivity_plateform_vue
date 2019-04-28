import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  linkActiveClass:'activess',
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [

    {
      path: '/',
      name: 'index',
      component: () => import('@/view/index')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/view/home')
    },
    {
      path: '/setActivity',
      name: 'SetActivity',
      component: () => import('@/view/setActivity/index.vue'),
      meta:{
        requiresAuth:true,
        active:'/MyProject'
      }
    },
    {
      path: '/setJigsaw',
      name: 'setJigsaw',
      component: () => import('@/view/setActivitys/setJigsaw/index.vue'),
      meta:{
        requiresAuth:true,
        active:'/MyProject'
      }
    },
    {
      path: '/setHfive',
      name: 'setHfive',
      component: () => import('@/view/setActivitys/setHfive/index.vue'),
      meta:{
        requiresAuth:true,
        active:'/MyProject'
      }
    },{
      path: '/setGame',
      name: 'setGame',
      component: () => import('@/view/setActivitys/setGame/gamesactive.vue'),
      meta:{
        requiresAuth:true,
        active:'/MyProject'
      }
    },{
      path: '/setRound',
      name: 'setRound',
      component: () => import('@/view/setActivitys/setround/index.vue'),
      meta:{
        requiresAuth:true,
        active:'/MyProject'
      }
    },
    {
      path: '/viewData',
      name: 'viewData',
      component: () => import('@/view/viewData'),
      meta:{
        requiresAuth:true,
        active:'/MyProject'
      }
    },
    { path: '/404', component: () => import('@/view/404.vue')},
    {
      path: '/MyProject',
      name: 'MyProject',
      component: () => import('@/view/myproject'),
      meta:{
        requiresAuth:true,
        active:'/MyProject'
      }
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: () => import('@/view/recharge')
    },
    {
      path: '/paypage',
      name: 'paypage',
      component: () => import('@/view/paypage'),
    },
    {
      path: '/rechargeDetails',
      name: 'rechargeDetails',
      component: () => import('@/view/rechargeDetails/index'),
    },
    {
      path: '/rechargeDetails-order',
      name: 'orderDetails',
      component: () => import("@/view/rechargeDetails/rechargeDetails-order")
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: () => import('@/view/agreement/index')
    },
    {
      path: '/shopmall',
      name: 'shopmall',
      component: () => import('@/view/shopmall/index')
    },
    {
      path: '/mygift',
      name: 'mygift',
      component: () => import('@/view/mygift/index')
    },
    {
      path: '/mygift-giftState',
      name: 'giftState',
      component: () => import('@/view/mygift/giftState')
    },{
      path: '/productdetails',
      name: 'productdetails',
      component: () => import('@/view/productdetails/index')
    },
    {
      path:'/homeindex',
      name:'homeindex',
      component: () => import('@/view/homeindex/index'),
      meta:{
        requiresAuth:true,
        active:'/MyProject'
      },
      redirect:{ name: 'homeuser'},
      children:[
        {
          path:'/goodsAdd',
          name:'goodsAdd',
          component: () => import('@/view/children/goodsAdd'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          }
        },
        {
          path:'/message',
          name:'message',
          component: () => import('@/view/children/message'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          }
        },
        {
          path:'/news',
          name:'news',
          component: () => import('@/view/children/news'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          }
        },
        {
          path:'/reward',
          name:'reward',
          component: () => import('@/view/children/reward'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          }
        },
        {
          path:'/rule',
          name:'rule',
          component: () => import('@/view/children/rule'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          }
          // children:[
          //   {
          //     path:'/rulemodify',
          //     name:'rulemodify',
          //     component: () => import('@/view/children/rulemodify')
          //   },
          // ]
        },
        {
          path:'/rulemodify',
          name:'rulemodify',
          component: () => import('@/view/children/rulemodify'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          }
        },
        {
          path:'/homeuser',
          name:'homeuser',
          component: () => import('@/view/children/homeinx'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          },
        },
        {
          path:'/moneyRecord',
          name:'moneyRecord',
          component: () => import('@/view/children/moneyRecord')
        },
        {
          path:'/moneyreviewed',
          name:'moneyreviewed',
          component: () => import('@/view/children/moneyreviewed')
        },
        {
          path:'/largereviewed',
          name:'largereviewed',
          component: () => import('@/view/children/largereviewed')
        },
        {
          path:'/rewardreviewed',
          name:'rewardreviewed',
          component: () => import('@/view/children/rewardreviewed')
        },
        {
          path:'/refusemoney',
          name:'refusemoney',
          component: () => import('@/view/children/refusemoney')
        },
        {
          path:'/moneySurvey',
          name:'moneySurvey',
          component: () => import('@/view/children/moneySurvey')
        },
        {
          path:'/moneyform',
          name:'moneyform',
          component: () => import('@/view/children/moneyform')
        },
        {
          path:'/goods',
          name:'goods',
          component: () => import('@/view/children/goods'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          }
        },{
          path:'/wXreview',
          name:'wXreview',
          component: () => import('@/view/children/wXreview'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          }
        }
        ,{
          path:'/pageedit',
          name:'pageedit',
          component: () => import('@/view/children/pageedit'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          }
        }
      ]
    },
    {
      path:'/help',
      name:'help',
      component: () => import('@/view/help/index'),
      meta:{
        requiresAuth:true,
        active:'/help'
      },
      redirect:{ name: 'helpviews'},
      children:[
        {
          path: '/helpviews',
          name: 'helpviews',
          component: () => import('@/view/help/helpviews'),
          meta:{
            requiresAuth:true,
            active:'/help'
          },
        },
      ]
    },
// 游戏的管理平台-----------------------------------------------------------------------------------------------------------
    {
      path: '/gameindex',
      name: 'gameindex',
      component: () => import('@/view/gameindex/index'),
      meta: {
        requiresAuth: true,
        active: '/MyProject'
      },
      redirect: {name: 'gameuser'},
      children:[
        {
          path:'/gameuser',
          name:'gameuser',
          component: () => import('@/view/gamechildren/gameinx'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          },
        },
        {
          path:'/gamerewardreviewed',
          name:'gamerewardreviewed',
          component: () => import('@/view/gamechildren/gamerewardreviewed')
        },
        {
          path:'/gamereward',
          name:'gamereward',
          component: () => import('@/view/gamechildren/gamereward'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          }
        },
        {
          path:'/gamerule',
          name:'gamerule',
          component: () => import('@/view/gamechildren/gamerule'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          }
        },
        {
          path:'/gamerulemodify',
          name:'gamerulemodify',
          component: () => import('@/view/gamechildren/gamerulemodify'),
          meta:{
            requiresAuth:true,
            active:'/MyProject'
          }
        },
      ]
    }
  ]
})
