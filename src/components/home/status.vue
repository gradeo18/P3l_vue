<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Transaksi Penjualan Layanan</h2> 
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                    
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
                            <td>{{ item.noLY}}</td>
                            <td>{{ item.idcustomer}}</td>
                            <td>{{ item.idhewan}}</td>
                            <td>{{ item.status}} </td>   
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
        </v-container>
    </v-card>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            keyword: '',
            headers: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'No Layanan',
                    value: 'noLY'
                    },
                    {
                    text: 'Customer',
                    value: 'idcustomer'
                    },
                    {
                    text: 'Hewan',
                    value: 'idhewan'
                    },
                    {
                    text: 'Status',
                    value: 'status'
                    },
            ],
            penjualanlayanans: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            penjualanlayanan : new FormData,
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
        },

        mounted(){
            this.getData();
        },
    }
</script>