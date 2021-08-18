<template>
  <v-card
  >


    <v-card-title>
      田中 太郎くん
    </v-card-title>

    <v-card-subtitle>
      重要なステータス
    </v-card-subtitle>
    <v-container>
        <v-row no-gutters>
          <v-col cols="4" align="center"
            ><v-card outlined tile　color="#f5f5dc">熱：</v-card></v-col
          >
          <v-col cols="4" align="center"
            ><v-card outlined tile　color="#f5f5dc">頭痛：</v-card></v-col
          >
          <v-col cols="4" align="center"
            ><v-card outlined tile　color="#f5f5dc">食欲：</v-card></v-col
          >
        </v-row>
        <v-row no-gutters>
          <v-col cols="4" align="center"
            ><v-card outlined tile　color="#f5f5dc">腹痛：</v-card></v-col
          >
          <v-col cols="4" align="center"
            ><v-card outlined tile　color="#f5f5dc">鼻水：</v-card></v-col
          >
          <v-col cols="4" align="center"
            ><v-card outlined tile　color="#f5f5dc">機嫌：</v-card></v-col
          >
        </v-row>
      </v-container>
    <v-card-actions>
        
      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      props:["id","name","class","is_completed","parents_notification","childminders_notification"]
    }),
  }
</script>