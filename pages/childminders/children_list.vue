<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>今日の連絡帳一覧</h1>
      </v-col>
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>
<script>
//今日の単語帳の一覧
export default {
  data() {
    return {
      display_children: [],
      children: [
        {
          child: { name: "なると", class: "ひまわり組" },
          childminders_report: { is_completed: true, notification: "www" },
        },
        {
          child: { name: "さすけ", class: "ひまわり組" },
          childminders_report: { notification: "www" },
        },
      ],
    };
  },
  methods: {
    get_children() {
      const user = this.$store.state.users.current_user;
      console.log(user);
      const uri =
        "https://uniback-summer7913.herokuapp.com/children/today/list";
      axios
        .get(uri, {})
        .then((response) => {
          const children = response.data;
          
        })
        .catch((error) => {
          this.$router.push("/login");
        });
    },
  },
};
</script>