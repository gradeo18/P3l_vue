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
                    Owner - Hi, {{$session.get('dataPegawai').nama}} !
                </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

                <v-divider></v-divider>
                <v-list-item @click="$router.push('/produk')">
                    <v-list-item-action>
                        <v-icon color="white">mdi-check-bold</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title> <span class="white--text">Produk</span></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="$router.push('/layanan')">
                <v-list-item-action>
                    <v-icon color="white">mdi-check-bold</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> <span class="white--text">Layanan</span></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
                
                <v-list-item @click="$router.push('/customer')">
                <v-list-item-action>
                    <v-icon color="white">mdi-check-bold</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> <span class="white--text">Customer</span></v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item @click="$router.push('/pegawai')">
                <v-list-item-action>
                    <v-icon color="white">mdi-check-bold</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> <span class="white--text">Pegawai</span></v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item @click="$router.push('/supplier')">
                <v-list-item-action>
                    <v-icon color="white">mdi-check-bold</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> <span class="white--text">Supplier</span></v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item @click="$router.push('/hewan')">
                <v-list-item-action>
                    <v-icon color="white">mdi-check-bold</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> <span class="white--text">Hewan</span></v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item @click="$router.push('/jenishewan')">
                <v-list-item-action>
                    <v-icon color="white">mdi-check-bold</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> <span class="white--text">Jenis Hewan</span></v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item @click="$router.push('/ukuranhewan')">
                <v-list-item-action>
                    <v-icon color="white">mdi-check-bold</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> <span class="white--text">Ukuran Hewan</span></v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item @click="$router.push('/pengadaanproduk')">
                <v-list-item-action>
                    <v-icon color="white">mdi-check-bold</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> <span class="white--text">Pengadaan Produk</span></v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <!-- laporan -->
                <!-- <v-list-group
                value="true"
                >
                <template v-slot:activator>
                <v-list-item-title>Laporan</v-list-item-title>
                </template> -->

                <v-list-item @click="$router.push('/laporan')">
                <v-list-item-action>
                    <v-icon color="white">mdi-check-bold</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> <span class="white--text">Laporan</span></v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <!-- <v-list-item @click="$router.push('/laporan/laporanpengadaan')">
                <v-list-item-action>
                    <v-icon color="white">mdi-check-bold</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> <span class="white--text">Pengadaan</span></v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item @click="$router.push('/laporan/laporanprodukterlaris')">
                <v-list-item-action>
                    <v-icon color="white">mdi-check-bold</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> <span class="white--text">Produk Terlaris</span></v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item @click="$router.push('/laporan/laporanlayananterlaris')">
                <v-list-item-action>
                    <v-icon color="white">mdi-check-bold</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> <span class="white--text">Layanan Terlaris</span></v-list-item-title>
                </v-list-item-content>
                </v-list-item> -->
                

                
                <!-- </v-list-group> -->


                <template v-slot:append>
                    <div class="pa-2">
                        <v-btn block @click="logout">Logout</v-btn>
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
                    KOUVEE PET SHOP
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
                items:[],
                }
            },
            methods:{
            logout(){
                this.$session.clear('dataPegawai');
                this.$router.push({
                path: "/"
              });
            },
        }
        }       
    </script>