<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">LAPORAN</h2> 
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-col cols="5">
                            <h4 class="text-md-left">Pilih tahun</h4> 
                            <v-select
                            :items="pilihantahun"
                            v-model="form.tahun"
                            >
                            </v-select>  
                        </v-col> 
                        <v-btn depressed 
                        dark 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        @click="printLayananTerlaris(form)"
                        >
                        <v-icon size="15" class="mr-2">mdi-printer</v-icon> 
                            LAPORAN JASA LAYANAN TERLARIS
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed 
                        dark 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        @click="printProdukTerlaris(form)"
                        >
                        <v-icon size="15" class="mr-2">mdi-printer</v-icon> 
                            LAPORAN PRODUK TERLARIS
                        </v-btn>
                    </v-flex>
                </v-layout>
        </v-container>
    </v-card>
</v-container>
</template>

<script>

import { required } from "vuelidate/lib/validators";
import axios from 'axios'
export default {
    data () {
        return {
            pilihantahun:["2019","2020"],
            form: {
                tahun : '',
                bulan : '',
            },
            tahun : '',
        }
    },
    validations: {
        form: {
            tahun: { required },
        },
    },
    methods:{
        printLayananTerlaris(form){
            axios({
                url: 'http://kouvee.xbanana.my.id/laporan_pelayanan_terlaris/' + form.tahun,
                method: 'GET',
                responseType: 'blob', // important
                }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'laporan_pelayanan_terlaris.pdf');
                document.body.appendChild(link);
                link.click();
                });
        },
        printProdukTerlaris(form){
            axios({
                url: 'http://kouvee.xbanana.my.id/laporan_produk_terlaris/' + form.tahun,
                method: 'GET',
                responseType: 'blob', // important
                }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'laporan_produk_terlaris.pdf');
                document.body.appendChild(link);
                link.click();
            });
        },

        },
    }
</script>