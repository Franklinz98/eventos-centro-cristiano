<template>
  <div class="cnfmt-cntr">
    <i class="las la-digital-tachograph"></i>
    <h1 class="cnfmt-title">CONFIRMA LOS DATOS</h1>
    <div class="cnfmt-table">
      <h3 class="data-name">Evento</h3>
      <h3 class="data-value">{{ event }}</h3>
      <h3 class="data-name">Modo</h3>
      <h3 class="data-value">
        {{ critical.mode === "F2F" ? "Presencial" : "Digital" }}
      </h3>
      <h3 class="data-name">Nombres</h3>
      <h3 class="data-value">{{ details.name }}</h3>
      <h3 class="data-name">Apellidos</h3>
      <h3 class="data-value">{{ details.lastname }}</h3>
      <h3 class="data-name">Identificación</h3>
      <h3 class="data-value">{{ `${critical.idType} ${critical.id}` }}</h3>
      <h3 class="data-name" v-if="event === 'R21'">LevelUp</h3>
      <h3 class="data-value" v-if="event === 'R21'">
        {{ levelUpOptions[critical.lvlup] }}
      </h3>
      <h3 class="data-name" v-if="event === 'R21'">R21</h3>
      <h3 class="data-value" v-if="event === 'R21'">
        {{ critical.group ?? "N.A." }}
      </h3>
      <h3 class="data-name">Correo</h3>
      <h3 class="data-value">{{ critical.email }}</h3>
      <h3 class="data-name">WhatsApp</h3>
      <h3 class="data-value">{{ details.whatsapp }}</h3>
      <h3 class="data-name">Dirección</h3>
      <h3 class="data-value">{{ details.address }}</h3>
      <h3 class="data-name">Ciudad</h3>
      <h3 class="data-value">{{ details.city }}</h3>
      <h3 class="data-name">País</h3>
      <h3 class="data-value">
        {{ countryOptions[critical.country] }}
      </h3>
    </div>
    <BaseButton
      :text="staff ? 'Inscribir' : 'Pagar'"
      :dark="true"
      :isSmall="true"
      @click="preenroll"
    />
  </div>
</template>

<script lang="ts">
import { CriticalData, DetailsData } from "@/domain/interfaces/enrollment";
import { defineComponent, PropType } from "@vue/runtime-core";
import BaseButton from "@/ui/components/common/BaseButton.vue";

export default defineComponent({
  name: "ResultPage",
  components: {
    BaseButton,
  },
  props: {
    event: {
      type: String,
      required: true,
    },
    critical: {
      type: Object as PropType<CriticalData>,
      required: true,
    },
    details: {
      type: Object as PropType<DetailsData>,
      required: true,
    },
    staff: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["preEnroll"],
  data() {
    return {
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
      } as Record<string, string>,
      levelUpOptions: {
        EC: "Economía",
        CN: "Conexión",
        MI: "Misiones",
        FE: "Futuro y Educación",
        CR: "Creativos",
        LJ: "Linaje",
        AM: "Ambiente",
        VD: "Vida",
      } as Record<string, string>,
    };
  },
  methods: {
    preenroll(): void {
      this.$emit("preEnroll");
    },
  },
});
</script>

<style scoped>
.cnfmt-cntr {
  text-align: center;
}

.cnfmt-cntr > .las {
  color: var(--c-java);
  font-size: 5.8rem;
}

.cnfmt-title {
  font-weight: var(--f-semibold);
  font-size: 2.4rem;
  text-align: center;
  color: #676666;
}

.cnfmt-table {
  text-align: start;
  width: fit-content;
  box-sizing: border-box;
  padding: 1rem 2rem 2rem;
  margin: 0 auto;
  column-gap: 5%;
  grid-template-columns: auto max-content;
  display: grid;
}

.cnfmt-table > .data-name {
  font-weight: var(--f-semibold);
}
</style>
