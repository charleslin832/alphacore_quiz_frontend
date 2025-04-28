<template>
  <q-page class="flex flex-center">
    <q-table
      class="my-sticky-header-table"
      flat bordered
      :rows="pageStore.listData"
      :columns="columns"
      row-key="name"
    ></q-table>
  </q-page>

</template>

<script setup>
import { ref } from 'vue';
import {usePageStore} from '../stores/store.js';

let filterData = ref({});
let pageStore = usePageStore();
pageStore.showTableList(filterData)
  .then(res => {
    pageStore.listData = res.data.content;
  })
  .catch(error => {
    console.log(error);
  });
const columns = [
  { name: 'Order', label: 'Order', field: 'order_name', sortable: true},
  { name: 'Customer', label: 'Customer', field: 'customer_name' },
  { name: 'Price', label: 'Price', field: 'total_price', format: val => `$${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, sortable: true },
  { name: 'Address', label: 'Address', field: 'receiver_address', sortable: true },
  { name: 'Delivery Date', label: 'DeliveryDate', field: 'delivery_date', sortable: true },
  { name: 'Time', label: 'Time', field: 'created_at', sortable: true },
  { name: 'Status', label: 'Status', field: 'order_status'},
  { name: 'Payment', label: 'Payment', field: 'financial_status'},
  { name: 'Fulfillment', label: 'Fulfillment', field: 'fulfillment_status'}
];
</script>
