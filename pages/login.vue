<template>
  <v-container>
    <v-row justify="center">
        <v-alert
        dense
        outlined
        type="error"
        text
        v-model="error"
      >
        <strong>Name</strong> or <strong>Password</strong> is invalid.
      </v-alert>
    </v-row>
    <v-row justify="center">
       <v-form v-on:submit.prevent="doLogin" v-model="valid">
        <v-text-field  
          type="text" 
          required 
          placeholder="Name" 
          :rules="nameRules"
          v-model="user.name" 
        />

        <v-text-field  
          type="password" 
          required 
          placeholder="Password" 
          v-model="user.password"
          :rules="pathwordRules" 
        />
        <v-btn outlined type="submit" color = "primary">Login</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios'
/* eslint-disable no-console */
// console log を有効化する
export default {
  data() {
    return {
      user: {},
      valid:false,
      error:false,
      nameRules: [
        v => !!v || 'ユーザ名が入力されていません',
      ],
      pathwordRules: [
        v => !!v || 'パスワードが入力されていません',
      ],
    };
  },
  methods: {
    doLogin() {
      const uri = "https://uniback-summer7913.herokuapp.com/login";
      console.log(this.user.name)
      axios.post(
        uri, 
        {
          name: this.user.name,
          password: this.user.password,
        }
      
      ).then(response => {
        const user = response.data
        this.$store.commit("users/login", user)
        this.$router.push('/childs/1/child_report')

      }).catch(error => {
        console.log(error)
        this.error = true;
      });
    }
  }
}
</script>