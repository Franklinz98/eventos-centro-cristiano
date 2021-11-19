<template>
  <HomeNav @login="showAuth = true" />
  <div class="landing-fndtn">
    <HomeBanner />
    <LandingDescription />
    <EventList @inscription="showModal" />
    <a-modal
      v-model:visible="showInscription"
      width="clamp(720px, 50vw, 1080px)"
      :bodyStyle="{ padding: '0' }"
      :footer="null"
      :destroyOnClose="true"
      centered
    >
      <InscriptionModal :event="eventEnrollment" />
    </a-modal>
    <a-modal
      v-model:visible="showAuth"
      width="clamp(720px, 50vw, 1080px)"
      :bodyStyle="{ padding: '0' }"
      :footer="null"
      :destroyOnClose="true"
      centered
    >
      <AuthModal :event="eventEnrollment" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeBanner from "@/components/home/Banner.vue";
import LandingDescription from "@/components/home/Cards.vue";
import EventList from "@/components/events/Events.vue";
import InscriptionModal from "@/components/home/Modal.vue";
import AuthModal from "@/components/home/Auth.vue";
import HomeNav from "@/components/home/Navigator.vue";
import { Enrollment } from "@/models/enrollment";

export default defineComponent({
  name: "Home",
  components: {
    HomeNav,
    HomeBanner,
    LandingDescription,
    EventList,
    InscriptionModal,
    AuthModal,
  },
  data() {
    return {
      showInscription: false,
      showAuth: false,
      eventEnrollment: "R21" as Enrollment,
    };
  },
  methods: {
    showModal(type: Enrollment) {
      this.eventEnrollment = type;
      this.showInscription = true;
    },
  },
});
</script>

<style scoped>
.landing-fndtn {
  height: 200vh;
  grid-template-rows: 60vh 40vh 100vh;
  display: grid;
}
</style>
