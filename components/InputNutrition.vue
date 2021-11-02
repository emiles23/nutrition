<template>
  <input
    class="
      appearance-none
      rounded-none
      px-3
      py-2
      w-full
      border border-secondary-400
      placeholder-gray-500
      text-gray-900 
      focus:outline-none
      focus:ring-secondary-500
      focus:ring-1
      sm:text-sm
    "
    @input="ev => $emit('input', ev.target.value)"
  />
</template>