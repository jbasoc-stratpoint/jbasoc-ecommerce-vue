<template>
  <AuthLoginCardForm @on-submit="onLogin" />
</template>

<script setup lang="ts">
import AuthLoginCardForm from "../components/AuthLoginCardForm.vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "@/components/ui/toast";

const store = useStore();
const router = useRouter();
const { toast } = useToast();

const onLogin = (values) => {
  store
    .dispatch("auth/login", values)
    .then((res) => {
      console.log(res);
      toast({
        title: "Login Successful",
        description: "Successfully logged in!",
      });
      router.push({ name: "default" });
    })
    .catch((e) => {
      toast({
        title: "Login failed",
        variant: "destructive",
        description: e.message,
      });
    });
};
</script>
