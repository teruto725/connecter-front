(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{519:function(e,r,t){"use strict";t.r(r);t(22);var n=t(115),o=t.n(n),l={data:function(){return{user:{},valid:!1,error:!1,nameRules:[function(e){return!!e||"ユーザ名が入力されていません"}],pathwordRules:[function(e){return!!e||"パスワードが入力されていません"}]}},methods:{doLogin:function(){var e=this;console.log(this.user.name),o.a.post("https://uniback-summer7913.herokuapp.com/login",{name:this.user.name,password:this.user.password}).then((function(r){var t=r.data;e.$store.commit("users/login",t),e.$router.push("/childs/1/child_report")})).catch((function(r){console.log(r),e.error=!0}))}}},c=t(87),d=t(117),v=t.n(d),m=t(527),f=t(397),w=t(412),h=t(511),_=t(510),x=t(433),component=Object(c.a)(l,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("v-container",[t("v-row",{attrs:{justify:"center"}},[t("v-alert",{attrs:{dense:"",outlined:"",type:"error",text:""},model:{value:e.error,callback:function(r){e.error=r},expression:"error"}},[t("strong",[e._v("Name")]),e._v(" or "),t("strong",[e._v("Password")]),e._v(" is invalid.\n    ")])],1),e._v(" "),t("v-row",{attrs:{justify:"center"}},[t("v-form",{on:{submit:function(r){return r.preventDefault(),e.doLogin.apply(null,arguments)}},model:{value:e.valid,callback:function(r){e.valid=r},expression:"valid"}},[t("v-text-field",{attrs:{type:"text",required:"",placeholder:"Name",rules:e.nameRules},model:{value:e.user.name,callback:function(r){e.$set(e.user,"name",r)},expression:"user.name"}}),e._v(" "),t("v-text-field",{attrs:{type:"password",required:"",placeholder:"Password",rules:e.pathwordRules},model:{value:e.user.password,callback:function(r){e.$set(e.user,"password",r)},expression:"user.password"}}),e._v(" "),t("v-btn",{attrs:{outlined:"",type:"submit",color:"primary"}},[e._v("Login")])],1)],1)],1)}),[],!1,null,null,null);r.default=component.exports;v()(component,{VAlert:m.a,VBtn:f.a,VContainer:w.a,VForm:h.a,VRow:_.a,VTextField:x.a})}}]);