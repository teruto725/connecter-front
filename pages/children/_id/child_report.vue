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
      <v-form v-on:submit.prevent="post_report">
        <FormTitle :title="'体調'" />
        <v-row v-if="is_p">
          <v-col>
            <v-text-field
              type="text"
              required
              outlined
              label="体温"
              v-model="parents_report.body_temperature"
            />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <v-card outlined>
              <v-card-text>
                <v-row style="margin: 2px;">
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row col-6>
          <v-col>
            <v-radio-group v-model="parents_report.is_cold_symptom">
              <v-radio label="体調がいい" :value="false"></v-radio>
              <v-radio label="体調が悪い" :value="true"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-if="parents_report.is_cold_symptom === true">
          <v-col>
            <v-checkbox
              v-model="parents_report.is_cough"
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
              v-model="parents_report.cold_symptoms_description"
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

        <FormTitle :title="'薬'" />
        <v-row >
          <v-col>
            <v-radio-group v-model="parents_report.is_medicine">
              <v-radio label="薬等なし" :value="false"></v-radio>
              <v-radio label="薬あり" :value="true"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-if="parents_report.is_medicine===true">
          <v-col>
            <v-textarea
              outlined
              v-model="parents_report.medicine_description"
              label="理由等"
            >
            </v-textarea>
          </v-col>
        </v-row>


        <FormTitle :title="'食欲'" />
        <v-row >
          <v-col>
            <v-radio-group v-model="parents_report.appetite">
              <v-radio label="よく食べた" :value="0"></v-radio>
              <v-radio label="普通" :value="1"></v-radio>
              <v-radio label="あんまり食べなかった" :value="2"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-if="parents_report.appetite===2">
          <v-col>
            <v-textarea
              outlined
              v-model="parents_report.appetite_description"
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
              v-model="parents_report.pick_up_time" 
              outlined 
              :items="times"
              label="時間"
            >
            </v-combobox>
            <v-combobox 
              v-model="parents_report.pick_up_person" 
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
import axios from 'axios';
export default {
  data() {
    return {
      childminders_report: {
        day: "2021/3/3",
        description:"自由記述",
        notification: "",
        appetite: 1,
        appetite_description: "食欲自由機銃",
        mood:2,
        mood_description: "機嫌自由記述",
        is_medicine: true,
        is_completed: true
      },
      parents_report: {
      },
      error: false,
      child: {
        name: "いはらくん",
        class: "ひまわりぐみ",
        age: 6,
      },
      times: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
      pickup_persons: ["父","母","叔父","叔母","その他"],
      is_p:false

    };
  },
  created: function () {
    // 
    // 
    this.check_login()
    this.get_child()
    this.get_current_user()
    this.get_parents_report()
    
  },
  watch:{

  },
  methods: {
    check_login(){
      const user = this.$store.state.users.current_user;
      console.log("login")
      console.log(user)
      if (user){
      }
      else{
        this.$router.push("/login")
      }
    },
    get_current_user(){
      const user = this.$store.state.users.current_user;
      console.log(user)
      if (user.role == "parent"){
        this.is_p = true
      }
      else{
        this.is_p = false
      }
    },
    get_child() {
      const child_id = this.$route.params.id;
      console.log(child_id);
      const uri =
        "https://uniback-summer7913.herokuapp.com/children/" + child_id;
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
      const child_id = this.$route.params.id;
      const uri =
        "https://uniback-summer7913.herokuapp.com/children/" +
        child_id+
        "/childminders_reports/today";
      axios
        .get(uri, {}
        .then((response) => {
          console.log("get_parents_report")
          console.log(response.data)
          this.childminders_report = response.data.report;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        })
      )
    },
    get_parents_report() {
      const child_id = this.$route.params.id;
      const uri =
        "https://uniback-summer7913.herokuapp.com/children/" +
        child_id +
        "/parents_reports/today";
      axios
        .get(uri, {})
        .then((response) => {
          console.log("get_parents_report")
          console.log(response.data)
          this.parents_report = response.data.report;
          this.parents_report.bed_time = this.transform_date_to_hour(this.parents_report.bed_time)
          this.parents_report.wake_up_time = this.transform_date_to_hour(this.parents_report.wake_up_time)
          this.parents_report.pick_up_time = this.transform_date_to_hour(this.parents_report.pick_up_time)
          console.log(this.parents_report)
          console.log("done")
        })
        .catch((error) => {
          console.log(error);
          console.log("error")
          this.error = true;
        });
    },
    
    post_report() {
      const user = this.$store.state.users.current_user;
      const child_id = this.$route.params.id;
      console.log("fdas")
      this.parents_report.bed_time = this.transform_hour_to_date(this.parents_report.bed_time)
      console.log(this.parents_report.bed_time)
      this.parents_report.wake_up_time = this.transform_hour_to_date(this.parents_report.wake_up_time)
      this.parents_report.pick_up_time = this.transform_hour_to_date(this.parents_report.pick_up_time)
      if (user.role == "parent"){
        const uri =
          "https://uniback-summer7913.herokuapp.com/children/" +
          child_id +
          "/parents_reports/today";
        axios.post(
          uri, 
          {
            report: this.parents_report,
            user_id: user.id,
          }   
        ).then(response => {
          console.log("post parents preport")
          console.log(response.data[0])
          this.parents_report = response.data[0];
          this.parents_report.bed_time = this.transform_date_to_hour(this.parents_report.bed_time)
          this.parents_report.wake_up_time = this.transform_date_to_hour(this.parents_report.wake_up_time)
          this.parents_report.pick_up_time = this.transform_date_to_hour(this.parents_report.pick_up_time)
        }).catch(error => {
          console.log(error)
          console.log("error")
          this.error = true;
        });
      }
    },
    transform_hour_to_date(hour){
      if (hour != null){
        let date = new Date( 'Thu, 01 May 2008 02:00:00' );
        console.log("hour to date")
        console.log(hour)
        date.setHours(hour)
        let date_s = date.getHours()+":00:00.000+09:00"
        console.log(date_s)
        return date_s
      }
      else{ 
        return null;
      }
    },
    transform_date_to_hour(date_s){
      if (date_s){
        console.log("date to hour")
        return parseInt(date_s.substr(date_s.indexOf("T")+1,2),10)
      }
      else{ 
        return null;
      }
    },
    
  },
};
</script>
<style>
</style>