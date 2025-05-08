import { createRouter, createWebHistory } from "vue-router";
import SimpleForm from "../components/SimpleForm.vue";
import ResponsePage from "../components/ResponsePage.vue";

const routes = [
    { path: '/', name: 'Form', component: SimpleForm },
    { path: '/response', name: 'Response', component: ResponsePage}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;