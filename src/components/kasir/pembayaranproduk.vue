<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Transaksi Pembayaran Produk</h2> 
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
                        <v-btn depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        @click="dialogDetil = true"
                        >
                        <v-icon size="18" class="mr-2">mdi-plus</v-icon> 
                            Tambah Detil Produk 
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
                            <td>{{ item.tanggaltransaksi}} </td>
                            <td>{{ item.idpegawai}}</td>
                            <td>{{ item.idhewan}}</td>
                            <td>{{ item.idcustomer}}</td>   
                            <td>{{ item.diskon}}</td>
                            <td>{{ item.total}}</td>
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

                                <v-btn 
                                color="success"
                                light
                                @click="printstruck(item.idtransaksipelayanan)"
                                depressed small>Bayar</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
        </v-container>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Transaksi Pembayaran Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                    <v-col cols="12">
                        <label for="diskon">Subtotal*</label>
                        <v-text-field v-model="form.diskon" :class="{ 'hasError': $v.form.diskon.$error }">></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="diskon">Diskon*</label>
                        <v-text-field v-model="form.diskon" :class="{ 'hasError': $v.form.diskon.$error }">></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="total">Total*</label>
                        <v-text-field v-model="form.total" :class="{ 'hasError': $v.form.total.$error }"></v-text-field>
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
    <!-- DIALOG Pembayaran -->
    <v-dialog v-model="dialogPembayaran" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Pembayaran Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                    <!-- <v-col cols="12">
                        <label for="total">Total*</label>
                        <v-text-field v-model="form.total" :class="{ 'hasError': $v.form.total.$error }"></v-text-field>
                    </v-col> -->
                    <v-col cols="12">
                        <label for="diskon">Diskon*</label>
                        <v-text-field v-model="form.diskon" :class="{ 'hasError': $v.form.diskon.$error }">></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <small> </small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogPembayaran = false">Close</v-btn>
            <!-- <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>  -->
        </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- DIALOG DETIL -->
    <v-dialog v-model="dialogDetil" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Detil Transaksi Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                    <v-col cols="12">
                        <v-select 
                            :items="penjualanproduks"
                            v-model="detilform.idtransaksipenjualan"
                            label="ID Transaksi Penjualan"
                            item-text="noPR"
                            item-value="idtransaksipenjualan"
                            :class="{ 'hasError': $v.detilform.idtransaksipenjualan.$error }"
                            >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <!-- <v-select 
                            :items="produks"
                            v-model="detilform.idproduk"
                            label="Produk"
                            item-text="nama"
                            item-value="idproduk"
                            >
                        </v-select> -->
                        <v-autocomplete
                            :items="produks"
                            :filter="customFilter"
                            v-model="detilform.idproduk"
                            color="white"
                            item-text="nama"
                            item-value="idproduk"
                            label="Produk*"
                            :class="{ 'hasError': $v.detilform.idproduk.$error }"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                        <label for="harga">Harga*</label>
                        <v-select v-if="detilform.idproduk"
                            :items="produks.filter(item => item.idproduk === detilform.idproduk)"
                            v-model="detilform.harga"
                            color="white"
                            item-text="harga"
                            item-value="harga"
                            >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <label for="jumlah">Jumlah*</label>
                        <v-text-field v-model="detilform.jumlah" :class="{ 'hasError': $v.detilform.jumlah.$error }"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="subtotal">SubTotal*</label>
                        <v-text-field readonly v-model="detilform.subtotal" :class="{ 'hasError': $v.detilform.subtotal.$error }" >{{detilform.subtotal=detilform.harga * detilform.jumlah}}</v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogDetil = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="detilPenjualan()">Save</v-btn> 
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
import { required, numeric } from "vuelidate/lib/validators";
import axios from 'axios'
export default {
    data () {
        return {
            dialogDetil: false,
            dialog: false,
            dialogPembayaran: false,
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
                    text: 'Tanggal Penjualan',
                    value: 'tgltransaksi'
                    },
                    {
                    text: 'Pegawai',
                    value: 'idpegawai'
                    },
                    {
                    text: 'Hewan',
                    value: 'idhewan'
                    },
                    {
                    text: 'Customer',
                    value: 'idcustomer'
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
            customers: [],
            produks: [],
            detils: [],
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
            detilform: {
                idtransaksipenjualan: '',
                idproduk : '',
                jumlah : '',
                subtotal : '',
            },
            penjualanproduk : new FormData,
            detilproduk : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',     
        }
    },
    validations: {
        form: {
            diskon: { required, numeric },
            total: { required,numeric },
            idcustomer: { required },
            idhewan: { required },
        },
        detilform: {
            idtransaksipenjualan:{required},
            idproduk: {required},
            jumlah: {numeric,required},
            subtotal: {numeric,required},
        }
    },

    methods:{

        customFilter (item, queryText) {
            const textOne = item.nama.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1
        },

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
        getDataCustomer(){
            axios.get("http://kouvee.xbanana.my.id/api/customer")
            .then(
                response => {this.customers = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },
        getDataProduk(){
            axios.get("http://kouvee.xbanana.my.id/api/produk")
            .then(
                response => {this.produks = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },
        getDataDetil(){
            axios.get("http://kouvee.xbanana.my.id/api/detil_penjualan")
            .then(
                response => {this.detils = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },
        sendData(){
            this.$v.form.$touch();
            this.penjualanproduk.append('noPR', this.form.noPR);
            this.penjualanproduk.append('idpegawai', this.$session.get('dataPegawai').idpegawai);
            this.penjualanproduk.append('idhewan', this.form.idhewan);
            this.penjualanproduk.append('idcustomer', this.form.idcustomer);
            this.penjualanproduk.append('diskon', "0");
            this.penjualanproduk.append('total', "0");
            if(this.$v.form.idhewan.$error) return alert('Hewan Masih Kosong !')
            else if(this.$v.form.idcustomer.$error) return alert('Customer Masih Kosong !')
            // else if(this.$v.form.diskon.$error) return alert('Diskon Tidak Boleh Kosong dan Harus Angka !')
            // else if(this.$v.form.total.$error) return alert('Total Tidak Boleh Kosong dan Harus Angka !')
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
            this.text = 'Masukan Data dengan Benar !'; 
            this.color = 'red';
        })
        },

        updateData(){      
            axios.put("http://kouvee.xbanana.my.id/api/transaksi_penjualan/" + this.updatedId,{
                idpegawai: this.$session.get('dataPegawai').idpegawai,
                idhewan: this.form.idhewan,
                idcustomer: this.form.idcustomer,
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
            this.text = 'Masukan Data dengan Benar !';
            this.color = 'red';
            this.load = false;
            this.typeInput = 'dddd';
            })
        },

        editHandler(item){
            this.typeInput = 'edit';
            this.dialog = true;
            this.form.idcustomer = item.idcustomer;
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
                    this.text='Coba Lagi !';
                    this.color='red';
                })
        },

        detilPenjualan(){
            this.$v.detilform.$touch();
            this.detilproduk.append('idproduk', this.detilform.idproduk);
            this.detilproduk.append('jumlah', this.detilform.jumlah);
            this.detilproduk.append('subtotal', this.detilform.subtotal);
            this.detilproduk.append('idtransaksipenjualan', this.detilform.idtransaksipenjualan);
            if(this.$v.detilform.idtransaksipenjualan.$error) return alert('ID Transaksi Penjualan Masih Kosong !')
            else if(this.$v.detilform.idproduk.$error) return alert('ID Produk Masih Kosong !')
            else if(this.$v.detilform.jumlah.$error) return alert('Jumlah Tidak Boleh Kosong dan Harus Angka !')
            else if(this.$v.detilform.subtotal.$error) return alert('Subtotal Tidak Boleh Kosong dan Harus Angka !')
            var uri = "http://kouvee.xbanana.my.id/api/detil_penjualan"
            this.$http.post(uri,this.detilproduk).then(response =>{
                this.snackbar = true; 
                this.text = response.data.message;
                this.text = 'Berhasil'; 
                this.color = 'green';
                this.dialogDetil =false;
                this.getData();
        }).catch(error =>{ 
             console.log(this.detilform)
            this.errors = error; 
            this.snackbar = true; 
            this.text = 'Masukan Data dengan Benar !'; 
            this.color = 'red';
        })
        },

        printstruck()
        {
            this.dialogPembayaran = true;
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
                idcustomer: '',
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
            this.getDataCustomer();
            this.getDataProduk();
            this.getDataDetil();
        },
    }
</script>