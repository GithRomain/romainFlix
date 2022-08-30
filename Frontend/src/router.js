import { createWebHistory, createRouter } from "vue-router";
import HomePage from "./components/HomePage";
import UserRegister from "./components/UserConnect";
import NavigationBar from "./components/NavigationBar";

const routes =  [
    {
        path:"/",
        name:"UserRegister",
        component: UserRegister,
    },
    {
        path:"/HomePage",
        name:"HomePage",
        component: HomePage,
    },
    {
        path:"/NavigationBar",
        name:"NavigationBar",
        component: NavigationBar,
    },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

