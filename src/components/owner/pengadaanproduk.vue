<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Pemesanan Produk</h2> 
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
                            Tambah Pemesanan Produk 
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
                    :items="pemesananproduks"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.idpemesanan}} </td>
                            <td>{{ item.noPO}}</td>
                            <td>{{ item.idsupplier  .nama}}</td>
                            <td>{{ item.idpegawai}}</td>
                            <td>{{ item.tglpesan}}</td>
                            <td>{{ item.status}}</td>
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
                            :items="suppliers"
                            v-model="form.idsupplier"
                            label="Supplier"
                            item-text="nama"
                            item-value="idsupplier"
                            >
                        </v-select>
                    </v-col>
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
                        <v-menu
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="form.tglpesan"
                                label="Tanggal Pesan*"
                                readonly
                                v-on="on"
                                required
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="form.tglpesan" @input="menuDate = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12">
                        <v-select
                            :items="status"
                            v-model="form.status"
                            label="Status*"
                        /> 
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
            status: ["Dipesan","Diterima"],
            dialog: false,
            keyword: '',
            headers: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID Pemesanan',
                    value: 'idpemesanan',
                    },
                    {
                    text: 'No Pemesanan',
                    value: 'noPO'
                    },
                    {
                    text: 'Supplier',
                    value: 'idsupplier'
                    },
                    {
                    text: 'Pegawai',
                    value: 'idpegawai'
                    },
                    {
                    text: 'Tanggal Pesan',
                    value: 'tglpesan'
                    },
                    {
                    text: 'Status',
                    value: 'status'
                    },
            ],
            pemesananproduks: [],
            pegawais: [],
            hewans: [],
            suppliers : [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                idsupplier: '',
                idpegawai : '',
                tglpesan : '',
                status : '',
            },
            pemesananproduk : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',     
        }
    },
    methods:{
        getData(){
            axios.get("http://kouvee.xbanana.my.id/api/pemesanan_barang")
            .then(
                response => {this.pemesananproduks = response.data},
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

        getDataSupplier(){
            axios.get("http://kouvee.xbanana.my.id/api/supplier")
            .then(
                response => {this.suppliers = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },


        sendData(){
            this.pemesananproduk.append('noPR', this.form.noPO);
            this.pemesananproduk.append('idpegawai', this.$session.get('dataPegawai').idpegawai);
            this.pemesananproduk.append('idsupplier', this.form.idsupplier);
            this.pemesananproduk.append('tglpesan', this.form.tglpesan);
            this.pemesananproduk.append('status', this.form.status);
            var uri = "http://kouvee.xbanana.my.id/api/pemesanan_barang"
            this.$http.post(uri,this.pemesananproduk).then(response =>{
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
            axios.put("http://kouvee.xbanana.my.id/api/pemesanan_barang/" + this.updatedId,{
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
            var uri="http://kouvee.xbanana.my.id/api/pemesanan_barang/"+deleteId;
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
            this.getDataSupplier();
        },
    }
</script>