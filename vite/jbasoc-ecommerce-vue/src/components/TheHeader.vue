<template>
  <header class="main-header">
    <div class="flex flex-row justify-between items-center">
      <div class="flex items-center justify-center">
        <router-link :to="{ name: 'default' }"> Shopping Website </router-link>
      </div>

      <div class="flex items-center justify-center space-x-10">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/products" :class="navStyle">
                Products
              </NavigationMenuLink>
            </NavigationMenuItem>

            <router-link :to="{ name: 'cart' }">
              <div class="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                {{ cartItemQty }}
              </div>
            </router-link>

            <NavigationMenuItem v-if="isLoggedIn">
              <NavigationMenuTrigger>
                {{ fullName }}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div class="w-[150px] p-2 text-left">
                  <router-link :to="{ name: 'profile' }">
                    <Button variant="ghost" class="text-left w-[100%] p-2">
                      Profile
                    </Button>
                  </router-link>

                  <Button
                    variant="ghost"
                    @click="logout"
                    class="text-left w-[100%] p-2"
                  >
                    Logout
                  </Button>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <div v-else class="flex flex-row">
              <NavigationMenuItem>
                <router-link :to="{ name: 'login' }">
                  <Button variant="ghost"> Login </Button>
                </router-link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <AuthRegisterSheetForm @on-submit="onRegisterUserSubmit" />
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AuthRegisterSheetForm from "@/modules/auth/components/AuthRegisterSheetForm.vue";

import { useStore } from "vuex";

import { defineEmits, computed } from "vue";

const store = useStore();

const navStyle = navigationMenuTriggerStyle();

const isLoggedIn = computed(() => store.getters["auth/isLoggedIn"]);
const fullName = computed(() => store.getters["auth/fullName"]);
const cartItemQty = computed(() => store.getters["cart/cartItemCount"]);

const emit = defineEmits(["logout", "onRegisterUserSubmit"]);

const logout = () => {
  emit("logout");
};

const onRegisterUserSubmit = () => {
  emit("onRegisterUserSubmit");
};
</script>

<style scoped></style>
