<template>
  <v-container>
    <v-alert
      text
      type="success"
      elevation="2"
      dismissible
      v-model="success"
      outlined
      fixed
      style="top: 80px"
      width="100%"
    >
      保存完了しました！
    </v-alert>
    <v-row>
      <h2>{{ childminder_report.day }}</h2>
    </v-row>
    <v-row> </v-row>
    <v-row justify="center">
      <h1>{{ child.name }}</h1>
    </v-row>
    <v-row justify="center"> </v-row>
    <v-row>
      <v-col col-6>{{ child.class_name }}</v-col>
      <v-col col-6
        ><strong>{{ child.age }}</strong
        >歳</v-col
      >
    </v-row>
    <v-row>
      <v-divider />
    </v-row>
    <v-container style="width: 80%">
      <v-form >
        <FormTitle :title="'今朝の健康状態'" />
        <v-row v-if="is_p && is_locked === 'unlocked' ">
          <v-col>
            <v-text-field
              type="text"
              outlined
              label="体温"
              v-model="parents_report.body_temperature"
              :rules="bodyTemperatureRules"
            />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <v-alert color="primary" outlined border="left">
              <v-row>
                <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                  <v-icon left> mdi-account-outline </v-icon> 
                  保護者からの記入欄 
                </v-chip>
              </v-row>
              <v-row>
                <v-col > 体温：
                  <span v-if=" parents_report.body_temperature === null " class="black--text"> 未入力 </span>
                  <span v-else class="black--text"> {{parents_report.body_temperature}}度 </span>
                </v-col>
                <v-col> 体調：
                  <span class="black--text">
                    <span v-if=" parents_report.is_cold_symptom === null "> 未入力 </span>
                    <span v-else-if=" parents_report.is_cold_symptom === false "> 良い </span>
                    <span v-else> 悪い </span> 
                  </span>
                </v-col>
              </v-row>
              <v-row v-if=" parents_report.is_cough === null && parents_report.is_snot === null || parents_report.is_cold_symptom === false" />
              <v-row v-else>
                <v-col> 症状：
                  <span class="black--text">
                    <span v-if=" parents_report.is_cough === true && parents_report.is_snot === true "> 咳、鼻水 </span>
                    <span v-else-if=" parents_report.is_cough === true "> 咳 </span>
                    <span v-else-if=" parents_report.is_snot "> 鼻水 </span>
                    <span v-else> その他 </span>
                  </span>
                </v-col>
              </v-row>
              <v-row v-if=" parents_report.is_taste === null && parents_report.is_smell === null || parents_report.is_cold_symptom === false" />
              <v-row v-else>
                <v-col v-if=" parents_report.is_taste === true || parents_report.is_smell === true "> 
                  新型コロナウィルスの疑い：
                  <span class="black--text">
                    <v-col v-if=" parents_report.is_taste === true && parents_report.is_smell === true "> 味覚・嗅覚異常あり </v-col>
                    <v-col v-else-if=" parents_report.is_taste === true "> 味覚異常あり </v-col>
                    <v-col v-else> 嗅覚異常あり </v-col>
                  </span>
                </v-col>
              </v-row>
              <v-row v-if=" parents_report.cold_symptoms_description === ''　|| parents_report.cold_symptoms_description === null || parents_report.is_cold_symptom === false " />
              <v-row v-else> 
                <v-col>
                  連絡
                  <v-col class="black--text"> {{parents_report.cold_symptoms_description}} </v-col>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <v-row col-6 v-if="is_p && is_locked === 'unlocked' ">
          <v-col>
            <v-radio-group v-model="parents_report.is_cold_symptom">
              <v-radio label="体調がいい" :value="false"></v-radio>
              <v-radio label="体調が悪い" :value="true"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-if="parents_report.is_cold_symptom === true && is_p && is_locked === 'unlocked' ">
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
        <span v-if="is_p && is_locked === 'unlocked' ">
          <v-row >
            <v-col>
              <v-radio-group v-model="parents_report.mood">
                <v-radio label="機嫌が良い" :value="0"></v-radio>
                <v-radio label="普通" :value="1"></v-radio>
                <v-radio label="機嫌が悪い" :value="2"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row v-if="parents_report.mood === 2">
            <v-col>
              <v-textarea
                outlined
                v-model="parents_report.mood_description"
                label="理由等"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </span>
        <span v-else>
          <v-row >
            <v-col>
              <v-alert color="primary" outlined border="left">
                <v-row>
                  <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                    <v-icon left> mdi-account-outline </v-icon> 
                    保護者からの記入欄 
                  </v-chip>
                </v-row>
                <v-row>
                  <v-col > 機嫌：
                    <span class="black--text">
                      <span v-if=" parents_report.mood === null "> 未入力 </span>
                      <span v-else-if=" parents_report.mood === 0 "> 良い </span>
                      <span v-else-if=" parents_report.mood === 1 "> 普通 </span>
                      <span v-else> 悪い </span>
                    </span>
                  </v-col>
                </v-row>
                <v-row v-if=" parents_report.mood_description === '' || parents_report.mood_description === null || parents_report.mood !== 2 " />
                <v-row v-else> 
                  <v-col>
                    連絡
                    <v-col class="black--text"> {{parents_report.mood_description}} </v-col>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
          <span v-if=" is_p === false && is_locked === 'unlocked' ">
          <v-row >
            <v-col>
              <v-radio-group v-model="childminder_report.mood">
                <v-radio label="機嫌が良い" :value="0"></v-radio>
                <v-radio label="普通" :value="1"></v-radio>
                <v-radio label="機嫌が悪い" :value="2"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row v-if="childminder_report.mood === 2 ">
            <v-col>
              <v-textarea
                outlined
                v-model="childminder_report.mood_description"
                label="理由等"
              >
              </v-textarea>
            </v-col>
          </v-row>
          </span>
          <span v-else>
            <v-row>
            <v-col>
              <v-alert color="primary" outlined border="left">
                <v-row>
                  <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                    <v-icon left> mdi-account-outline </v-icon> 
                    保育士からの記入欄 
                  </v-chip>
                </v-row>
                <v-row>
                  <v-col > 機嫌：
                    <span class="black--text">
                      <span v-if=" childminder_report.mood === null "> 未入力 </span>
                      <span v-else-if=" childminder_report.mood === 0 "> 良い </span>
                      <span v-else-if=" childminder_report.mood === 1 "> 普通 </span>
                      <span v-else> 悪い </span>
                    </span>
                  </v-col>
                </v-row>
                <v-row v-if=" childminder_report.mood_description === '' || childminder_report.mood_description === null || childminder_report.mood !== 2 " />
                <v-row v-else> 
                  <v-col>
                    連絡
                    <v-col class="black--text"> {{childminder_report.mood_description}} </v-col>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            </v-row>
          </span>
        </span>
        <FormTitle :title="'薬'" />
        <span v-if="is_p  && is_locked === 'unlocked' ">
          <v-row>
            <v-col>
              <v-radio-group v-model="parents_report.is_medicine">
                <v-radio label="薬等なし" :value="false"></v-radio>
                <v-radio label="薬あり" :value="true"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row v-if="parents_report.is_medicine === true">
            <v-col>
              <v-textarea
                outlined
                v-model="parents_report.medicine_description"
                label="理由等"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </span>
        <span v-else>
          <v-row >
            <v-col>
              <v-alert color="primary" outlined border="left">
                <v-row>
                  <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                    <v-icon left> mdi-account-outline </v-icon> 
                    保護者からの記入欄 
                  </v-chip>
                </v-row>
                <v-row>
                  <v-col > 薬の有無：
                    <span class="black--text">
                      <span v-if=" parents_report.is_medicine === null "> 未入力 </span>
                      <span v-else-if=" parents_report.is_medicine === true "> あり </span>
                      <span v-else> なし </span>
                    </span>
                  </v-col>
                </v-row>
                <v-row v-if=" parents_report.medicine_description === '' || parents_report.medicine_description === null || parents_report.is_medicine === false " />
                <v-row v-else> 
                  <v-col>
                    連絡
                    <v-col class="black--text"> {{parents_report.medicine_description}} </v-col>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
          <span v-if=" is_p === false && is_locked === 'unlocked' ">
          <v-row>
            <v-col>
              <v-radio-group v-model="childminder_report.is_medicine">
                <v-radio label="お薬飲みました" :value="true"></v-radio>
                <v-radio label="まだ飲んでいません" :value="false"></v-radio>
              </v-radio-group>
            </v-col>   
          </v-row>
          </span>
          <span v-else>
          <v-row >
            <v-col>
              <v-alert color="primary" outlined border="left">
                <v-row>
                  <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                    <v-icon left> mdi-account-outline </v-icon> 
                    保育士からの記入欄 
                  </v-chip>
                </v-row>
                <v-row>
                  <v-col > お薬：
                    <span class="black--text">
                      <span v-if=" childminder_report.is_medicine === null "> 未入力 </span>
                      <span v-else-if=" childminder_report.is_medicine === true "> 飲みました </span>
                      <span v-else> 飲んでいません </span>
                    </span>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
          </span>
        </span>
        <FormTitle :title="'食欲'" />
        <span v-if="is_p && is_locked === 'unlocked' ">
          <v-row>
            <v-col>
              <v-radio-group v-model="parents_report.appetite">
                <v-radio label="よく食べた" :value="0"></v-radio>
                <v-radio label="普通" :value="1"></v-radio>
                <v-radio label="あんまり食べなかった" :value="2"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row v-if="parents_report.appetite === 2">
            <v-col>
              <v-textarea
                outlined
                v-model="parents_report.appetite_description"
                label="理由等"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </span>
        <span v-else>
          <v-row >
            <v-col>
              <v-alert color="primary" outlined border="left">
                <v-row>
                  <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                    <v-icon left> mdi-account-outline </v-icon> 
                    保護者からの記入欄 
                  </v-chip>
                </v-row>
                <v-row >
                  <v-col > 朝の食欲：
                    <span class="black--text">
                      <span v-if=" parents_report.appetite === null "> 未入力 </span>
                      <span v-else-if=" parents_report.appetite === 0 "> よく食べた </span>
                      <span v-else-if=" parents_report.appetite === 1 "> 普通 </span>
                      <span v-else> あんまり </span>
                    </span>
                  </v-col>
                </v-row>
                <v-row v-if=" parents_report.appetite_description === '' || parents_report.appetite_description === null || parents_report.appetite !== 2 " />
                <v-row v-else> 
                  <v-col>
                    連絡
                    <v-col class="black--text"> {{parents_report.appetite_description}} </v-col>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
          <span v-if=" is_p === false && is_locked === 'unlocked' ">
          <v-row>
            <v-col>
              <v-radio-group v-model="childminder_report.appetite">
                <v-radio label="よく食べた" :value="0"></v-radio>
                <v-radio label="普通" :value="1"></v-radio>
                <v-radio label="あんまり食べなかった" :value="2"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row v-if="childminder_report.appetite === 2">
            <v-col>
              <v-textarea
                outlined
                v-model="childminder_report.appetite_description"
                label="理由等"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </span>
        <span v-else>
          <v-row >
            <v-col>
              <v-alert color="primary" outlined border="left">
                <v-row>
                  <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                    <v-icon left> mdi-account-outline </v-icon> 
                    保育士からの記入欄 
                  </v-chip>
                </v-row>
                <v-row >
                  <v-col > 保育園での食欲：
                    <span class="black--text">
                      <span v-if=" childminder_report.appetite === null "> 未入力 </span>
                      <span v-else-if=" childminder_report.appetite === 0 "> よく食べた </span>
                      <span v-else-if=" childminder_report.appetite === 1 "> 普通 </span>
                      <span v-else> あんまり </span>
                    </span>
                  </v-col>
                </v-row>
                <v-row v-if=" childminder_report.appetite_description === '' || childminder_report.appetite_description === null || childminder_report.appetite !== 2 " />
                <v-row v-else> 
                  <v-col>
                    連絡
                    <v-col class="black--text"> {{childminder_report.appetite_description}} </v-col>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
        </span>
        </span>
        <FormTitle :title="'睡眠時間'" />
        <span v-if="is_p && is_locked === 'unlocked' ">
          <v-row>
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
        </span>
        <span v-else>
          <v-row >
            <v-col>
              <v-alert color="primary" outlined border="left">
                <v-row>
                  <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                    <v-icon left> mdi-account-outline </v-icon> 
                    保護者からの記入欄 
                  </v-chip>
                </v-row>
                <v-row>
                  <v-col > 就寝：
                    <span class="black--text">
                      <span v-if=" parents_report.bed_time === null "> 未入力 </span>
                      <span v-else> {{parents_report.bed_time}}時 </span>
                    </span>
                  </v-col>
                  <v-col > 起床：
                    <span class="black--text">
                      <span v-if=" parents_report.wake_up_time === null "> 未入力 </span>
                      <span v-else> {{parents_report.wake_up_time}}時 </span>
                    </span>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
        </span>
        <FormTitle :title="'お迎え'" />
        <span v-if="is_p && is_locked === 'unlocked' ">
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
            label="お迎えに来る人"
          >
          </v-combobox>
        </span>
        <span v-else>
          <v-row >
            <v-col>
              <v-alert color="primary" outlined border="left">
                <v-row>
                  <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                    <v-icon left> mdi-account-outline </v-icon> 
                    保護者からの記入欄 
                  </v-chip>
                </v-row>
                <v-row>
                  <v-col > 時間：
                    <span class="black--text">
                      <span v-if=" parents_report.pick_up_time === null "> 未入力 </span>
                      <span v-else> {{parents_report.pick_up_time}}時 </span>
                    </span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col> お迎えの人：
                    <span class="black--text">
                      <span v-if=" parents_report.pick_up_person === '' || parents_report.pick_up_person === null "> 未入力 </span>
                      <span v-else> {{parents_report.pick_up_person}} </span>
                    </span>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
        </span>
        <FormTitle :title="'伝達事項'" />
        <span v-if="is_p && is_locked === 'unlocked' ">
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
        </span>
        <span v-else>
          <v-row >
            <v-col>
              <v-alert color="primary" outlined border="left">
                <v-row>
                  <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                    <v-icon left> mdi-account-outline </v-icon> 
                    保護者からの記入欄 
                  </v-chip>
                </v-row>
                <v-row>
                  <v-col >
                    <span class="black--text">
                      <span v-if=" parents_report.notification === null "> 未入力 </span>
                      <span v-else-if=" parents_report.notification === '' "> 特になし </span>
                      <span v-else> {{parents_report.notification}} </span>
                    </span>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
          <span v-if=" is_p === false && is_locked === 'unlocked' ">
          <v-row>
            <v-col>
              <v-textarea
                outlined
                v-model="childminder_report.notification"
                label="伝達事項・留意点など"
              >
              </v-textarea>
            </v-col>
          </v-row>
          </span>
          <span v-else>
          <v-row >
            <v-col>
              <v-alert color="primary" outlined border="left">
                <v-row>
                  <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                    <v-icon left> mdi-account-outline </v-icon> 
                    保育士からの記入欄 
                  </v-chip>
                </v-row>
                <v-row>
                  <v-col >
                    <span class="black--text">
                      <span v-if=" childminder_report.notification === null "> 未入力 </span>
                      <span v-else-if=" childminder_report.notification === '' "> 特になし </span>
                      <span v-else> {{childminder_report.notification}} </span>
                    </span>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
          </span>
        </span>
        <FormTitle :title="'メッセージ'" />
        <span v-if="is_p && is_locked === 'unlocked' ">
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
        </span>
        <span v-else>
          <v-row >
            <v-col>
              <v-alert color="primary" outlined border="left">
                <v-row>
                  <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                    <v-icon left> mdi-account-outline </v-icon> 
                    保護者からの記入欄 
                  </v-chip>
                </v-row>
                <v-row>
                  <v-col >
                    <span class="black--text">
                      <span v-if=" parents_report.description === null "> 未入力 </span>
                      <span v-else-if=" parents_report.description === '' "> 特になし </span>
                      <span v-else> {{parents_report.description}} </span>
                    </span>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
          <span v-if=" is_p === false && is_locked === 'unlocked'">
          <v-row>
            <v-col>
              <v-textarea
                outlined
                v-model="childminder_report.description"
                label="メッセージ・自由記述"
              >
              </v-textarea>
            </v-col>
          </v-row>
          </span>
          <span v-else>
          <v-row >
            <v-col>
              <v-alert color="primary" outlined border="left">
                <v-row>
                  <v-chip color="primary" outlined label right style="margin-top:-5px;margin-left:-5px;">
                    <v-icon left> mdi-account-outline </v-icon> 
                    保育士からの記入欄 
                  </v-chip>
                </v-row>
                <v-row>
                  <v-col >
                    <span class="black--text">
                      <span v-if=" childminder_report.description === null "> 未入力 </span>
                      <span v-else-if=" childminder_report.description === '' "> 特になし </span>
                      <span v-else> {{childminder_report.description}} </span>
                    </span>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
          </span>
        </span>
        <span v-if="(is_p === false && childminder_report.is_completed === false )|| (is_p === false && childminder_report.is_completed === null )">
          <v-row>
            <v-btn
              @click="post_report(true)"
              elevation="8"
              dark
              color="primary"
              fixed
              fab
              right
              x-large
              bottom
              style="bottom: 160px"
              class="font-weight-bold"
              >保存</v-btn
            >
          </v-row>
        </span>
          <v-row v-if="(childminder_report.is_completed === null && is_p == true) 
          || (childminder_report.is_completed !== true && is_p == false)">
            <v-btn
              @click="post_report(false)"
              elevation="8"
              dark
              color="primary"
              fixed
              fab
              right
              x-large
              bottom
              style="bottom: 80px"
              class="font-weight-bold"
              >送信</v-btn
            >
          </v-row>
      </v-form>
      <v-row>
        <v-col> <br></v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      childminder_report: {
      },
      parents_report: {
      },
      error: false,
      child: {
      },
      times: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24,
      ],
      pickup_persons: ["お父さん", "お母さん", "叔父さん", "叔母さん", "おじいちゃん", "おばあちゃん", "その他"],
      is_p: false,
      success: false,
      is_locked: 'unlocked',
      bodyTemperatureRules:[
        v => !!v || "体温が入力されていません",
        v => /^\d+\.\d+$/.test(v) || "数値を入力してください",
      ],
    };
  },
  created: function () {
    this.get_current_user();
    this.get_child();
    this.get_parents_report();
    this.get_childminder_report();
  },
  methods: {
    get_current_user() {
      const user = this.$store.state.users.current_user;
      console.log("login")
      console.log(user);
      if (user.role == "parent") {
        this.is_p = true;
      } 
      else if(user.role == "childminder") {
        this.is_p = false;
      }
      else{
        this.$router.push("/login");
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
    get_childminder_report() {
      const child_id = this.$route.params.id;
      const uri =
        "https://uniback-summer7913.herokuapp.com/children/" +
        child_id +
        "/childminder_reports/"+this.$route.params.date;
      axios
        .get(uri, {})
        .then((response) => {
          console.log("get_childminder_report");
          console.log(response.data);
          this.childminder_report = response.data.childminder_report;
          console.log(this.childminder_report);
          console.log("done");
        })
        .catch((error) => {
          console.log(error);
          console.log("error");
          this.error = true;
        });
    },
    get_parents_report() {
      const child_id = this.$route.params.id;
      const uri =
        "https://uniback-summer7913.herokuapp.com/children/" +
        child_id +
        "/parents_reports/"+this.$route.params.date;
      axios
        .get(uri, {})
        .then((response) => {
          console.log("get_parents_report");
          console.log(response.data);
          
          this.parents_report = response.data.report;
          this.is_locked = response.data.status;
          this.parents_report.bed_time = this.transform_date_to_hour(
            this.parents_report.bed_time
          );
          this.parents_report.wake_up_time = this.transform_date_to_hour(
            this.parents_report.wake_up_time
          );
          this.parents_report.pick_up_time = this.transform_date_to_hour(
            this.parents_report.pick_up_time
          );
          console.log(this.parents_report);
          console.log("done");
        })
        .catch((error) => {
          this.error = true;
        });
    },

    post_report(is_blueprint) {
      const user = this.$store.state.users.current_user;
      const child_id = this.$route.params.id;
      this.parents_report.bed_time = this.transform_hour_to_date(
        this.parents_report.bed_time
      );
      console.log(this.parents_report.bed_time);
      this.parents_report.wake_up_time = this.transform_hour_to_date(
        this.parents_report.wake_up_time
      );
      this.parents_report.pick_up_time = this.transform_hour_to_date(
        this.parents_report.pick_up_time
      );
      if (user.role == "parent") {
        const uri =
          "https://uniback-summer7913.herokuapp.com/children/" +
          child_id +
          "/parents_reports/"+this.$route.params.date;
        axios
          .post(uri, {
            report: this.parents_report,
            user_id: user.id,
          })
          .then((response) => {
            console.log("post parents preport");
            console.log(response.data[0]);
            this.get_parents_report()
            this.success=true
          })
          .catch((error) => {
            console.log(error);
            console.log("error");
            this.error = true;
          });
      }
      else if(user.role=="childminder"){
        console.log("childminder_post_report")
        if (is_blueprint){
          this.childminder_report.is_completed = 0
        }
        else{
          this.childminder_report.is_completed = 1
        }
        console.log(this.childminder_report)
        const uri = "https://uniback-summer7913.herokuapp.com/children/" +
          child_id +
          "/childminder_reports/today";
          axios
          .post(uri, {
            report: this.childminder_report,
            user_id: user.id,
          })
          .then((response) => {

            console.log("success");
            this.get_parents_report()
            this.get_childminder_report()
            this.success = true
          })
          .catch((error) => {
            console.log(error);
            console.log("error");
            this.error = true;
          });        
      }
    },
    transform_hour_to_date(hour) {
      if (hour != null) {
        let date = new Date("Thu, 01 May 2008 02:00:00");
        date.setHours(hour);
        let date_s = date.getHours() + ":00:00.000+09:00";
        return date_s;
      } else {
        return null;
      }
    },
    transform_date_to_hour(date_s) {
      if (date_s) {
        console.log("date to hour");
        return parseInt(date_s.substr(date_s.indexOf("T") + 1, 2), 10);
      } else {
        return null;
      }
    },
  },
};
</script>
<style>
</style>