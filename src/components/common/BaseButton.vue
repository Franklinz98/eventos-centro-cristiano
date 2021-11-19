<template>
  <button
    class="btn-container"
    :class="{ small: isSmall, big: !isSmall, light: !dark, dark: dark }"
    :disabled="disabled"
  >
    <span class="btn-text">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseButton",
  props: {
    text: {
      type: String,
      required: true,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.btn-container {
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-weight: var(--f-medium);
  font-size: 1rem;
  height: fit-content;
  border: none;
  color: white;
}

.btn-container.small {
  padding: 0.6em 2.8em;
  border-radius: 30px;
  display: inline-block;
}

.btn-container.big {
  padding: 1.3em;
  border-radius: 8px;
}

.btn-container.light {
  background: var(--c-java);
}

.btn-container.dark {
  background: var(--c-crimson);
}

.btn-container:focus {
  outline: none;
}

.btn-container.light:hover,
.btn-container.light:disabled {
  background: var(--c-bermuda);
}

.btn-container.dark:hover,
.btn-container.dark:disabled {
  background: var(--c-hibiscus);
}

.btn-container:disabled {
  cursor: auto;
}

.btn-container.light:enabled:active {
  background: var(--c-blue-chill);
}

.btn-container.dark:enabled:active {
  background: var(--c-shiraz);
}

.btn-container.small .btn-text {
  font-size: 1.5em;
}

.btn-container.big .btn-text {
  font-size: 1.8em;
}
</style>
