<template>
  <v-app>
    <v-app-bar dark fixed app color="primary">
      <img src="@/assets/icon.png" width="40" height="40">
      <v-toolbar-title class="font-h1">連絡帳</v-toolbar-title>
      <v-spacer/>
      <v-chip  label outlined v-if="$store.state.users.current_user.role=='childminder'">
        <v-icon left>
          mdi-account
        </v-icon>
          保育士さん画面
      </v-chip>
      <v-chip  label outlined v-if="$store.state.users.current_user.role=='parent'">
        <v-icon left>
          mdi-account
        </v-icon>
          保護者さん画面
      </v-chip>
    </v-app-bar>  
    <v-main>
      <v-container>
        <Nuxt />
              <v-row>
        <v-col> <br><br></v-col>
      </v-row>
      </v-container>
    </v-main>
    <v-bottom-navigation style="background-color:#ededd5;" width="100%" fixed color="primary" v-if="$store.state.users.current_user.role == 'parent'">
      <v-btn value="recent" :to="'/parents/children_list/today'">
        <span>今日の連絡帳 </span>
        <v-icon>mdi-badge-account-horizontal</v-icon>
      </v-btn>
      <v-btn :to="'/parents/children_list/tomorrow'">
        <span>明日の連絡帳</span>
        <v-icon>mdi-badge-account-horizontal-outline</v-icon>
      </v-btn>
      <v-btn @click="logout()">
        <span>ログアウト</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-bottom-navigation>
        <v-bottom-navigation style="background-color:#ededd5;" width="100%" fixed color="primary" v-if="$store.state.users.current_user.role == 'childminder'">
      <v-btn value="recent" to="/childminders/children_list">
        <span>今日の連絡帳一覧</span>
        <v-icon>mdi-badge-account-horizontal</v-icon>
      </v-btn>
      <v-btn value="recent" to="/childminders/children_list">
        <span>過去の連絡帳一覧</span>
        <v-icon>mdi-badge-account-horizontal</v-icon>
      </v-btn>
      <v-btn @click="logout()">
        <span>ログアウト</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods:{
    logout() {
      this.$store.commit("users/logout")
      this.$router.push("/login")
    }
  }
};
</script>
<style scoped>
.v-application {
  background-color: #f5f5dc;
}
</style>
