<template>
  <HomeNav @login="handleAuth" />
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
      <InscriptionModal
        :event="eventEnrollment"
        @close-modal="showInscription = false"
      />
    </a-modal>
    <a-modal
      v-model:visible="showAuth"
      width="clamp(720px, 50vw, 1080px)"
      :bodyStyle="{ padding: '0' }"
      :footer="null"
      :destroyOnClose="true"
      centered
    >
      <AuthModal @close-modal="showAuth = false" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeBanner from "@/ui/components/home/Banner.vue";
import LandingDescription from "@/ui/components/home/Cards.vue";
import EventList from "@/ui/components/events/Events.vue";
import InscriptionModal from "@/ui/components/home/Modal.vue";
import AuthModal from "@/ui/components/home/Auth.vue";
import HomeNav from "@/ui/components/home/Navigator.vue";
import { EventType } from "@/domain/interfaces/enrollment";
import FirebaseAuth from "@/data/services/firebase-auth";
import {
  NavigationManager,
  Routes,
} from "@/domain/use_cases/navigation-manager";
import PopUpMessage, { NotificationType } from "@/domain/models/popup";

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
      eventEnrollment: "R21" as EventType,
      storage: window.localStorage,
    };
  },
  methods: {
    showModal(type: EventType): void {
      this.eventEnrollment = type;
      this.showInscription = true;
    },
    handleAuth(): void {
      const online = navigator.onLine;
      if (online) {
        const loggedIn = FirebaseAuth.checkAuth();
        if (loggedIn) {
          this.storage.setItem("cc-evt-auth", JSON.stringify(true));
          NavigationManager.goTo(Routes.Stream);
        } else {
          this.showAuth = true;
        }
      } else {
        let loggedIn = JSON.parse(
          this.storage.getItem("cc-evt-auth") ?? "false"
        );
        const role = this.storage.getItem("cc-evt-role") ?? undefined;
        if (loggedIn && !role) {
          NavigationManager.goTo(Routes.Stream);
        } else {
          const popup = new PopUpMessage({
            title: "Ocurrio un error",
            message: "No estas conectado, conectate e intentalo de nuevo...",
            type: NotificationType.Error,
          });
          popup.show();
        }
      }
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

@media only screen and (max-width: 1280px) {
  .landing-fndtn {
    height: 200vh;
    grid-template-rows: 50vh 50vh 100vh;
    display: grid;
  }
}

@media only screen and (max-width: 1280px) and (max-height: 1020px) {
  .landing-fndtn {
    height: 200vh;
    grid-template-rows: 50vh 50vh 150vh;
    display: grid;
  }
}

@media only screen and (max-width: 767px) {
  .landing-fndtn {
    min-height: 270vh;
    grid-template-rows: 30vh 70vh auto;
    padding-bottom: 3rem;
    display: grid;
  }
}
</style>
