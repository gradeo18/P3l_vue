<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Pegawai</h2> 
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
                            Tambah Pegawai
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
                    :items="pegawais"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.idpegawai }}</td>
                            <td>{{ item.nama}}</td>
                            <td>{{ item.tgllahir}}</td>
                            <td>{{ item.notelp}}</td>
                            <td>{{ item.alamat}}</td>
                            <td>{{ item.role}}</td>
                            <td>{{ item.username}}</td>
                            <td>{{ item.password}}</td>
                            <td>{{ item.created_at}}</td>
                            <td>{{ item.updated_at}}</td>
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
                                @click="deleteData(item.idpegawai)"
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
            <span class="headline">Pegawai</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Nama*" v-model="form.nama" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="No Telp*" v-model="form.notelp" required counter maxlength="12"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Alamat*" v-model="form.alamat" required></v-text-field>
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
                                v-model="form.tgllahir"
                                label="Tanggal*"
                                readonly
                                v-on="on"
                                required
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="form.tgllahir" @input="menuDate = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12">
                        <v-select
                            :items="roleselect"
                            v-model="form.role"
                            label="Role*"
                        /> 
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Username*" v-model="form.username" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field :type="'password'" label="Password*" v-model="form.password" required></v-text-field>
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
            roleselect: ['Owner','Kasir','CS'],
            headers: [
                {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID Pegawai',
                    value: 'idpegawai'
                    },
                    {
                    text: 'Nama Pegawai',
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
                    text: 'Role',
                    value: 'role',
                    },
                    {
                    text: 'Username',
                    value: 'username',
                    },
                    {
                    text: 'Password',
                    value: 'password',
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
                    }   
            ],
            pegawais: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                nama : '',
                notelp : '',
                alamat : '',
                role : '',
                tgllahir : '',
            },
            pegawai : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    methods:{
        getData(){
            axios.get("http://kouvee.xbanana.my.id/api/pegawai")
            .then(
                response => {this.pegawais = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },

        sendData(){
            this.pegawai.append('nama', this.form.nama);
            this.pegawai.append('notelp', this.form.notelp);
            this.pegawai.append('alamat', this.form.alamat);
            this.pegawai.append('tgllahir', this.form.tgllahir);
            this.pegawai.append('role', this.form.role);
            this.pegawai.append('username', this.form.username);
            this.pegawai.append('password', this.form.password);
            this.pegawai.append('aktor', this.$session.get('dataPegawai').idpegawai);
            var uri = "http://kouvee.xbanana.my.id/api/pegawai"
            this.$http.post(uri,this.pegawai).then(response =>{
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
            axios.put("http://kouvee.xbanana.my.id/api/pegawai/" + this.updatedId,{
                nama: this.form.nama,
                notelp: this.form.notelp,
                alamat: this.form.alamat,
                tgllahir: this.form.tgllahir,
                role: this.form.role,
                username: this.form.username,
                password: this.form.password,
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
            this.form.role = item.role;
            this.form.tgllahir = item.tgllahir;
            this.form.username = item.username;
            this.form.password = item.password;
            this.updatedId = item.idpegawai;
        },

        deleteData(deleteId){
            const confirmBox = confirm("Apakah anda yakin untuk menghapus?")
            if(confirmBox)
            var uri="http://kouvee.xbanana.my.id/api/pegawai/"+deleteId;
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
                nama : '',
                notelp : '',
                alamat : '',
                role : '',
                tgllahir : '',
            }
        }
        },

        mounted(){
            this.getData();
        },
    }
</script>