<template>
  <div class="modal-cntr">
    <div class="modal-img">
      <AspecRatioImage
        class="modal-bckgnd"
        :source="
          require(`@/ui/assets/images/modal-${
            selectedEvent === 'R21' ? 'r21' : 'ce'
          }.jpg`)
        "
        alt="Inscripciones Centro Cristiano"
      />
      <div class="modal-bckdp" />
      <div class="modal-desc">
        <img
          :src="
            require(`@/ui/assets/images/${
              selectedEvent === 'R21' ? 'influyentes' : 'cafe-emprender'
            }-logo.png`)
          "
          alt="Eventos Centro Cristiano"
          class="eventos-logo"
        />
        <h1 class="modal-title">{{ title }}</h1>
        <h1 class="modal-title">VALOR: {{ cost }}</h1>
        <div>
          <h2 class="modal-subtitle">NECESITAMOS ALGUNOS DE TUS DATOS</h2>
          <p class="modal-description">
            Sigue los siguientes pasos para completar tu registro al evento.
          </p>
        </div>
      </div>
    </div>
    <div class="modal-cnt" ref="modal-content">
      <a-spin :spinning="loading" v-if="formIndex === 0">
        <CriticalForm
          v-model="criticalData"
          v-model:event="selectedEvent"
          @check-data="checkForm"
        />
      </a-spin>
      <a-spin :spinning="loading" v-else-if="formIndex === 1">
        <DetailsForm v-model="detailsData" @confirm-enroll="formIndex = 2" />
      </a-spin>
      <a-spin :spinning="loading" v-else-if="formIndex === 2">
        <ConfirmationPage
          :event="enrollment.eventName"
          :critical="criticalData"
          :details="detailsData"
          @pre-enroll="preEnroll"
        />
      </a-spin>
      <ResultPage
        :event="enrollment.eventName"
        :attendee="`${detailsData.name} ${detailsData.lastname}`"
        v-else
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import AspecRatioImage from "@/ui/components/common/AspecRatioImg.vue";
import { EventType, SignatureResponse } from "@/domain/interfaces/enrollment";
import EnrollmentManager from "@/domain/use_cases/enrollment-manager";
import CriticalForm from "@/ui/components/enrollment/CriticalForm.vue";
import DetailsForm from "@/ui/components/enrollment/DetailsForm.vue";
import SocketIO from "@/data/services/socket-io";
import ResultPage from "@/ui/components/enrollment/Result.vue";
import ConfirmationPage from "@/ui/components/enrollment/Confirmation.vue";
import { Socket } from "socket.io-client";

export default defineComponent({
  name: "InscriptionModal",
  components: {
    AspecRatioImage,
    CriticalForm,
    DetailsForm,
    ConfirmationPage,
    ResultPage,
  },
  props: {
    event: {
      type: String as PropType<EventType>,
      required: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.socket = SocketIO.connectServer(
        "https://eventos-cc-backend.herokuapp.com"
      ); /* SocketIO.connectServer(
        "https://jovenes-cc-backend.herokuapp.com"
      ); */
      // SocketIO.connectServer("http://192.168.1.15:3005");
    });
  },
  emits: ["closeModal"],
  beforeUnmount() {
    SocketIO.removeAllListeners(
      this.socket as Socket,
      `transaction-${this.criticalData.id}`
    );
    SocketIO.disconnect(this.socket as Socket);
  },
  data() {
    return {
      selectedEvent: this.event,
      formIndex: 0,
      userExist: false,
      socket: undefined as unknown as Socket,
      criticalData: EnrollmentManager.defaultCriticalData,
      detailsData: EnrollmentManager.defaultDetailsData,
      enrollment: EnrollmentManager.getEnrollmentInstance(
        this.event,
        "F2F",
        "CO"
      ),
      signature: {} as SignatureResponse,
      loading: false,
    };
  },
  computed: {
    title(): string {
      if (this.selectedEvent === "R21") {
        return "INSCRIPCIÓN INFLUYENTES: LA MISIÓN";
      } else {
        return "INSCRIPCIÓN CAFÉ EMPRENDER";
      }
    },
    cost(): string {
      if (this.selectedEvent === "R21") {
        if (this.criticalData.mode === "F2F") {
          return this.criticalData.country === "CO" ? "$60.000" : "18 USD";
        }
        return this.criticalData.country === "CO" ? "$30.000" : "9 USD";
      } else {
        return this.criticalData.country === "CO" ? "$200.000" : "50 USD";
      }
    },
  },
  methods: {
    async checkForm(): Promise<void> {
      this.loading = true;
      this.enrollment = EnrollmentManager.getEnrollmentInstance(
        this.selectedEvent,
        this.criticalData.mode,
        this.criticalData.country
      );
      const result = await EnrollmentManager.checkCriticalData(
        this.criticalData.email,
        this.enrollment,
        this.criticalData.origin
      );
      this.signature = result.signature;
      if (result.data) {
        this.detailsData = result.data;
        this.userExist = true;
        this.formIndex = 1;
      } else if (result.available === true) {
        this.formIndex = 1;
      } else if (result.available === false) {
        EnrollmentManager.alreadyRegisteredError(this.enrollment.eventName);
        this.$emit("closeModal");
      }
      this.loading = false;
    },
    async preEnroll(): Promise<void> {
      this.loading = true;
      const attendee = EnrollmentManager.generateAttendee(
        this.selectedEvent,
        this.criticalData,
        this.detailsData
      );
      const response = await EnrollmentManager.preEnroll(
        attendee,
        this.userExist
      );
      if (response) {
        SocketIO.addListener(
          this.socket as Socket,
          `transaction-${attendee.id}`,
          (message): void => {
            this.loading = !message;
            this.formIndex = 3;
          }
        );
        EnrollmentManager.generatePayUForm(
          attendee,
          this.enrollment,
          this.signature,
          this.$refs["modal-content"] as HTMLDivElement
        );
      } else {
        this.$emit("closeModal");
        EnrollmentManager.somethingWentWrong();
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
  justify-content: center;
  flex-flow: column;
  display: flex;
}

:deep().ant-spin-container {
  text-align: center;
}

.ratio-container {
  height: 100% !important;
}

@media only screen and (max-width: 767px) {
  .modal-cntr {
    grid-template-columns: none;
    display: grid;
  }

  .modal-bckgnd {
    --aspect-ratio: calc(2 / 3 * 100%);
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
