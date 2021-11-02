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
        <h1 class="text-3xl font-bold text-gray-900 pb-7">Dashboard</h1>
        <div class="ml-2 flex space-x-4">
          <a
            href="#"
            class="
              text-gray-900
              hover:bg-gray-700 hover:text-white
              rounded-md
              text-sm
              font-medium
            "
            >Calorias diarias</a
          >
        </div>
      </div>

      <!-- Sidebar  End-->
      <div class="col-span-10 px-14 flex items-center">
        <div class="grid grid-cols-12 gap-5 rounded-lg">
          <div class="col-span-5 border-2 border-secondary-600 py-5 px-3">
            <!-- div of the input -->
            <div class="grid grid-cols-2 gap-3">
              <template v-for="(field, i) in fields">
                <div
                  :key="i"
                  v-if="
                    !field.visualDependant ||
                    (field.visualDependant &&
                      getValue(field.nameDependantValue) > 0)
                  "
                >
                  <label v-if="Array.isArray(field.label)">{{
                    field.label[getValue(field.nameDependantValue)]
                  }}</label>

                  <label v-else> {{ field.label }}</label>

                  <!-- input -->
                  <input-nutrition
                    v-if="isTextOrNumber(field.type)"
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
              </template>
            </div>

            <img
              class=""
              src="https://lh3.googleusercontent.com/proxy/elTAD8oIYdor8VheDAnOmTRPirn9pI2QaM2WZA6FMkZ0SULF9BqPqKDuFrJBVJXSno-BleDV2UfwzT7kON4jrQD9_dgh7zPSJnkBgznZlUmCpiEcSQIY50UmsR7mA5b5wE0-fw"
              alt="Workflow"
            />
          </div>

          <div class="col-span-7 flex items-center pl-8">
            <div v-if="!showResults()" class="w-full">
              <!-- v-if="showResults()" -->
              <base-table class="mt-0">
                <base-caption
                  >Indice de Masa Corporal
                  <strong class="text-primary-500"> (IMC)</strong></base-caption
                >
                <tr>
                  <base-td><strong class="text-primary-500">IMC</strong> Ideal</base-td>
                  <base-td><strong class="text-primary-500">IMC</strong> Actual</base-td>
                  <base-td>Caracteristica</base-td>
                </tr>

                <tr>
                  <base-td>Celda 4</base-td>
                  <base-td>{{ bodyMass }}</base-td>
                  <base-td>nose</base-td>
                </tr>
              </base-table>

              <base-table>
                <base-caption> Peso a perder</base-caption>
                <tr>
                  <base-td>Peso Actal</base-td>
                  <base-td>Peso Ideal</base-td>
                  <base-td>kilos a Perder</base-td>
                </tr>

                <tr>
                  <base-td>{{ peso }} <strong class="text-secondary-400">kl</strong></base-td>
                  <base-td>{{ idealWeight }} <strong class="text-secondary-400">kl</strong></base-td>
                  <base-td>nose<strong class="text-secondary-400">kl</strong></base-td>
                </tr>
              </base-table>

              <base-table>
                <base-caption
                  >Kilocalorías
                  <strong class="text-tertiary-600">
                    (Kcal)</strong
                  ></base-caption
                >

                <tr>
                  <base-td>cal quemada al dia</base-td>
                  <base-td><strong class="text-tertiary-600">
                    (Kcal)</strong> a consumida al dia</base-td>
                </tr>

                <tr>
                  <base-td>{{ dailyCalories }}</base-td>
                  <base-td> {{ caloriesConsumed }}</base-td>
                </tr>
              </base-table>

              <base-table>
                <base-caption
                  >Gramos equivalentes a
                  <strong class="text-primary-600"> Kcal</strong>
                </base-caption>
                <tr>
                  <base-td>Proteínas /<strong class="text-tertiary-600">
                    Kcal</strong> </base-td>
                  <base-td>Grasas / <strong class="text-tertiary-600">
                  Kcal</strong> </base-td>
                  <base-td>Carbohidratos / <strong class="text-tertiary-600">
                    Kcal</strong> </base-td>
                </tr>

                <tr>
                  <base-td
                    >{{ proteinsToConsume }}gr/{{
                      caloriesForProtein
                    }}<strong class="text-tertiary-600">
                  Kcal</strong></base-td
                  >
                  <base-td
                    >{{ greaseToConsume }}gr/{{
                      caloriesForGrease
                    }}<strong class="text-tertiary-600">
                    Kcal</strong></base-td
                  >
                  <base-td
                    >{{ carbohydratesToConsume }}gr / {{
                      caloriesForCarbohydrates
                    }}<strong class="text-tertiary-600">
                    Kcal</strong></base-td
                  >
                </tr>
              </base-table>
            </div>

            <img
              v-else
              class="mt-4"
              src="https://www.nutrasalud.es/media/uploads/noticias/alimentos_saludables.jpg"
              alt="Workflow"
            />
          </div>
        </div>
      </div>

      <!-- /End replace -->
    </div>
  </div>
</template>


<script>
import Arrow from "@/Components/Icons/Arrow";
import InputNutrition from "@/Components/InputNutrition";
import SelectNutrition from "@/Components/SelectNutrition";
import BaseTable from "@/Components/BaseTable";
import BaseCaption from "@/Components/BaseCaption";
import BaseTd from "@/Components/BaseTd";

export default {
  components: {
    Arrow,
    InputNutrition,
    SelectNutrition,
    BaseTable,
    BaseCaption,
    BaseTd,
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
          visualDependant: true,
          label: [
            "Seleccione una opcion en peso deseado",
            "Proteína rango (1.8 - 2.5)",
            "Proteína rango (2.5 - 3.5)",
          ],
          nameDependantValue: "desirableWeight",
          placeholder: "Ingrese la cantidad de proteinas",
          value: "",
        },

        {
          name: "grasa",
          type: "number",
          visualDependant: true,
          label: [
            "Seleccione una opcion en peso deseado",
            "Proteína rango (0.5 - 1.5)",
            "Proteína rango (1.5 - 2.5)",
          ],
          nameDependantValue: "desirableWeight",
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
          label: "Ritmo de dieta",
          value: 0,
          options: [
            { placeholder: "Seleccione % deseado", value: 0 },
            { placeholder: "Bajar el  10% por semana", value: 0.1 },
            { placeholder: "Bajar el  20% por semana", value: 0.2 },
            { placeholder: "Bajar el  30% por semana", value: 0.3 },
          ],
        },
      ],
      errors: {},

      bodyMassIndex: [
        { from: 18.5, label: "Bajo de peso" },
        { from: 18.5, to: 24.9, label: "Peso normal" },
        { from: 25, to: 29.9, label: "Pre-obesidad o Sobrepeso" },
        { from: 30, to: 34.9, label: "Obesidad clase I" },
        { from: 35, to: 39.9, label: "Obesidad clase II" },
        { from: 40, label: "Obesidad clase III" },
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

    isTextOrNumber(type) {
      return ["text", "number"].includes(type);
    },

    validate(name, type, value) {
      if (this.isTextOrNumber(type)) {
        if (value == "") {
          this.errors[name] = "No debe estar vacio";
        } else if (value <= 0) {
          this.errors[name] = "El valo debe ser mayor a 0";
        } else {
          delete this.errors[name];
        }
      }
    },

    showResults() {
      return (
        this.peso != "" &&
        this.estatura != "" &&
        this.ejercicio != "" &&
        this.percentageLoss != "" &&
        this.proteinas != "" &&
        this.grasa != "" &&
        Object.keys(this.errors).length === 0
      );
    },
  },
};
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>