<template>
  <v-container>
    <v-row>
      <v-col>
        <v-switch
          v-model="filter1"
          label="未チェックと編集中のみを表示する"
          @click="create_display_children"
          flat
        ></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="display_children"
          :items-per-page="100"
          class="elevation-1"
          hide-default-footer
          mobile-breakpoint="100"
          @click:row="clickRow"
        >
          <template v-slot:item.status="{ item }">
            <div :class="getStatusColor(item.status)">
              {{ item.status }}
            </div>
          </template>
          <template v-slot:item.notification="{ item }">
            <div :class="getNoteColor(item.notification)">
              {{ item.notification }}
            </div>
          </template>
        </v-data-table>
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
      filter1: true,
      display_children: [],
      children: [],
      headers: [
        {
          text: "名前",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "クラス", value: "class" },
        { text: "編集状況", value: "status" },
        { text: "特記事項", value: "notification" },
      ],
    };
  },
  created: function () {
    this.get_current_user();
    this.get_children();
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
      console.log("get_childre");
      console.log(user);
      const uri =
        "https://uniback-summer7913.herokuapp.com/children/today/list";
      axios
        .get(uri, {})
        .then((response) => {
          this.children = response.data;
          this.create_display_children(this.children);
        })
        .catch((error) => {
          console.log(error);
          this.$router.push("/login");
        });
    },
    create_display_children() {
      this.display_children=[]
      for (let i in this.children) {
        let child = this.children[i];
        let temp = {};
        temp.id = child.child.id;
        temp.name = child.child.name;
        temp.class = child.child.class_name;
        if (child.parents_report == null) {
          temp.status = "提出忘れ";
          temp.notification = "--";
        } else if (child.parents_report.notification == null) {
          temp.notification = "なし";
        } else {
          temp.notification = "あり";
        }
        if (child.childminder_report == null) {
          if (child.parents_report == null) {
            temp.status = "提出忘れ";
            temp.notification = "--";
          } else {
            temp.status = "未チェック";
          }
        } else if (child.childminder_report.is_completed == false) {
          temp.status = "編集中";
        } else {
          temp.status = "送信済み";
        }
        if (this.filter1){
        if (temp.status == "編集中" || temp.status == "未チェック") {
          this.display_children.push(temp);
        }
        }
        else{
          this.display_children.push(temp);
        }
      }
    },
    
    getStatusColor(status) {
      if (status == "提出忘れ") {
        return "purple--text";
      } else if (status == "編集中") {
        return "blue--text";
      } else if (status == "未チェック") {
        return "red--text";
      } else if (status == "送信済み") {
        return "green--text";
      }
    },
    getNoteColor(note) {
      if (note == "あり") {
        return "deep-orange--text";
      } else {
        return "";
      }
    },
    clickRow(item) {
      this.$router.push("/children/" + item.id + "/child_report/today");
    }
  }
};
</script>