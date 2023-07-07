<template>
  <form action="" method="post" class="enrollment-form">
    <h3
      class="seats all columns"
      v-if="eventValue == 'R21' && value.mode === 'F2F'"
    >
      <b>CUPOS DISPONIBLES: {{ seats }}</b>
    </h3>
    <BaseField
      class="half"
      v-model="value.mode"
      type="select"
      label="Modalidad:"
      :options="modeOptions"
    />
    <BaseField
      class="half"
      v-model="value.country"
      type="select"
      label="País:"
      :options="countryOptions"
    />
    <BaseField
      class="half"
      v-model="value.idType"
      type="select"
      label="Identificación:"
      :options="idOptions"
    />
    <BaseField
      class="half"
      v-model="value.id"
      type="number"
      placeholder="Número de Identificación"
    />
    <BaseField
      class="half"
      v-model="eventValue"
      type="select"
      label="Evento:"
      :options="eventOptions"
      v-if="staff"
    />
    <BaseField
      class="half"
      v-model="value.origin"
      type="select"
      label="Tipo de Registro:"
      :options="originOptions"
      v-if="staff"
    />
    <BaseField
      :class="{ half: staff, all: !staff }"
      v-model="value.email"
      type="email"
      label="Correo electrónico:"
      placeholder="Correo electrónico"
    />
    <BaseField
      class="half"
      v-model="value.lvlup"
      type="select"
      label="LevelUp:"
      :options="levelUpOptions"
      v-if="eventValue === 'R21'"
    />
    <BaseField
      class="half"
      v-model="congResp"
      type="select"
      label="Perteneces a una Congregación:"
      :options="congregationOptions"
      v-if="eventValue === 'R21'"
    />
    <BaseField
      :class="{ half: staff, all: !staff }"
      v-model="value.group"
      type="text"
      label="Congregación:"
      v-if="eventValue === 'R21' && congResp === 'SI'"
    />
  </form>
  <BaseButton
    text="Siguiente"
    :isSmall="true"
    :dark="true"
    :disabled="v$.$invalid"
    @click="checkData"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseField from "@/ui/components/common/BaseField.vue";
import BaseButton from "@/ui/components/common/BaseButton.vue";
import { CriticalData, EventType } from "@/domain/interfaces/enrollment";
import useVuelidate from "@vuelidate/core";
import { required, numeric, email } from "@vuelidate/validators";
import EnrollmentManager from "@/domain/use_cases/enrollment-manager";

