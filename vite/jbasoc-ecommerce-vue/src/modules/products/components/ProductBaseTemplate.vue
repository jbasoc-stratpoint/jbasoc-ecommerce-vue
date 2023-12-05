<template lang="">
  <div class="bg-white">
    <div>
      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10"
        >
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">
            <slot name="header"></slot>
          </h1>
        </div>

        <slot name="content"></slot>
      </main>
    </div>
  </div>
</template>
