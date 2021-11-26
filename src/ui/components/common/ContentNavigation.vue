<template>
  <div class="nav-cntr">
    <div class="nav-logo">
      <img src="@/ui/assets/images/r21.svg" alt="Renovación 21" />
    </div>
    <router-link :to="{ name: 'Stream' }">
      <div class="nav-item">
        <i class="las la-desktop"></i>
        <div class="item-label">Remoto</div>
      </div>
    </router-link>
    <div class="nav-item" @click="showPass = true" v-if="!role">
      <i class="las la-id-card-alt"></i>
      <div class="item-label">Credencial</div>
    </div>
    <div class="nav-item" @click="showReader = true">
      <i class="las la-calendar-week"></i>
      <div class="item-label">Calendario</div>
    </div>
    <div
      class="nav-item"
      @click="showReader = true"
      v-if="role === 'ally' || role === 'staff' || role === 'admin'"
    >
      <i class="las la-qrcode"></i>
      <div class="item-label">Lector</div>
    </div>
    <div
      class="nav-item"
      @click="showEnrollment = true"
      v-if="role === 'staff' || role === 'admin'"
    >
      <i class="las la-handshake"></i>
      <div class="item-label">Inscripción</div>
    </div>
    <div class="nav-logout" @click="signOut">
      <i class="las la-sign-out-alt" />
    </div>
  </div>
  <a-modal
    v-model:visible="showPass"
    width="clamp(320px, 20vw, 480px)"
    :bodyStyle="{ padding: '0' }"
    :footer="null"
    :destroyOnClose="true"
    centered
    v-if="!role"
  >
    <EntryPass />
  </a-modal>
  <a-modal
    v-model:visible="showReader"
    width="clamp(320px, 20vw, 480px)"
    :bodyStyle="{ padding: '0' }"
    :footer="null"
    :destroyOnClose="true"
    centered
    v-if="role === 'ally' || role === 'staff' || role === 'admin'"
  >
    <PassReader />
  </a-modal>
  <a-modal
    v-model:visible="showEnrollment"
    width="clamp(720px, 50vw, 1080px)"
    :bodyStyle="{ padding: '0' }"
    :footer="null"
    :destroyOnClose="true"
    centered
    v-if="role === 'staff' || role === 'admin'"
  >
    <InscriptionModal @close-modal="showEnrollment = false" />
  </a-modal>
</template>

<script lang="ts">
import FirebaseAuth from "@/data/services/firebase-auth";
import NavigationManager, {
  Routes,
} from "@/domain/use_cases/navigation-manager";
import { defineComponent } from "vue";
import EntryPass from "@/ui/components/credentials/Pass.vue";
import PassReader from "@/ui/components/credentials/Reader.vue";
import InscriptionModal from "@/ui/components/common/EnrollmentModal.vue";

export default defineComponent({
  name: "ContentNavigation",
  components: {
    EntryPass,
    PassReader,
    InscriptionModal,
  },
  mounted() {
    this.$nextTick(async () => {
      const claims = (await FirebaseAuth.getClaims()) ?? {};
      this.role = claims.clearance;
    });
  },
  data() {
    return {
      role: undefined as string | undefined,
      showPass: false,
      showReader: false,
      showEnrollment: false,
    };
  },
  methods: {
    signOut(): void {
      FirebaseAuth.signOut();
      NavigationManager.goTo(Routes.Home);
    },
  },
});
</script>

<style scoped>
.nav-cntr {
  width: 10rem;
  height: 100vh;
  background: linear-gradient(#4d4461 0%, #4f4563 100%);
  box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.16);
  position: fixed;
  justify-content: center;
  flex-flow: column;
  row-gap: 3rem;
  display: flex;
  z-index: 999;
}

.nav-logo {
  width: 100%;
  height: 95px;
  border-radius: 0px 0px 8px 8px;
  background: linear-gradient(var(--c-shiraz) 0%, var(--c-crimson) 100%);
  align-items: center;
  justify-content: center;
  display: flex;
  top: 0;
  left: 0;
  position: absolute;
}

.nav-logo > img {
  height: 54px;
  width: auto;
}

.nav-item {
  cursor: pointer;
  color: white;
  opacity: 0.75;
}

a.router-link-exact-active {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0px 8px 8px 0px;
  background: rgba(111, 98, 142, 0.5);
}

a.router-link-exact-active > .nav-item {
  opacity: 1;
}

a > .nav-item > .item-label {
  transform-origin: top;
  transform: scaleY(0);
  opacity: 0;
  transition: 0.3s ease-in-out;
}

a.router-link-exact-active > .nav-item > .item-label {
  transform: scaleY(1);
  opacity: 1;
}

.nav-item > .las {
  font-size: 2.4rem;
}

.nav-item > .item-label {
  font-size: 1.3rem;
  font-weight: var(--f-regular);
}

.nav-logout {
  cursor: pointer;
  width: 9rem;
  height: 6rem;
  align-items: center;
  justify-content: center;
  display: flex;
  bottom: 0;
  left: 0;
  position: absolute;
}

.nav-logout > .las {
  color: rgba(255, 255, 255, 0.8);
  font-size: 2.4rem;
}
</style>