export default defineComponent({
  name: "CriticalDetails",
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    BaseField,
    BaseButton,
  },
  props: {
    modelValue: {
      type: Object as PropType<CriticalData>,
      required: true,
    },
    staff: {
      type: Boolean,
      default: false,
    },
    event: {
      type: String as PropType<EventType>,
      required: true,
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.seats = await EnrollmentManager.getSeats();
      if (this.staff) {
        this.originOptions["L"] = "Diario - Lunes";
        this.originOptions["M"] = "Diario - Martes";
        this.originOptions["X"] = "Diario - Miércoles";
        this.originOptions["J"] = "Diario - Jueves";
        this.originOptions["V"] = "Diario - Viernes";
        this.originOptions["S"] = "Diario - Sábado";
      }
    });
  },
  emits: ["update:modelValue", "update:event", "checkData", "eventChange"],
  watch: {
    selectedEvent: function () {
      if (this.staff) {
        this.$emit("eventChange", this.event);
      }
    },
  },
  data() {
    return {
      congResp: "SI",
      eventOptions: {
        R21: "Influyentes",
        CE: "Café Emprender",
      },
      originOptions: {
        efectivo: "Efectivo",
        congregacion: "Congregación",
        bono: "Bono Especial",
        premio: "Premio",
      } as Record<string, string>,
      congregationOptions: {
        SI: "Si",
        NO: "No",
      },
      modeOptions: {
        F2F: "Presencial",
        DIG: "Digital",
      },
      countryOptions: {
        AR: "Argentina",
        BO: "Bolivia",
        BR: "Brazil",
        CL: "Chile",
        CO: "Colombia",
        CR: "Costa Rica",
        CU: "Cuba",
        DO: "República Dominicana",
        EC: "Ecuador",
        US: "Estados Unidos",
        SV: "El Salvador",
        ES: "España",
        GT: "Guatemala",
        HN: "Honduras",
        MX: "Mexico",
        NI: "Nicaragua",
        PA: "Panama",
        PE: "Peru",
        PR: "Puerto Rico",
        PY: "Paraguay",
        UY: "Uruguay",
        VE: "Venezuela",
      },
      levelUpOptions: {
        EC: "Economía",
        CN: "Conexión",
        MI: "Misiones",
        FE: "Futuro y Educación",
        CR: "Creativos",
        LJ: "Linaje",
        AM: "Ambiente",
        VD: "Vida",
      },
      idOptions: {
        CC: "Cédula de Ciudadanía",
        CE: "Cédula de Extranjería",
        TI: "Tarjeta de Identidad",
        PAS: "Pasaporte",
        NIT: "NIT",
      },
      seats: 0,
    };
  },
  computed: {
    value: {
      get(): CriticalData {
        return this.modelValue;
      },
      set(value: CriticalData): void {
        this.$emit("update:modelValue", value);
      },
    },
    eventValue: {
      get(): EventType {
        return this.event;
      },
      set(value: EventType): void {
        this.$emit("update:event", value);
      },
    },
  },
  methods: {
    checkData(): void {
      this.$emit("checkData");
    },
  },
  validations() {
    const validId = () => this.value.id.toString().length >= 6;
    const validCongregation = () =>
      (this.eventValue === "R21" &&
        this.congResp === "SI" &&
        this.value.group) ||
      (this.eventValue === "R21" && this.congResp === "NO") ||
      this.eventValue === "CE";
    const availableSeats = () => {
      if (this.eventValue === "R21" && this.value.mode === "F2F") {
        return this.seats > 0;
      } else {
        return true;
      }
    };
    const validOrigin = () => {
      if (this.value.origin) {
        switch (this.value.origin) {
          case "L":
            return (
              this.event === "R21" &&
              Date.now() < Date.parse("Jan 03 2022 23:59:00 GMT-0500")
            );
          case "M":
            return (
              this.event === "R21" &&
              Date.now() < Date.parse("Jan 04 2022 23:59:00 GMT-0500")
            );
          case "X":
            return (
              this.event === "R21" &&
              Date.now() < Date.parse("Jan 05 2022 23:59:00 GMT-0500")
            );
          case "J":
            return (
              this.event === "R21" &&
              Date.now() < Date.parse("Jan 06 2022 23:59:00 GMT-0500")
            );
          case "V":
            return (
              this.event === "R21" &&
              Date.now() < Date.parse("Jan 07 2022 23:59:00 GMT-0500")
            );
          case "S":
            return (
              this.event === "R21" &&
              Date.now() < Date.parse("Jan 08 2022 23:59:00 GMT-0500")
            );
          default:
            return true;
        }
      }
      ["L", "M", "X", "J", "V", "S"].includes(this.value.origin);
    };
    return {
      value: {
        mode: { required, availableSeats },
        country: { required },
        idType: { required },
        id: { required, numeric, validId },
        email: { required, email },
        lvlup: { required },
        group: { validCongregation },
        origin: { validOrigin },
      },
    };
  },
});
</script>

<style scoped>
.enrollment-form {
  margin-bottom: 2rem;
  font-size: 1rem;
  width: 100%;
  text-align: start;
  align-items: end;
  grid-template-columns: repeat(6, calc(16.66% - 1em));
  column-gap: 1.2em;
  row-gap: 1em;
  display: grid;
}

.two.columns {
  grid-column: span 2;
}

.three.columns {
  grid-column: span 3;
}

.four.columns {
  grid-column: span 4;
}

.five.columns {
  grid-column: span 5;
}

.six.columns {
  grid-column: span 6;
}

.seven.columns {
  grid-column: span 7;
}

.eight.columns {
  grid-column: span 8;
}

.nine.columns {
  grid-column: span 9;
}

.half.columns {
  grid-column: span 3;
}

.all.columns {
  grid-column: span 6;
}

.seats {
  color: var(--c-crimson);
  text-align: center;
  font-size: 1.8rem;
}
</style>
