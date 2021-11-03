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
        <h1 class="text-3xl font-bold text-white pb-7">Dashboard</h1>
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
        <div class="grid grid-cols-12 gap-1 rounded-lg">
          <div class="col-span-5 border border-secondary-400 py-5 px-3">
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
                    @input="
                      (v) =>
                        setValue(field.name, v, field.type, field.validation)
                    "
                  /><!-- input End -->

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
                  <label class="text-red-600" v-if="errors[field.name]">{{
                    errors[field.name]
                  }}</label>
                </div>
              </template>
            </div>

            <img src="~assets/frutas.png" alt="Workflow" />
          </div>

          <div class="col-span-7 flex items-center pl-8">
            <template v-if="showResults()">
              <div class="w-full">
                <h1 class="text-2xl text-center mb-5 text-primary-600">
                  Resultados del analisis
                </h1>
                <!-- v-if="showResults()" -->
                <base-table class="mt-0">
                  <base-caption
                    >Indice de Masa Corporal
                    <strong class="text-primary-500">
                      (IMC)</strong
                    ></base-caption
                  >
                  <tr>
                    <base-td
                      ><strong class="text-primary-500">IMC</strong>
                      Ideal</base-td
                    >
                    <base-td
                      ><strong class="text-primary-500">IMC</strong>
                      Actual</base-td
                    >
                    <base-td>Caracteristica</base-td>
                  </tr>

                  <tr>
                    <base-td>21</base-td>
                    <base-td>{{ bodyMass }}</base-td>
                    <base-td>{{ characteristicImc }}</base-td>
                  </tr>
                </base-table>

                <base-table>
                  <base-caption>
                    Peso a perder
                    <strong class="text-crabohydrates-400"
                      >(Kg)</strong
                    ></base-caption
                  >
                  <tr>
                    <base-td
                      ><strong class="text-protein-500">Peso</strong>
                      Actual</base-td
                    >
                    <base-td
                      ><strong class="text-protein-500">Peso</strong>
                      Ideal</base-td
                    >
                    <base-td v-if="kgToLoseOrWin < 0"
                      ><strong class="text-crabohydrates-400">Kg</strong> a
                      Ganar</base-td
                    >
                    <base-td v-else
                      ><strong class="text-crabohydrates-400">Kg</strong> a
                      Perder</base-td
                    >
                  </tr>

                  <tr>
                    <base-td>
                      {{ peso }}
                      <strong class="text-crabohydrates-400"
                        >Kg</strong
                      ></base-td
                    >
                    <base-td
                      >{{ idealWeight }}
                      <strong class="text-crabohydrates-400"
                        >Kg</strong
                      ></base-td
                    >
                    <base-td
                      >{{ kgToLoseOrWinPositive
                      }}<strong class="text-crabohydrates-400">
                        Kg</strong
                      ></base-td
                    >
                  </tr>
                </base-table>

                <base-table>
                  <base-caption
                    >Kilocalorías
                    <strong class="text-grease-600">
                      (Kcal)</strong
                    ></base-caption
                  >

                  <tr>
                    <base-td>
                      <strong class="text-grease-600"> Kcal</strong> quemada al
                      dia</base-td
                    >
                    <base-td
                      ><strong class="text-grease-600"> Kcal</strong> a
                      consumida al dia</base-td
                    >
                  </tr>

                  <tr>
                    <base-td>{{ dailyCalories }}</base-td>
                    <base-td> {{ caloriesConsumed }}</base-td>
                  </tr>
                </base-table>

                <base-table>
                  <base-caption
                    >Gramos
                    <strong class="text-protein-500"> (gr)</strong> equivalentes
                    a
                    <strong class="text-grease-600"> Kcal</strong>
                  </base-caption>
                  <tr>
                    <base-td
                      ><strong class="text-protein-400">Proteínas </strong> /
                      <strong class="text-grease-600"> Kcal</strong>
                    </base-td>
                    <base-td
                      ><strong class="text-grease-500">Grasas </strong> /
                      <strong class="text-grease-600"> Kcal</strong>
                    </base-td>
                    <base-td
                      ><strong class="text-crabohydrates-500"
                        >Carbohidratos</strong
                      >
                      / <strong class="text-grease-600"> Kcal</strong>
                    </base-td>
                  </tr>

                  <tr>
                    <base-td
                      >{{ proteinsToConsume }}
                      <strong class="text-protein-500">gr</strong> /
                      {{ caloriesForProtein
                      }}<strong class="text-grease-600"> Kcal</strong></base-td
                    >
                    <base-td
                      >{{ greaseToConsume }}
                      <strong class="text-protein-500">gr</strong> /
                      {{ caloriesForGrease
                      }}<strong class="text-grease-600"> Kcal</strong></base-td
                    >
                    <base-td
                      >{{ carbohydratesToConsume }}
                      <strong class="text-protein-500">gr</strong> /
                      {{ caloriesForCarbohydrates
                      }}<strong class="text-grease-600"> Kcal</strong></base-td
                    >
                  </tr>
                </base-table>
              </div>
            </template>

            <img
              v-else
              class="mt-4"
              src="~assets/alimentos_saludables.png"
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
          label: "Peso: Kilogramos",
          placeholder: "Ingrese peso",
          value: "",
        },
        {
          name: "estatura",
          type: "number",
          label: "Estatura: Metros (M)",
          placeholder: "Ingrese estatura",
          value: "",
          validation: "metros",
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
    };
  },

  computed: {
    // IMC
    // function body mass index (IMC)
    bodyMass() {
      return Math.round(this.peso / (this.estatura * this.estatura));
    },
    // characteristic of (IMC)
    characteristicImc() {
      if (this.bodyMass < 18.5) return "Bajo de peso";
      if (this.bodyMass >= 18.5 && this.bodyMass <= 24.9) return "Peso normal";
      if (this.bodyMass >= 25 && this.bodyMass <= 29.9)
        return "Pre-obesidad o Sobrepeso";
      if (this.bodyMass >= 30 && this.bodyMass <= 34.9)
        return "Obesidad clase I";
      if (this.bodyMass >= 35 && this.bodyMass <= 39.9)
        return "Obesidad clase II";
      if (this.bodyMass >= 40) return "Obesidad clase III";
    },

    // PESO
    //  function ideal weight
    idealWeight() {
      return Math.round(21 * (this.estatura * this.estatura));
    },
    // function kilograms to lose
    kgToLoseOrWinPositive() {
      return this.kgToLoseOrWin < 0
        ? this.kgToLoseOrWin * -1
        : this.kgToLoseOrWin;
    },
    kgToLoseOrWin() {
      return this.peso - this.idealWeight;
    },
    // kilocalorias
    // function of calories burned per day
    dailyCalories() {
      return Math.round(this.peso * 22 * this.ejercicio);
    },
    // function of calories to be consumed per day
    caloriesConsumed() {
      console.log(
        this.desirableWeight,
        this.dailyCalories,
        this.percentageLoss
      );
      let percentageDiet = this.percentageLoss * this.dailyCalories;
      return Math.round(
        this.desirableWeight == 1
          ? this.dailyCalories - percentageDiet
          : this.dailyCalories + percentageDiet
      );
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
    setValue(name, value, type, validation) {
      // console.log(name, value);
      this.validate(name, type, value, validation);
      this[name] = value;
    },
    getValue(name) {
      return this[name];
    },

    isTextOrNumber(type) {
      return ["text", "number"].includes(type);
    },

    validate(name, type, value, validation) {
      console.log(name, type, value, validation);
      if (this.isTextOrNumber(type)) {
        if (value == "") {
          this.errors[name] = "No debe estar vacio";
        } else if (value <= 0) {
          this.errors[name] = "El valor debe ser mayor a 0";
        } else if (validation == "metros" && value % 1 == 0) {
          this.errors[name] = "El valor debe ser en M";
        } else {
          delete this.errors[name];
        }
      }
      
      if (type == "select") {
        if (value == 0) {
          this.errors[name] = "Escoga una opcion";
        } else {
          delete this.errors[name];
        }
      }
      console.log(name, type, value, validation, this.errors);
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