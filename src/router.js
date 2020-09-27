import { nextTick } from "vue"
import { createRouter, createWebHistory } from "vue-router"

// In this PoC I'm not using lazy-load components, due performance issues running it under codesandbox
//const Home = () => import("./views/Home.vue")
//const Play = () => import("./views/Play.vue")
import Home from "/@/views/Home.vue"
import Play from "/@/views/Play.vue"

const siteTitle = "Nonograms"
const router = createRouter ({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { title: "Home" }
    },
    {
      path: "/play/:id",
      name: "play",
      component: Play,
      props: true,
      meta: { title: "You can do it!" }
    }
  ]
})

router.afterEach(async to => {
  await nextTick()
  document.title = (!to.meta || !to.meta.title ? "" : to.meta.title + " - ") + siteTitle
})

export default router
