<template>
  <select
    class="
      w-full
      px-3
      py-2
      border border-gray-300
      placeholder-gray-500
      text-gray-900
      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
    "
    @change="onChange"
  >
    <slot />
  </select>
</template>
<script>
export default {
  methods: {
    onChange(v) {
      this.$emit("change", v.target.value);
    },
  },
};
</script>