(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{410:function(e,t,r){"use strict";r(7),r(12),r(16),r(17);var n=r(1),o=(r(37),r(10),r(30),r(50),r(395),r(9),r(29),r(396),r(397),r(398),r(399),r(400),r(401),r(402),r(403),r(404),r(405),r(406),r(407),r(408),r(32),r(49),r(13),r(56),r(258),r(0)),c=r(78),l=r(2);function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var h=["sm","md","lg","xl"],v=h.reduce((function(e,t){return e[t]={type:[Boolean,String,Number],default:!1},e}),{}),O=h.reduce((function(e,t){return e["offset"+Object(l.u)(t)]={type:[String,Number],default:null},e}),{}),y=h.reduce((function(e,t){return e["order"+Object(l.u)(t)]={type:[String,Number],default:null},e}),{}),j={col:Object.keys(v),offset:Object.keys(O),order:Object.keys(y)};function m(e,t,r){var n=e;if(null!=r&&!1!==r){if(t){var o=t.replace(e,"");n+="-".concat(o)}return"col"!==e||""!==r&&!0!==r?(n+="-".concat(r)).toLowerCase():n.toLowerCase()}}var w=new Map;t.a=o.a.extend({name:"v-col",functional:!0,props:d(d(d(d({cols:{type:[Boolean,String,Number],default:!1}},v),{},{offset:{type:[String,Number],default:null}},O),{},{order:{type:[String,Number],default:null}},y),{},{alignSelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},tag:{type:String,default:"div"}}),render:function(e,t){var r=t.props,data=t.data,o=t.children,l=(t.parent,"");for(var f in r)l+=String(r[f]);var d=w.get(l);return d||function(){var e,t;for(t in d=[],j)j[t].forEach((function(e){var n=r[e],o=m(t,e,n);o&&d.push(o)}));var o=d.some((function(e){return e.startsWith("col-")}));d.push((e={col:!o||!r.cols},Object(n.a)(e,"col-".concat(r.cols),r.cols),Object(n.a)(e,"offset-".concat(r.offset),r.offset),Object(n.a)(e,"order-".concat(r.order),r.order),Object(n.a)(e,"align-self-".concat(r.alignSelf),r.alignSelf),e)),w.set(l,d)}(),e(r.tag,Object(c.a)(data,{class:d}),o)}})},510:function(e,t,r){"use strict";r.r(t);var n=r(106),o=r.n(n),c={data:function(){return{children:[]}},created:function(){this.check_login(),this.get_children()},methods:{check_login:function(){var e=this.$store.state.users.current_user;console.log("login"),console.log(e),e||this.$router.push("/login")},get_children:function(){var e=this,t=this.$store.state.users.current_user;console.log(t);var r="https://uniback-summer7913.herokuapp.com/parents/"+t.id+"/children";o.a.get(r,{}).then((function(t){var r=t.data.children;console.log(t.data),0==r.length||(1==r.length?e.$router.push("/children/"+r[0].id+"/child_report"):e.children=r)})).catch((function(t){e.$router.push("/login")}))}}},l=r(83),f=r(110),d=r.n(f),h=r(379),v=r(410),O=r(392),y=r(500),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-row",{attrs:{justify:"center"}},[r("v-col",[r("h2",[e._v("連絡帳を選んでください。")])])],1),e._v(" "),e._l(e.children,(function(t){return r("v-row",{key:t.id,attrs:{justify:"center"}},[r("v-col",[r("v-btn",{attrs:{color:"primary",block:"",outlined:"",to:"/children/"+t.id+"/child_report"}},[e._v(e._s(t.name))])],1)],1)}))],2)}),[],!1,null,null,null);t.default=component.exports;d()(component,{VBtn:h.a,VCol:v.a,VContainer:O.a,VRow:y.a})}}]);