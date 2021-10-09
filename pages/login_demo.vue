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
        <p>これはデモ用のログイン用ページです</p>
        <p>以下からユーザを選択してログインボタンを押してください</p>
        <v-combobox
          type="text"
          required
          v-model="user"
          :items="users"
          item-text="name"
          outlined
        />
        <v-btn outlined style="width:100%" type="submit" color="primary"
          >ログインする</v-btn
        >
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
      user: { id: 1, name: "sato(保護者)", role: "parent" },
      valid: false,
      error: false,
      nameRules: [v => !!v || "ユーザ名が入力されていません"],
      pathwordRules: [v => !!v || "パスワードが入力されていません"],
      users: [
        { id: 1, name: "sato(保護者)", role: "parent" },
        { id: 2, name: "tanaka(保護者)", role: "parent" },
        { id: 3, name: "suzuki(保護者)", role: "parent" },
        { id: 4, name: "mizuno(保護者)", role: "parent" },
        { id: 8, name: "okada(保育士)", role: "childminder" }
      ]
    };
  },
  created: function() {
    this.logout();
  },
  methods: {
    doLogin() {
      const uri = "https://uniback-summer7913.herokuapp.com/login";
      this.$store.commit("users/login", this.user);
      if (this.user.role == "parent") {
        this.$router.push("/parents/children_list/today"); //親なら子供選択画面へ
      } else if (this.user.role == "childminder") {
        this.$router.push("/childminders/children_list"); //child
      } else {
        this.error = true;
      }
    },
    logout() {
      this.$store.commit("users/logout");
    }
  }
};
</script>
