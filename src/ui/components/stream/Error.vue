<template>
  <div class="err-cntr">
    <i class="las la-exchange-alt" v-if="error === 'focus'"></i>
    <i class="las la-stopwatch" v-else></i>
    <h2 class="err-msg">
      {{
        error === "focus"
          ? "Otra instancia de la plataforma solicito la transmisión"
          : "Realizaste check-in hace poco tiempo con tu credencial"
      }}
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StreamError",
  props: {
    error: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.err-cntr > .las {
  color: var(--c-java);
  font-size: 5.8rem;
}
</style>
