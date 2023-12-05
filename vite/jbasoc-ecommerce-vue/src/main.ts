import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//Add router auth guard here if needed globally

const app = createApp(App).use(router).use(store);

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error("Global error:", err);
  console.log("Vue instance:", instance);
  console.log("Error info:", info);
};

app.directive("font-size", {
  beforeMount: (el, binding) => {
    el.style.fontSize = binding.value + "px";
  },
});

app.mount("#app");
