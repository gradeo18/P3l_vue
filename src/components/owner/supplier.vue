<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Supplier</h2> 
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
                            Tambah Supplier
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
                    :items="suppliers"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.idsupplier }}</td>
                            <td>{{ item.nama}}</td>
                            <td>{{ item.alamat}}</td>
                            <td>{{ item.notelp}}</td>
                            <td>{{ item.created_at}}</td>
                            <td>{{ item.updated_at}}</td>
                            <td>{{ item.deleted_at}}</td>
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
                                @click="deleteData(item.idsupplier)"
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
            <span class="headline">Supplier</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Nama*" v-model="form.nama" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Alamat*" v-model="form.alamat" required></v-text-field> 
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="NoTelp*" v-model="form.notelp" required></v-text-field>
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
            headers: [
                {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID Supplier',
                    value: 'idsupplier'
                    },
                    {
                    text: 'Nama Supplier',
                    value: 'nama'
                    },
                    {
                    text: 'Alamat',
                    value: 'alamat'
                    },
                    {
                    text: 'No Telpon',
                    value: 'notelp',
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
                    text: 'Deleted At',
                    value: 'deleted_at'
                    },   
            ],
            suppliers: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                nama : '',
                alamat : '',
                notelp : '',
            },
            supplier : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',     
        }
    },
    methods:{
        getData(){
            axios.get("http://kouvee.xbanana.my.id/api/supplier")
            .then(
                response => {this.suppliers = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },

        sendData(){
            this.supplier.append('nama', this.form.nama);
            this.supplier.append('alamat', this.form.alamat);
            this.supplier.append('notelp', this.form.notelp);
            var uri = "http://kouvee.xbanana.my.id/api/supplier"
            this.$http.post(uri,this.supplier).then(response =>{
                this.snackbar = true; 
                this.text = response.data.message;
                this.text = 'Berhasil'; 
                this.color = 'green';
                this.dialog =false;
                this.getData();
        }).catch(error =>{ 
            this.errors = error; 
            this.snackbar = true; 
            this.text = 'Try Again'; 
            this.color = 'red';
        })
        },


        updateData(){      
            axios.put("http://kouvee.xbanana.my.id/api/supplier/" + this.updatedId,{
                nama: this.form.nama,
                alamat: this.form.alamat,
                notelp: this.form.notelp
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
            this.form.nama = item.nama;
            this.form.alamat = item.alamat;
            this.form.notelp = item.notelp;
            this.updatedId = item.idsupplier
        },

        deleteData(deleteId){
            const confirmBox = confirm("Are you sure want remove?")
            if(confirmBox)
            var uri="http://kouvee.xbanana.my.id/api/supplier/"+deleteId;
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
                nama : '',
                merek : '',
                notelp : '',
            }
        }
        },

        mounted(){
            this.getData();
        },
    }
</script>