import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import DogsIndex from "../views/dogs/DogsIndex.vue";
import DogsNew from "../views/dogs/DogsNew.vue";
import DogsShow from "../views/dogs/DogsShow.vue";
import BreedsIndex from "../views/breeds/BreedsIndex.vue";
import DogParks from "../views/DogParks.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/dogs",
    name: "dogs-index",
    component: DogsIndex,
  },
  {
    path: "/dogs/new",
    name: "dogs-new",
    component: DogsNew,
  },
  {
    path: "/dogs/:id",
    name: "dogs-show",
    component: DogsShow,
  },
  {
    path: "/breeds",
    name: "breeds-index",
    component: BreedsIndex,
  },
  {
    path: "/dogparks",
    name: "dog-parks",
    component: DogParks,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
