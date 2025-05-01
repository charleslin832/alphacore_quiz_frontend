<template>
  <q-page class="flex flex-center">
    <q-table
      class="my-sticky-header-table"
      flat bordered
      :rows="rows"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
    >
      <template v-slot:top>
        <q-pagination
          v-model="pagination.page"
          :max="maxPages"
          @update:model-value="onPageChange"
        />
      </template>
      <template v-slot:bottom>
        <q-pagination
          v-model="pagination.page"
          :max="maxPages"
          @update:model-value="onPageChange"
        />
      </template>
  </q-table>
  </q-page>

</template>

<script setup>
import { ref,computed } from 'vue';
import {usePageStore} from '../stores/store.js';
import { useRouter } from 'vue-router';

let filterData = ref({});
let pageStore = usePageStore();
const router = useRouter();
// 無登入回導
if(!pageStore.tkn){
  router.push('/');
};
// pagination
const pagination = ref({
  page: 1,
  rowsPerPage: 10
})

const maxPages = computed(() => {
  if(!rows.value) return 1;
  return Math.ceil(rows.value.length / pagination.value.rowsPerPage)
})
function onPageChange(newPage) {
  pagination.value.page = newPage;
}
// 資料
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
const rows = ref([]);
pageStore.showTableList(filterData)
  .then(res => {
    pageStore.listData = res.data.content;
    rows.value = pageStore.listData;
  })
  .catch(error => {
    console.log(error);
  });
</script>
