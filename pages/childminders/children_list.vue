<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>今日の連絡帳一覧</h1>
      </v-col>
    </v-row>
    <v-row v-for="child in children" :key="child.child.id">
      <v-col>
        <v-card
          color="primary"
          light
          outlined
          :to="'/children/' + child.child.id + '/child_report'"
        >
          <v-container>
            <v-row>
              <v-col>
                <v-card-title>
                  {{ child.child.name }}
                </v-card-title>
              </v-col>
              <v-chip>
                {{ child.child.class_name }}
              </v-chip>
            </v-row>
            <v-divider />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
//今日の単語帳の一覧
import axios from "axios";
export default {
  data() {
    return {
      display_children: [],
      children: [
        {
          child: { id: 1, name: "なると", class: "ひまわり組" },
          childminders_report: { is_completed: true, notification: "www" },
        },
        {
          child: { id: 2, name: "さすけ", class: "ひまわり組" },
          childminders_report: { notification: "www" },
        },
      ],
    };
  },
  created: function () {
    this.get_children();
    this.get_current_user();
  },
  methods: {
    get_current_user() {
      const user = this.$store.state.users.current_user;
      console.log("login");
      console.log(user);
      if (user.role == "parent") {
        this.$router.push("/login");
      } else if (user.role == "childminder") {
        this.is_p = false;
      } else {
        this.$router.push("/login");
      }
    },
    get_children() {
      const user = this.$store.state.users.current_user;
      console.log(user);
      const uri =
        "https://uniback-summer7913.herokuapp.com/children/today/list";
      axios
        .get(uri, {})
        .then((response) => {
          this.children = response.data;
          console.log(this.children);
        })
        .catch((error) => {
          this.$router.push("/login");
        });
    },
  },
};
</script>