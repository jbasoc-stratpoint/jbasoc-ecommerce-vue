<template>
  <form @submit.prevent="onSubmit" class="hidden lg:block">
    <div class="filter-item-wrapper">
      <div v-if="store.state.categories.categories.length > 0">
        <FormField name="categories">
          <FormItem>
            <div class="mb-4">
              <FormLabel class="text-base"> Categories </FormLabel>
            </div>

            <FormField
              v-for="item in store.state.categories.categories"
              v-slot="{ value, handleChange }"
              :key="item.id"
              name="categories"
            >
              <FormItem
                :key="item.id"
                class="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    :checked="value?.includes(item.attributes.name)"
                    @update:checked="
                      (checked) => {
                        if (Array.isArray(value)) {
                          handleChange(
                            checked
                              ? [...value, item.attributes.name]
                              : value.filter(
                                  (id) => id !== item.attributes.name,
                                ),
                          );
                        }
                      }
                    "
                  />
                </FormControl>
                <FormLabel class="font-normal">
                  {{ item.attributes.name }}
                </FormLabel>
              </FormItem>
            </FormField>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>
    <div class="filter-item-wrapper">
      <div id="filter-section-1">
        <FormField name="price" v-slot="{ componentField }">
          <FormItem>
            <FormLabel class="text-base"> Price </FormLabel>
            <FormControl>
              <Slider
                v-bind="componentField"
                v-model="modelValue"
                :max="10000"
                :step="1"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <div class="mt-5 mb-5">Php {{ modelValue[0] }}</div>
      </div>
    </div>

    <div class="filter-item-wrapper">
      <div id="filter-section-1">
        <FormField v-slot="{ componentField }" name="sort">
          <FormItem class="space-y-3">
            <FormLabel class="text-base">Sort price </FormLabel>

            <FormControl>
              <RadioGroup
                class="flex flex-col space-y-1"
                v-bind="componentField"
              >
                <FormItem class="radio-item-wrapper">
                  <FormControl>
                    <RadioGroupItem value="asc" />
                  </FormControl>
                  <FormLabel class="font-normal"> Ascending </FormLabel>
                </FormItem>
                <FormItem class="radio-item-wrapper">
                  <FormControl>
                    <RadioGroupItem value="desc" />
                  </FormControl>
                  <FormLabel class="font-normal"> Descending </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>

    <Button type="submit">Filter</Button>
  </form>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import Button from "@/components/ui/button/Button.vue";
import { Slider } from "@/components/ui/slider";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useStore } from "vuex";

import { ref, defineEmits, watch } from "vue";

const store = useStore();
const emit = defineEmits(["onSubmit"]);

const props = defineProps({
  defaultCategories: { type: Array<string>, required: true },
  defaultPrice: { type: Array<number>, required: true },
  defaultSort: { type: String, required: true },
});

const modelValue = ref(props.defaultPrice);
const maxPrice = ref(props.defaultPrice);

watch(props, () => {
  console.log(props);
  modelValue.value = props.defaultPrice ? props.defaultPrice : maxPrice.value;
  setValues({
    categories: props.defaultCategories,
    price: props.defaultPrice ? props.defaultPrice : maxPrice.value,
    sort: props.defaultSort ? (props.defaultSort as "asc" | "desc") : "asc",
  });
});

const formSchema = toTypedSchema(
  z.object({
    categories: z.array(z.string()).optional(),
    price: z.array(z.number()).optional(),
    sort: z.enum(["asc", "desc"], {
      required_error: "You need to select a notification type.",
    }),
  }),
);

const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: {
    categories: props.defaultCategories,
    price: props.defaultPrice,
    sort: props.defaultSort as "asc" | "desc",
  },
});

const onSubmit = handleSubmit((values) => {
  emit("onSubmit", values);
});
</script>

<style scoped>
.filter-item-wrapper {
  @apply border-b mb-5 border-gray-200 py-6;
}

.radio-item-wrapper {
  @apply flex items-center space-y-0 gap-x-3;
}
</style>
