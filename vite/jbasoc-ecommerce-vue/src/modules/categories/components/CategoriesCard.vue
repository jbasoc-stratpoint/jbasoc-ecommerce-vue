<template>
  <router-link
    :to="{ name: 'products', query: { categories: category.attributes.name } }"
  >
    <Card
      class="justify-center p-5 font-semibold flex flex-row mb-5 items-center text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    >
      <div class="text-white">
        {{ category.attributes.name }}
      </div>
    </Card>
  </router-link>
</template>

<script setup lang="ts">
import { Card } from "@/components/ui/card";

defineProps({
  category: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
