<template>
  <q-page class="q-gutter-y-md column" style="max-width: 300px">
    <q-input v-model="username" filled type="text" hint="Username"></q-input>
    <br>
    <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password">
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        ></q-icon>
      </template>
    </q-input>
    <br>
    <q-btn color="primary" @click="loginSubmit" label="Submit" />
  </q-page>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {usePageStore} from '../stores/store.js';
// form
let username = ref('');
let password = ref('');
let isPwd = ref(true);
// router
const router = useRouter();
// axios
function loginSubmit(){
  if(username.value !== '' && password.value !== ''){
    let pageStore = usePageStore();
    pageStore.login({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        if(res.status == 200){
          router.push('/table');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>
