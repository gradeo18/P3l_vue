<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Penjualan Produk</h2> 
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
                            Tambah Penjualan Produk 
                        </v-btn>
                        <!-- <v-btn depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        @click="dialogDetil = true"
                        >
                        <v-icon size="18" class="mr-2">mdi-plus</v-icon> 
                            Tambah Detil Produk 
                        </v-btn> -->
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
                                @click="tambahDetilHandler(item)"
                                >
                                <v-icon>mdi-plus-box-outline</v-icon>
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
    <v-card>
    <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Detil Penjualan Produk</h2> 
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
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
                            v-model="detilkeyword" 
                            append-icon="mdi-search" 
                            label="Search" 
                            hide-details
                        ></v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table
                    :headers="detilheaders"
                    :items="detils"
                    :search="detilkeyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.idtransaksipenjualan}}</td>
                            <td>{{ item.iddetilpenjualan}}</td>
                            <td>{{ item.idproduk}}</td>
                            <td>{{ item.jumlah}}</td>
                            <td>{{ item.subtotal}}</td>   
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
                                @click="deleteDetil(item.iddetilpenjualan)"
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

    <!-- Transaksi Produk -->
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
                            :class="{ 'hasError': $v.form.idhewan.$error }"
                            >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-select 
                            :items="customers"
                            v-model="form.idcustomer"
                            label="Customer"
                            item-text="nama"
                            item-value="idcustomer"
                            :class="{ 'hasError': $v.form.idcustomer.$error }"
                            >
                        </v-select>
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

    <!-- DIALOG EDIT DETIL -->
    <v-dialog v-model="dialogEdit" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Edit Detil Penjualan</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                    <!-- <v-col cols="12">
                        <v-select 
                            :items="detils"
                            v-model="editform.iddetilpenjualan"
                            label="ID Detil Penjualan"
                            item-text="iddetilpenjualan"
                            item-value="iddetilpenjualan"
                            :class="{ 'hasError': $v.editform.iddetilpenjualan.$error }"
                            >
                        </v-select>
                    </v-col> -->
                    <v-col cols="12">
                        <v-autocomplete
                            :items="produks"
                            :filter="customFilter"
                            v-model="editform.idproduk"
                            color="white"
                            item-text="nama"
                            item-value="idproduk"
                            label="Produk*"
                            :class="{ 'hasError': $v.editform.idproduk.$error }"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                        <label for="harga">Harga*</label>
                        <v-select v-if="editform.idproduk"
                            :items="produks.filter(item => item.idproduk === editform.idproduk)"
                            v-model="editform.harga"
                            color="white"
                            item-text="harga"
                            item-value="harga"
                            >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <label for="jumlah">Jumlah*</label>
                        <v-text-field v-model="editform.jumlah" :class="{ 'hasError': $v.editform.jumlah.$error }"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="subtotal">SubTotal*</label>
                        <v-text-field readonly v-model="editform.subtotal" :class="{ 'hasError': $v.editform.subtotal.$error }" >
                            {{parseInt(editform.subtotal=editform.harga * editform.jumlah)}}</v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogEdit = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="updateDetil()">Save</v-btn> 
        </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- DIALOG DETIL -->
    <v-dialog v-model="dialogDetil" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Detil Penjualan Produk</span>
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
                        <v-text-field readonly v-model="detilform.subtotal" :class="{ 'hasError': $v.detilform.subtotal.$error }" >{{parseInt(detilform.subtotal=detilform.harga * detilform.jumlah)}}</v-text-field>
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
            dialogEdit: false,
            keyword: '',
            detilkeyword:'',
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
            detilheaders: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID Transaksi Penjualan',
                    value: 'idtransaksipenjualan'
                    },
                    {
                    text: 'ID Detil Penjualan',
                    value: 'iddetilpenjualan'
                    },
                    {
                    text: 'Produk',
                    value: 'idproduk'
                    },
                    {
                    text: 'Jumlah',
                    value: 'jumlah'
                    },
                    {
                    text: 'Subtotal',
                    value: 'subtotal'
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
            editform:{
                iddetilpenjualan: '',
                idproduk: '',
                jumlah: '',
                subtotal: '',
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
        },
        editform:{
                iddetilpenjualan: {required},
                idproduk: {required},
                harga: {required},
                jumlah: {required,numeric},
                subtotal: {required},
            },
        },
    
    methods:{
        printHandler(item){
            axios({
                url: 'http://kouvee.xbanana.my.id/transaksi_penjualan/cetak_struk/' + item.idtransaksipenjualan,
                method: 'GET',
                responseType: 'blob', // important
                }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'penjualanproduk.pdf');
                document.body.appendChild(link);
                link.click();
            });

        },

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
                this.getDataDetil();
        }).catch(error =>{ 
             console.log(this.detilform)
            this.errors = error; 
            this.snackbar = true; 
            this.text = 'Masukan Data dengan Benar !'; 
            this.color = 'red';
        })
        },

        updateDetil(){    
            this.$v.editform.$touch();  
            if(this.$v.editform.idproduk.$error) return alert('Produk Masih Kosong !')
            else if(this.$v.editform.harga.$error) return alert('Harga Masih Kosong !')
            else if(this.$v.editform.jumlah.$error) return alert('Jumlah Tidak Boleh Kosong dan Harus Angka !')
            else if(this.$v.editform.subtotal.$error) return alert('Subtotal Tidak Boleh Kosong dan Harus Angka !')
            axios.put("http://kouvee.xbanana.my.id/api/detil_penjualan/" + this.updatedId,{
                idproduk: this.editform.idproduk,
                jumlah: this.editform.jumlah,
                subtotal: this.editform.subtotal,
            })
            .then(response =>{     
                this.snackbar = true; 
                this.text = response.data.message;
                this.text = 'Berhasil'; 
                this.color = 'green';
                this.load = false;
                this.dialogEdit = false;
                this.getDataDetil(); 
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
            this.dialogEdit = true;
            this.editform.idproduk = item.idproduk;
            this.editform.jumlah = item.jumlah;
            this.editform.subtotal = item.subtotal;
            this.updatedId = item.iddetilpenjualan;
        },

        tambahDetilHandler(item){
            this.dialogDetil = true;
            this.detilform.idtransaksipenjualan=item.idtransaksipenjualan
            this.detilform.idproduk=item.idproduk
            this.detilform.jumlah=item.jumlah
            this.detilform.subtotal=item.subtotal
        },

        deleteData(deleteId){
            const confirmBox = confirm("Apakah anda yakin untuk menghapus?")
            if(confirmBox)
            var uri="http://kouvee.xbanana.my.id/api/transaksi_penjualan/"+deleteId;
            this.$http.delete(uri).then(response =>{
                this.snackbar=true;
                this.text = response.data.message;
                this.text="Berhasil";
                this.color='green'
                this.deleteDialog=false;
                this.getData();
                this.getDataDetil();
                }).catch(error=>{
                    this.errors=error 
                    this.snackbar=true;
                    this.text='Coba Lagi !';
                    this.color='red';
                })
        },

        deleteDetil(deleteDetil){
            const confirmBox = confirm("Apakah anda yakin untuk menghapus?")
            if(confirmBox)
            var uri="http://kouvee.xbanana.my.id/api/detil_penjualan/"+deleteDetil;
            this.$http.delete(uri).then(response =>{
                this.snackbar=true;
                this.text = response.data.message;
                this.text="Berhasil";
                this.color='green'
                this.deleteDialog=false;
                this.getData();
                this.getDataDetil();
                }).catch(error=>{
                    this.errors=error 
                    this.snackbar=true;
                    this.text='Coba Lagi !';
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
