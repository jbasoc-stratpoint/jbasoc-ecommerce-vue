<template>
  <Sheet>
    <SheetTrigger>
      <Button class="text-left w-[100%] p-2">Change Password</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Change password</SheetTitle>
        <SheetDescription> </SheetDescription>
      </SheetHeader>

      <Form @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="currentPassword">
          <FormItem>
            <FormLabel>Current Password</FormLabel>
            <FormControl>
              <Input
                v-model="currPass"
                type="password"
                placeholder="Current Password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl>
              <Input
                v-model="newPass"
                type="password"
                placeholder="New Password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="passwordConfirmation">
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                v-model="newConfirmPass"
                type="password"
                placeholder="Confirm Password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <br />
        <SheetFooter>
          <SheetClose as-child class="f-input">
            <Button :disabled="isDisabled" class="f-input" type="submit">
              Change Password
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
import { ref, watch } from "vue";

const emit = defineEmits(["onSubmit"]);

const currPass = ref(null);
const newPass = ref(null);
const newConfirmPass = ref(null);
const isDisabled = ref(true);

const formSchema = toTypedSchema(
  z
    .object({
      currentPassword: z.string().min(6).max(20),
      password: z.string().min(6).max(20),
      passwordConfirmation: z.string().min(6).max(20),
    })
    .refine(
      (obj) => {
        return obj.password === obj.passwordConfirmation ? true : false;
      },
      { message: "New passwords must be equal" },
    ),
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

<style></style>
