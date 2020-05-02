<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Transaksi Pembayaran Layanan</h2> 
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
                            Tambah Transaksi Layanan 
                        </v-btn> -->
                        <!-- <v-btn depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        @click="dialogDetil = true"
                        >
                        <v-icon size="18" class="mr-2">mdi-plus</v-icon> 
                            Tambah Detil Layanan 
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
                    :items="penjualanlayanans"
                    :detailrows="detils"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.idtransaksipelayanan}} </td>
                            <td>{{ item.noLY}}</td>
                            <td>{{ item.tanggaltransaksi}} </td>
                            <td>{{ item.idpegawai}}</td>
                            <td>{{ item.idhewan}}</td>
                            <td>{{ item.idcustomer}}</td>
                            <td>{{ item.status}} </td>   
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
                                @click="deleteData(item.idtransaksipelayanan)"
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
                <h2 class="text-md-center">Detil Pembayaran Layanan</h2> 
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
                            <td>{{ item.idtransaksipelayanan}}</td>  
                            <td>{{ item.iddetilpelayanan}}</td>
                            <td>{{ item.idlayanan}} </td>
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
                                @click="deleteDetil(item.iddetilpelayanan)"
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
            <span class="headline">Transaksi Layanan</span>
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
    <!-- DIALOG EDIT -->
    <v-dialog v-model="dialogEdit" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Edit Transaksi Layanan</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
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
            <v-btn color="blue darken-1" text @click="dialogEdit = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn> 
        </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDetil" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Detil Transaksi Layanan</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                    <!-- <v-col cols="12">
                        <v-select 
                            :items="penjualanlayanans"
                            v-model="detilform.idtransaksipelayanan"
                            label="ID Transaksi Pelayanan"
                            item-text="noLY"
                            item-value="idtransaksipelayanan"
                            :class="{ 'hasError': $v.detilform.idtransaksipelayanan.$error }"
                        >
                        </v-select>
                    </v-col> -->
                    <v-col cols="12">
                        <v-select 
                            :items="layanans"
                            v-model="detilform.idlayanan"
                            label="Layanan"
                            item-text="nama"
                            item-value="idlayanan"
                            :class="{ 'hasError': $v.detilform.idlayanan.$error }"
                        >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <label for="harga">Harga*</label>
                        <v-select v-if="detilform.idlayanan"
                            :items="layanans.filter(item => item.idlayanan === detilform.idlayanan)"
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
                        <v-text-field v-model="detilform.subtotal" :class="{ 'hasError': $v.detilform.subtotal.$error }" >{{detilform.subtotal=detilform.harga * detilform.jumlah}}</v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogDetil = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="detilPelayanan()">Save</v-btn> 
        </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- DIALOG EDIT DETIL PEMBAYARAN -->
    <v-dialog v-model="dialog" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Edit Detil Pembayaran Layanan</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                    <v-col cols="12">
                        <v-autocomplete
                            :items="layanans"
                            :filter="customFilter"
                            v-model="editdetilform.idlayanan"
                            color="white"
                            item-text="nama"
                            item-value="idlayanan"
                            label="Produk*"
                            :class="{ 'hasError': $v.editdetilform.idlayanan.$error }"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                        <label for="harga">Harga*</label>
                        <v-select v-if="editdetilform.idlayanan"
                            :items="layanans.filter(item => item.idlayanan === editdetilform.idlayanan)"
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
    <!-- Dialog Bayar -->
    <v-dialog v-model="dialogBayar" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Pembayaran Layanan</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                     <v-col cols="12">
                        <v-select 
                            :items="detils"
                            v-model="bayarform.idtransaksipelayanan"
                            label="ID Transaksi Pelayanan"
                            item-text="idtransaksipelayanan"
                            item-value="idtransaksipelayanan"
                            :class="{ 'hasError': $v.bayarform.idtransaksipelayanan.$error }"
                            >
                        </v-select>
                    </v-col>
                     <v-col cols="12">
                        <v-autocomplete  v-if="bayarform.idtransaksipelayanan"
                            :multiple="true"
                            :items="detils.filter(item => item.idtransaksipelayanan === bayarform.idtransaksipelayanan)"
                            :filter="customFilter"
                            v-model="bayarform.subtotal"
                            color="white"
                            item-text="subtotal"
                            item-value="subtotal"
                            label="Subtotal*"
                            :class="{ 'hasError': $v.bayarform.subtotal.$error }"
                        ></v-autocomplete>
                    </v-col>
                    <!-- <v-col cols="12">
                        <label for="diskon">Subtotal*</label>
                        <v-text-field v-model="sum" readonly></v-text-field>
                    </v-col> -->
                    <v-col cols="12">
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
            dialogEdit: false,
            keyword: '',
            headers: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID Penjualan Layanan',
                    value: 'idtransaksipelayanan',
                    },
                    {
                    text: 'No Layanan',
                    value: 'noLY'
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
                    text: 'Status',
                    value: 'status'
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
                    },
                    {
                    text: '',sortable: false
                    },
            ],
            detilheaders: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID Penjualan Layanan',
                    value: 'idpelayanan'
                    },
                    {
                    text: 'ID Detil Pelayanan',
                    value: 'iddetilpelayanan'
                    },
                    {
                    text: 'Jenis Layanan',
                    value: 'idlayanan'
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
            penjualanlayanans: [],
            pegawais: [],
            hewans: [],
            customers: [],
            layanans: [],
            detils: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                idpegawai: '',
                idhewan : '',
                idcustomer: '',
                status: '',
                diskon : '',
                total : '',
            },
            detilform: {
                idtransaksipelayanan: '',
                idlayanan : '',
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
                idlayanan: '',
                harga: '',
                jumlah: '',
                subtotal: '',
            },
            penjualanlayanan : new FormData,
            detillayanan : new FormData,
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
            status: { required },
        },
        detilform: {
            idtransaksipelayanan: {required},
            idlayanan: {required},
            jumlah: {required, numeric},
            subtotal: {required, numeric},
        },
        bayarform:{
            idtransaksipelayanan: {required},
            subtotal: {required,numeric},
            diskon: { required, numeric },
            total: { required, numeric },
            uang: {required},
            harga: {required},
            kembalian: {required},
        },
        editdetilform:{
            idlayanan: {required},
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
                url: 'http://kouvee.xbanana.my.id/transaksi_pelayanan/cetak_struk/' + item.idtransaksipelayanan,
                method: 'GET',
                responseType: 'blob', // important
                }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'penjualanLayanan.pdf');
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
            axios.get("http://kouvee.xbanana.my.id/api/transaksi_pelayanan")
            .then(
                response => {this.penjualanlayanans = response.data},
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
        getDataLayanan(){
            axios.get("http://kouvee.xbanana.my.id/api/layanan")
            .then(
                response => {this.layanans = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },
        getDataDetil(){
            axios.get("http://kouvee.xbanana.my.id/api/detil_pelayanan")
            .then(
                response => {this.detils = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },

        sendData(){
            this.$v.form.$touch();
            this.penjualanlayanan.append('noLY', this.form.noLY);
            this.penjualanlayanan.append('idpegawai', this.$session.get('dataPegawai').idpegawai);
            this.penjualanlayanan.append('idhewan', this.form.idhewan);
            this.penjualanlayanan.append('idcustomer', this.form.idcustomer);
            this.penjualanlayanan.append('status', "Diproses");
            this.penjualanlayanan.append('diskon', "0");
            this.penjualanlayanan.append('total', "0");
            if(this.$v.form.idhewan.$error) return alert('Hewan Masih Kosong !')
            else if(this.$v.form.idcustomer.$error) return alert('Customer Masih Kosong !')
            // else if(this.$v.form.diskon.$error) return alert('Diskon Tidak Boleh Kosong dan Harus Angka !')
            // else if(this.$v.form.total.$error) return alert('Total Tidak Boleh Kosong dan Harus Angka !')
            var uri = "http://kouvee.xbanana.my.id/api/transaksi_pelayanan"
            this.$http.post(uri,this.penjualanlayanan).then(response =>{
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

        detilPelayanan(){
            this.$v.detilform.$touch();
            this.detillayanan.append('idlayanan', this.detilform.idlayanan);
            this.detillayanan.append('jumlah', this.detilform.jumlah);
            this.detillayanan.append('subtotal', this.detilform.subtotal);
            this.detillayanan.append('idtransaksipelayanan', this.detilform.idtransaksipelayanan);
            if(this.$v.detilform.idtransaksipelayanan.$error) return alert('ID Transaksi Pelayanan Tidak Boleh Kosong !')
            else if(this.$v.detilform.idlayanan.$error) return alert('ID Layanan Penjualan Masih Kosong !')
            else if(this.$v.detilform.jumlah.$error) return alert('Jumlah Masih Kosong dan Harus Angka !')
            else if(this.$v.detilform.subtotal.$error) return alert('Subtotal Tidak Boleh Kosong dan Harus Angka !')            
            var uri = "http://kouvee.xbanana.my.id/api/detil_pelayanan"
            this.$http.post(uri,this.detillayanan).then(response =>{
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

        updateData(){      
            this.$v.editdetilform.$touch();
            if(this.$v.editdetilform.idlayanan.$error) return alert('Layanan Masih Kosong !')
            else if(this.$v.editdetilform.harga.$error) return alert('Harga Tidak Boleh Kosong dan Harus Angka !')
            else if(this.$v.editdetilform.jumlah.$error) return alert('Jumlah Tidak Boleh Kosong dan Harus Angka !')
            else if(this.$v.editdetilform.subtotal.$error) return alert('Subtotal Tidak Boleh Kosong dan Harus Angka !')
            axios.put("http://kouvee.xbanana.my.id/api/detil_pelayanan/" + this.updatedId,{
                idlayanan: this.editdetilform.idlayanan,
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
            if(this.$v.bayarform.idtransaksipelayanan.$error) return alert('ID Transaksi Penjualan Masih Kosong !')
            else if(this.$v.bayarform.subtotal.$error) return alert('Subtotal Masih Kosong !')
            else if(this.$v.bayarform.uang.$error) return alert('Uang Customer Masih Kosong !')
            else if(this.$v.bayarform.diskon.$error) return alert('Diskon Masih Kosong !')
            else if(this.$v.bayarform.total.$error) return alert('Total Masih Kosong !')
            axios.put("http://kouvee.xbanana.my.id/api/transaksi_pelayanan/" + this.updatedId,{
                status: "Sudah Dibayar",
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
            this.bayarform.status = item.status;
            this.bayarform.diskon = item.diskon;
            this.bayarform.total = item.total;
            this.updatedId = item.idtransaksipelayanan;
        },

        editHandler(item){
            this.typeInput = 'edit';
            this.dialog = true;
            this.editdetilform.idlayanan = item.idlayanan;
            this.editdetilform.jumlah = item.jumlah;
            this.editdetilform.subtotal = item.subtotal;
            this.updatedId = item.iddetilpelayanan;
        },

        tambahDetilHandler(item){
            this.dialogDetil = true;
            this.detilform.idtransaksipelayanan=item.idtransaksipelayanan
            this.detilform.idproduk=item.idproduk
            this.detilform.jumlah=item.jumlah
            this.detilform.subtotal=item.subtotal
        },

        deleteData(deleteId){
            const confirmBox = confirm("Apakah anda yakin untuk menghapus?")
            if(confirmBox)
            var uri="http://kouvee.xbanana.my.id/api/transaksi_pelayanan/"+deleteId;
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

        deleteDetil(deleteDetil){
            const confirmBox = confirm("Apakah anda yakin untuk menghapus?")
            if(confirmBox)
            var uri="http://kouvee.xbanana.my.id/api/detil_pelayanan/"+deleteDetil;
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
                status : '',
                diskon : '',
                total : '',
            },
            this.detilform={
                idtransaksipelayanan: '',
                idlayanan: '',
                jumlah: '',
                subtotal: '',
            }
        }
        },

        mounted(){
            this.getData();
            this.getDataPegawai();
            this.getDataHewan();
            this.getDataCustomer();
            this.getDataLayanan();
            this.getDataDetil();
        },
    }
</script>