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
                            Tambah Transaksi Pemesanan 
                        </v-btn>
                        <!-- <v-btn depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        @click="detilDialog = true"
                        >
                        <v-icon size="18" class="mr-2">mdi-plus</v-icon> 
                            Tambah Detil Transaksi 
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
                    :items="pemesananproduks"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.idpemesanan }}</td>
                            <td>{{ item.noPO}}</td>
                            <td>{{ item.idsupplier}}</td>
                            <td>{{ item.idpegawai}}</td>
                            <td>{{ item.tglpesan}}</td>
                            <td>{{ item.tglcetak}}</td>
                            <td>{{ item.status}}</td>
                            <td class="text-center">
                                <v-btn 
                                icon 
                                color="indigo" 
                                light
                                @click="tambahDetilHandler(item)"
                                >
                                <v-icon>mdi-plus-box-outline
                                </v-icon>
                                </v-btn>
                                <v-btn 
                                icon 
                                color="indigo" 
                                light
                                @click="editHandler(item)"
                                >
                                <v-icon>mdi-update</v-icon>
                                </v-btn>
                            </td>   
                            <td class="text-center">
                                <v-btn 
                                icon 
                                color="error" 
                                light
                                @click="deleteData(item.idpemesanan)"
                                >
                                <v-icon>mdi-delete</v-icon>
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
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
        </v-container>
    </v-card>
    <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Detil Pemesanan Produk</h2> 
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
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
                            <td>{{ item.idpemesanan }}</td>
                            <td>{{ item.idproduk}}</td>
                            <td>{{ item.jumlah}}</td>
                            <td>{{ item.satuan}}</td>
                            <td class="text-center">
                                <v-btn 
                                icon 
                                color="indigo" 
                                light
                                @click="editDetilHandler(item)"
                                >
                                <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn 
                                icon 
                                color="error" 
                                light
                                @click="deleteDetil(item.iddetilpemesanan)"
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
            <span class="headline">Transaksi Pemesanan Produk</span>
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
                            :class="{ 'hasError': $v.form.idsupplier.$error }"
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
                                :class="{ 'hasError': $v.form.tglpesan.$error }"
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
                            :class="{ 'hasError': $v.form.status.$error }"
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

<v-dialog v-model="dialogEdit" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Edit Transaksi Pemesanan Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                     <v-row>
                    <v-col cols="12">
                        <span>Apakah anda yakin ingin membarui status pemesanan menjadi Diterima?</span>
                    </v-col>
                    </v-row>
                    <!-- <v-col cols="12">
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
                                :class="{ 'hasError': $v.form.tglpesan.$error }"
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="form.tglpesan" @input="menuDate = false"></v-date-picker>
                        </v-menu>
                    </v-col>    -->
                    <!-- <v-col cols="12">
                        <v-select
                            :items="status"
                            v-model="form.status"
                            label="Status*"
                            :class="{ 'hasError': $v.form.status.$error }"
                        >
                        </v-select>  
                    </v-col> -->
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogEdit = false">Tutup</v-btn>
            <v-btn color="blue darken-1" text @click="setForm()">Ya</v-btn> 
        </v-card-actions>
    </v-card>
</v-dialog>

<v-dialog v-model="detilDialog" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Transaksi Pemesanan Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                    <v-col cols="12">
                        <v-select 
                            :items="pemesananproduks"
                            v-model="detilform.idpemesanan"
                            label="ID Pemesanan"
                            item-text="noPO"
                            item-value="idpemesanan"
                            :class="{ 'hasError': $v.detilform.idpemesanan.$error }"
                            >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-select 
                            :items="produks"
                            v-model="detilform.idproduk"
                            label="Produk"
                            item-text="nama"
                            item-value="idproduk"
                            :class="{ 'hasError': $v.detilform.idproduk.$error }"
                            >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <label for="jumlah">Jumlah*</label>
                        <v-text-field v-model="detilform.jumlah" :class="{ 'hasError': $v.detilform.jumlah.$error }"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                    <v-select
                            :items="satuan"
                            v-model="detilform.satuan"
                            label="Satuan*"
                            :class="{ 'hasError': $v.detilform.satuan.$error }"
                        >
                    </v-select>  
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="detilDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="detilPemesanan()">Save</v-btn> 
        </v-card-actions>
    </v-card>
