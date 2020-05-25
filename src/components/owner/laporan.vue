<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">LAPORAN</h2> 
                <v-layout row wrap style="margin:10px"> 
                    <v-flex xs6>
                        <v-col cols="3">
                            <h4 class="text-md-left">Pilih Tahun</h4> 
                            <v-select
                            :items="pilihantahun"
                            v-model="form.tahun"
                            :class="{ 'hasError': $v.form.tahun.$error }"
                            >
                            </v-select>  
                        </v-col>
                        <v-col cols="3">
                            <h4 class="text-md-left">Pilih Bulan</h4> 
                            <v-select
                            :items="pilihanbulan"
                            v-model="form.bulan"
                            :class="{ 'hasError': $v.form.bulan.$error }"
                            >
                            </v-select>  
                        </v-col>
                        <h4 class="text-md-left">LAPORAN JASA LAYANAN TERLARIS</h4>  
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
                        <h4 class="text-md-left">LAPORAN PRODUK TERLARIS</h4> 
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
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <h4 class="text-md-left">LAPORAN PENDAPATAN TAHUNAN</h4> 
                        <v-btn depressed 
                        dark 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        @click="printPendapatanTahunan(form)"
                        >
                        <v-icon size="15" class="mr-2">mdi-printer</v-icon> 
                            LAPORAN PENDAPATAN TAHUNAN
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <h4 class="text-md-left">LAPORAN PENDAPATAN BULANAN</h4> 
                        <v-btn depressed 
                        dark 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        @click="printPendapatanBulanan(form)"
                        >
                        <v-icon size="15" class="mr-2">mdi-printer</v-icon> 
                            LAPORAN PENDAPATAN BULANAN
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <h4 class="text-md-left">LAPORAN PENGELUARAN TAHUNAN</h4> 
                        <v-btn depressed 
                        dark 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        @click="printPengeluaranTahunan(form)"
                        >
                        <v-icon size="15" class="mr-2">mdi-printer</v-icon> 
                            LAPORAN PENGELUARAN TAHUNAN
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <h4 class="text-md-left">LAPORAN PENGELUARAN BULANAN</h4> 
                        <v-btn depressed 
                        dark 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        @click="printPengeluaranBulanan(form)"
                        >
                        <v-icon size="15" class="mr-2">mdi-printer</v-icon> 
                            LAPORAN PENGELUARAN BULANAN
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
            pilihanbulan:["1","2","3","4","5","6","7","8","9","10","11","12"],
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
            bulan: { required },
        },
    },
    methods:{
        printLayananTerlaris(form){
            this.$v.form.$touch();
            if(this.$v.form.tahun.$error) return alert('Tahun Masih Kosong !')
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
            this.$v.form.$touch();
            if(this.$v.form.tahun.$error) return alert('Tahun Masih Kosong !')
            axios({
                url: 'http://kouvee.xbanana.my.id/laporan_penjualan_terlaris/' + form.tahun,
                method: 'GET',
                responseType: 'blob', // important
                }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'laporan_penjualan_terlaris.pdf');
                document.body.appendChild(link);
                link.click();
            });
        },
        printPendapatanTahunan(form){
            this.$v.form.$touch();
            if(this.$v.form.tahun.$error) return alert('Tahun Masih Kosong !')
            axios({
                url: 'http://kouvee.xbanana.my.id/laporan_pendapatan_tahunan/' + form.tahun,
                method: 'GET',
                responseType: 'blob', // important
                }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'laporan_pendapatan_tahunan.pdf');
                document.body.appendChild(link);
                link.click();
            });
        },
        printPendapatanBulanan(form){
            this.$v.form.$touch();
            if(this.$v.form.tahun.$error) return alert('Tahun Masih Kosong !')
            else if(this.$v.form.bulan.$error) return alert('Bulan Masih Kosong !')
            axios({
                url: 'http://kouvee.xbanana.my.id/laporan_pendapatan_bulanan/' + form.tahun + '/' + form.bulan,
                method: 'GET',
                responseType: 'blob', // important
                }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'laporan_pendapatan_tahunan.pdf');
                document.body.appendChild(link);
                link.click();
            });
        },
        printPengeluaranTahunan(form){
            this.$v.form.$touch();
            if(this.$v.form.tahun.$error) return alert('Tahun Masih Kosong !')
            axios({
                url: 'http://kouvee.xbanana.my.id/laporan_pengadaan_tahunan/' + form.tahun,
                method: 'GET',
                responseType: 'blob', // important
                }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'laporan_pengeluaran_tahunan.pdf');
                document.body.appendChild(link);
                link.click();
            });
        },
        printPengeluaranBulanan(form){
            this.$v.form.$touch();
            if(this.$v.form.tahun.$error) return alert('Tahun Masih Kosong !')
            else if(this.$v.form.bulan.$error) return alert('Bulan Masih Kosong !')
            axios({
                url: 'http://kouvee.xbanana.my.id/laporan_pengadaan_bulanan/' + form.tahun + '/' + form.bulan,
                method: 'GET',
                responseType: 'blob', // important
                }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'laporan_pengeluaran_bulanan.pdf');
                document.body.appendChild(link);
                link.click();
            });
        },
        },
    }
</script>