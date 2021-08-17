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
          placeholder="ユーザー名" 
          :rules="nameRules"
          v-model="user.name" 
        />
        <v-text-field  
          type="password" 
          required 
          placeholder="パスワード" 
          v-model="user.password"
          :rules="pathwordRules" 
        />
        <v-btn outlined style="width:100%" type="submit" color = "primary">ログインする</v-btn>
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
      axios.post(
        uri, 
        {
          name: this.user.name,
          password: this.user.password,
        }   
      ).then(response => {
        const user = response.data
        console.log(user.id)
        this.$store.commit("users/login", user)
        if (user.role == "parent"){
          this.$router.push("/parents/children_list")//親なら子供選択画面へ
        }
        else if (user.role == "childminder"){
          this.$router.push("/childminders/children_list")//child
        }
        else{
          this.error = true
        }
      }).catch(error => {
        console.log(error)
        this.error = true;
      });
    }
  }
}
</script>