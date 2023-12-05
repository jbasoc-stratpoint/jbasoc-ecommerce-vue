import { createStore } from "vuex";

// ADD MODULE STORES HERE IF EXISTS
import products from "@/modules/products/store";
import auth from "@/modules/auth/store";
import categories from "@/modules/categories/store";
import cart from "@/modules/cart/store";

export default createStore({
  modules: {
    products,
    auth,
    categories,
    cart,
  },
});
