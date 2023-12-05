<template>
  <WithLoading :data="[product]" :is-loading="isLoading">
    <template #item="product">
      <section class="flex-row-top mt-10">
        <div class="w-[650px] p-10">
          <img
            :src="productURL"
            alt="image-product"
            :height="imageHeight"
            :width="imageWidth"
          />
        </div>
        <div class="mt-10 p-5">
          <div class="text-xl mb-10">
            {{ (product as any)?.attributes?.name }}
            <hr />
          </div>
          <div v-for="detail in productDetails" :key="detail">
            <span v-if="detail">- {{ detail }}</span>
          </div>
          <div font-size="30" class="font-bold mt-5">{{ productPrice }}</div>
          <ProductCounter v-model="quantity" />
          <Button @click="addToCart">Add to Cart</Button>
        </div>
      </section>
    </template>
  </WithLoading>
</template>
<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import ProductCounter from "./ProductCounter.vue";
import WithLoading from "../../../components/layouts/WithLoading.vue";
import { computed, ref, defineEmits } from "vue";

const emit = defineEmits(["onAddToCart"]);

const props = defineProps({
  product: { type: Object, required: true, default: () => {} },
  isLoading: { type: Boolean, required: true, default: false },
});

const quantity = ref(1);
const productDetails = computed(() => {
  return props.product?.attributes?.details?.split("- ");
});

const productPrice = computed(() => {
  return `₱` + props.product?.attributes?.price.toFixed(2);
});

const productURL = computed(() => {
  return (
    import.meta.env.VITE_API_URL +
    props.product?.attributes?.image?.data?.attributes?.formats?.small?.url
  );
});

const imageHeight = computed(
  () =>
    props.product?.attributes?.image?.data?.attributes?.formats?.small?.height,
);

const imageWidth = computed(
  () =>
    props.product?.attributes?.image?.data?.attributes?.formats?.small?.width,
);

const addToCart = () => {
  const product = {
    id: props.product.id,
    imageSrc: productURL,
    name: props.product.attributes.name,
    price: props.product.attributes.price,
    quantity: quantity.value,
  };
  emit("onAddToCart", product);
};
</script>
<style scoped></style>
