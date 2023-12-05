<template>
  <Sheet>
    <SheetTrigger class="b-input">
      <Button variant="ghost" class="b-input">Register</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Register a user</SheetTitle>
        <SheetDescription> </SheetDescription>
      </SheetHeader>

      <Form @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem class="input-wrapper">
            <FormLabel class="f-label">Username</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Username"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="input-wrapper">
            <FormLabel class="f-label">Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="input-wrapper">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="firstname">
          <FormItem class="input-wrapper">
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="First Name"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="lastname">
          <FormItem class="input-wrapper">
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Last Name"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <SheetFooter>
          <SheetClose as-child>
            <Button :disabled="isDisabled" type="submit" class="b-input">
              Register
            </Button>
          </SheetClose>
        </SheetFooter>
      </Form>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { watch, ref, defineEmits } from "vue";

const emit = defineEmits(["onSubmit"]);

const isDisabled = ref(true);

const formSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters"),
    email: z.string().email("This is not a valid email.").min(2).max(20),
    firstname: z
      .string()
      .min(2, "First Name must be at least 2 characters")
      .max(20, "First Name must not exceed 20 characters"),
    lastname: z
      .string()
      .min(2, "Last Name must be at least 2 characters")
      .max(20, "Last Name must not exceed 20 characters"),
  }),
);

const { handleSubmit, meta } = useForm({
  validationSchema: formSchema,
});

watch(meta, (meta) => {
  if (meta.valid) {
    isDisabled.value = false;
  } else {
    isDisabled.value = true;
  }
});

const onSubmit = handleSubmit((values) => {
  emit("onSubmit", values);
});
</script>

<style scoped>
.input-wrapper {
  @apply mb-5 mt-5;
}
</style>
