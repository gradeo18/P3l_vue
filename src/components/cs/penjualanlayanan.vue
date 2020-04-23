<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Transaksi Layanan</h2> 
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
                            Tambah Transaksi Layanan 
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
                    :items="penjualanlayanans"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.idtransaksipelayanan }}</td>
                            <td>{{ item.noLY}}</td>
                            <td>{{ item.idpegawai}}</td>
                            <td>{{ item.idhewan}}</td>
                            <td>{{ item.idcustomer.nama}}</td>
                            <td>{{ item.status}}</td>
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
    <v-dialog v-model="dialog" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Transaksi penjualan Layanan</span>
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
                    <v-col cols="12">
                        <v-select
                            :items="status"
                            v-model="form.status"
                            label="Status*"
                            :class="{ 'hasError': $v.form.status.$error }"
                        >
                        </v-select>  
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Diskon*" v-model="form.diskon" :class="{ 'hasError': $v.form.diskon.$error }"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Total*" v-model="form.total" :class="{ 'hasError': $v.form.total.$error }"></v-text-field>
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
import { required, numeric } from "vuelidate/lib/validators";
import axios from 'axios'
export default {
    data () {
        return {
            dialog: false,
            keyword: '',
            status: ['Diproses','Selesai'],
            headers: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID Transaksi Pelayanan',
                    value: 'idtransaksipelayanan',
                    },
                    {
                    text: 'No Layanan',
                    value: 'noLY'
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
                    value: 'status',
                    },
                    {
                    text: 'Diskon',
                    value: 'diskon',
                    },
                    {
                    text: 'Total',
                    value: 'total',
                    },
            ],
            penjualanlayanans: [],
            pegawais:[],
            hewans: [],
            customers: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                idpegawai : '',
                idhewan : '',
                diskon : '',
                status : '',
                total : '',
            },
            penjualanlayanan : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    validations: {
        form: {
            status: { required },
            diskon: { required, numeric },
            total: { required, numeric },
            idcustomer: { required },
            idhewan: { required },
        }
    },
    methods:{
        getData(){
            axios.get("http://kouvee.xbanana.my.id/api/transaksi_pelayanan")
            .then(
                response => {this.penjualanlayanans = response.data},
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
        getDataPegawai(){
            axios.get("http://kouvee.xbanana.my.id/api/pegawai")
            .then(
                response => {this.pegawais = response.data},
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
        sendData(){
            this.$v.form.$touch();
            this.penjualanlayanan.append('noLY', this.form.noLY);
            this.penjualanlayanan.append('idpegawai', this.$session.get('dataPegawai').idpegawai);
            this.penjualanlayanan.append('idhewan', this.form.idhewan);
            this.penjualanlayanan.append('idcustomer', this.form.idcustomer);
            this.penjualanlayanan.append('status', this.form.status);
            this.penjualanlayanan.append('diskon', this.form.diskon);
            this.penjualanlayanan.append('total', this.form.total);
            if(this.$v.form.idhewan.$error) return alert('Hewan Masih Kosong !')
            else if(this.$v.form.idcustomer.$error) return alert('Customer Masih Kosong !')
            else if(this.$v.form.status.$error) return alert('Status Masih Kosong !')
            else if(this.$v.form.diskon.$error) return alert('Diskon Tidak Boleh Kosong dan Harus Angka !')
            else if(this.$v.form.total.$error) return alert('Total Tidak Boleh Kosong dan Harus Angka !')
            var uri = "http://kouvee.xbanana.my.id/api/transaksi_pelayanan"
            this.$http.post(uri,this.penjualanlayanan).then(response =>{
                console.log(this.form)
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
            axios.put("http://kouvee.xbanana.my.id/api/transaksi_pelayanan/" + this.updatedId,{
                idpegawai: this.$session.get('dataPegawai').idpegawai,
                idhewan: this.form.idhewan,
                idcustomer: this.form.idcustomer,
                status: this.form.status,
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
            this.form.idhewan = item.idhewan;
            this.form.idcustomer = item.idcustomer;
            this.form.status = item.status;
            this.form.diskon = item.diskon;
            this.form.total = item.total;
            this.updatedId = item.idtransaksipelayanan;
        },
        deleteData(deleteId){
            const confirmBox = confirm("Are you sure want remove?")
            if(confirmBox){
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
                idpegawai : '',
                idhewan : '',
                idcustomer: '',
                status : '',
                diskon : '',
                total   : '',
            }
        }
        },
        mounted(){
            this.getData();
            this.getDataHewan();
            this.getDataPegawai();
            this.getDataCustomer();
        },
    }
</script>
