<template>
  <ProductBaseTemplate>
    <template #header> Products </template>

    <template #content>
      <section aria-labelledby="products-heading" class="pb-24 pt-6">
        <h2 id="products-heading" class="sr-only">Products</h2>

        <div class="grid grid-cols-4 gap-x-8 gap-y-10">
          <!-- Filters -->
          <ProductFilterForm
            class="col-span-1"
            @on-submit="onSubmit"
            :default-categories="defaultCategories"
            :default-price="defaultPrice"
            :default-sort="defaultSort"
          />

          <!-- Product List -->
          <hoc
            class="col-span-3"
            @on-add-to-cart="onAddToCart"
            @on-page-change="onPageChange"
            v-model:meta="meta"
            :is-loading="isLoading"
            :products="products"
          />
        </div>
      </section>
    </template>
  </ProductBaseTemplate>
</template>

<script setup lang="ts">
import ProductBaseTemplate from "../components/ProductBaseTemplate.vue";
import ProductFilterForm from "../components/ProductFilterForm.vue";
import withDataLoading from "../../../hoc/withDataLoading.ts";
import ProductList from "../components/ProductList.vue";

const hoc = withDataLoading(ProductList);
import { ref, onMounted, computed, watch } from "vue";

import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "@/components/ui/toast";

const store = useStore();
const route = useRoute();
const router = useRouter();
const { toast } = useToast();
const currentPage = ref(1);

const products = computed(() => store.state.products.products);
const meta = computed(() => store.state.products.meta);
console.log("meta - ", meta.value);
const isLoading = computed(() => store.state.products.isLoading);

watch(meta, () => {
  console.log(meta);
});

watch(route, () => {
  const query = formQuery();
  console.log(query.categories);
  defaultCategories.value = query.categories ? query.categories : [];
  defaultPrice.value = query.price as number[];
  defaultSort.value = query.sort as string;
  fetchProducts(query);
});

const formQuery = (): {
  categories?: Array<string>;
  price?: Array<number>;
  sort?: string;
  page?: string;
} => {
  const query = {};

  if ("categories" in route.query) {
    if (typeof route.query.categories === "string")
      query["categories"] = [route.query.categories];
    else query["categories"] = route.query.categories;
  }
  if ("price" in route.query) {
    query["price"] = [parseInt(route.query.price as string)];
  }
  if ("sort" in route.query) {
    query["sort"] = route.query.sort;
  }

  if ("page" in route.query) {
    query["page"] = route.query.page;
  } else {
    query["page"] = currentPage.value;
  }

  return query;
};

const defaultCategories = ref<string[]>(
  formQuery().categories ? (formQuery().categories as string[]) : [],
);
const defaultPrice = ref<number[]>(
  formQuery().price ? (formQuery().price as number[]) : [10000],
);

const defaultSort = ref<string>(
  formQuery().sort ? (formQuery().sort as string) : "asc",
);

const onPageChange = (page) => {
  currentPage.value = page;
  const query = formQuery();
  query["page"] = page;
  router.push({ name: "products", query: query });
};

const onAddToCart = (item) => {
  store.dispatch("cart/addItemToCart", item);
};

onMounted(() => {
  const finalQuery = formQuery();
  fetchProducts(finalQuery);
});

const onSubmit = (values) => {
  console.log(values);
  currentPage.value = 1;
  router.push({ name: "products", query: values });
};

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
</script>
