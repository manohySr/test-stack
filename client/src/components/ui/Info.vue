<template>
  <p class="text-sm text-gray-600 flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 text-blue-500"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"
      />
    </svg>
    <span><slot /></span>
  </p>
</template>
