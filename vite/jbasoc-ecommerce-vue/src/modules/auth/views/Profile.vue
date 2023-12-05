<template>
  <Card>
    <CardHeader>
      <CardTitle>User Profile</CardTitle>
    </CardHeader>
    <CardContent>
      <div v-once>Name: {{ fullName }}</div>
      <div v-once>Email: {{ user.email }}</div>
    </CardContent>
    <CardFooter>
      <AuthUpdatePasswordSheetForm @on-submit="onUpdatePassword" />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthUpdatePasswordSheetForm from "@/modules/auth/components/AuthUpdatePasswordSheetForm.vue";

import { watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { useToast } from "@/components/ui/toast";

const { toast } = useToast();

const store = useStore();
const router = useRouter();
const isLoggedIn = computed(() => store.getters["auth/isLoggedIn"]);
const user = computed(() => store.state.auth.user);
const fullName = computed(() => store.getters["auth/fullName"]);

watch(isLoggedIn, () => {
  if (!isLoggedIn.value) {
    router.push({ name: "default" });
  }
});

const onUpdatePassword = (values) => {
  store
    .dispatch("auth/updatePassword", values)
    .then((res) => {
      console.log("res, " + res);
      toast({
        title: "Password updated",
        description: "Your password has been updated",
      });
    })
    .catch((e) => {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Failed password update",
        description: "Error in updating your password",
      });
    });
};
</script>

<style scoped></style>
