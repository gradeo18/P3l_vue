<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Hewan</h2> 
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
                            Tambah Hewan 
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
                    :items="hewans"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.idhewan }}</td>
                            <td>{{ item.nama}}</td>
                            <td>{{ item.tgllahir}}</td>
                            <td>{{ item.idjenis}}</td>
                            <td>{{ item.idukuran}}</td>
                            <td>{{ item.idcustomer}}</td>
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
                                @click="deleteData(item.idhewan)"
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
            <span class="headline">Hewan</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Nama Hewan*" v-model="form.nama" required></v-text-field>
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
                                label="Tanggal Lahir*"
                                readonly
                                v-on="on"
                                required
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="form.tgllahir" @input="menuDate = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <!-- <v-col cols="12">
                        <v-text-field label="ID Jenis Hewan*" v-model="form.idjenis" required></v-text-field>
                    </v-col> -->
                    <v-col cols="12">
                        <v-select 
                            :items="jenishewans"
                            v-model="form.idjenis"
                            label="Jenis Hewan"
                            item-text="nama"
                            item-value="idjenis"
                            >
                        </v-select>
                    </v-col>    
                    <v-col cols="12">
                        <v-select 
                            :items="ukuranhewans"
                            v-model="form.idukuran"
                            label="Ukuran Hewan"
                            item-text="nama"
                            item-value="idukuran"
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
                            >
                        </v-select>
                    </v-col>
                    <!-- <v-col cols="12">
                        <v-text-field label="ID Ukuran Hewan*" v-model="form.idukuran" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="ID Customer*" v-model="form.idcustomer" required></v-text-field>
                    </v-col> -->
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
                    text: 'ID Hewan',
                    value: 'idhewan'
                    },
                    {
                    text: 'Nama Hewan',
                    value: 'nama'
                    },
                    {
                    text: 'Tanggal Lahir',
                    value: 'tgllahir'
                    },
                    {
                    text: 'ID Jenis',
                    value: 'idjenis',
                    },
                    {
                    text: 'ID Ukuran',
                    value: 'idukuran',
                    },
                    {
                    text: 'ID Customer',
                    value: 'idcustomer',
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
            hewans: [],
            jenishewans:[],
            ukuranhewans: [],
            customers: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                nama : '',
                tgllahir : '',
                idjenis : '',
                idukuran: '',
                idcustomer: '',
            },
            hewan : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    methods:{
        getData(){
            axios.get("http://kouvee.xbanana.my.id/api/hewan")
            .then(
                response => {this.hewans = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },

        getDataJenisHewan(){
            axios.get("http://kouvee.xbanana.my.id/api/jenis_hewan")
            .then(
                response => {this.jenishewans = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },

        getDataUkuranHewan(){
            axios.get("http://kouvee.xbanana.my.id/api/ukuran_hewan")
            .then(
                response => {this.ukuranhewans = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },


        sendData(){
            this.hewan.append('nama', this.form.nama);
            this.hewan.append('tgllahir', this.form.tgllahir);
            this.hewan.append('idjenis', this.form.idjenis);
            this.hewan.append('idukuran', this.form.idukuran);
            this.hewan.append('idcustomer', this.form.idcustomer);
            this.hewan.append('aktor', this.$session.get('dataPegawai').idpegawai);
            var uri = "http://kouvee.xbanana.my.id/api/hewan"
            this.$http.post(uri,this.hewan).then(response =>{
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
            axios.put("http://kouvee.xbanana.my.id/api/hewan/" + this.updatedId,{
                nama: this.form.nama,
                tgllahir: this.form.tgllahir,
                idjenis: this.form.idjenis,
                idukuran: this.form.idukuran,
                idcustomer: this.form.idcustomer,
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
            this.form.tgllahir = item.tgllahir;
            this.form.idjenis = item.idjenis;
            this.form.idukuran = item.idukuran;
            this.form.idcustomer = item.idcustomer;
            this.updatedId = item.idhewan;
        },

        deleteData(deleteId){
            const confirmBox = confirm("Are you sure want remove?")
            if(confirmBox){
            var uri="http://kouvee.xbanana.my.id/api/hewan/"+deleteId;
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
                tgllahir : '',
                idjenis : '',
                idukuran : '',
                idcustomer : '',
            }
        }
        },

        mounted(){
            this.getData();
            this.getDataJenisHewan();
            this.getDataUkuranHewan();
            this.getDataCustomer();
            this.getDataUser();
        },
    }
</script>