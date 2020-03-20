<template>
    <v-app>
      <v-app-bar app color="#9eb5ab" class="white--text" height="75">
        <v-toolbar-items>
          <v-img :src="images" height="70px" width="50px"></v-img>
        </v-toolbar-items>
        <v-toolbar-title class="font-weight-medium display-0">
          <span class="ml-5">Kouvee Pet Shop</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        
        <v-toolbar-items>
          <v-btn text router to="/">Home</v-btn>
        </v-toolbar-items>
        
        <v-toolbar-items>
          <v-btn text router to="/aboutUs">About Us</v-btn>
        </v-toolbar-items>
  
        <v-toolbar-items>
          <v-btn text router to="/signDual">Log In</v-btn>
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
