<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="grow mb-10">
    <Transition>
      <div v-if="isLoading" class="flex items-center justify-center">
        <h2
          class="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        >
          {{ loadingSpiel }}
        </h2>
      </div>
      <div v-else-if="!props.isLoading && props.data.length > 0" :class="class">
        <div v-for="item in props.data" :key="(item as any)?.id">
          <!--        SLOT HERE!!!!      -->
          <div v-if="item">
            <slot name="item" v-bind="item" />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex items-center justify-center">
          <h2
            class="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
          >
            {{ noDataSpiel }}
          </h2>
        </div>
      </div>
    </Transition>
  </div>
  <Pagination
    v-if="showPagination && meta.pagination.total > 0"
    v-slot="{ page }"
    :total="meta.pagination.total"
    :itemsPerPage="meta.pagination.pageSize"
    :sibling-count="1"
    show-edges
    v-model:page="pageNo"
    @update:page="onPageChange"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>

<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "../ui/pagination";
import { Button } from "@/components/ui/button";

import { defineEmits, computed } from "vue";

const emit = defineEmits(["onPageChange"]);
const props = defineProps({
  data: { type: Array, required: true, default: () => [] },
  class: { type: String, default: "" },
  meta: { type: Object, default: () => {} },
  showPagination: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false, required: true },
  loadingSpiel: { type: String, default: "Loading..." },
  noDataSpiel: { type: String, default: "No data available" },
});

const pageNo = computed(() => props.meta?.pagination?.page);
const onPageChange = (page) => {
  emit("onPageChange", page);
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
