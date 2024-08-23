<template>
  <button
    class="bg-primary text-white border-2 border-transparent rounded-3xl px-6 py-2 mb-2 hover:bg-primary-light transition-all hover:scale-110"
  >
    <div class="m-auto">
      <div class="flex items-center justify-start flex-1 space-x-4">
        <span class="font-medium">
          <slot></slot>
        </span>
      </div>
    </div>
  </button>
</template>
