<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import WithNoHeader from "./components/layouts/WithNoHeader.vue";
import WithHeader from "./components/layouts/WithHeader.vue";

import { computed, onMounted } from "vue";

import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

onMounted(() => {
  store.dispatch("auth/getUserFromLocalStorage");
  store.dispatch("cart/getCartFromLocalStorage");
  store.dispatch("categories/getCategories");
});

//Computed
const isLoginOrCheckout = computed(() => {
  return route.name === "login" || route.name === "checkout"
    ? WithNoHeader
    : WithHeader;
});
</script>

<template>
  <div>
    <component :is="isLoginOrCheckout" />
  </div>
  <Toaster />
</template>

<style scoped></style>
