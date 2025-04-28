import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

export const usePageStore = defineStore('pageStore', {
  state: () => ({
    tkn: '',
    listData: []
  }),

  getters: {},

  actions: {
    login(payload) {
      // actinc
      let url = 'https://dev.tapgo.cc/test/auth/login';
      let data = {
        "password": payload.password,
        "username": payload.username
      };
      return axios.post(url, data);
    },
    showTableList(payload) {
      console.log(' payload:', payload);
      let url = 'https://dev.tapgo.cc/test/orders';
      let data = {};
      return axios.get(url, {params: data});
    }

  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
