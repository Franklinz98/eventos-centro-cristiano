<template>
  <div id="events-view" class="cc-events">
    <EventCard
      :imgSource="require('@/ui/assets/images/influyentes.jpg')"
      title="CONVENCIÓN JUVENIL - INFLUYENTES: LA MISIÓN"
      description="La convención es el espacio donde se reúnen los influyentes de latinoamerica con el objetivo de ser instruidos y recibir dirección de Dios a través de los mensajes que vienen del corazón de cada uno de los conferencistas, y de los talleres específicos de capacitación, con el fin de ser eficaces en la tarea de cumplir con la misión de hacer discípulos en cada una de las esferas de la sociedad."
      place="Centro Cristiano Los Pinos"
      date="03 enero, 2022"
      @register="handleInscription('R21')"
    >
      <AspecRatioImage
        class="influyentes-logo"
        :source="require('@/ui/assets/images/influyentes-logo.png')"
        alt="Influyentes - La Reseña"
      />
    </EventCard>
    <EventCard
      :imgSource="require('@/ui/assets/images/cafe-emprender.jpg')"
      title="CAFÉ EMPRENDER"
      description="Café emprender es el espacio que se brinda dentro de la convención a los emprendedores de la región, cuyo objetivo es ser apoyo en la construcción de líderes transformadores, que brinden a través de sus empresas un producto o servicio de calidad integral, que muestre la excelencia de quienes hacen lo que realmente aman porque han descubierto que eso que hacen es su propósito de vida, y no la solamente su estabilidad económica."
      place="Iglesia Centro Cristiano"
      date="Por Determinar"
      @register="handleInscription('CE')"
    >
      <AspecRatioImage
        class="cafe-emprender-logo"
        :source="require('@/ui/assets/images/cafe-emprender-logo.png')"
        alt="Café Emprender"
    /></EventCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EventCard from "@/ui/components/events/Event.vue";
import AspecRatioImage from "@/ui/components/common/AspecRatioImg.vue";
import { EventType } from "@/domain/interfaces/enrollment";

export default defineComponent({
  name: "EventsList",
  components: {
    EventCard,
    AspecRatioImage,
  },
  emits: ["inscription"],
  methods: {
    handleInscription(id: EventType): void {
      this.$emit("inscription", id);
    },
  },
});
</script>

<style scoped>
.cc-events {
  padding-top: 64px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-evenly;
  flex-flow: column;
  display: flex;
}

.influyentes-logo {
  --aspect-ratio: calc(38 / 49 * 100%);
}

.cafe-emprender-logo {
  --aspect-ratio: calc(403 / 384 * 100%);
}

@media only screen and (max-width: 767px) {
  .cc-events {
    row-gap: 2rem;
  }
}
</style>
