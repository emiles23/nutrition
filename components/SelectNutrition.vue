<template>
  <select
    class="
      w-full
      px-3
      py-2
      border border-secondary-400
      placeholder-primary-500
       focus:ring-secondary-500
      focus:ring-1
      text-gray-900
      focus:outline-none
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