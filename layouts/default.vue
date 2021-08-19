<template>
  <v-app>
    <v-app-bar dark fixed app color="primary">
      <v-toolbar-title class="font-h1">Unisys連絡帳</v-toolbar-title>
      <v-spacer/>
      <v-chip label outlined v-if="$store.state.users.current_user.role=='childminder'">

      <v-icon left>
        mdi-account
      </v-icon>
        保育士さん画面
      </v-chip>
      <v-btn @click="logout()" label outlined v-if="$store.state.users.current_user.role=='parent'">

      <v-icon left>
        mdi-account
      </v-icon>
        保護者さん画面
      <v-icon right>
        mdi-logout
      </v-icon>
      </v-btn>

    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation style="background-color:#dcdcdc;" width="100%" fixed color="primary" v-if="$store.state.users.current_user.role == 'parent'">
      <v-btn value="recent" to="/parents/children_list">
        <span>今日の連絡帳</span>
        <v-icon>mdi-badge-account-horizontal</v-icon>
      </v-btn>
      <v-btn value="favorites">
        <span>明日の連絡帳</span>
        <v-icon>mdi-badge-account-horizontal-outline</v-icon>
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
