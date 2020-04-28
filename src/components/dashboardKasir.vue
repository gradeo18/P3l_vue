<template>
        <div>
            <v-navigation-drawer
            v-model="drawer"
            class="greydarken-3"
            dark
            app
            clipped
            fixed
            temporary
            >
                <v-list-item>
                        <v-list-item-content>
                        <v-list-item-title class="title">
                            Dashboard
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Kasir
                        </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
        
                        <v-divider></v-divider>
                        <v-list-item @click="$router.push('/kasir/pembayaranlayanan')">
                        <v-list-item-action>
                            <v-icon color="white">mdi-check-bold</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title> <span class="white--text">Transaksi Pembayaran Layanan</span></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                        
                        <!-- <v-list-item @click="$router.push('/produk')">
                        <v-list-item-action>
                            <v-icon color="white">mdi-check-bold</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title> <span class="white--text">Transaksi Pemesanan Produk</span></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item> -->
                        
                        <template v-slot:append>
                            <div class="pa-2">
                                <v-btn block @click="logout()">Logout</v-btn>
                            </div>
                        </template>
                        </v-navigation-drawer>
                        <v-app-bar 
                            dark
                            app
                            fixed
                            clipped-left
                            height="70px"
                            color="greydarken-3">
                        <v-app-bar-nav-icon @click.stop="drawer=!drawer">
                            </v-app-bar-nav-icon>
                        
                        <VSpacer/>
                        
                        <img src="../assets/logo.png" style="height:45px;width:45px">
                        <v-toolbar-title
                            style="font-size:21px;"
                            class="white--textml-2"
                        >
                            Kouvee Pet Shop
                        </v-toolbar-title>
                        </v-app-bar>
                        
                        <VContent>
                            <router-view/>
                        </VContent>
                    </div>
                </template>
        
            <script>
                export default{
                    data(){
                        return{
                            drawer:null,
                        items:[
                            
                            ],
                        }
                    },
                    methods:{
                    logout(){
                        this.$session.clear('dataPegawai');
                        this.$router.push({
                        path: "/"
                    });
                    }
                }
}
</script>