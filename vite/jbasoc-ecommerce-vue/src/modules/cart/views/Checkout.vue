<template>
  <div class="v-h-center">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>

      <CardContent>
        <div class="font-bold m-5">
          {{ totalCartPrice }}
        </div>
        <StripeCheckout
          ref="checkoutRef"
          mode="payment"
          :pk="publishableKey"
          :line-items="cartItems"
          @loading="(v) => (loading = v)"
          :success-url="successURL"
          :cancel-url="cancelURL"
        />
        <Button @click="onSubmit" class="w-[100%]">Pay now</Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
/*
import { Card } from "@/components/ui/card";
//import Button from "@/components/ui/button/Button.vue";
import { StripeCheckout } from "@vue-stripe/vue-stripe";

export default {
  components: {
    StripeCheckout,
    Card,
  },
  data() {
    return {
      publishableKey: import.meta.env.VITE_STRIPE_PK,
      loading: false,
      lineItems: [{ price: "price_1OJGLXGtIcz1tHBkofxv50SG", quantity: 1 }],
      successURL: "http://localhost:5173/cart",
      cancelURL: "http://localhost:5173/cart",
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.checkoutRef) {
        (this.$refs.checkoutRef as StripeCheckout)?.redirectToCheckout();
      }
    },
  },
  on
};*/

import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button/Button.vue";

import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

interface PRODUCTS_INTERFACE {
  price: string;
  quantity: number;
}

onMounted(() => {
  store.dispatch("products/getStripeProducts").then(() => {
    console.log("SUCCESS");
  });
});

const totalCartPrice = computed(
  () => "Total Price: Php" + store.getters["cart/cartTotalPrice"].toFixed(),
);
const strapiProducts = computed(() => store.state.products.strapiProducts);
const cartItems = computed(() =>
  store.state.cart.cart.map((item) => {
    const found = strapiProducts.value.find((strapiProd) => {
      return strapiProd.name === item.name;
    });

    if (found)
      return {
        price: found.default_price,
        quantity: item.quantity,
      };
  }),
);
const secretKey = computed(() => import.meta.env.VITE_STRIPE_PK);
const items = computed(() =>
  cartItems.value.map((value) => {
    return {
      price: `price_1OJGLXGtIcz1tHBkofxv50SG`,
      quantity: (value as PRODUCTS_INTERFACE).quantity,
    };
    // eslint-disable-next-line prettier/prettier
  }),
);

const loading = ref(false);

const checkoutRef = ref(null);
const publishableKey = ref(secretKey.value);
const successURL = ref("http://localhost:5173/cart");
const cancelURL = ref("http://localhost:5173/cart");
console.log(items);

const onSubmit = () => {
  console.log(checkoutRef);
  if (checkoutRef.value !== null) {
    (checkoutRef.value as StripeCheckout).redirectToCheckout();
  }
};
</script>

<style scoped></style>
