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
<<<<<<< HEAD
                    :items="customers"
=======
                    :items="produk"
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.idcustomer }}</td>
                            <td>{{ item.nama}}</td>
                            <td>{{ item.notelp}}</td>
                            <td>{{ item.alamat}}</td>
                            <td>{{ item.tgllahir}}</td>
<<<<<<< HEAD
                            <td>{{ item.created_at}}</td>
                            <td>{{ item.updated_at}}</td>
                            <td>{{ item.deleted_at}}</td>
=======
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
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
                                @click="deleteData(item.id)"
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
<<<<<<< HEAD
            <span class="headline">Edit Customer</span>
=======
            <span class="headline">Sparepart</span>
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
<<<<<<< HEAD
                        <v-text-field label="Nama Customer*" v-model="form.nama" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="No.Telp*" v-model="form.notelp" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Alamat*" v-model="form.alamat" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Tanggal Lahir*" v-model="form.tgllahir" required></v-text-field>
                    </v-col>
                    
=======
                        <v-text-field label="Name*" v-model="form.name" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-overflow-btn
                        class="my-2"
                        :items="dropdown_font"
                        label="Merk*"
                        target="#dropdown-example"
                        v-model="form.merk"
                        ></v-overflow-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Amount*" v-model="form.amount" required></v-text-field>
                    </v-col>
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
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
<<<<<<< HEAD
import axios from 'axios'
export default {
    data () {
        return {
=======
export default {
    data () {
        return {
            dropdown_font: ['Honda', 'Yamaha','Suzuki'],
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
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
                    text: 'Nomor Telepon',
                    value: 'notelp'
                    },
                    {
                    text: 'Alamat',
                    value: 'alamat',
                    },
                    {
                    text: 'Tanggal Lahir',
                    value: 'tgllahir',
                    },
                    {
                    text: 'Created At',
<<<<<<< HEAD
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
            customers: [],
=======
                    value: null
                    },
                    {
                    text: 'Updated At',
                    value: null
                    },
                    {
                    text: 'Deleted At',
                    value: null
                    },    
            ],
            produk: [],
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                name : '',
                merk : '',
                amount : '',
        
            },
<<<<<<< HEAD
            customer : new FormData,
=======
            sparepart : new FormData,
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    methods:{
        getData(){
<<<<<<< HEAD
            axios.get("http://kouvee.xbanana.id/api/customer")
            .then(
                response => {this.customers = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
=======
            var uri = this.$apiUrl + '/produk'
            this.$http.get(uri).then(response =>{
                this.produk=response.data.message
            })
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
        },

        sendData(){
            this.sparepart.append('name', this.form.name);
            this.sparepart.append('merk', this.form.merk);
            this.sparepart.append('amount', this.form.amount);
    
            var uri =this.$apiUrl + '/sparepart'
            this.load = true
            this.$http.post(uri,this.sparepart).then(response =>{
                this.snackbar = true; //mengaktifkan snackbar
                this.color = 'green'; //memberi warna snackbar
                this.text = response.data.message; //memasukkan pesan ke snackbar
                this.load = false;
                this.dialog = false
                this.getData(); //mengambil data sparepart
                this.resetForm();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
        })
    },

        updateData(){
            this.sparepart.append('name', this.form.name);
            this.sparepart.append('merk', this.form.merk);
            this.sparepart.append('amount', this.form.amount);

            var uri = this.$apiUrl + '/sparepart/' + this.updatedId;
            this.load = true
            this.$http.post(uri,this.sparepart).then(response =>{
                this.snackbar = true; //mengaktifkan snackbar this.color = 'green'; //memberi warna snackbar
                this.text = response.data.message; //memasukkan pesan ke snackbar
                this.load = false;
                this.dialog = false
                this.getData(); //mengambil data sparepart
                this.resetForm();
                this.typeInput = 'new';
            }).catch(error =>{
            this.errors = error
            this.snackbar = true;
            this.text = 'Try Again';
            this.color = 'red';
            this.load = false;
            this.typeInput = 'new';
        })
    },

        editHandler(item){
            this.typeInput = 'edit';
            this.dialog = true;
<<<<<<< HEAD
            this.form.nama = item.nama;
            this.form.notelp = item.notelp;
            this.form.alamat = item.alamat;
            this.form.tgllahir = item.tgllahir;
=======
            this.form.name = item.name;
            this.form.merek = item.merek;
            this.form.amount = item.merek;
  
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
            this.updatedId = item.id
    },

        deleteData(deleteId){
            var uri=this.$apiUrl + '/sparepart/' + deleteId;
            this.$http.delete(uri).then(response =>{
                this.snackbar=true;
                this.text=response.data.message;
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