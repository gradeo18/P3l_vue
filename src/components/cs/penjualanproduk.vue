<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Transaksi Produk</h2> 
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                         <v-btn depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        @click="dialog = true"
                        >
                        <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon> 
                            Tambah Transaksi Produk 
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field
                            v-model="keyword" 
                            append-icon="mdi-search" 
                            label="Search" 
                            hide-details
                        ></v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table
                    :headers="headers"
                    :items="penjualanproduks"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.idtransaksipenjualan}} </td>
                            <td>{{ item.noPR}}</td>
                            <td>{{ item.idpegawai}}</td>
                            <td>{{ item.idhewan}}</td>
                            <td>{{ item.diskon}}</td>
                            <td>{{ item.total}}</td>
                            <td>{{ item.detil.jumlah}}</td>
                            <td class="text-center">
                                <v-btn 
                                icon 
                                color="indigo" 
                                light
                                @click="editHandler(item)"
                                >
                                <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn 
                                icon 
                                color="error" 
                                light
                                @click="deleteData(item.idtransaksipenjualan)"
                                >
                                <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
        </v-container>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Transaksi Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                     <v-col cols="12">
                        <v-select 
                            :items="hewans"
                            v-model="form.idhewan"
                            label="Hewan"
                            item-text="nama"
                            item-value="idhewan"
                            >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <label for="diskon">Diskon*</label>
                        <v-text-field v-model="form.diskon" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="total">Total*</label>
                        <v-text-field v-model="form.total" required></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn> 
        </v-card-actions>
        </v-card>
    </v-dialog>
    
<v-snackbar
    v-model="snackbar"
    :color="color"
    :multi-line="true"
    :timeout="3000"
>

    {{ text }} 
    <v-btn
        dark 
        text
        @click="snackbar = false"
    >
        Close 
    </v-btn>
</v-snackbar>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            dialog: false,
            keyword: '',
            headers: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID Penjualan Produk',
                    value: 'idtransaksipenjualan',
                    },
                    {
                    text: 'No Produk',
                    value: 'noPR'
                    },
                    {
                    text: 'ID Pegawai',
                    value: 'idpegawai'
                    },
                    {
                    text: 'ID Hewan',
                    value: 'idhewan'
                    },
                    {
                    text: 'Diskon',
                    value: 'diskon'
                    },
                    {
                    text: 'Total',
                    value: 'total',
                    },
            ],
            penjualanproduks: [],
            pegawais: [],
            hewans: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                idpegawai: '',
                idhewan : '',
                diskon : '',
                total : '',
            },
            penjualanproduk : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',     
        }
    },
    methods:{
        getData(){
            axios.get("http://kouvee.xbanana.my.id/api/transaksi_penjualan")
            .then(
                response => {this.penjualanproduks = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },

        getDataPegawai(){
            axios.get("http://kouvee.xbanana.my.id/api/pegawai")
            .then(
                response => {this.pegawais = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },
        getDataHewan(){
            axios.get("http://kouvee.xbanana.my.id/api/hewan")
            .then(
                response => {this.hewans = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },


        sendData(){
            this.penjualanproduk.append('noPR', this.form.noPR);
            this.penjualanproduk.append('idpegawai', this.$session.get('dataPegawai').idpegawai);
            this.penjualanproduk.append('idhewan', this.form.idhewan);
            this.penjualanproduk.append('diskon', this.form.diskon);
            this.penjualanproduk.append('total', this.form.total);
            var uri = "http://kouvee.xbanana.my.id/api/transaksi_penjualan"
            this.$http.post(uri,this.penjualanproduk).then(response =>{
                this.snackbar = true; 
                this.text = response.data.message;
                this.text = 'Berhasil'; 
                this.color = 'green';
                this.dialog =false;
                this.getData();
        }).catch(error =>{ 
             console.log(this.form)
            this.errors = error; 
            this.snackbar = true; 
            this.text = 'Try Again'; 
            this.color = 'red';
        })
        },

        updateData(){      
            axios.put("http://kouvee.xbanana.my.id/api/transaksi_penjualan/" + this.updatedId,{
                idpegawai: this.$session.get('dataPegawai').idpegawai,
                idhewan: this.form.idhewan,
                diskon: this.form.diskon,
                total: this.form.total,
            })
            .then(response =>{     
                this.snackbar = true; 
                this.text = response.data.message;
                this.text = 'Berhasil'; 
                this.color = 'green';
                this.load = false;
                this.dialog = false;
                this.getData(); 
                this.resetForm();
                this.typeInput = 'dddd';
            }).catch(error =>{
            this.errors = error
            this.snackbar = true;
            this.text = 'Try Again';
            this.color = 'red';
            this.load = false;
            this.typeInput = 'dddd';
            })
        },

        editHandler(item){
            this.typeInput = 'edit';
            this.dialog = true;
            this.form.idhewan = item.idhewan;
            this.form.diskon = item.diskon;
            this.form.total = item.total;
            this.updatedId = item.idtransaksipenjualan;
        },

        deleteData(deleteId){
            const confirmBox = confirm("Are you sure want remove?")
            if(confirmBox)
            var uri="http://kouvee.xbanana.my.id/api/transaksi_penjualan/"+deleteId;
            this.$http.delete(uri).then(response =>{
                this.snackbar=true;
                this.text = response.data.message;
                this.text="Berhasil";
                this.color='green'
                this.deleteDialog=false;
                this.getData();
                }).catch(error=>{
                    this.errors=error 
                    this.snackbar=true;
                    this.text='Try Again';
                    this.color='red';
                })
        },
    
        setForm(){
            if (this.typeInput === 'new') {
                this.sendData()
            } else { console.log("dddd")
                this.updateData()
            }
        },

        resetForm(){
            this.form = {
                idpegawai : '',
                idhewan : '',
                diskon : '',
                total : '',
            }
        }
        },

        mounted(){
            this.getData();
            this.getDataPegawai();
            this.getDataHewan();
        },
    }
</script>