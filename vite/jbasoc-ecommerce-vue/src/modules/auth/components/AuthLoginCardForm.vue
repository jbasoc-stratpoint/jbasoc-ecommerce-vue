<template>
  <div class="v-h-center">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form @submit.prevent="onSubmit">
          <FormField name="identifier" v-slot="{ componentField }">
            <FormItem>
              <FormLabel> Email </FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  type="email"
                  placeholder="email"
                />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField name="password" v-slot="{ componentField }">
            <FormItem>
              <FormLabel> Password </FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  type="password"
                  placeholder="password"
                />
              </FormControl>
            </FormItem>
          </FormField>
          <Button type="submit" class="mt-2">Login</Button>
        </Form>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button/Button.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { defineEmits } from "vue";

const emit = defineEmits(["onSubmit"]);

const formSchema = toTypedSchema(
  z.object({
    identifier: z.string().optional(),
    password: z.string().optional(),
  }),
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  //console.log(values);
  emit("onSubmit", values);
});
</script>
<style lang=""></style>
