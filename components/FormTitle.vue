<template>
  <v-container>

  <v-row justify="center">
    <p class ="title-name">{{title}}</p>
  </v-row>

  </v-container>
</template>
<script>
  export default {
    props:["title"]
  }
</script>
<style>
p.title-name{
  width: 100%;
  margin-top:20px;
  text-align:center;
  border-bottom: 3px solid  "primary"; 
}
</style>