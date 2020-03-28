<template>
    <div class="dashboard">
        <template>
            <v-row align="center" justify="center">
            <v-layout row wrap align="center">
                <v-flex xs12 class="my-2">
                    <v-card height="100%">
                        <v-container grid-list-md mb-0>
                            <v-row dense>
                                <v-col
                                v-for="(item) in produks" 
                                :key="item.idproduk"
                                :cols="3"
                                md="4">
                                <v-card>
                                    <v-img
                                    height="250"
                                    :src="'http://kouvee.xbanana.id/uploads/produk/' +item.gambar"
                                    ></v-img>

                                    <v-card-title>{{item.nama}}</v-card-title>
                                    <v-card-subtitle>{{item.kategori}}</v-card-subtitle>
                                    <v-card-text>
                                    <div>{{item.waktu}}|{{item.tempat}}|{{item.penyelenggara}}</div>
                                    </v-card-text>
                                    <v-divider class="mx-4"></v-divider>
                                    <v-card-text>
                                    <v-row
                                    :align="center"
                                    :justify="space-around">
                                        <v-col>
                                        Price
                                        </v-col>
                                        <v-col>
                                        IDR {{item.harga}}
                                        </v-col>
                                    </v-row>
                                    </v-card-text>
                                </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-flex> 
            </v-layout>
            </v-row>
        </template>
    </div>
</template>

<script>
export default {
    data: ()=>({
        produks: []
    }),
    methods: {
        getData(){
            axios.get("http://kouvee.xbanana.id/api/produk")
            .then(
                response => {this.produks = response.data},
            )
            .catch(e => {
                this.errors.push(e)
            });
        },

    },
    mounted(){
        this.getData()
  }
}
</script>

<style lang="scss" scoped>
    .v-card {
        align-content: center;
        padding: 2%;
        margin-left: 8%;
        margin-right: 8%;
        margin-top: 1%;
    }
</style>

