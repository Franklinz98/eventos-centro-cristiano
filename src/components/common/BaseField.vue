<template>
  <div class="form-field columns">
    <label>{{ label }}</label>
    <select class="dropdown" v-model="value" v-if="type === 'select'">
      <option
        v-for="(text, value, index) in options"
        :key="index"
        :value="value"
      >
        {{ text }}
      </option>
    </select>
    <textarea
      class="textarea"
      :rows="rows"
      v-model="value"
      v-else-if="type === 'multiline'"
    />
    <input
      class="input"
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      v-else
    />
  </div>
</template>

<script lang="ts">
import { FieldType } from "@/models/common";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "BaseField",
  props: {
    modelValue: {
      type: [String, Number],
    },
    type: {
      type: String as PropType<FieldType>,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 5,
    },
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      // eslint-disable-next-line
      get(): any {
        return this.modelValue;
      },
      set(value: string | number | undefined): void {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>

<style scoped>
textarea {
  resize: none;
}

.form-field {
  font-size: 1rem;
  width: 100%;
}

.form-field label {
  font-size: 1.6em;
  font-weight: var(--f-semibold);
  margin-bottom: 0.3em;
  display: block;
}

.form-field .input,
.form-field .textarea,
.form-field .dropdown {
  font-size: 1.4em;
  font-weight: var(--f-regular);
  font-family: "Montserrat", sans-serif;
  border-radius: 8px;
  background: var(--c-concrete);
  border: none;
  outline: none;
  box-sizing: border-box;
  padding: 1em;
  height: 4.8rem;
  width: 100%;
}

.form-field .textarea {
  height: auto;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

@media only screen and (min-width: 1025px) {
  .field-label {
    margin-bottom: 6px;
  }
}
</style>
