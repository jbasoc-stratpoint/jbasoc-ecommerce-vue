<template>
  <Card class="p-5 flex flex-row mb-5 items-center">
    <div class="flex-auto w-32">
      <router-link :to="{ name: 'product', params: { id: item.id } }">
        <img class="max-h-48" alt="image-product" :src="item.imageSrc" />
      </router-link>
    </div>
    <div class="flex-auto">
      {{ item.name }}
    </div>
    <div class="flex-auto w-32">Php{{ item.price }}</div>
    <div>
      <ProductCounter v-model="quantity" />
    </div>
    <div class="w-32 text-center font-semibold">
      {{ total }}
    </div>
    <div>
      <Button variant="ghost" @click="removeProduct">x</Button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button/Button.vue";
import ProductCounter from "@/modules/products/components/ProductCounter.vue";

import { watch, ref, defineEmits, computed } from "vue";

const emit = defineEmits(["onUpdateCartItem", "removeProduct"]);

const props = defineProps({
  item: { type: Object, required: true },
});

const quantity = ref(props.item.quantity);

const total = computed(() => {
  return "₱" + (props.item.price * quantity.value).toFixed(2);
});

watch(quantity, () => {
  emit("onUpdateCartItem", {
    id: props.item.id,
    quantity: quantity,
  });
});

const removeProduct = () => {
  emit("removeProduct", {
    id: props.item.id,
  });
};
</script>

<style scoped></style>
