<template>
<v-layout row wrap align="center">
    <v-flex xs12 class="my-2">
      <v-card height="100%">
          <div align="center">
              <v-img :src="images" height="100px" width="120px"></v-img>
          </div>
          <h2 align="center">Kouvee Pet Shop</h2>
        <v-card-text align="justify">
            Kouvee  Pet  Shop  merupakan  sebuah  toko  hewan  yang sudah  berdiri  sejak  tahun  2018 
            menyediakan  produk  dan  jasa  layanan  yang  berada  di  Kota  Yogyakarta.  
            Kouvee  Pet  Shop menyediakan berbagai macam produk untuk hewan kesayangan anda seperti makanan, 
            aksesoris, perlengkapandan  lain-lainsesuai  kebutuhan  hewan  kesayangan  anda.  
            Selain  menjual berbagai macam produk, Kouvee Pet Shop juga menyediakan jasa 
            layanan seperti grooming dan penitipan hewan. Kouvee Pet Shop bekerja sama dengan beberapa 
            supplier dalam penyediaan produk yang dijual. 
        </v-card-text>
        <v-card-text align="right" class="font-weight-bold">
          Copyright ©2020 Kouvee Pet Shop - Kel 1 Kelas E 
        </v-card-text>
      </v-card>
      </v-flex>
    
  </v-layout>
  
</template>

<script>
  export default {
    data() {
        return {
            images : require('@/components/logo.png')
        }
    },
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
