<script setup>
defineProps({
  type: {
    type: String,
    default: "button",
  },
});
</script>

<template>
  <button
    :type="type"
    class="mt-5 bg-blue-500 text-white p-3 rounded hover:bg-blue-600 w-full md:w-64"
  >
    <slot></slot>
  </button>
</template>
