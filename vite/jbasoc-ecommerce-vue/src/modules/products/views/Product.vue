<template>
  <ProductBaseTemplate>
    <template #header> Product Details </template>

    <template #content>
      <ProductDetails
        :is-loading="isLoading"
        :product="product"
        @on-add-to-cart="onAddToCart"
      />
    </template>
  </ProductBaseTemplate>
</template>

<script lang="ts" setup>
import ProductBaseTemplate from "../components/ProductBaseTemplate.vue";
import ProductDetails from "../components/ProductDetails.vue";
import { onMounted, computed } from "vue";
import { useToast } from "@/components/ui/toast";
import { useStore } from "vuex";

const store = useStore();
const { toast } = useToast();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

onMounted(async () => {
  await store.dispatch("products/getProduct", props.id).catch((e) => {
    toast({
      title: "Fetching unsuccessful",
      variant: "destructive",
      description: "Error in filtering products",
    });
    console.log("error: " + e.message);
  });
});

const product = computed(() => {
  return store.state.products.product;
});
const isLoading = computed(() => {
  return store.state.products.isLoading;
});

const onAddToCart = (item) => {
  store.dispatch("cart/addItemToCart", item);
};
</script>
