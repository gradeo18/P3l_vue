<template>
    <v-app>
      <v-app-bar app color="black" class="white--text" height="70">
         <v-app-bar-nav-icon>
          <v-img :src="images" style="height:55px;width:55px"></v-img>
         </v-app-bar-nav-icon>
        <v-toolbar-title class="font-weight-medium display-0">
          <span class="ml-5">Kouvee Pet Shop</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        
        <v-toolbar-items>
          <v-btn text router to="/">Home</v-btn>
        </v-toolbar-items>
  
        <v-toolbar-items>
          <v-btn text router to="/signDual">Log In</v-btn>
        </v-toolbar-items>

        <v-toolbar-items>
          <v-btn text router to="/status">Status Layanan</v-btn>
        </v-toolbar-items>

        <v-toolbar-items>
          <v-btn text router to="/aboutUs">Tentang Kami</v-btn>
        </v-toolbar-items>
  
      </v-app-bar>
  
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </template>
  
  <style lang="scss" scoped>
  .v-btn {
    color: white;
  }
  </style>
  
  <script>
  export default {
   name: 'app',
   data() {
        return {
            images : require('./logo.png')
        }
    },
  }
  </script>
