<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">List Produk Kouvee Pet Shop</h2> 
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6 class="text-right">
                        <v-text-field
                            v-model="keyword" 
                            append-icon="mdi-magnify" 
                            label="Search" 
                            hide-details
                        ></v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table
                    :headers="headers"
                    :items="produks"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <img :src="'http://kouvee.xbanana.my.id/uploads/produk/' +item.gambar" alt="Image Gagal di Load"  width="80px" height="80px" />
                            <td>{{ item.idproduk}}</td>
                            <td>{{ item.nama}}</td>
                            <td>{{ item.harga}}</td>
                            <td>{{ item.stok}}</td>
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
        </v-container>
    </v-card>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            keyword: '',
            headers: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'Gambar',
                    value: 'gambar'
                    },
                    {
                    text: 'ID Produk',
                    value: 'idproduk'
                    },
                    {
                    text: 'Nama Produk',
                    value: 'nama'
                    },
                    {
                    text: 'Harga',
                    value: 'harga'
                    },
                    {
                    text: 'Stok',
                    value: 'stok',
                    },
            ],
            produks: [],
            color: null,
            text: '',
            load: false,
            produk : new FormData,  
        }
    },
    methods:{
        getData(){
            axios.get("http://kouvee.xbanana.my.id/api/produk")
            .then(
                response => {this.produks = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        }
        },

        mounted(){
            this.getData();
        },
    }
</script>