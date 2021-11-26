<template>
  <form action="" method="post" class="enrollment-form">
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
      v-model="selectedEvent"
      type="select"
      label="Evento:"
      :options="eventOptions"
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
      v-if="event === 'R21'"
    />
    <BaseField
      class="half"
      v-model="value.group"
      type="text"
      label="Renovación 21:"
      v-if="event === 'R21'"
    />
  </form>
  <BaseButton
    text="Siguiente"
    :isSmall="true"
    :dark="true"
    @click="checkData"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseField from "@/ui/components/common/BaseField.vue";
import BaseButton from "@/ui/components/common/BaseButton.vue";
import { CriticalData, EventType } from "@/domain/interfaces/enrollment";

export default defineComponent({
  name: "CriticalDetails",
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
      default: "R21",
    },
  },
  emits: ["update:modelValue", "checkData", "eventChange"],
  watch: {
    selectedEvent: function () {
      if (this.staff) {
        this.$emit("eventChange", this.event);
      }
    },
  },
  data() {
    return {
      selectedEvent: this.event,
      eventOptions: {
        R21: "Influyentes",
        CE: "Café Emprender",
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
  },
  methods: {
    checkData(): void {
      this.$emit("checkData");
    },
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
</style>
