<template>
  <v-container>
    <v-row justify="center">
      <v-alert dense outlined type="error" text v-model="error">
        <strong>ユーザ名</strong> か <strong>パスワード</strong>が間違っています
      </v-alert>
    </v-row>
    <v-row justify="center" align-content="center">
      <v-img
        :src="require('@/assets/logo_login.png')"
        max-height="300"
        max-width="300"
      ></v-img>
    </v-row>
    <v-row justify="center" style="margin-top:10px;">
      <v-form v-on:submit.prevent="doLogin" v-model="valid">
        <v-text-field
          type="text"
          required
          placeholder="ユーザー名"
          :rules="nameRules"
          v-model="user.name"
          outlined
        />
        <v-text-field
          type="password"
          required
          placeholder="パスワード"
          v-model="user.password"
          :rules="pathwordRules"
          outlined
        />
        <v-btn outlined style="width:100%" type="submit" color="primary">
          ログインする</v-btn
        >
        <div style="height:20px;"></div>
        <v-btn
          outlined
          dark
          style="width:100%"
          href="/login_demo"
          color="secondary"
        >
          デモログインページはこちら
        </v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
/* eslint-disable no-console */
// console log を有効化する
export default {
  data() {
    return {
      user: {},
      valid: false,
      error: false,
      nameRules: [v => !!v || "ユーザ名が入力されていません"],
      pathwordRules: [v => !!v || "パスワードが入力されていません"]
    };
  },
  created: function() {
    this.logout();
  },
  methods: {
    doLogin() {
      const uri = "https://uniback-summer7913.herokuapp.com/login";
      axios
        .post(uri, {
          name: this.user.name,
          password: this.user.password
        })
        .then(response => {
          const user = response.data;
          console.log(user.id);
          this.$store.commit("users/login", user);
          if (user.role == "parent") {
            this.$router.push("/parents/children_list/today"); //親なら子供選択画面へ
          } else if (user.role == "childminder") {
            this.$router.push("/childminders/children_list"); //child
          } else {
            this.error = true;
          }
        })
        .catch(error => {
          console.log(error);
          this.error = true;
          this.error_message = true;
          this.$store.commit("users/login", {
            id: 1,
            name: "sato",
            role: "parent"
          });
          this.$router.push("/parents/children_list/today");
        });
    },
    logout() {
      this.$store.commit("users/logout");
    }
  }
};
</script>
