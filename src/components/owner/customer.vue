<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Customer</h2> 
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
                            Tambah Customer
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
                    :items="customers"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.idcustomer }}</td>
                            <td>{{ item.nama}}</td>
                            <td>{{ item.tgllahir}}</td>
                            <td>{{ item.notelp}}</td>
                            <td>{{ item.alamat}}</td>
                            <td>{{ item.created_at}}</td>
                            <td>{{ item.updated_at}}</td>
                            <td>{{ item.aktor}}</td>
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
                                @click="deleteData(item.idcustomer)"
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
            <span class="headline">Customer</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Nama Customer*" v-model="form.nama" :class="{ 'hasError': $v.form.nama.$error }"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-menu
                            v-model="menuDate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="form.tgllahir"
                                label="Tanggal Lahir*"
                                readonly
                                v-on="on"
                                :class="{ 'hasError': $v.form.tgllahir.$error }"
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="form.tgllahir" @input="menuDate = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="No.Telp*" v-model="form.notelp" counter maxlength="12" :class="{ 'hasError': $v.form.notelp.$error }"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Alamat*" v-model="form.alamat" :class="{ 'hasError': $v.form.alamat.$error }"></v-text-field>
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
import { required, numeric, minLength, maxLength } from "vuelidate/lib/validators";
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
                    text: 'ID Customer',
                    value: 'idcustomer'
                    },
                    {
                    text: 'Nama Customer',
                    value: 'nama'
                    },
                    {
                    text: 'Tanggal Lahir',
                    value: 'tgllahir',
                    },
                    {
                    text: 'Nomor Telepon',
                    value: 'notelp'
                    },
                    {
                    text: 'Alamat',
                    value: 'alamat',
                    },
                    {
                    text: 'Created At',
                    value: 'created_at',
                    },
                    {
                    text: 'Updated At',
                    value: 'updated_at',
                    },
                    {
                    text: 'Aktor',
                    value: 'aktor',
                    },   
            ],
            customers: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                nama : '',
                tgllahir : '',
                notelp : '',
                alamat : '',
            },
            customer : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    validations: {
        form: {
            nama: { required },
            tgllahir: { required },
            notelp: { required, numeric, minLength: minLength(6), maxLength: maxLength(12)},
            alamat: { required },
        }
    },
    methods:{
        getData(){
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
            this.customer.append('nama', this.form.nama);
            this.customer.append('tgllahir', this.form.tgllahir);
            this.customer.append('alamat', this.form.alamat);
            this.customer.append('notelp', this.form.notelp);
            this.customer.append('aktor', this.$session.get('dataPegawai').idpegawai);
            if(this.$v.form.nama.$error) return alert('Nama Masih Kosong !')
            else if(this.$v.form.tgllahir.$error) return alert('Tanggal Lahir Masih Kosong !')
            else if(this.$v.form.notelp.$error) return alert('No Telp Masih Kosong dan Harus Angka (6-12 digit) !')
            else if(this.$v.form.alamat.$error) return alert('Diskon Tidak Boleh Kosong dan Harus Angka !')
            var uri = "http://kouvee.xbanana.my.id/api/customer"
            this.$http.post(uri,this.customer).then(response =>{
                this.snackbar = true; 
                this.text = response.data.message;
                this.text = 'Berhasil'; 
                this.color = 'green';
                this.dialog =false;
                this.getData();
        }).catch(error =>{ 
            this.errors = error; 
            this.snackbar = true; 
            this.text = 'Masukan Data dengan Benar !'; 
            this.color = 'red';
        })
        },

        updateData(){      
            axios.put("http://kouvee.xbanana.my.id/api/customer/" + this.updatedId,{
                nama: this.form.nama,
                tgllahir: this.form.tgllahir,
                alamat: this.form.alamat,
                notelp: this.form.notelp,
                aktor: this.$session.get('dataPegawai').idpegawai,
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
            this.form.nama = item.nama;
            this.form.notelp = item.notelp;
            this.form.alamat = item.alamat;
            this.form.tgllahir = item.tgllahir;
            this.updatedId = item.idcustomer;
            this.aktor = item.aktor;
        },

        deleteData(deleteId){
            const confirmBox = confirm("Are you sure want remove?")
            if(confirmBox){
            var uri="http://kouvee.xbanana.my.id/api/customer/"+deleteId;
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
                nama : '',
                alamat : '',
                notelp : '',
                tgllahir : '',
            }
        }
        },

        mounted(){
            this.getData();
        },
    }
</script>