<template>
  <div class="banner-fndtn">
    <AspectRatioImage
      :source="require('@/assets/images/banner.jpg')"
      alt="Eventos Centro Cristiano"
    />
    <div class="banner-bckdp" />
    <div class="banner-cnt">
      <div>
        <h1 class="banner-title">CONOCE NUESTROS EVENTOS</h1>
        <h3 class="banner-subtitle">
          Entérate cuando serán nuestros próximos eventos.
        </h3>
        <BaseButton
          text="VER EVENTOS"
          :isSmall="true"
          :dark="true"
          @click="handleScroll"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AspectRatioImage from "@/components/common/AspecRatioImg.vue";
import BaseButton from "@/components/common/BaseButton.vue";

export default defineComponent({
  name: "HomeBanner",
  components: {
    AspectRatioImage,
    BaseButton,
  },
  methods: {
    handleScroll(): void {
      let list = document.getElementById("events-view") as HTMLDivElement;
      list.scrollIntoView({ behavior: "smooth" });
    },
  },
});
</script>

<style scoped>
.banner-fndtn {
  position: relative;
}

:deep().ratio-container {
  --aspect-ratio: 60vh;
}

.banner-bckdp {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(3px);
  --webkit-backdrop-filter: blur(3px);
  background: linear-gradient(
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.1) 46.87%,
    rgba(0, 0, 0, 0.3) 100%
  );
  top: 0;
  left: 0;
  position: absolute;
}

.banner-cnt {
  width: 100%;
  height: 100%;
  padding-top: 64px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  align-content: center;
  display: flex;
  top: 0;
  left: 0;
  position: absolute;
}

.banner-title {
  color: white;
  font-size: 3.8rem;
  font-weight: var(--f-semibold);
  text-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  margin: 0;
}

.banner-subtitle {
  color: white;
  font-size: 1.8rem;
  font-weight: var(--f-light);
  text-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  margin: 0;
  margin-bottom: 1.6rem;
}
</style>
