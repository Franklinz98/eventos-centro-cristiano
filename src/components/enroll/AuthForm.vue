<template>
  <i class="las la-unlock-alt login-icon"></i>
  <form action="" method="post" class="enrollment-form">
    <BaseField
      class="all"
      v-model="value.email"
      type="email"
      label="Correo electrónico:"
      placeholder="Correo electrónico"
    />
    <BaseField
      class="all"
      v-model="value.id"
      label="Identificación:"
      type="number"
      placeholder="Número de Identificación"
    />
  </form>
  <BaseButton text="Entrar" :isSmall="true" :dark="true" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseField from "@/components/common/BaseField.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import { AuthData } from "@/models/enrollment";

export default defineComponent({
  name: "AuthDetails",
  components: {
    BaseField,
    BaseButton,
  },
  props: {
    modelValue: {
      type: Object as PropType<AuthData>,
      required: true,
    },
  },
  emits: ["update:modelValue", "checkData"],
  computed: {
    value: {
      get(): AuthData {
        return this.modelValue;
      },
      set(value: AuthData): void {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>

<style scoped>
.login-icon {
  color: var(--c-crimson);
  font-size: 6rem;
  padding: 1rem;
  border-radius: 50%;
  border: 3.5px solid var(--c-crimson);
  margin-bottom: 1.2rem;
}

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
