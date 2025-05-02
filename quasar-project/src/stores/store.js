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
      let url = 'https://dev.tapgo.cc/test/auth/login';
      let data = {
        "password": payload.password,
        "username": payload.username
      };
      return axios.post(url, data);
    },
    showTableList(payload) {
      let url = 'https://dev.tapgo.cc/test/orders';
      let data = {};
      if (payload.value.delivery_date) data.delivery_date = payload.value.delivery_date;
      if (payload.value.city.length !== 0) data.city = payload.value.city;
      if (payload.value.order_status) data.order_status = payload.value.order_status;
      if (payload.value.financial_status) data.financial_status = payload.value.financial_status;
      if (payload.value.fulfillment_status) data.fulfillment_status = payload.value.fulfillment_status;
      let _this = this;
      return axios({
        method: 'GET',
        url: url,
        responseType: 'json',
        headers: {
          Authorization: _this.tkn
        },
        params: data
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
