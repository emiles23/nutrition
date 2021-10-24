<template>
  <div>
    <div class="bg-gray-800 min-w-full px-10">
      <div class="flex items-center h-20">
        <img
          class="h-8 w-8"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
          alt="Workflow"
        />
      </div>
    </div>
    <div class="grid grid-cols-12 min-h-screen">
      <div class="col-span-2 bg-white shadow min-h-screen">
        <div class="mx-auto py-8 px-4">
          <h1 class="text-3xl font-bold text-gray-900 pb-7">Dashboard</h1>
          <div class="ml-2 flex items-baseline space-x-4">
            <a
              href="#"
              class="
                text-gray-900
                hover:bg-gray-700 hover:text-white
                py-2
                px-6
                rounded-md
                text-sm
                font-medium
              "
              >Calorias diarias</a
            >
          </div>
        </div>
      </div>
      <div class="col-span-10">
        <div class="w-11/12 mx-auto px-1 py-20">
          <div
            class="border-4 border-dashed border-gray-200 rounded-lg h-96 px-5"
          >
            <div class="grid grid-cols-12 py-10 gap-4">
              <div
                v-for="(field, i) in fields"
                :key="i"
                :class="field.type == 'text' ? 'col-span-2' : 'col-span-4'"
              >
                <input
                  v-if="['text', 'number'].includes(field.type)"
                  class="
                    appearance-none
                    rounded-none
                    relative
                    block
                    w-full
                    px-3
                    py-2
                    border border-gray-300
                    placeholder-gray-500
                    text-gray-900
                    focus:outline-none
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    focus:z-10
                    sm:text-sm
                  "
                  :type="field.type"
                  :placeholder="field.label"
                  v-model="field.value"
                  @input="setValue(field.name, field.value)"
                />
                <select
                  v-if="field.type == 'select'"
                  @change="setValue(field.name, field.value)"
                  v-model="field.value"
                  class="
                    w-full
                    px-3
                    py-2
                    border border-gray-300
                    placeholder-gray-500
                    text-gray-900
                    focus:outline-none
                    focus:ring-indigo-500
                    focus:border-indigo-500
                  "
                >
                  <option
                    v-for="(option, i) in field.options"
                    :key="i"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <div>
                <h1 v-if="idealWeight > 0">
                  El peso que debe tener es: {{ idealWeight }}
                </h1>
                <h1 v-if="estatura > 0 && peso > 0" class="">
                  Su masa corporal es de: {{ bodyMass }}
                </h1>
                <h1 v-if="dailyCalories > 0">
                  las calorias que quema al dia son: {{ dailyCalories }} Kcal
                </h1>
                <h1 v-if="percentageLoss > 0">
                  las calorias que debe consumir para rebajar son:
                  {{ caloriesConsumed }} Kcal
                </h1>
                <h1 v-if="proteinsToConsume > 0">
                  La cantidad de proteína que debe consumir es:
                  {{ proteinsToConsume }}gramos que equivalen a
                  {{ caloriesForProtein }} Kcal
                </h1>
                <h1 v-if="greaseToConsume > 0">
                  La cantidad de grasas que debe consumir es:
                  {{ greaseToConsume }} gramos que equivalen a
                  {{ caloriesForGrease }} Kcal
                </h1>
                <h1 v-if="percentageLoss > 0">
                  La cantidad de carbohidratos de que debe consumir es:
                  {{ carbohydratesToConsume }} gramos que equivalen a
                  {{ caloriesForCarbohydrates }} Kcal
                </h1>
              </div>
            </div>
          </div>
          <!-- /End replace -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Arrow from "@/Components/Icons/Arrow";

export default {
  components: {
    Arrow,
  },

  data() {
    return {
      peso: 0,
      estatura: 0,
      ejercicio: 0,
      percentageLoss: 0,
      proteinas: 0,
      grasa: 0,
      fields: [
        {
          name: "peso",
          type: "text",
          label: "Ingrese peso",
          value: "",
        },
        {
          name: "estatura",
          type: "text",
          label: "Ingrese estatura",
          value: "",
        },

        {
          name: "proteinas",
          type: "text",
          label: "Ingrese las proteínas a cosumir en el rango 1.8 - 2.5",
          value: "",
        },

        {
          name: "grasa",
          type: "text",
          label: "Ingrese las grasa a cosumir en el rango 0.5 - 1.5",
          value: "",
        },

        // { name: "numero", type: "number", label: "Ingrese numero", value: ""},

        {
          name: "ejercicio",
          type: "select",
          label: "Seleccione",
          value: 0,
          options: [
            { label: "Seleccione", value: 0 },
            { label: "Poco o ningun ejerccio", value: 1.2 },
            { label: "Ejerccio ligero (1 - 3 dias)", value: 1.4 },
            { label: "Ejerccio moderado (3 - 5 dias)", value: 1.6 },
            { label: "Ejerccio fuerte (6 - 7 dias)", value: 1.8 },
            { label: "Ejerccio muy fuerte (dos veces al dia)", value: 2 },
          ],
        },
        {
          name: "percentageLoss",
          type: "select",
          label: "Seleccione porcentaje deseado",
          value: 0,
          options: [
            { label: "Seleccione porcentaje deseado", value: 0 },
            { label: "Bajar de peso en 12 meses 10%", value: 0.1 },
            { label: "Bajar de peso en 6 meses 20%", value: 0.2 },
            { label: "Bajar de peso en 3 meses 30%)", value: 0.3 },
          ],
        },
      ],
    };
  },

  computed: {
    dailyCalories() {
      return Math.round(this.peso * 22 * this.ejercicio);
    },

    caloriesConsumed() {
      return Math.round(
        this.dailyCalories - this.percentageLoss * this.dailyCalories
      );
    },

    bodyMass() {
      // return Math.round(this.peso / Math.pow(this.estatura));
      return Math.round(this.peso / (this.estatura * this.estatura));
    },

    idealWeight() {
      return Math.round(21 * (this.estatura * this.estatura));
    },

    // calculate the protein to be consumed

    proteinsToConsume() {
      return Math.round(this.proteinas * this.peso);
    },

    // calculate the kilo calories per protein
    caloriesForProtein() {
      return Math.round(this.proteinsToConsume * 4);
    },

    greaseToConsume() {
      return Math.round(this.grasa * this.peso);
    },

    // calculate kilo calories from fat
    caloriesForGrease() {
      return Math.round(this.greaseToConsume * 9);
    },

    //  kilo calories to be consumed by carbohydrates
    caloriesForCarbohydrates() {
      return Math.round(
        this.caloriesConsumed -
          (this.caloriesForProtein + this.caloriesForGrease)
      );
    },

    // grams of Carbohydrates to be consumed
    carbohydratesToConsume(){
      return Math.round(this.caloriesForCarbohydrates / 4);
    },

  },

  methods: {
    setValue(name, value) {
      this[name] = value;
    },
  },
};
</script>