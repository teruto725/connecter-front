<template>
  <v-container>
    <v-row justify="center">
      <v-alert dense outlined type="error" text v-model="error">
        Server error
      </v-alert>
    </v-row>
    <v-row>
      <h2>{{ childminders_report.day }}</h2>
    </v-row>
    <v-row> </v-row>
    <v-row justify="center">
      <h1>{{ child.name }}</h1>
    </v-row>
    <v-row justify="center"> </v-row>
    <v-row>
      <v-col col-6>{{ child.class }}</v-col>
      <v-col col-6
        ><strong>{{ child.age }}</strong
        >歳</v-col
      >
    </v-row>
    <v-row>
      <v-divider />
    </v-row>
    <v-container style="width: 80%">
      <v-form v-on:submit.prevent="doLogin">
        <FormTitle :title="'体調'" />
        <v-row>
          <v-col>
            <v-text-field
              type="text"
              required
              outlined
              label="体温"
              v-model="parents_report.body_tempreture"
            />
          </v-col>
        </v-row>
        <v-row col-6>
          <v-col>
            <v-radio-group v-model="parents_report.is_cold_symptom">
              <v-radio label="体調がいい" :value="true"></v-radio>
              <v-radio label="体調が悪い" :value="false"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-if="parents_report.is_cold_symptom === false">
          <v-col>
            <v-checkbox
              v-model="parents_report.is_caugh"
              label="咳症状がありますか"
              style="margin-top: -30px"
            ></v-checkbox>
            <v-checkbox
              v-model="parents_report.is_snot"
              label="鼻水症状がありますか"
              style="margin-top: -20px"
            ></v-checkbox>
            <v-checkbox
              v-model="parents_report.is_taste"
              label="味覚に異常がありますか"
              style="margin-top: -20px"
            ></v-checkbox>
            <v-checkbox
              v-model="parents_report.is_smell"
              label="嗅覚に異常がありますか"
              style="margin-top: -20px"
            ></v-checkbox>
            <v-textarea
              outlined
              v-model="parents_report.cold_symptom_description"
              label="その他の症状"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <FormTitle :title="'機嫌'" />
        <v-row >
          <v-col>
            <v-radio-group v-model="parents_report.mood">
              <v-radio label="機嫌がいい" :value="0"></v-radio>
              <v-radio label="普通" :value="1"></v-radio>
              <v-radio label="機嫌が悪い" :value="2"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-if="parents_report.mood===2">
          <v-col>
            <v-textarea
              outlined
              v-model="parents_report.mood_description"
              label="理由等"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <FormTitle :title="'睡眠時間'" />

       <v-row >
          <v-col>
            <v-combobox 
              v-model="parents_report.bed_time" 
              outlined 
              :items="times"
              label="就寝時間"
            >
            </v-combobox>
          </v-col>
          <v-col>
            <v-combobox 
              v-model="parents_report.wake_up_time" 
              outlined 
              :items="times"
              label="起床時間"
            >
            </v-combobox>
          </v-col>
        </v-row>
        <FormTitle :title="'お迎え'" />
            <v-combobox 
              v-model="parents_report.pickup_time" 
              outlined 
              :items="times"
              label="時間"
            >
            </v-combobox>
            <v-combobox 
              v-model="parents_report.pickup_persons" 
              outlined 
              :items="pickup_persons"
              label="お迎えに来るひと"
            >
            </v-combobox>
        <FormTitle :title="'伝達事項'" />
        <v-row>
          <v-col>
            <v-textarea
              outlined
              v-model="parents_report.notification"
              label="伝達事項・留意点など"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <FormTitle :title="'メッセージ'" />
        <v-row>
          <v-col>
            <v-textarea
              outlined
              v-model="parents_report.description"
              label="メッセージ・自由記述"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-btn outlined type="submit" color="primary">Login</v-btn>
        </v-row>
      </v-form>
      <v-row>
        <v-col>
          aaa
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      childminders_report: {
        day: "2021/3/3",
      },
      parents_report: {
        body_tempreture: 36.6,
        is_cold_symptom: false,
        is_caugh: null,
        is_snot: null,
        is_taste: null,
        is_smell: null,
        cold_symptom_description: null,
      },
      error: false,
      child: {
        name: "いはらくん",
        class: "ひまわりぐみ",
        age: 6,
      },
      times: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
      pickup_persons: ["父","母","叔父","叔母","その他"]
    };
  },
  created: function () {
    // this.get_childminders_report()
    // this.get_parents_report()
  },
  methods: {
    get_child() {
      const child_id = $route.params.id;
      const uri =
        "https://uniback-summer7913.herokuapp.com/childs/" + str(child_id);
      axios
        .get(uri, {})
        .then((response) => {
          this.child = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        });
    },
    get_childminders_report() {
      const user = this.$store.state.current_user;
      const child_id = $route.params.id;
      const uri =
        "https://uniback-summer7913.herokuapp.com/childs/" +
        str(child_id) +
        "/childminders_reports/today";
      axios
        .get(uri, {})
        .then((response) => {
          this.childminders_report = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        });
    },
    get_parents_report() {
      const user = this.$store.state.current_user;
      const child_id = $route.params.id;
      const uri =
        "https://uniback-summer7913.herokuapp.com/childs/" +
        str(child_id) +
        "/parents_reports/today";
      axios
        .get(uri, {})
        .then((response) => {
          this.parents_reports = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        });
    },
    post_report() {
      const user = this.$store.state.current_user;
      const child_id = $route.params.id;
      const uri =
        "https://uniback-summer7913.herokuapp.com/childs/" +
        str(child_id) +
        "/parents_reports/today";
    },
  },
};
</script>
<style>
</style>