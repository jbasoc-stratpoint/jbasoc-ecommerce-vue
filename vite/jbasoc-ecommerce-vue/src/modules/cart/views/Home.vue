<template>
  <div v-if="cartItems.length > 0">
    <Suspense>
      <div v-for="item in cartItems" :key="item">
        <CartItemCard
          :item="item"
          @on-update-cart-item="onUpdateCartItem"
          @remove-product="removeProduct"
        />
      </div>
    </Suspense>

    <div class="flex flex-row">
      <span class="flex-auto w-64" />
      <CartSummaryCard
        :cart-items="cartItems"
        :total="totalCartPrice"
        class="flex-none"
      />
    </div>
  </div>
  <div v-else class="text-lg">No items in your cart</div>
</template>

<script setup lang="ts">
import CartItemCard from "../components/CartItemCard.vue";
import CartSummaryCard from "../components/CartSummaryCard.vue";
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const cartItems = computed(() => store.state.cart.cart);
const totalCartPrice = computed(() => store.getters["cart/cartTotalPrice"]);
const isLoggedIn = computed(() => store.getters["auth/isLoggedIn"]);

watch(isLoggedIn, () => {
  router.push({ name: "default" });
});

const removeProduct = (product) => {
  store.dispatch("cart/removeProductFromCart", product);
};

const onUpdateCartItem = (cartItem) => {
  store.dispatch("cart/updateItemQtyFromCart", cartItem);
};
</script>
