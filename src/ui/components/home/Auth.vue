<template>
  <div class="modal-cntr">
    <div class="modal-img">
      <AspecRatioImage
        class="modal-bckgnd"
        :source="require('@/ui/assets/images/modal-r21.jpg')"
        alt="Inscripciones Centro Cristiano"
      />
      <div class="modal-bckdp" />
      <div class="modal-desc">
        <img
          src="@/ui/assets/images/eventos-logo.svg"
          alt="Eventos Centro Cristiano"
          class="eventos-logo"
        />
        <h1 class="modal-title">INGRESA A TU CUENTA</h1>
        <div>
          <h2 class="modal-subtitle">NECESITAMOS CONFIRMAR QUE ERES TU</h2>
          <p class="modal-description">
            Ingresa los siguientes datos para acceder.
          </p>
        </div>
      </div>
    </div>
    <div class="modal-cnt">
      <AuthForm v-model="authData" @authenticate="authenticate" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AspecRatioImage from "@/ui/components/common/AspecRatioImg.vue";
import { AuthData } from "@/domain/interfaces/enrollment";
import AuthForm from "@/ui/components/enrollment/AuthForm.vue";
import FirebaseAuth from "@/data/services/firebase-auth";
import NavigationManager, {
  Routes,
} from "@/domain/use_cases/navigation-manager";
import PopUpMessage, { NotificationType } from "@/domain/models/popup";

export default defineComponent({
  name: "AuthModal",
  components: {
    AspecRatioImage,
    AuthForm,
  },
  emits: ["closeModal"],
  data() {
    return {
      authData: {} as AuthData,
    };
  },
  methods: {
    async authenticate(): Promise<void> {
      const loggedIn = await FirebaseAuth.login(
        this.authData.email,
        this.authData.id.toString()
      );
      if (loggedIn) {
        NavigationManager.goTo(Routes.Stream);
        this.$emit("closeModal");
      } else {
        const popup = new PopUpMessage({
          title: "Ocurrio un error",
          message: "Intentalo de nuevo...",
          type: NotificationType.Error,
        });
        popup.show();
      }
    },
  },
});
</script>

<style scoped>
.modal-cntr {
  font-family: "Poppins", sans-serif;
  grid-template-columns: 40% 60%;
  display: grid;
}

.modal-img {
  position: relative;
}

.modal-bckgnd {
  --aspect-ratio: calc(3 / 2 * 100%);
}

.modal-bckgnd,
.modal-bckgnd > :deep().ratio-fill {
  --aspect-ratio: calc(3 / 2 * 100%);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.modal-bckdp {
  width: 100%;
  height: 100%;
  border-radius: 4px 0px 0px 4px;
  background: linear-gradient(
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  top: 0;
  left: 0;
  position: absolute;
}

.modal-desc {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1.6rem 2.8rem 4.2rem;
  flex-flow: column;
  justify-content: space-between;
  display: flex;
  top: 0;
  left: 0;
  position: absolute;
}

.eventos-logo {
  height: 4rem;
  width: auto;
  margin-right: auto;
}

.modal-title {
  color: white;
  text-align: center;
  font-weight: var(--f-semibold);
  font-size: 1.8rem;
  margin: 0;
}

.modal-subtitle {
  color: white;
  font-weight: var(--f-semibold);
  font-size: 1.6rem;
  margin: 0;
}

.modal-description {
  color: white;
  text-align: center;
  font-weight: var(--f-light);
  font-size: 1.2rem;
}

.modal-cnt {
  box-sizing: border-box;
  padding: 3rem;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  display: flex;
}

@media only screen and (max-width: 767px) {
  .modal-cntr {
    grid-template-columns: none;
    display: grid;
  }

  .modal-bckgnd {
    --aspect-ratio: calc(1.5 / 3 * 100%);
  }

  .modal-bckgnd,
  .modal-bckgnd > :deep().ratio-fill {
    border-radius: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .modal-bckdp {
    border-radius: 4px 4px 0px 0px;
  }

  .modal-desc {
    padding: 1rem 2rem 3rem;
  }

  .modal-subtitle {
    display: none;
  }

  .modal-description {
    margin: 0;
  }
}
</style>
