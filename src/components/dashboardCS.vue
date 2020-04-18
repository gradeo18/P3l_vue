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
                            CS - Hi, {{$session.get('dataPegawai').nama}} !
                        </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
        
                        <v-divider></v-divider>
                        <v-list-item @click="$router.push('/penjualanproduk')">
                        <v-list-item-action>
                            <v-icon color="white">mdi-check-bold</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title> <span class="white--text">Penjualan Produk</span></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>

                        <v-list-item @click="$router.push('/penjualanlayanan')">
                        <v-list-item-action>
                            <v-icon color="white">mdi-check-bold</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title> <span class="white--text">Penjualan Layanan</span></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>

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
                            <h1><center> Hi, {{$session.get('dataPegawai').nama}} !  </center></h1>
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