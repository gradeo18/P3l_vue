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
                            <td>{{ item.gambar }}</td>
                            <td>{{ item.idproduk }}</td>
                            <td>{{ item.nama}}</td>
                            <td>{{ item.harga}}</td>
                            <td>{{ item.stok}}</td>
                            <td>{{ item.stokminimum}}</td>
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
                        <v-text-field label="Gambar*" v-model="form.gambar" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
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
            produks: [],
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

        editHandler(item){
            this.typeInput = 'edit';
            this.dialog = true;
            this.form.nama = item.nama;
            this.form.harga = item.harga;
            this.form.stok = item.stok;
            this.form.stokminimum = item.stokminimum;
            this.updatedId = item.idproduk
    },

        deleteData(){
    
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