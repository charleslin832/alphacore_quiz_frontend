<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-md row items-start">
      <q-input v-model="filterData.delivery_date" stack-label type="date" label="delivery date" @update:model-value="showTable"/>
      <q-select filled v-model="filterData.city" multiple :options="cityArray" label="city" style="width: 150px" @update:model-value="showTable()"/>
      <q-select filled v-model="filterData.financial_status" :options="financialStatusArray" label="financial_status" style="width: 150px" @update:model-value="showTable()"/>
      <q-select filled v-model="filterData.fulfillment_status" :options="fulfillmentStatusArray" label="fulfillment_status" style="width: 180px" @update:model-value="showTable()"/>
      <q-select filled v-model="filterData.order_status" :options="orderStatusArray" label="order_status" style="width: 150px" @update:model-value="showTable()"/>
    </div>
    <q-table
      class="my-sticky-header-table"
      flat bordered
      :rows="rows"
      :columns="columns"
      row-key="name"
      selection="multiple"
      v-model:selected="dataSelected"
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
import { ref,computed, onMounted } from 'vue';
import {usePageStore} from '../stores/store.js';
import { useRouter } from 'vue-router';
const cityArray = ['台北市', '新北市', '新竹市', '台南市', '高雄市'];
const financialStatusArray = ['paid', 'pending', 'refunded'];
const fulfillmentStatusArray = ['received', 'preparing'];
const orderStatusArray = ['open', 'cancelled', 'closed'];

let filterData = ref({
  delivery_date: '',
  city: [],
  order_status: '',
  financial_status: '',
  fulfillment_status: '',
});
let pageStore = usePageStore();
const router = useRouter();
onMounted(() => {
  // 無登入回導
  if(!pageStore.tkn){
    router.push('/');
    return;
  };
  showTable();
});

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

// 輸出
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
const dataSelected = ref([]);
// API
function showTable(){
  console.log('SHOW');

  pageStore.showTableList(filterData)
    .then(res => {
      pageStore.listData = res.data.content;
      rows.value = pageStore.listData;
    })
    .catch(error => {
      console.log(error);
    });
}
</script>
