import Vue from 'vue'
import Router from 'vue-router'

const DashboardLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue')

function ownerView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `../components/owner/${view}.vue`) 
}

const routes = [
{

path: '/',
component: DashboardLayout,
children: [
    {
        name: 'produk',
        path: '/produk',
        component: ownerView('produk')   
    },
    {
        name: 'layanan',
        path: '/layanan',
        component: ownerView('layanan')   
    },
    {
        name: 'customer',
        path: '/customer',
        component: ownerView('customer')   
    },
    {
        name: 'pegawai',
        path: '/pegawai',
        component: ownerView('pegawai')   
    },
    {
        name: 'supplier',
        path: '/supplier',
        component: ownerView('supplier')   
    },
    {
        name: 'hewan',
        path: '/hewan',
        component: ownerView('hewan')   
    },
    {
        name: 'ukuranhewan',
        path: '/ukuranhewan',
        component: ownerView('ukuranhewan')   
    },
    {
        name: 'jenishewan',
        path: '/jenishewan',
        component: ownerView('jenishewan')   
    },
    
]
},

]

Vue.use(Router)
const router = new Router({
    mode: 'history', 
    routes: routes
})
export default router

