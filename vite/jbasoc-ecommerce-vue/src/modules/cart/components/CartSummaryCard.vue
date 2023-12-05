<template>
  <Card class="p-5 w-72 text-right">
    <div class="p-5 text-2xl">Total: ₱{{ props.total.toFixed(2) }}</div>

    <router-link :to="{ name: 'checkout' }">
      <Button class="w-[100%]">Checkout</Button>
    </router-link>
  </Card>
</template>

<script setup lang="ts">
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button/Button.vue";

const props = defineProps({
  total: { type: Number, required: true, default: 0 },
  cartItems: { type: Array, required: true },
});
</script>

<style scoped></style>
