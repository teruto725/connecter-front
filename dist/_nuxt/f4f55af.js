(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{505:function(t,e,r){"use strict";r.r(e);var o=r(102),n=r.n(o),l={data:function(){return{childminder_report:{},parents_report:{},error:!1,child:{},times:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],pickup_persons:["お父さん","お母さん","叔父さん","叔母さん","おじいちゃん","おばあちゃん","その他"],is_p:!1,success:!1}},created:function(){this.get_current_user(),this.get_child(),this.get_parents_report()},watch:{},methods:{get_current_user:function(){var t=this.$store.state.users.current_user;console.log("login"),console.log(t),"parent"==t.role?this.is_p=!0:"childminder"==t.role?this.is_p=!1:this.$router.push("/login")},get_child:function(){var t=this,e=this.$route.params.id;console.log(e);var r="https://uniback-summer7913.herokuapp.com/children/"+e;n.a.get(r,{}).then((function(e){t.child=e.data})).catch((function(e){console.log(e),t.error=!0}))},get_childminder_report:function(){var t=this,e="https://uniback-summer7913.herokuapp.com/children/"+this.$route.params.id+"/childminder_reports/today";n.a.get(e,{}).then((function(e){console.log("get_childminder_report"),console.log(e.data),t.childminder_report=e.data.childminder_report,console.log(t.childminder_report),console.log("done")})).catch((function(e){console.log(e),console.log("error"),t.error=!0}))},get_parents_report:function(){var t=this,e="https://uniback-summer7913.herokuapp.com/children/"+this.$route.params.id+"/parents_reports/today";n.a.get(e,{}).then((function(e){console.log("get_parents_report"),console.log(e.data),t.parents_report=e.data.report,t.parents_report.bed_time=t.transform_date_to_hour(t.parents_report.bed_time),t.parents_report.wake_up_time=t.transform_date_to_hour(t.parents_report.wake_up_time),t.parents_report.pick_up_time=t.transform_date_to_hour(t.parents_report.pick_up_time),console.log(t.parents_report),console.log("done")})).catch((function(e){t.error=!0}))},post_report:function(){var t=this,e=this.$store.state.users.current_user,r=this.$route.params.id;if(this.parents_report.bed_time=this.transform_hour_to_date(this.parents_report.bed_time),console.log(this.parents_report.bed_time),this.parents_report.wake_up_time=this.transform_hour_to_date(this.parents_report.wake_up_time),this.parents_report.pick_up_time=this.transform_hour_to_date(this.parents_report.pick_up_time),"parent"==e.role){var o="https://uniback-summer7913.herokuapp.com/children/"+r+"/parents_reports/today";n.a.post(o,{report:this.parents_report,user_id:e.id}).then((function(e){console.log("post parents preport"),console.log(e.data[0]),t.get_parents_report(),t.success=!0})).catch((function(e){console.log(e),console.log("error"),t.error=!0}))}else if("childminder"==e.role){var l="https://uniback-summer7913.herokuapp.com/children/"+r+"/childminder_reports/today";n.a.post(l,{report:this.childminder_report,user_id:e.id}).then((function(e){console.log("post childminders preport"),console.log(e.data),t.get_parents_report(),t.get_childminder_report(),t.success=!0})).catch((function(e){console.log(e),console.log("error"),t.error=!0}))}},transform_hour_to_date:function(t){if(null!=t){var e=new Date("Thu, 01 May 2008 02:00:00");console.log("hour to date"),console.log(t),e.setHours(t);var r=e.getHours()+":00:00.000+09:00";return console.log(r),r}return null},transform_date_to_hour:function(t){return t?(console.log("date to hour"),parseInt(t.substr(t.indexOf("T")+1,2),10)):null}}},_=r(80),c=r(108),v=r.n(c),d=r(510),m=r(374),h=r(496),f=r(413),x=r(420),k=r(501),w=r(387),y=r(425),$=r(495),C=r(373),S=r(497),V=r(498),T=r(494),F=r(418),j=r(499),component=Object(_.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("v-alert",{staticStyle:{top:"80px"},attrs:{text:"",type:"success",elevation:"2",dismissible:"",outlined:"",fixed:"",width:"100%"},model:{value:t.success,callback:function(e){t.success=e},expression:"success"}},[t._v("\n    保存完了しました！\n  ")]),t._v(" "),r("v-row",[r("h2",[t._v(t._s(t.childminder_report.day))])]),t._v(" "),r("v-row"),t._v(" "),r("v-row",{attrs:{justify:"center"}},[r("h1",[t._v(t._s(t.child.name))])]),t._v(" "),r("v-row",{attrs:{justify:"center"}}),t._v(" "),r("v-row",[r("v-col",{attrs:{"col-6":""}},[t._v(t._s(t.child.class_name))]),t._v(" "),r("v-col",{attrs:{"col-6":""}},[r("strong",[t._v(t._s(t.child.age))]),t._v("歳")])],1),t._v(" "),r("v-row",[r("v-divider")],1),t._v(" "),r("v-container",{staticStyle:{width:"80%"}},[r("v-form",{on:{submit:function(e){return e.preventDefault(),t.post_report.apply(null,arguments)}}},[r("FormTitle",{attrs:{title:"今朝の健康状態"}}),t._v(" "),t.is_p?r("v-row",[r("v-col",[r("v-text-field",{attrs:{type:"text",outlined:"",label:"体温"},model:{value:t.parents_report.body_temperature,callback:function(e){t.$set(t.parents_report,"body_temperature",e)},expression:"parents_report.body_temperature"}})],1)],1):r("v-row",[r("v-col",[r("v-alert",{attrs:{color:"primary",outlined:"",border:"left"}},[r("v-row",[r("v-chip",{staticStyle:{"margin-top":"-5px","margin-left":"-5px"},attrs:{color:"primary",outlined:"",label:"",right:""}},[r("v-icon",{attrs:{left:""}},[t._v(" mdi-account-outline ")]),t._v(" \n                保護者からの記入欄 \n              ")],1)],1),t._v(" "),r("v-row",[r("v-col",[t._v(" 体温：\n                "),null===t.parents_report.body_temperature?r("span",{staticClass:"black--text"},[t._v(" 未入力 ")]):r("span",{staticClass:"black--text"},[t._v(" "+t._s(t.parents_report.body_temperature)+"度 ")])]),t._v(" "),r("v-col",[t._v(" 体調：\n                "),r("span",{staticClass:"black--text"},[null===t.parents_report.is_cold_symptom?r("span",[t._v(" 未入力 ")]):!1===t.parents_report.is_cold_symptom?r("span",[t._v(" 良い ")]):r("span",[t._v(" 悪い ")])])])],1),t._v(" "),null===t.parents_report.is_cough&&null===t.parents_report.is_snot||!1===t.parents_report.is_cold_symptom?r("v-row"):r("v-row",[r("v-col",[t._v(" 症状：\n                "),r("span",{staticClass:"black--text"},[!0===t.parents_report.is_cough&&!0===t.parents_report.is_snot?r("span",[t._v(" 咳、鼻水 ")]):!0===t.parents_report.is_cough?r("span",[t._v(" 咳 ")]):t.parents_report.is_snot?r("span",[t._v(" 鼻水 ")]):r("span",[t._v(" その他 ")])])])],1),t._v(" "),null===t.parents_report.is_taste&&null===t.parents_report.is_smell||!1===t.parents_report.is_cold_symptom?r("v-row"):r("v-row",[!0===t.parents_report.is_taste||!0===t.parents_report.is_smell?r("v-col",[t._v(" \n                新型コロナウィルスの疑い：\n                "),r("span",{staticClass:"black--text"},[!0===t.parents_report.is_taste&&!0===t.parents_report.is_smell?r("v-col",[t._v(" 味覚・嗅覚異常あり ")]):!0===t.parents_report.is_taste?r("v-col",[t._v(" 味覚異常あり ")]):r("v-col",[t._v(" 嗅覚異常あり ")])],1)]):t._e()],1),t._v(" "),""===t.parents_report.cold_symptom_description||!1===t.parents_report.is_cold_symptom?r("v-row"):r("v-row",[r("v-col",[t._v("\n                連絡\n                "),r("v-col",{staticClass:"black--text"},[t._v(" "+t._s(t.parents_report.cold_symptoms_description)+" ")])],1)],1)],1)],1)],1),t._v(" "),t.is_p?r("v-row",{attrs:{"col-6":""}},[r("v-col",[r("v-radio-group",{model:{value:t.parents_report.is_cold_symptom,callback:function(e){t.$set(t.parents_report,"is_cold_symptom",e)},expression:"parents_report.is_cold_symptom"}},[r("v-radio",{attrs:{label:"体調がいい",value:!1}}),t._v(" "),r("v-radio",{attrs:{label:"体調が悪い",value:!0}})],1)],1)],1):t._e(),t._v(" "),!0===t.parents_report.is_cold_symptom&&t.is_p?r("v-row",[r("v-col",[r("v-checkbox",{staticStyle:{"margin-top":"-30px"},attrs:{label:"咳症状がありますか"},model:{value:t.parents_report.is_cough,callback:function(e){t.$set(t.parents_report,"is_cough",e)},expression:"parents_report.is_cough"}}),t._v(" "),r("v-checkbox",{staticStyle:{"margin-top":"-20px"},attrs:{label:"鼻水症状がありますか"},model:{value:t.parents_report.is_snot,callback:function(e){t.$set(t.parents_report,"is_snot",e)},expression:"parents_report.is_snot"}}),t._v(" "),r("v-checkbox",{staticStyle:{"margin-top":"-20px"},attrs:{label:"味覚に異常がありますか"},model:{value:t.parents_report.is_taste,callback:function(e){t.$set(t.parents_report,"is_taste",e)},expression:"parents_report.is_taste"}}),t._v(" "),r("v-checkbox",{staticStyle:{"margin-top":"-20px"},attrs:{label:"嗅覚に異常がありますか"},model:{value:t.parents_report.is_smell,callback:function(e){t.$set(t.parents_report,"is_smell",e)},expression:"parents_report.is_smell"}}),t._v(" "),r("v-textarea",{attrs:{outlined:"",label:"その他の症状"},model:{value:t.parents_report.cold_symptoms_description,callback:function(e){t.$set(t.parents_report,"cold_symptoms_description",e)},expression:"parents_report.cold_symptoms_description"}})],1)],1):t._e(),t._v(" "),r("FormTitle",{attrs:{title:"機嫌"}}),t._v(" "),t.is_p?r("span",[r("v-row",[r("v-col",[r("v-radio-group",{model:{value:t.parents_report.mood,callback:function(e){t.$set(t.parents_report,"mood",e)},expression:"parents_report.mood"}},[r("v-radio",{attrs:{label:"機嫌が良い",value:0}}),t._v(" "),r("v-radio",{attrs:{label:"普通",value:1}}),t._v(" "),r("v-radio",{attrs:{label:"機嫌が悪い",value:2}})],1)],1)],1),t._v(" "),2===t.parents_report.mood?r("v-row",[r("v-col",[r("v-textarea",{attrs:{outlined:"",label:"理由等"},model:{value:t.parents_report.mood_description,callback:function(e){t.$set(t.parents_report,"mood_description",e)},expression:"parents_report.mood_description"}})],1)],1):t._e()],1):r("span",[r("v-row",[r("v-col",[r("v-alert",{attrs:{color:"primary",outlined:"",border:"left"}},[r("v-row",[r("v-chip",{staticStyle:{"margin-top":"-5px","margin-left":"-5px"},attrs:{color:"primary",outlined:"",label:"",right:""}},[r("v-icon",{attrs:{left:""}},[t._v(" mdi-account-outline ")]),t._v(" \n                  保護者からの記入欄 \n                ")],1)],1),t._v(" "),r("v-row",[r("v-col",[t._v(" 機嫌：\n                  "),r("span",{staticClass:"black--text"},[null===t.parents_report.mood?r("span",[t._v(" 未入力 ")]):0===t.parents_report.mood?r("span",[t._v(" 良い ")]):1===t.parents_report.mood?r("span",[t._v(" 普通 ")]):r("span",[t._v(" 悪い ")])])])],1),t._v(" "),""===t.parents_report.mood_description||2!==t.parents_report.mood?r("v-row"):r("v-row",[r("v-col",[t._v("\n                  連絡\n                  "),r("v-col",{staticClass:"black--text"},[t._v(" "+t._s(t.parents_report.mood_description)+" ")])],1)],1)],1)],1)],1),t._v(" "),r("v-row",[r("v-col",[r("v-radio-group",{model:{value:t.childminder_report.mood,callback:function(e){t.$set(t.childminder_report,"mood",e)},expression:"childminder_report.mood"}},[r("v-radio",{attrs:{label:"機嫌が良い",value:0}}),t._v(" "),r("v-radio",{attrs:{label:"普通",value:1}}),t._v(" "),r("v-radio",{attrs:{label:"機嫌が悪い",value:2}})],1)],1)],1),t._v(" "),2===t.childminder_report.mood?r("v-row",[r("v-col",[r("v-textarea",{attrs:{outlined:"",label:"理由等"},model:{value:t.childminder_report.mood_description,callback:function(e){t.$set(t.childminder_report,"mood_description",e)},expression:"childminder_report.mood_description"}})],1)],1):t._e()],1),t._v(" "),r("FormTitle",{attrs:{title:"薬"}}),t._v(" "),t.is_p?r("span",[r("v-row",[r("v-col",[r("v-radio-group",{model:{value:t.parents_report.is_medicine,callback:function(e){t.$set(t.parents_report,"is_medicine",e)},expression:"parents_report.is_medicine"}},[r("v-radio",{attrs:{label:"薬等なし",value:!1}}),t._v(" "),r("v-radio",{attrs:{label:"薬あり",value:!0}})],1)],1)],1),t._v(" "),!0===t.parents_report.is_medicine?r("v-row",[r("v-col",[r("v-textarea",{attrs:{outlined:"",label:"理由等"},model:{value:t.parents_report.medicine_description,callback:function(e){t.$set(t.parents_report,"medicine_description",e)},expression:"parents_report.medicine_description"}})],1)],1):t._e()],1):r("span",[r("v-row",[r("v-col",[r("v-alert",{attrs:{color:"primary",outlined:"",border:"left"}},[r("v-row",[r("v-chip",{staticStyle:{"margin-top":"-5px","margin-left":"-5px"},attrs:{color:"primary",outlined:"",label:"",right:""}},[r("v-icon",{attrs:{left:""}},[t._v(" mdi-account-outline ")]),t._v(" \n                  保護者からの記入欄 \n                ")],1)],1),t._v(" "),r("v-row",[r("v-col",[t._v(" 薬の有無：\n                  "),r("span",{staticClass:"black--text"},[null===t.parents_report.is_medicine?r("span",[t._v(" 未入力 ")]):!0===t.parents_report.is_medicine?r("span",[t._v(" あり ")]):r("span",[t._v(" なし ")])])])],1),t._v(" "),""===t.parents_report.medicine_description||!1===t.parents_report.is_medicine?r("v-row"):r("v-row",[r("v-col",[t._v("\n                  連絡\n                  "),r("v-col",{staticClass:"black--text"},[t._v(" "+t._s(t.parents_report.medicine_description)+" ")])],1)],1)],1)],1)],1),t._v(" "),r("v-row",[r("v-col",[r("v-radio-group",{model:{value:t.childminder_report.is_medicine,callback:function(e){t.$set(t.childminder_report,"is_medicine",e)},expression:"childminder_report.is_medicine"}},[r("v-radio",{attrs:{label:"お薬飲みました",value:!0}}),t._v(" "),r("v-radio",{attrs:{label:"まだ飲んでいません",value:!1}})],1)],1)],1)],1),t._v(" "),r("FormTitle",{attrs:{title:"食欲"}}),t._v(" "),t.is_p?r("span",[r("v-row",[r("v-col",[r("v-radio-group",{model:{value:t.parents_report.appetite,callback:function(e){t.$set(t.parents_report,"appetite",e)},expression:"parents_report.appetite"}},[r("v-radio",{attrs:{label:"よく食べた",value:0}}),t._v(" "),r("v-radio",{attrs:{label:"普通",value:1}}),t._v(" "),r("v-radio",{attrs:{label:"あんまり食べなかった",value:2}})],1)],1)],1),t._v(" "),2===t.parents_report.appetite?r("v-row",[r("v-col",[r("v-textarea",{attrs:{outlined:"",label:"理由等"},model:{value:t.parents_report.appetite_description,callback:function(e){t.$set(t.parents_report,"appetite_description",e)},expression:"parents_report.appetite_description"}})],1)],1):t._e()],1):r("span",[r("v-row",[r("v-col",[r("v-alert",{attrs:{color:"primary",outlined:"",border:"left"}},[r("v-row",[r("v-chip",{staticStyle:{"margin-top":"-5px","margin-left":"-5px"},attrs:{color:"primary",outlined:"",label:"",right:""}},[r("v-icon",{attrs:{left:""}},[t._v(" mdi-account-outline ")]),t._v(" \n                  保護者からの記入欄 \n                ")],1)],1),t._v(" "),r("v-row",[r("v-col",[t._v(" 朝の食欲：\n                  "),r("span",{staticClass:"black--text"},[null===t.parents_report.appetite?r("span",[t._v(" 未入力 ")]):0===t.parents_report.appetite?r("span",[t._v(" よく食べた ")]):1===t.parents_report.appetite?r("span",[t._v(" 普通 ")]):r("span",[t._v(" あんまり ")])])])],1),t._v(" "),""===t.parents_report.appetite_description||2!==t.parents_report.appetite?r("v-row"):r("v-row",[r("v-col",[t._v("\n                  連絡\n                  "),r("v-col",{staticClass:"black--text"},[t._v(" "+t._s(t.parents_report.appetite_description)+" ")])],1)],1)],1)],1)],1),t._v(" "),r("v-row",[r("v-col",[r("v-radio-group",{model:{value:t.childminder_report.appetite,callback:function(e){t.$set(t.childminder_report,"appetite",e)},expression:"childminder_report.appetite"}},[r("v-radio",{attrs:{label:"よく食べた",value:0}}),t._v(" "),r("v-radio",{attrs:{label:"普通",value:1}}),t._v(" "),r("v-radio",{attrs:{label:"あんまり食べなかった",value:2}})],1)],1)],1),t._v(" "),2===t.childminder_report.appetite?r("v-row",[r("v-col",[r("v-textarea",{attrs:{outlined:"",label:"理由等"},model:{value:t.childminder_report.appetite_description,callback:function(e){t.$set(t.childminder_report,"appetite_description",e)},expression:"childminder_report.appetite_description"}})],1)],1):t._e()],1),t._v(" "),r("FormTitle",{attrs:{title:"睡眠時間"}}),t._v(" "),t.is_p?r("span",[r("v-row",[r("v-col",[r("v-combobox",{attrs:{outlined:"",items:t.times,label:"就寝時間"},model:{value:t.parents_report.bed_time,callback:function(e){t.$set(t.parents_report,"bed_time",e)},expression:"parents_report.bed_time"}})],1),t._v(" "),r("v-col",[r("v-combobox",{attrs:{outlined:"",items:t.times,label:"起床時間"},model:{value:t.parents_report.wake_up_time,callback:function(e){t.$set(t.parents_report,"wake_up_time",e)},expression:"parents_report.wake_up_time"}})],1)],1)],1):r("span",[r("v-row",[r("v-col",[r("v-alert",{attrs:{color:"primary",outlined:"",border:"left"}},[r("v-row",[r("v-chip",{staticStyle:{"margin-top":"-5px","margin-left":"-5px"},attrs:{color:"primary",outlined:"",label:"",right:""}},[r("v-icon",{attrs:{left:""}},[t._v(" mdi-account-outline ")]),t._v(" \n                  保護者からの記入欄 \n                ")],1)],1),t._v(" "),r("v-row",[r("v-col",[t._v(" 就寝：\n                  "),r("span",{staticClass:"black--text"},[null===t.parents_report.bed_time?r("span",[t._v(" 未入力 ")]):r("span",[t._v(" "+t._s(t.parents_report.bed_time)+"時 ")])])]),t._v(" "),r("v-col",[t._v(" 起床：\n                  "),r("span",{staticClass:"black--text"},[null===t.parents_report.wake_up_time?r("span",[t._v(" 未入力 ")]):r("span",[t._v(" "+t._s(t.parents_report.wake_up_time)+"時 ")])])])],1)],1)],1)],1)],1),t._v(" "),r("FormTitle",{attrs:{title:"お迎え"}}),t._v(" "),t.is_p?r("span",[r("v-combobox",{attrs:{outlined:"",items:t.times,label:"時間"},model:{value:t.parents_report.pick_up_time,callback:function(e){t.$set(t.parents_report,"pick_up_time",e)},expression:"parents_report.pick_up_time"}}),t._v(" "),r("v-combobox",{attrs:{outlined:"",items:t.pickup_persons,label:"お迎えに来る人"},model:{value:t.parents_report.pick_up_person,callback:function(e){t.$set(t.parents_report,"pick_up_person",e)},expression:"parents_report.pick_up_person"}})],1):r("span",[r("v-row",[r("v-col",[r("v-alert",{attrs:{color:"primary",outlined:"",border:"left"}},[r("v-row",[r("v-chip",{staticStyle:{"margin-top":"-5px","margin-left":"-5px"},attrs:{color:"primary",outlined:"",label:"",right:""}},[r("v-icon",{attrs:{left:""}},[t._v(" mdi-account-outline ")]),t._v(" \n                  保護者からの記入欄 \n                ")],1)],1),t._v(" "),r("v-row",[r("v-col",[t._v(" 時間：\n                  "),r("span",{staticClass:"black--text"},[null===t.parents_report.pick_up_time?r("span",[t._v(" 未入力 ")]):r("span",[t._v(" "+t._s(t.parents_report.pick_up_time)+"時 ")])])])],1),t._v(" "),r("v-row",[r("v-col",[t._v(" お迎えの人：\n                  "),r("span",{staticClass:"black--text"},[""===t.parents_report.pick_up_person?r("span",[t._v(" 未入力 ")]):r("span",[t._v(" "+t._s(t.parents_report.pick_up_person)+" ")])])])],1)],1)],1)],1)],1),t._v(" "),r("FormTitle",{attrs:{title:"伝達事項"}}),t._v(" "),t.is_p?r("span",[r("v-row",[r("v-col",[r("v-textarea",{attrs:{outlined:"",label:"伝達事項・留意点など"},model:{value:t.parents_report.notification,callback:function(e){t.$set(t.parents_report,"notification",e)},expression:"parents_report.notification"}})],1)],1)],1):r("span",[r("v-row",[r("v-col",[r("v-alert",{attrs:{color:"primary",outlined:"",border:"left"}},[r("v-row",[r("v-chip",{staticStyle:{"margin-top":"-5px","margin-left":"-5px"},attrs:{color:"primary",outlined:"",label:"",right:""}},[r("v-icon",{attrs:{left:""}},[t._v(" mdi-account-outline ")]),t._v(" \n                  保護者からの記入欄 \n                ")],1)],1),t._v(" "),r("v-row",[r("v-col",[r("span",{staticClass:"black--text"},[""===t.parents_report.notification?r("span",[t._v(" 特になし ")]):r("span",[t._v(" "+t._s(t.parents_report.notification)+" ")])])])],1)],1)],1)],1),t._v(" "),r("v-row",[r("v-col",[r("v-textarea",{attrs:{outlined:"",label:"伝達事項・留意点など"},model:{value:t.childminder_report.notification,callback:function(e){t.$set(t.childminder_report,"notification",e)},expression:"childminder_report.notification"}})],1)],1)],1),t._v(" "),r("FormTitle",{attrs:{title:"メッセージ"}}),t._v(" "),t.is_p?r("span",[r("v-row",[r("v-col",[r("v-textarea",{attrs:{outlined:"",label:"メッセージ・自由記述"},model:{value:t.parents_report.description,callback:function(e){t.$set(t.parents_report,"description",e)},expression:"parents_report.description"}})],1)],1)],1):r("span",[r("v-row",[r("v-col",[r("v-alert",{attrs:{color:"primary",outlined:"",border:"left"}},[r("v-row",[r("v-chip",{staticStyle:{"margin-top":"-5px","margin-left":"-5px"},attrs:{color:"primary",outlined:"",label:"",right:""}},[r("v-icon",{attrs:{left:""}},[t._v(" mdi-account-outline ")]),t._v(" \n                  保護者からの記入欄 \n                ")],1)],1),t._v(" "),r("v-row",[r("v-col",[r("span",{staticClass:"black--text"},[""===t.parents_report.description?r("span",[t._v(" 特になし ")]):r("span",[t._v(" "+t._s(t.parents_report.description)+" ")])])])],1)],1)],1)],1),t._v(" "),r("v-row",[r("v-col",[r("v-textarea",{attrs:{outlined:"",label:"メッセージ・自由記述"},model:{value:t.childminder_report.description,callback:function(e){t.$set(t.childminder_report,"description",e)},expression:"childminder_report.description"}})],1)],1)],1),t._v(" "),r("v-row",[r("v-btn",{staticClass:"font-weight-bold",staticStyle:{bottom:"80px"},attrs:{elevation:"8",dark:"",type:"submit",color:"primary",fixed:"",fab:"",right:"","x-large":"",bottom:""}},[t._v("保存")])],1)],1),t._v(" "),r("v-row",[r("v-col",[r("br")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;v()(component,{FormTitle:function(){return Promise.all([r.e(0),r.e(6)]).then(r.bind(null,507)).then((function(t){return t.default||t}))}}),v()(component,{VAlert:d.a,VBtn:m.a,VCheckbox:h.a,VChip:f.a,VCol:x.a,VCombobox:k.a,VContainer:w.a,VDivider:y.a,VForm:$.a,VIcon:C.a,VRadio:S.a,VRadioGroup:V.a,VRow:T.a,VTextField:F.a,VTextarea:j.a})}}]);