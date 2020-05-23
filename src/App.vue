<template>
  <v-app>
    <main>
      <router-view>
      <notifications group="foo" />
      </router-view>
    </main>
  </v-app>
</template>

<script>
  export default{
    name:'app'
  }
</script>