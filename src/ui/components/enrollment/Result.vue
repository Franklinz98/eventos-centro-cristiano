<template>
  <div class="rslt-cntr">
    <i class="las la-check-circle"></i>
    <h1 class="rslt-title">INSCRIPCIÓN FINALIZADA</h1>
    <h3 class="rslt-desc">{{ `Se ha inscrito ${attendee} en ${event}` }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "ResultPage",
  props: {
    event: {
      type: String,
      required: true,
    },
    attendee: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.rslt-cntr {
  text-align: center;
}

.rslt-cntr > .las {
  color: var(--c-java);
  font-size: 5.8rem;
}

.rslt-title {
  font-weight: var(--f-semibold);
  font-size: 2.4rem;
  text-align: center;
  color: #676666;
}
</style>
