<template>
  <input
    class="
      appearance-none
      rounded-none
      relative
      block
      px-3
      py-2
      w-full
      border border-gray-300
      placeholder-gray-500
      text-gray-900
      focus:outline-none
      focus:ring-indigo-500
      focus:border-indigo-500
      focus:z-10
      sm:text-sm
    "
    @input="ev => $emit('input', ev.target.value)"
  />
</template>