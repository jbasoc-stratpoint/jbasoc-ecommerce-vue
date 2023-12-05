<template>
  <div class="card-container">
    <router-link :to="{ name: 'product', params: { id: item.id } }">
      <img
        class="rounded-t-lg mb-3"
        :src="url + item.attributes.image.data.attributes?.formats?.small?.url"
        :width="item.attributes.image.data.attributes?.formats?.small?.width"
        :height="item.attributes.image.data.attributes?.formats?.small?.height"
        alt="product image"
      />
    </router-link>
    <div class="px-5 pb-5">
      <router-link :to="{ name: 'product', params: { id: item.id } }">
        <h5 v-font-size="15" class="card-h5">
          {{ item.attributes.name }}
        </h5>
      </router-link>
      <div class="flex items-center justify-between mt-5">
        <span class="text-xl text-gray-900 dark:text-white"
          >₱{{ item.attributes.price }}</span
        >
        <Button class="card-button" @click="addToCart">Add to cart</Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ref } from "vue";

const props = defineProps({
  item: { type: Object, required: true },
});

const url = ref(import.meta.env.VITE_API_URL);
const emit = defineEmits(["addToCart"]);

const addToCart = () => {
  emit("addToCart", {
    id: props.item.id,
    name: props.item.attributes.name,
    imageSrc:
      url.value +
      props.item.attributes?.image?.data?.attributes?.formats?.thumbnail?.url,
    price: props.item.attributes.price,
    quantity: 1,
  });
};
</script>
<style scoped>
.card-container {
  @apply w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700;
}
.card-h5 {
  @apply font-semibold tracking-tight text-gray-900 dark:text-white;
}

.card-button {
  @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
}
</style>
