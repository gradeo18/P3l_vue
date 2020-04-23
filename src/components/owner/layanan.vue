<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Layanan</h2> 
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
                            Tambah Layanan
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
                    :items="layanans"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.idlayanan }}</td>
                            <td>{{ item.nama}}</td>
                            <td>{{ item.harga}}</td>
                            <td>{{ item.created_at}}</td>
                            <td>{{ item.updated_at}}</td>
                            <td>{{ item.deleted_at}}</td>
                            <td>{{ item.aktor}} </td>
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
                                @click="deleteData(item.idlayanan)"
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
            <span class="headline">Layanan</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                    <v-select
                            :items="layananselect"
                            v-model="form.nama"
                            label="Nama Layanan Hewan*"
                        />  
                    </v-col>
                    <v-col cols="12">
                        <v-select
                            :items="hargaselect"
                            v-model="form.harga"
                            label="Harga Layanan Hewan*"
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
            layananselect: ['Grooming','Penitipan','Potong Bulu'],
            hargaselect: ['50000','100000','150000'],
            headers: [
                {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID Layanan',
                    value: 'idlayanan'
                    },
                    {
                    text: 'Nama Layanan',
                    value: 'nama'
                    },
                    {
                    text: 'Harga',
                    value: 'harga'
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
            layanans: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                nama : '',
                harga : '',
            },
            layanan : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    methods:{
        getData(){
            axios.get("http://kouvee.xbanana.my.id/api/layanan")
            .then(
                response => {this.layanans = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },

        sendData(){
            this.layanan.append('nama', this.form.nama);
            this.layanan.append('harga', this.form.harga);
            this.layanan.append('aktor', this.$session.get('dataPegawai').idpegawai);
            var uri = "http://kouvee.xbanana.my.id/api/layanan"
            this.$http.post(uri,this.layanan).then(response =>{
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
            axios.put("http://kouvee.xbanana.my.id/api/layanan/" + this.updatedId,{
                nama: this.form.nama,
                harga: this.form.harga,
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
            this.form.harga = item.harga;
            this.updatedId = item.idlayanan;
            this.aktor = this.$session.get('dataPegawai').idpegawai;
        },

        deleteData(deleteId){
            const confirmBox = confirm("Are you sure want remove?")
            if(confirmBox)
            var uri="http://kouvee.xbanana.my.id/api/layanan/"+deleteId;
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
                name : '',
                merek : '',
                amount : '',
            }
        }
        },

        mounted(){
            this.getData();
        },
    }
</script>