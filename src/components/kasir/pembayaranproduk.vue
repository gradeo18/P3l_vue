<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Pembayaran Produk</h2> 
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <!-- <v-btn depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        @click="dialog = true"
                        >
                        <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon> 
                            Tambah Transaksi Produk 
                        </v-btn> -->
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
                            <td>{{ item.idtransaksipenjualan}}</td>
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
                                color="green" 
                                light
                                @click="bayarHandler(item)"
                                >
                                <v-icon>mdi-account-cash-outline</v-icon>
                                </v-btn>
                                <v-btn 
                                icon 
                                color="indigo" 
                                light
                                @click="printHandler(item)"
                                >
                                <v-icon>mdi-printer</v-icon>
                                </v-btn>
                            </td>
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
                <h2 class="text-md-center">Detil Pembayaran Produk</h2> 
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
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
                    :headers="detilheaders"
                    :items="detils"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.iddetilpenjualan}}</td>
                            <td>{{ item.idtransaksipenjualan}} </td>
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
    <!-- Dialog Bayar -->
    <v-dialog v-model="dialogBayar" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Pembayaran Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                     <v-col cols="12">
                        <v-select 
                            :items="detils"
                            v-model="bayarform.idtransaksipenjualan"
                            label="ID Transaksi Penjualan"
                            item-text="idtransaksipenjualan"
                            item-value="idtransaksipenjualan"
                            :class="{ 'hasError': $v.bayarform.idtransaksipenjualan.$error }"
                            >
                        </v-select>
                    </v-col>
                     <v-col cols="12">
                        <v-autocomplete  v-if="bayarform.idtransaksipenjualan"
                            :multiple="true"
                            :items="detils.filter(item => item.idtransaksipenjualan === bayarform.idtransaksipenjualan)"
                            :filter="customFilter"
                            v-model="bayarform.subtotal"
                            color="white"
                            item-text="subtotal"
                            item-value="subtotal"
                            label="Subtotal*"
                            :class="{ 'hasError': $v.bayarform.subtotal.$error }"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                        <span>{{ sum }}</span>
                        <label for="diskon">Uang Customer*</label>
                        <v-text-field v-model="bayarform.uang" :class="{ 'hasError': $v.bayarform.uang.$error }"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="diskon">Diskon*</label>
                        <v-text-field v-model="bayarform.diskon" :class="{ 'hasError': $v.bayarform.diskon.$error }"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="total">Total</label>
                        <v-text-field readonly v-model="bayarform.total" :class="{ 'hasError': $v.bayarform.total.$error }">
                            {{bayarform.total=parseFloat(bayarform.subtotal)-parseFloat(bayarform.diskon)}}</v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="total">Kembalian</label>
                        <v-text-field readonly v-model="bayarform.kembalian" :class="{ 'hasError': $v.bayarform.kembalian.$error }">
                            {{bayarform.kembalian=parseFloat(bayarform.uang)-parseFloat(bayarform.total)}}</v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogBayar = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="updateBayar()">Bayar</v-btn> 
        </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- DIALOG EDIT DETIL PEMBAYARAN -->
    <v-dialog v-model="dialog" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Edit Detil Pembayaran Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                    <v-col cols="12">
                        <v-autocomplete
                            :items="produks"
                            :filter="customFilter"
                            v-model="editdetilform.idproduk"
                            color="white"
                            item-text="nama"
                            item-value="idproduk"
                            label="Produk*"
                            :class="{ 'hasError': $v.editdetilform.idproduk.$error }"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                        <label for="harga">Harga*</label>
                        <v-select v-if="editdetilform.idproduk"
                            :items="produks.filter(item => item.idproduk === editdetilform.idproduk)"
                            v-model="editdetilform.harga"
                            color="white"
                            item-text="harga"
                            item-value="harga"
                            :class="{ 'hasError': $v.editdetilform.harga.$error }"
                            >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <label for="jumlah">Jumlah*</label>
                        <v-text-field v-model="editdetilform.jumlah" :class="{ 'hasError': $v.editdetilform.jumlah.$error }"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="subtotal">SubTotal*</label>
                        <v-text-field readonly v-model="editdetilform.subtotal" :class="{ 'hasError': $v.editdetilform.subtotal.$error }" >
                            {{parseFloat(editdetilform.subtotal=editdetilform.harga * editdetilform.jumlah)}}</v-text-field>
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

     <!--DIALOG DETIL  -->
    <v-dialog v-model="dialogDetil" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Detil Pembayaran Produk </span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                    <!-- <v-col cols="12">
                        <v-select 
                            :items="penjualanproduks"
                            v-model="detilform.idtransaksipenjualan"
                            label="ID Transaksi Penjualan"
                            item-text="noPR"
                            item-value="idtransaksipenjualan"
                            :class="{ 'hasError': $v.detilform.idtransaksipenjualan.$error }"
                            >
                        </v-select>
                    </v-col> -->
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
            dialogBayar: false,
            dialogDetil: false,
            dialog: false,
            keyword: '',
            headers: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID Transaksi Penjualan',
                    value: 'idtransaksipenjualan'
                    },
                    {
                    text: 'No Transaksi',
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
                    {
                    text: 'Bayar',sortable: false
                    },{
                    text: '',sortable: false
                    },
            ],
            detilheaders: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID Detil Penjualan',
                    value: 'iddetilpenjualan'
                    },
                    {
                    text: 'ID Transaksi Penjualan',
                    value: 'idtransaksipenjualan'
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
            // form: {
            //     idpegawai: '',
            //     idhewan : '',
            //     diskon : '',
            //     total : '',
            // },
            detilform: {
                idtransaksipenjualan: '',
                idproduk : '',
                harga: '',
                jumlah : '',
                subtotal : '',
            },
            bayarform: {
                idtransaksipenjualan: '',
                subtotal: '',
                diskon: '',
                total: '',
                uang: '',
                harga: '',
            },
            editdetilform:{
                idproduk: '',
                harga: '',
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
        // form: {
        //     diskon: { required, numeric },
        //     total: { required,numeric },
        //     idcustomer: { required },
        //     idhewan: { required },
        // },
        detilform: {
            idtransaksipenjualan:{required},
            idproduk: {required},
            harga: {numeric,required},
            jumlah: {numeric,required},
            subtotal: {numeric,required},
        },
        bayarform:{
            idtransaksipenjualan: {required},
            subtotal: {required,numeric},
            diskon: { required, numeric },
            total: { required, numeric },
            uang: {required},
            harga: {required},
            kembalian: {required},
        },
        editdetilform:{
            idproduk: {required},
            harga: {numeric,required},
            jumlah: {numeric,required},
            subtotal: {numeric,required},
        }
    },
    computed: {
        sum: function(){
            var sum = 0;
                this.detils.forEach(bayarform => {
                sum += parseFloat(bayarform.subtotal);
                });
                return sum
        }
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

        // sendData(){
        //     this.$v.form.$touch();
        //     this.penjualanproduk.append('noPR', this.form.noPR);
        //     this.penjualanproduk.append('idpegawai', this.$session.get('dataPegawai').idpegawai);
        //     this.penjualanproduk.append('idhewan', this.form.idhewan);
        //     this.penjualanproduk.append('idcustomer', this.form.idcustomer);
        //     this.penjualanproduk.append('diskon', "0");
        //     this.penjualanproduk.append('total', "0");
        //     if(this.$v.form.idhewan.$error) return alert('Hewan Masih Kosong !')
        //     else if(this.$v.form.idcustomer.$error) return alert('Customer Masih Kosong !')
        //     var uri = "http://kouvee.xbanana.my.id/api/transaksi_penjualan"
        //     this.$http.post(uri,this.penjualanproduk).then(response =>{
        //         this.snackbar = true; 
        //         this.text = response.data.message;
        //         this.text = 'Berhasil'; 
        //         this.color = 'green';
        //         this.dialog =false;
        //         this.getData();
        // }).catch(error =>{ 
        //      console.log(this.form)
        //     this.errors = error; 
        //     this.snackbar = true; 
        //     this.text = 'Masukan Data dengan Benar !'; 
        //     this.color = 'red';
        // })
        // },

        updateData(){      
            this.$v.editdetilform.$touch();
            if(this.$v.editdetilform.idproduk.$error) return alert('Produk Masih Kosong !')
            else if(this.$v.editdetilform.harga.$error) return alert('Harga Tidak Boleh Kosong dan Harus Angka !')
            else if(this.$v.editdetilform.jumlah.$error) return alert('Jumlah Tidak Boleh Kosong dan Harus Angka !')
            else if(this.$v.editdetilform.subtotal.$error) return alert('Subtotal Tidak Boleh Kosong dan Harus Angka !')
            axios.put("http://kouvee.xbanana.my.id/api/detil_penjualan/" + this.updatedId,{
                idproduk: this.editdetilform.idproduk,
                jumlah: this.editdetilform.jumlah,
                subtotal: this.editdetilform.subtotal,
            })
            .then(response =>{     
                this.snackbar = true; 
                this.text = response.data.message;
                this.text = 'Berhasil'; 
                this.color = 'green';
                this.load = false;
                this.dialog = false;
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
        
        updateBayar(){      
            this.$v.bayarform.$touch();  
            if(this.$v.bayarform.idtransaksipenjualan.$error) return alert('ID Transaksi Penjualan Masih Kosong !')
            else if(this.$v.bayarform.subtotal.$error) return alert('Subtotal Masih Kosong !')
            else if(this.$v.bayarform.uang.$error) return alert('Uang Customer Masih Kosong !')
            else if(this.$v.bayarform.diskon.$error) return alert('Diskon Masih Kosong !')
            else if(this.$v.bayarform.total.$error) return alert('Total Masih Kosong !')
            axios.put("http://kouvee.xbanana.my.id/api/transaksi_penjualan/" + this.updatedId,{
                diskon: this.bayarform.diskon,
                total: this.bayarform.total,
            })
            .then(response =>{     
                this.snackbar = true; 
                this.text = response.data.message;
                this.text = 'Berhasil'; 
                this.color = 'green';
                this.load = false;
                this.dialogBayar = false;
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

        bayarHandler(item){
            this.dialogBayar = true;
            this.bayarform.diskon = item.diskon;
            this.bayarform.total = item.total;
            this.updatedId = item.idtransaksipenjualan;
        },

        editHandler(item){
            this.typeInput = 'edit';
            this.dialog = true;
            this.editdetilform.idproduk = item.idproduk;
            this.editdetilform.jumlah = item.jumlah;
            this.editdetilform.subtotal = item.subtotal;
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
            },
            this.bayarform ={
                idtransaksipenjualan: '',
                subtotal: '',
                diskon: '',
                total: '',
                uang: '',
                harga: '',
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