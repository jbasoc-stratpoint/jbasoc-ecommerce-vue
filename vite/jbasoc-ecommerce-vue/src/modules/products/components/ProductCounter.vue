<template>
  <div class="flex flex-row mt-10 mb-10">
    <Button @click="onValueDecrease(modelValue)">-</Button>
    <Input
      class="w-[50px] prod-input"
      required
      min="1"
      oninput="validity.valid||(value='1');"
      type="number"
      @update:model-value="onInputUpdate"
      :model-value="modelValue"
    />
    <Button @click="onValueIncrease(modelValue)">+</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defineProps, defineEmits } from "vue";

defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["update:modelValue"]);

const onInputUpdate = (value) => {
  emit("update:modelValue", value ? value : 1);
};

const onValueIncrease = (value) => {
  emit("update:modelValue", ++value);
};

const onValueDecrease = (value) => {
  emit("update:modelValue", --value == 0 ? 1 : value);
};
</script>

<style scoped>
.prod-input::-webkit-outer-spin-button,
.prod-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
