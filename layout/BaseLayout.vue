<template>
  <div>
    <div class="bg-primary-500 min-w-full px-10">
      <div class="flex items-center h-20">
        <img
          class="h-8 w-8"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
          alt="Workflow"
        />
      </div>
    </div>

    <div style="height: 88vh" class="grid grid-cols-12">
      <!-- Sidebar -->
      <div class="col-span-2 bg-primary-500 py-8 px-4">
        <h1 class="  text-center text-3xl font-bold text-secondary-500 pb-7">Nutrition</h1>
        <div
          v-for="(link, i) in links"
          :key="i"
          class="
            text-white
            cursor-pointer
            hover:bg-secondary-600 hover:text-white
            rounded-md
            text-sm
            font-medium
            text-center
            p-2
            flex
            justify-center
          "
          @click="$router.push(link.route)"
        >
          {{ link.name }}
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: "Analisis", route: "/" },
        { name: "Comidas", route: "foods" },
      ],
    };
  },
};
</script>