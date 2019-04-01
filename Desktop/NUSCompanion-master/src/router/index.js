import Vue from "vue";
import Router from "vue-router";

import Home from "@/components/Home.vue";
import Recommendation from "../components/Recommendation.vue";
import choose from "../components/choose.vue"
import searchModules from "../components/searchModules.vue"
import Profile from "../components/ProfilePage.vue"
import Choices from "../components/choices.vue"
import singleModule from "../components/singleModule.vue"


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/Recommendation",
            name: "Recommendation",
            component: Recommendation
        },
        {
            path:"/",
            name: "Home",
            component: Home
        },
        {
            path:"/choose",
            name:"choose",
            component: choose
        },
        {
            path:"/Profile",
            name: "Profile" ,
            component: Profile
        },
        {
            path:"/Modules",
            name: "searchModules",
            component: searchModules
        },
        {
            path:"/Module/:id",
            name: 'SingleModule',
            component: singleModule
        },
        {
            path:"/Choices",
            name:"Choices",
            component: Choices
        }

    ]
});