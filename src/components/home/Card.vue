<template>
  <div class="card-cntr">
    <div class="card-cnt">
      <slot></slot>
      <div>
        <h2 class="card-title">{{ title }}</h2>
        <p class="card-subtitle">{{ subtitle }}</p>
      </div>
    </div>
    <div class="card-cite">
      <h3>{{ cite }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LandingCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    cite: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.card-cntr {
  width: 36rem;
  height: 80%;
  border-radius: 8px;
  padding: 2.4rem;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
  justify-content: center;
  display: flex;
  position: relative;
}

.card-cnt {
  text-align: start;
  column-gap: 1rem;
  display: flex;
}

.card-title {
  color: var(--c-crimson);
  font-weight: var(--f-semibold);
  font-size: 2.4rem;
  margin: 0;
}

.card-subtitle {
  font-size: 1.5rem;
  margin: 0;
  margin-top: 0.4rem;
}

.card-cite {
  background: var(--c-hibiscus);
  bottom: 2.4rem;
  right: 0;
  padding: 0.5rem 2rem;
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  position: absolute;
}

.card-cite > h3 {
  color: white;
  font-size: 1.4rem;
  font-weight: var(--f-medium);
  margin: 0;
}
</style>