</v-dialog>

<v-dialog v-model="editDetilDialog" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Edit Detil Pemesanan Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                 <v-row>
                    <v-col cols="12">
                        <v-select 
                            :items="produks"
                            v-model="detilform.idproduk"
                            label="Produk"
                            item-text="nama"
                            item-value="idproduk"
                            :class="{ 'hasError': $v.detilform.idproduk.$error }"
                            >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <label for="jumlah">Jumlah*</label>
                        <v-text-field v-model="detilform.jumlah" :class="{ 'hasError': $v.detilform.jumlah.$error }"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                    <v-select
                            :items="satuan"
                            v-model="detilform.satuan"
                            label="Satuan*"
                            :class="{ 'hasError': $v.detilform.satuan.$error }"
                        >
                    </v-select>  
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="editDetilDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="updateDetil()">Save</v-btn> 
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
import { required,numeric } from "vuelidate/lib/validators";
import axios from 'axios'
export default {
    data () {
        return {
            status: ["Dipesan"],
            satuan: ["Pcs"],
            viewDialog: false,
            dialog: false,
            detilDialog: false,
            editDetilDialog: false,
            dialogEdit: false,
            keyword: '',
            detilkeyword: '',
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
                    text: 'ID Supplier',
                    value: 'idsupplier'
                    },
                    {
                    text: 'ID Pegawai',
                    value: 'idpegawai'
                    },
                    {
                    text: 'Tanggal Pesan',
                    value: 'tglpesan',
                    },
                    {
                    text: 'Tanggal Cetak',
                    value: 'tglcetak',
                    },
                    {
                    text: 'Status',
                    value: 'status',
                    },
            ],
            detilheaders: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID Pemesanan',
                    value: 'idpemesanan',
                    },
                    {
                    text: 'Produk',
                    value: 'produk'
                    },
                    {
                    text: 'Jumlah',
                    value: 'jumlah'
                    },
                    {
                    text: 'Satuan',
                    value: 'satuan',
                    },
            ],
            pemesananproduks: [],
            suppliers: [],
            pegawais:[],
            produks:[],
            detils:[],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                idsupplier : '',
                tglpesan : '',
                status : '',
            },
            pemesananproduk : new FormData,
            detilpemesanan : new FormData,
            detilform:{
                idproduk:'',
                jumlah:'',
                satuan:'',
                idpemesanan:'',
            },
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    validations: {
        form: {
            idsupplier: { required },
            tglpesan: { required },
            tglcetak: { required },
            status: { required },
        },
        detilform: {
            idpemesanan: {required},
            idproduk: {required},
            jumlah: {required,numeric},
            satuan: {required},
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
        getDataSupplier(){
            axios.get("http://kouvee.xbanana.my.id/api/supplier")
            .then(
                response => {this.suppliers = response.data},
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
            axios.get("http://kouvee.xbanana.my.id/api/detil_pemesanan")
            .then(
                response => {this.detils = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },

        sendData(){
            this.$v.form.$touch();
            this.pemesananproduk.append('noPO', this.form.noPO);
            this.pemesananproduk.append('idpegawai', this.$session.get('dataPegawai').idpegawai);
            this.pemesananproduk.append('tglpesan', this.form.tglpesan);
            this.pemesananproduk.append('status', this.form.status);
            this.pemesananproduk.append('idsupplier', this.form.idsupplier);
            if(this.$v.form.idsupplier.$error) return alert('Supplier Masih Kosong !')
            else if(this.$v.form.tglpesan.$error) return alert('Tanggal Pesan Masih Kosong !')
            else if(this.$v.form.status.$error) return alert('Status Tidak Boleh Kosong !')
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
            this.text = 'Masukan Data dengan Benar !'; 
            this.color = 'red';
        })
        },
        
        detilPemesanan(){
            this.$v.detilform.$touch();
            this.detilpemesanan.append('idproduk', this.detilform.idproduk);
            this.detilpemesanan.append('jumlah', this.detilform.jumlah);
            this.detilpemesanan.append('satuan', this.detilform.satuan);
            this.detilpemesanan.append('idpemesanan', this.detilform.idpemesanan);
            if(this.$v.detilform.idpemesanan.$error) return alert('ID Pemesanan Tidak Boleh Kosong !')
            else if(this.$v.detilform.idproduk.$error) return alert('Produk Masih Kosong !')
            else if(this.$v.detilform.jumlah.$error) return alert('Jumlah Masih Kosong dan Harus Angka!')
            else if(this.$v.detilform.satuan.$error) return alert('Satuan Tidak Boleh Kosong !')
            var uri = "http://kouvee.xbanana.my.id/api/detil_pemesanan"
            this.$http.post(uri,this.detilpemesanan).then(response =>{
                this.snackbar = true; 
                this.text = response.data.message;
                this.text = 'Berhasil'; 
                this.color = 'green';
                this.detilDialog =false;
                this.getData();
        }).catch(error =>{ 
             console.log(this.detilform)
            this.errors = error; 
            this.snackbar = true; 
            this.text = 'Masukan Data dengan Benar !'; 
            this.color = 'red';
        })
        },

        updateData(){      
            axios.put("http://kouvee.xbanana.my.id/api/pemesanan_barang/" + this.updatedId,{
                idpegawai: this.$session.get('dataPegawai').idpegawai,
                tglpesan: this.form.tglpesan,
                status: "Diterima",
            })
            .then(response =>{     
                this.snackbar = true; 
                this.text = response.data.message;
                this.text = 'Berhasil'; 
                this.color = 'green';
                this.load = false;
                this.dialogEdit = false;
                this.getData(); 
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

        updateDetil(){      
            axios.put("http://kouvee.xbanana.my.id/api/detil_pemesanan/" + this.updatedId,{
                idproduk: this.detilform.idproduk,
                jumlah: this.detilform.jumlah,
                satuan: this.detilform.satuan,
            })
            .then(response =>{     
                this.snackbar = true; 
                this.text = response.data.message;
                this.text = 'Berhasil'; 
                this.color = 'green';
                this.load = false;
                this.editDetilDialog = false;
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
            this.typeInput = 'edit';
            this.dialogEdit = true;
            this.form.idpegawai = item.idpegawai;
            this.form.tglpesan = item.tglpesan;
            this.form.status = item.status;
            this.updatedId = item.idpemesanan;
        },

        editDetilHandler(item){
            this.editDetilDialog = true;
            this.detilform.idproduk = item.idproduk;
            this.detilform.jumlah = item.jumlah;
            this.detilform.satuan = item.satuan;
            this.detilform.idpemesanan = item.idpemesanan;
            this.updatedId = item.iddetilpemesanan;
        },

        tambahDetilHandler(item){
            this.detilDialog = true;
            this.detilform.idproduk=item.idproduk
            this.detilform.jumlah=item.jumlah
            this.detilform.satuan=item.satuan
            this.detilform.idpemesanan=item.idpemesanan
        },

        printHandler(item){
            axios({
                url: 'http://kouvee.xbanana.my.id/pemesanan_barang/cetak_struk/' + item.idpemesanan,
                method: 'GET',
                responseType: 'blob', // important
                }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'pemesananbarang.pdf');
                document.body.appendChild(link);
                link.click();
            });

        },

        deleteData(deleteId){
            const confirmBox = confirm("Apakah anda yakin untuk menghapus?")
            if(confirmBox){
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
                    this.text='Masukan Data dengan Benar !';
                    this.color='red';
                })
            }
        },

        deleteDetil(deleteId){
            const confirmBox = confirm("Apakah anda yakin untuk menghapus?")
            if(confirmBox){
            var uri="http://kouvee.xbanana.my.id/api/detil_pemesanan/"+deleteId;
            this.$http.delete(uri).then(response =>{
                this.snackbar=true;
                this.text = response.data.message;
                this.text="Berhasil";
                this.color='green'
                this.deleteDialog=false;
                this.getDataDetil();
                }).catch(error=>{
                    this.errors=error 
                    this.snackbar=true;
                    this.text='Masukan Data dengan Benar !';
                    this.color='red';
                })
            }
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
                idsupplier : '',
                idpegawai : '',
                tglpesan : '',
                tglcetak : '',
                status : '',
            }
        }
        },

        mounted(){
            this.getData();
            this.getDataSupplier();
            this.getDataPegawai();
            this.getDataProduk();
            this.getDataDetil();
        },
    }
</script>