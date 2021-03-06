import Vue from 'vue'
import Router from 'vue-router'

const DashboardLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue')
const DashboardCS = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardCS.vue')
const DashboardKasir = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardKasir.vue')
const HomePageLayout = () => import('../components/homePageLayout.vue')

function ownerView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `../components/owner/${view}.vue`) 
}

function csView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `../components/cs/${view}.vue`) 
}

function kasirView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `../components/kasir/${view}.vue`) 
}

function loadHomePage(view){
    return () => import(`../components/home/${view}.vue`)
}

const routes = [
{
    path: '/',
    component: HomePageLayout,
    children: [
    {
        path: '/',
        name: 'home',
        component: loadHomePage('home')
    }, 
    {
        path: '/aboutUs',
        name: 'aboutUs',
        component: loadHomePage('aboutUsLayout')
    }, 
    {
        path: '/signDual',
        name: 'signDual',
        component: loadHomePage('signDual')
    },
    {
        path: '/status',
        name: 'status',
        component: loadHomePage('status')
    }
    ]
},
{
path: '/dashboardOwner',
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
    {
        name: 'pengadaanproduk',
        path: '/pengadaanproduk',
        component: ownerView('pengadaanproduk')   
    },
    // laporan
    {
        name: 'laporan',
        path: '/laporan',
        component: ownerView('laporan')   
    },
    // {
    //     name: 'laporanpengadaan',
    //     path: '/laporan/laporanpengadaan',
    //     component: ownerView('laporanpengadaan')   
    // },

    // {
    //     name: 'produkterlaris',
    //     path: '/laporan/laporanprodukterlaris',
    //     component: ownerView('laporanprodukterlaris')   
    // },
    // {
    //     name: 'layananterlaris',
    //     path: '/laporan/laporanlayananterlaris',
    //     component: ownerView('laporanlayananterlaris')   
    // },
]
},
{
path: '/dashboardCS',
component: DashboardCS,
children: [
    {
        name: 'penjualanproduk',
        path: '/cs/penjualanproduk',
        component: csView('penjualanproduk')   
    },
    {
        name: 'penjualanlayanan',
        path: '/cs/penjualanlayanan',
        component: csView('penjualanlayanan')
    },
    {
        name: 'hewan',
        path: '/cs/hewan',
        component: ownerView('hewan')   
    },
    {
        name: 'customer',
        path: '/cs/customer',
        component: ownerView('customer')   
    },
    
]
},
{
path: '/dashboardKasir',
component: DashboardKasir,
children: [
    {
        name: 'pembayaranlayanan',
        path: '/kasir/pembayaranlayanan',
        component: kasirView('pembayaranlayanan')   
    },
    {
        name: 'pembayaranproduk',
        path: '/kasir/pembayaranproduk',
        component: kasirView('pembayaranproduk')   
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