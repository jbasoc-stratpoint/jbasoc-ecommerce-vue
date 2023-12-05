<template>
  <div>
    <div class="isolate">
      <div class="mx-auto max-w-4xl">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div class="text-center">
          <h1
            class="bg-red-500 rounded-3xl p-20 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2"
          >
            12.12 MEGA PAMASKO SALE
          </h1>
          <div class="grid grid-cols-4 gap-4 content-center">
            <div v-for="category in categories" :key="category.id">
              <CategoriesCard :category="category" />
            </div>
          </div>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <ProductList
              :meta="meta"
              :products="products"
              :show-pagination="false"
              @on-add-to-cart="onAddToCart"
            />
          </div>
          <div>
            <router-link :to="{ name: 'products' }">
              <a class="text-sm font-semibold leading-6 text-gray-900"
                >View all of our products <span aria-hidden="true">→</span></a
              >
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CategoriesCard from "@/modules/categories/components/CategoriesCard.vue";
import ProductList from "@/modules/products/components/ProductList.vue";

import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useToast } from "@/components/ui/toast";

const store = useStore();
const { toast } = useToast();

const categories = computed(() => store.state.categories.categories);
const products = computed(() => store.state.products.products);
const meta = computed(() => store.state.products.meta);
console.log(categories);

onMounted(() => {
  fetchProducts({ limit: 6 });
});

const fetchProducts = (values) => {
  store.dispatch("products/getProducts", values).catch((e) => {
    toast({
      title: "Filtering unsuccessful",
      variant: "destructive",
      description: "Error in filtering products",
    });
    console.log("error: " + e.message);
  });
};

const onAddToCart = (item) => {
  store.dispatch("cart/addItemToCart", item).then(() => {
    toast({
      title: "Successful",
      description: "Product added to cart",
    });
  });
};
</script>
