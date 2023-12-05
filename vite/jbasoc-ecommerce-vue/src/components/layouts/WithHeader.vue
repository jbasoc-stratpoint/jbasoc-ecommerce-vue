<template>
  <div class="main-layout">
    <TheHeader
      @logout="logout"
      @on-register-user-submit="onRegisterUserSubmit"
    />

    <div class="flex-grow p-5">
      <router-view />
    </div>
    <footer class="sticky z-50 bg-gray-200 bottom-0 p-4"></footer>
  </div>
</template>

<script setup lang="ts">
import TheHeader from "../TheHeader.vue";
import { useStore } from "vuex";
import { useToast } from "@/components/ui/toast";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const store = useStore();
const { toast } = useToast();
const route = useRoute();

const logout = () => {
  store
    .dispatch("auth/logOut")
    .then((res) => {
      console.log("res, " + res);
      if (route.name === "profile") {
        router.push({ name: "default" });
      }
      toast({
        title: "See you again!",
        description: "You have been logged out",
      });
    })
    .catch((e) => {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Logout failure",
        description: "Cannot logout. Please try again",
      });
    });
};

const onRegisterUserSubmit = (values) => {
  store
    .dispatch("auth/register", values)
    .then((res) => {
      console.log(res);
      toast({
        title: "Successful registration",
        description: "You may now login using your new credentials",
      });
    })
    .catch((e) => {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Failed registration",
        description: e.message,
      });
    });
};
</script>

<style scoped></style>
