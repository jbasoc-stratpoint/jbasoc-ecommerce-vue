<template>
  <div>
    <div class="lg:col-span-3 flex flex-col">
      <WithLoading
        :data="products"
        :is-loading="isLoading"
        :meta="meta"
        :class="'grid grid-cols-3 gap-4'"
        :show-pagination="showPagination"
        @on-page-change="onPageChange"
      >
        <template #item="product">
          <product-card :item="product" @add-to-cart="addToCart" />
        </template>
      </WithLoading>
    </div>
  </div>
</template>
<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue";
import WithLoading from "../../../components/layouts/WithLoading.vue";

import { defineEmits } from "vue";
const emit = defineEmits(["onPageChange", "onAddToCart"]);

interface PROD_INTERFACE {
  id: number;
}

defineProps({
  meta: { type: Object, default: null },
  products: { type: Array<PROD_INTERFACE>, default: () => [] },
  isLoading: { type: Boolean, default: false },
  showPagination: { type: Boolean, default: true },
});

const addToCart = (cartItem) => {
  emit("onAddToCart", cartItem);
};

const onPageChange = (page) => {
  emit("onPageChange", page);
};
</script>
<style></style>
