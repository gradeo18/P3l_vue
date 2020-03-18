<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Produk</h2> 
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
                            Tambah Produk
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
                    :items="produks"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id"> 
                            <td>{{ index + 1 }}</td>
<<<<<<< HEAD
                            <td>{{ item.gambar }}</td>
=======
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
                            <td>{{ item.idproduk }}</td>
                            <td>{{ item.nama}}</td>
                            <td>{{ item.harga}}</td>
                            <td>{{ item.stok}}</td>
                            <td>{{ item.stokminimum}}</td>
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
            <span class="headline">Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
<<<<<<< HEAD
                        <v-text-field label="Gambar*" v-model="form.gambar" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
=======
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
                        <v-text-field label="Nama*" v-model="form.nama" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Harga*" v-model="form.harga" required></v-text-field> 
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Stok*" v-model="form.stok" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Stokminimum*" v-model="form.stokminimum" required></v-text-field>
                    </v-col>
<<<<<<< HEAD
=======
                  <v-col cols="12" sm="6" md="4">
                        <!-- <v-overflow-btn
                        class="my-2"
                        :items="dropdown_font"
                        label="harga*"
                        target="#dropdown-example"
                        v-model="form.harga"
                        ></v-overflow-btn> -->
                    </v-col>
                    <!-- <v-col cols="12">
                        <v-text-field label="stok*" v-model="form.stok" required></v-text-field>
                    </v-col> -->
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
import axios from 'axios'
export default {
    data () {
        return {
<<<<<<< HEAD
            dialog: false,
            keyword: '',
            headers: [
                    {
=======
            // dropdown_font: ['Honda', 'Yamaha','Suzuki'],
            dialog: false,
            keyword: '',
            headers: [
                {
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
                    text: 'No',
                    value: 'no',
                    },
                    {
<<<<<<< HEAD
                    text: 'Gambar',
                    value: 'gambar'
                    },
                    {
=======
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
                    text: 'ID Produk',
                    value: 'idproduk'
                    },
                    {
                    text: 'Nama Produk',
                    value: 'nama'
                    },
                    {
                    text: 'Harga',
                    value: 'harga'
                    },
                    {
                    text: 'Stok',
                    value: 'stok',
                    },
                    {
                    text: 'Stok Minimum',
                    value: 'stokminimum',
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
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
                    },    
            ],
            produks: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
<<<<<<< HEAD
                gambar: '',
=======
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
                nama : '',
                harga : '',
                stok : '',
                stokminimum : '',
            },
            produk : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',     
        }
    },
    methods:{
        getData(){
            axios.get("http://kouvee.xbanana.id/api/produk")
            .then(
                response => {this.produks = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },

        sendData(){
<<<<<<< HEAD
          this.produk.append('gambar',this.gambar);
          this.produk.append('nama',this.nama);
          this.produk.append('harga',this.harga);
          this.produk.append('stok',this.stok);
          this.produk.append('stokminimum',this.stokminimum);
          var uri = "http://kouvee.xbanana.id/api/produk"
          this.$http.post(uri,this.produk).then(response =>{
            this.snackbar = true; 
            this.text = response.data.message;
            this.color = 'green'
        }).catch(error =>{ 
            this.errors = error 
            this.snackbar = true; 
            this.text = 'Try Again'; 
            this.color = 'red';
        })
        },

        updateData(){
           
        },
=======
            this.produk.append('nama', this.form.nama);
            this.produk.append('harga', this.form.harga);
            this.produk.append('stok', this.form.stok);
            this.produk.append('stokminimum', this.form.stokminimum)
            var uri =this.$apiUrl + '/produk'
            this.load = true
            this.$http.post(uri,this.produk).then(response =>{
                this.snackbar = true; //mengaktifkan snackbar
                this.color = 'green'; //memberi warna snackbar
                this.text = response.data.message; //memasukkan pesan ke snackbar
                this.load = false;
                this.dialog = false
                this.getData(); //mengambil data produk
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
            this.produk.append('nama', this.form.nama);
            this.produk.append('harga', this.form.harga);
            this.produk.append('stok', this.form.stok);
            this.produk.append('stokminimum', this.form.stokminimum)
            var uri = this.$apiUrl + '/produk/' + this.updatedId;
            this.load = true
            this.$http.post(uri,this.produk).then(response =>{
                this.snackbar = true; //mengaktifkan snackbar this.color = 'green'; //memberi warna snackbar
                this.text = response.data.message; //memasukkan pesan ke snackbar
                this.load = false;
                this.dialog = false
                this.getData(); //mengambil data produk
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
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428

        editHandler(item){
            this.typeInput = 'edit';
            this.dialog = true;
            this.form.nama = item.nama;
            this.form.harga = item.harga;
            this.form.stok = item.stok;
            this.form.stokminimum = item.stokminimum;
            this.updatedId = item.idproduk
    },

<<<<<<< HEAD
        deleteData(){
    
=======
        deleteData(deleteId){
            var uri=this.$apiUrl + '/produk/' + deleteId;
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
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
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
<<<<<<< HEAD
=======
                merek : '',
>>>>>>> f38700492b76abf8568bc38b34092ea27a1b9428
                stok : '',
                stokminimum : '',
            }
        }
    },

        mounted(){
            this.getData();
        },
    }
</script>