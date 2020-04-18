<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Transaksi Pemesanan Produk</h2> 
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
                            <td>{{ item.noPO}}</td>
                            <td>{{ item.idpegawai}}</td>
                            <td>{{ item.tglpesan}}</td>
                            <td>{{ item.alamat}}</td>
                            <td>{{ item.notelp}}</td>
                            <td>{{ item.tglcetak}}</td>
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
                                @click="deleteData(item.idpemesanan)"
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
                      <!-- <v-col cols="12">
                        <v-select 
                            :items="pegawais"
                            v-model="form.idpegawai"
                            label="Pegawai"
                            item-text="nama"
                            item-value="idpegawai"
                            >
                        </v-select>    
                    </v-col> -->
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
                        <label for="gambar">Alamat*</label>
                        <v-text-field v-model="form.alamat" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="gambar">Nomor Telepon*</label>
                        <v-text-field v-model="form.notelp" required></v-text-field>
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
            dialog: false,
            keyword: '',
            status: ['Dipesan','Diterima'],
            headers: [  
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'Nomor PO',
                    value: 'noPO'
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
                    text: 'Alamat',
                    value: 'alamat'
                    },
                    {
                    text: 'Nomor Telepon',
                    value: 'notelp',
                    },
                    {
                    text: 'Tanggal Cetak',
                    value: 'tglcetak',
                    },
                    {
                    text: 'Status',
                    value: 'status',
                    }  
            ],
            pemesananproduks: [],
            pegawais: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                idpegawai: '',
                tglpesan : '',
                alamat : '',
                notelp : '',
                tglcetak : '',
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
        sendData(){
            this.pemesananproduk.append('noPO', this.form.noPO);
            this.pemesananproduk.append('idpegawai', this.$session.get('dataPegawai').idpegawai);
            this.pemesananproduk.append('tglpesan', this.form.tglpesan);
            this.pemesananproduk.append('alamat', this.form.alamat);
            this.pemesananproduk.append('notelp', this.form.notelp);
            this.pemesananproduk.append('tglcetak', this.form.tglcetak);
            this.pemesananproduk.append('status', this.form.status);
            var uri = "http://kouvee.xbanana.my.id/api/pemesanan_barang"
            this.$http.post(uri,this.produk).then(response =>{
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
                idpegawai : this.$session.get('dataPegawai').idpegawai,
                tglpesan : this.form.tglpesan,
                alamat : this.form.alamat,
                notelp :  this.form.notelp,
                tglcetak: this.form.tglcetak,
                status : this.form.status,
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
                this.fomr.idpegawai = item.idpegawai;
                this.form.tglpesan = item.tglpesan;
                this.form.alamat = item.alamat;
                this.form.notelp = item.notelp;
                this.form.tglcetak = item.tglcetak;
                this.status = item.status;
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
                idpegawai: '',
                tglpesan: '',
                alamat : '',
                notelp : '',
                tglcetak : '',
                status: '',
            }
        }
        },
        mounted(){
            this.getData();
            this.getDataPegawai();
        },
    }
</script>