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
      <!-- Sidebar -->
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
      <!-- Sidebar  End-->
      <div class="col-span-10 p-10">
        <div class="grid grid-cols-12 gap-10 rounded-lg px-5">
          <div
            class="
              grid grid-cols-12
              col-span-7
              gap-4
              border-2 border-green-600
              py-20
              px-5
            "
          >
            <!-- div of the input -->
            <div v-for="(field, i) in fields" :key="i" class="col-span-6">
              <label v-if="Array.isArray(field.label)">{{
                field.label[getValue(field.labelDependantValue)]
              }}</label>

              <label v-else> {{ field.label }}</label>

              <!-- input -->
              <input-nutrition
                v-if="isTextOrNumber(field.type)"
                required
                :type="field.type"
                :placeholder="field.placeholder"
                v-model="field.value"
                @input="(v) => setValue(field.name, v, field.type)"
              />
              <label class="text-red-500" v-if="errors[field.name]">{{
                errors[field.name]
              }}</label>
              <!-- input End -->
              <!-- select -->
              <select-nutrition
                v-if="field.type == 'select'"
                v-model="field.value"
                @change="(v) => setValue(field.name, v, field.type)"
              >
                <option
                  v-for="(option, i) in field.options"
                  :key="i"
                  :value="option.value"
                >
                  {{ option.placeholder }}
                </option>
              </select-nutrition>
              <!-- select End-->
            </div>
          </div>
          <div class="col-span-5 gap-4 border-2 border-green-600 py-20 px-5">
            <template v-if="showResults()">
              <div class="flex items-center justify-center">
                <div>
                  <h1>El peso que debe tener es: {{ idealWeight }}kilos</h1>
                  <h1>Su masa corporal es de: {{ bodyMass }}</h1>
                  <h1>
                    las calorias que quema al dia son:
                    {{ dailyCalories }} Kcal
                  </h1>
                  <h1>
                    las calorias que debe consumir para rebajar son:
                    {{ caloriesConsumed }} Kcal
                  </h1>
                  <h1>
                    La cantidad de proteína que debe consumir es:
                    {{ proteinsToConsume }}gramos que equivalen a
                    {{ caloriesForProtein }} Kcal
                  </h1>
                  <h1>
                    La cantidad de grasas que debe consumir es:
                    {{ greaseToConsume }} gramos que equivalen a
                    {{ caloriesForGrease }} Kcal
                  </h1>
                  <h1>
                    La cantidad de carbohidratos de que debe consumir es:
                    {{ carbohydratesToConsume }} gramos que equivalen a
                    {{ caloriesForCarbohydrates }} Kcal
                  </h1>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- /End replace -->
      </div>
    </div>
  </div>
</template>


<script>
import Arrow from "@/Components/Icons/Arrow";
import InputNutrition from "@/Components/InputNutrition";
import SelectNutrition from "@/Components/SelectNutrition";

export default {
  components: {
    Arrow,
    InputNutrition,
    SelectNutrition,
  },

  data() {
    return {
      peso: 0,
      estatura: 0,
      ejercicio: 0,
      percentageLoss: 0,
      proteinas: 0,
      grasa: 0,
      desirableWeight: 0,
      fields: [
        {
          name: "peso",
          type: "number",
          label: "Peso",
          placeholder: "Ingrese peso",
          value: "",
        },
        {
          name: "estatura",
          type: "number",
          label: "Estatura",
          placeholder: "Ingrese estatura",
          value: "",
        },
        {
          name: "sex",
          type: "select",
          label: "Sexo",
          value: 0,
          options: [
            { placeholder: "Seleccione un sexo", value: 0 },
            { placeholder: "Femenino", value: 1 },
            { placeholder: "Masculino", value: 2 },
          ],
        },
        {
          name: "desirableWeight",
          type: "select",
          label: "Peso deseado ",
          value: 0,
          options: [
            { placeholder: " Seleccione peso deseado", value: 0 },
            { placeholder: "Perder peso", value: 1 },
            { placeholder: "Ganar peso", value: 2 },
          ],
        },
        {
          name: "proteinas",
          type: "number",
          label: [
            "Seleccione una opcion en peso deseado",
            "Proteína rango (1.8 - 2.5)",
            "Proteína rango (2.5 - 3.5)",
          ],
          labelDependantValue: "desirableWeight",
          placeholder: "Ingrese la cantidad de proteinas",
          value: "",
        },

        {
          name: "grasa",
          type: "number",
          label: [
            "Seleccione una opcion en peso deseado",
            "Proteína rango (0.5 - 1.5)",
            "Proteína rango (1.5 - 2.5)",
          ],
          labelDependantValue: "desirableWeight",
          placeholder: "Ingrese la cantidad de grasa",
          value: "",
        },
        {
          name: "ejercicio",
          type: "select",
          label: "Entrenamiento",
          value: 0,
          options: [
            { placeholder: "Seleccione", value: 0 },
            { placeholder: "Poco o ningun ejerccio", value: 1.2 },
            { placeholder: "Ejerccio ligero (1 - 3 dias)", value: 1.4 },
            { placeholder: "Ejerccio moderado (3 - 5 dias)", value: 1.6 },
            { placeholder: "Ejerccio fuerte (6 - 7 dias)", value: 1.8 },
            { placeholder: "Ejerccio muy fuerte (dos veces al dia)", value: 2 },
          ],
        },
        {
          name: "percentageLoss",
          type: "select",
          label: "Seleccione porcentaje deseado",
          value: 0,
          options: [
            { placeholder: "Seleccione porcentaje deseado", value: 0 },
            { placeholder: "Bajar el  10% por semana", value: 0.1 },
            { placeholder: "Bajar el  20% por semana", value: 0.2 },
            { placeholder: "Bajar el  30% por semana", value: 0.3 },
          ],
        },
      ],

      bodyMassIndex: [
        { sex: "female", interval: 20 - 25, type: "normalWeight" },
        { sex: "female", interval: 25 - 30, type: "overWeight" },
        { sex: "female", interval: 30 - 40, type: "obesity" },
        { sex: "female", interval: 40, type: "morbidObesity" },

        { sex: "male", interval: 20 - 27, type: "normalWeight" },
        { sex: "male", interval: 27 - 30, type: "overWeight" },
        { sex: "male", interval: 30 - 40, type: "obesity" },
        { sex: "male", interval: 40, type: "morbidObesity" },
      ],

      errors: {},
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
    carbohydratesToConsume() {
      return Math.round(this.caloriesForCarbohydrates / 4);
    },
  },

  methods: {
    setValue(name, value, type) {
      console.log(name, value);
      this.validate(name, type, value);
      this[name] = value;
    },

    getValue(name) {
      return this[name];
    },

    showResults() {
     return (
       this.peso != "" && 
       this.estatura != "" &&
       this.ejercicio != "" &&
       this.percentageLoss != "" &&
       this.proteinas != "" &&
       this.grasa != ""
     );
    },

    isTextOrNumber(type) {
      return ["text", "number"].includes(type);
    },

    validate(name, type, value) {
      if (this.isTextOrNumber(type)) {
        if (value == "") {
          this.errors[name] = "El campo no debe estar vacio";
        } else if (value <= 0) {
          this.errors[name] = "El numero debe ser mayor a 0";
        } else {
          delete this.errors[name];
        }
      }
    },
  },
};
</script>

<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
</style>