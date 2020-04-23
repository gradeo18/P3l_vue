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
                            <img :src="'http://kouvee.xbanana.my.id/uploads/produk/' +item.gambar" alt="Image Gagal di Load"  width="80px" height="80px" />
                            <td>{{ item.idproduk}}</td>
                            <td>{{ item.nama}}</td>
                            <td>{{ item.harga}}</td>
                            <td>{{ item.stok}}</td>
                            <td>{{ item.stokminimum}}</td>
                            <td>{{ item.idsupplier}}</td>
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
                                @click="deleteData(item.idproduk)"
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
    <v-dialog v-model="dialogEdit" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <label for="gambar">Nama Produk*</label>
                        <v-text-field v-model="form.nama" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="gambar">Harga*</label>
                        <v-text-field v-model="form.harga" required></v-text-field> 
                    </v-col>
                    <v-col cols="12">
                        <label for="gambar">Stok*</label>
                        <v-text-field v-model="form.stok" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="gambar">Stok Minimum*</label>
                        <v-text-field v-model="form.stokminimum" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-select 
                            :items="suppliers"
                            v-model="form.idsupplier"
                            label="Supplier"
                            item-text="nama"
                            item-value="idsupplier"
                            >
                        </v-select>
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogEdit = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn> 
        </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <label for="nama">Nama Produk*</label>
                        <v-text-field v-model="form.nama" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="harga">Harga*</label>
                        <v-text-field v-model="form.harga" required></v-text-field> 
                    </v-col>
                    <v-col cols="12">
                        <label for="stok">Stok*</label>
                        <v-text-field v-model="form.stok" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <label for="stokminimum">Stok Minimum*</label>
                        <v-text-field v-model="form.stokminimum" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-select 
                            :items="suppliers"
                            v-model="form.idsupplier"
                            label="Supplier"
                            item-text="nama"
                            item-value="idsupplier"
                            >
                        </v-select>
                    </v-col>
                    <div class="form-group">
                    <v-col cols="12">
                        <label for="gambar">Gambar Produk : </label>
                        <input required type="file" class="form-control" @change="produkChange">
                    </v-col>
                    </div>
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
            dialogEdit: false,
            dialog: false,
            keyword: '',
            headers: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'Gambar',
                    value: 'gambar'
                    },
                    {
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
                    text: 'Supplier',
                    value: 'idsupplier',
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
            produks: [],
            pegawais: [],
            suppliers: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                gambar: '',
                nama : '',
                harga : '',
                stok : '',
                stokminimum : '',
                idsupplier : '',
            },
            produk : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',     
        }
    },
    methods:{
        produkChange(event){
            console.log(event.target.files[0])
            console.log(event)
            this.form.gambar = event.target.files[0];
            console.log(this.form)
        },


        getData(){
            axios.get("http://kouvee.xbanana.my.id/api/produk")
            .then(
                response => {this.produks = response.data},
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


        sendData(){
            this.produk.append('gambar', this.form.gambar);
            this.produk.append('nama', this.form.nama);
            this.produk.append('harga', this.form.harga);
            this.produk.append('stok', this.form.stok);
            this.produk.append('stokminimum', this.form.stokminimum);
            this.produk.append('idsupplier', this.form.idsupplier);
            this.produk.append('aktor', this.$session.get('dataPegawai').idpegawai);
            var uri = "http://kouvee.xbanana.my.id/api/produk"
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
            this.text = 'Masukan Data dengan Benar !'; 
            this.color = 'red';
        })
        },

        updateData(){      
            axios.put("http://kouvee.xbanana.my.id/api/produk/" + this.updatedId,{
                gambar: this.form.gambar,
                nama: this.form.nama,
                harga: this.form.harga,
                stok: this.form.stok,
                stokminimum: this.form.stokminimum,
                idsupplier: this.form.idsupplier,
                aktor: this.$session.get('dataPegawai').idpegawai,
            })
            .then(response =>{     
                this.snackbar = true; 
                this.text = response.data.message;
                this.text = 'Berhasil'; 
                this.color = 'green';
                this.load = false;
                this.dialogEdit = false;
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
            this.dialogEdit = true;
            this.form.gambar = item.gambar;
            this.form.nama = item.nama;
            this.form.harga = item.harga;
            this.form.stok = item.stok;
            this.form.stokminimum = item.stokminimum;
            this.form.idsupplier= item.idsupplier;
            this.updatedId = item.idproduk;
        },

        deleteData(deleteId){
            const confirmBox = confirm("Are you sure want remove?")
            if(confirmBox)
            var uri="http://kouvee.xbanana.my.id/api/produk/"+deleteId;
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
                harga : '',
                stok : '',
                stokminimum : '',
                gambar: '',
                idsupplier: '',
            }
        }
        },

        mounted(){
            this.getData();
            this.getDataSupplier();
        },
    }
</script>