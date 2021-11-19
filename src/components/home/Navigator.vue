<template>
  <div class="nav-bckdp" />
  <div class="nav-cnt">
    <img
      src="@/assets/images/r21-largo.svg"
      alt="Renovación 21"
      class="eventos-logo r21"
    />
    <img
      src="@/assets/images/eventos-logo.svg"
      alt="Eventos Centro Cristiano"
      class="eventos-logo"
    />
    <BaseButton
      text="INGRESAR"
      :isSmall="true"
      :dark="true"
      @click="handleLogin"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseButton from "@/components/common/BaseButton.vue";

export default defineComponent({
  name: "HomeNav",
  components: {
    BaseButton,
  },
  emits: ["login"],
  methods: {
    handleLogin() {
      this.$emit("login");
    },
  },
});
</script>

<style scoped>
.nav-bckdp,
.nav-cnt {
  width: 100%;
  height: 64px;
  top: 0;
  left: 0;
  position: fixed;
}

.nav-bckdp {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  --webkit-backdrop-filter: blur(8px);
  z-index: 998;
}

.nav-cnt {
  box-sizing: border-box;
  padding: 0 16vw;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: repeat(3, 10vw);
  justify-items: center;
  display: grid;
  z-index: 999;
}

.eventos-logo {
  height: 3.6rem;
  width: auto;
  opacity: 0.8;
}

.eventos-logo.r21 {
  height: 3.2rem;
}
</style>
