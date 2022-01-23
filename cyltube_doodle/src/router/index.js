import Vue from 'vue'
import VueRouter from 'vue-router'
import NavBar from '@/components/NavBar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      NavBar,
      //StudioNavBar,
      default: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    }
  },
  {
    path: '/subscriptions',
    name: 'Subscription',
    components: {
      NavBar,
      default: () =>
        import(/* webpackChunkName: "about" */ '../views/Subscription.vue')
    }//,
    //meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () =>
      import(/* webpackChunkName: "signin" */ '../views/Auth/SignIn.vue'),
    meta: { requiresVisitor: true }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/Auth/SignUp.vue'),
    meta: { requiresVisitor: true }
  },
  {
    path: '/trending',
    name: 'Trending',
    components: {
      NavBar,
      default: () =>
        import(/* webpackChunkName: "trending" */ '../views/Trending.vue')
    }
  },
  {
    path: '/vp',
    name: 'vp',
    component: () =>
        import(/* webpackChunkName: "signin" */ '../views/Doodle/DoodleHome.vue'),
    meta: { requiresVisitor: true }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  } else if (
    to.matched.some((record) => record.meta.requiresVisitor) &&
    loggedIn
  ) {
    next('/')
  } else {
    next()
  }
})

export default router
