import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import DocumentationView from '@/components/views/DocumentationView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'DocumentationView',
        component: DocumentationView,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
