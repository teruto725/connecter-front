<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h2>連絡帳を選んでください。</h2>
      </v-col>
    </v-row>
    <v-row 
      v-for="child in children"
      :key="child.id"
      style="width: 100%;"
      >
     <v-col style="width: 100%;">
       <v-btn style="width: 100%;"  outlined :to="'/children/'+child.id+'/child_report'">{{child.name}}</v-btn>
     </v-col>  
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios';
export default {
  data(){
    return {
      children:[
      ]
    }
  },
  created: function(){
    this.check_login()
    this.get_children()
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
    // 子供の個数が複数ならそのまま
    // 子供が一人ならレポート画面に移動させる
    get_children(){ 
      const user = this.$store.state.users.current_user;
      console.log(user)
      const uri ="https://uniback-summer7913.herokuapp.com/parents/"+user.id+"/children";
      axios.get(
        uri, 
        {}   
      ).then(response => {
        const children = response.data.children
        console.log(response.data)
        if (children.length == 0){
        }
        else if(children.length == 1){//一人ならreportへ直接飛ぶ
          this.$router.push("/children/"+children[0].id+"/child_report")
        }
        else{
          this.children = children
        }
        
      }).catch(error => {
        this.$router.push("/login")
      });
    }   
  }
}
</script>