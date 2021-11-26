<template>
  <div>
    <div class="cards-cntr">
      <div>
        <LandingCard
          title="Conéctate"
          subtitle="¡Participa con nosotros! De manera presencial o remota podrás hacer parte de nuestros eventos."
          cite="Mateo 18:20"
        >
          <i class="las la-network-wired card-icon"></i>
        </LandingCard>
        <LandingCard
          title="Adora"
          subtitle="Únete a nosotros y juntos adoremos y celebremos al Señor en nuestras reuniones."
          cite="Salmos 150:6"
        >
          <i class="las la-place-of-worship card-icon"></i>
        </LandingCard>
        <LandingCard
          title="Aprende"
          subtitle="En nuestros eventos encontrarás conocimiento sobre la Palabra y crecimiento espiritual."
          cite="Proverbios 2:6"
        >
          <i class="las la-university card-icon"></i>
        </LandingCard>
      </div>
    </div>
    <div class="down-ic">
      <i class="las la-arrow-circle-down events" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LandingCard from "@/ui/components/home/Card.vue";

export default defineComponent({
  name: "LandingDescription",
  components: {
    LandingCard,
  },
});
</script>

<style scoped>
.cards-cntr {
  height: calc(100% - 48px);
  align-items: center;
  justify-content: center;
  display: flex;
}

.cards-cntr > div {
  height: 80%;
  align-items: center;
  justify-content: center;
  column-gap: 5vw;
  display: flex;
}

.card-icon {
  color: var(--c-crimson);
  font-size: 48px;
}

.down-ic {
  height: 48px;
}

.down-ic > .events {
  color: var(--c-crimson);
  font-size: 32px;
  padding-bottom: 16px;
}

.down-ic > .events {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10vh);
}

.card-cntr {
  opacity: 0;
  visibility: hidden;
  transform: translateX(-20vw);
}

@keyframes cardseq {
  100% {
    opacity: 1;
    visibility: visible;
    transform: none;
  }
}

.card-cntr {
  animation: cardseq 0.5s ease-in-out forwards;
}

.card-cntr:nth-child(1) {
  animation-delay: 0.5s;
}

.card-cntr:nth-child(2) {
  animation-delay: 0.7s;
}

.card-cntr:nth-child(3) {
  animation-delay: 0.9s;
}

.down-ic > .events {
  animation: cardseq 0.5s ease-in-out forwards;
  animation-delay: 1s;
}

@media only screen and (max-width: 1280px) {
  .cards-cntr > div {
    height: 50%;
  }
}

@media only screen and (max-width: 1280px) and (max-height: 1020px) {
  .cards-cntr > div {
    height: 85%;
  }
}

@media only screen and (max-width: 1023px) {
  .cards-cntr {
    height: calc(100% - 80px);
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .cards-cntr > div {
    height: 80%;
  }

  .down-ic {
    height: 80px;
  }
}

@media only screen and (max-width: 767px) {
  .cards-cntr > div {
    height: 100%;
    justify-content: space-evenly;
    flex-flow: column;
  }

  .card-icon {
    color: var(--c-crimson);
    font-size: 32px;
  }
}
</style>
