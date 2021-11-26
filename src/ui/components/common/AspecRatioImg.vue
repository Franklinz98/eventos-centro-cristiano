<template>
  <div class="ratio-container">
    <img :src="source" :alt="alt" class="ratio-fill" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AspectRatioImage",
  props: {
    source: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.ratio-container {
  --aspect-ratio: calc(9 / 16 * 100%);
  height: 0;
  padding-top: var(--aspect-ratio);
  position: relative;
}

.ratio-fill {
  object-fit: cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
}
</style>
