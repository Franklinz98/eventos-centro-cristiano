<template>
  <div class="modal-cntr">
    <div class="modal-img">
      <AspecRatioImage
        class="modal-bckgnd"
        :source="
          require(`@/ui/assets/images/modal-${
            event === 'R21' ? 'r21' : 'ce'
          }.jpg`)
        "
        alt="Inscripciones Centro Cristiano"
      />
      <div class="modal-bckdp" />
      <div class="modal-desc">
        <img
          src="@/ui/assets/images/eventos-logo.svg"
          alt="Eventos Centro Cristiano"
          class="eventos-logo"
        />
        <h1 class="modal-title">{{ title }}</h1>
        <h1 class="modal-title">VALOR: {{ cost }}</h1>
        <div>
          <h2 class="modal-subtitle">NECESITAMOS ALGUNOS DATOS</h2>
          <p class="modal-description">
            Sigue los siguientes pasos para completar el registro al evento.
          </p>
        </div>
      </div>
    </div>
    <div class="modal-cnt" ref="modal-content">
      <a-spin :spinning="loading" v-if="formIndex === 0">
        <CriticalForm
          v-model="criticalData"
          v-model:event="event"
          :staff="true"
          @check-data="checkForm"
          @event-change="updateEvent"
        />
      </a-spin>
      <a-spin :spinning="loading" v-else-if="formIndex === 1">
        <DetailsForm
          v-model="detailsData"
          :staff="true"
          @confirm-enroll="formIndex = 2"
        />
      </a-spin>
      <a-spin :spinning="loading" v-else-if="formIndex === 2">
        <ConfirmationPage
          :event="enrollment.eventName"
          :critical="criticalData"
          :details="detailsData"
          :staff="true"
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
import { defineComponent } from "vue";
import AspecRatioImage from "@/ui/components/common/AspecRatioImg.vue";
import { EventType } from "@/domain/interfaces/enrollment";
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
      event: "R21" as EventType,
      formIndex: 0,
      userExist: false,
      socket: undefined as unknown as Socket,
      criticalData: EnrollmentManager.defaultStaffCriticalData,
      detailsData: EnrollmentManager.defaultDetailsData,
      enrollment: EnrollmentManager.getEnrollmentInstance("R21", "F2F", "CO"),
      loading: false,
    };
  },
  computed: {
    title(): string {
      if (this.event === "R21") {
        return "INSCRIPCIÓN INFLUYENTES: LA MISIÓN";
      } else {
        return "INSCRIPCIÓN CAFÉ EMPRENDER";
      }
    },
    cost(): string {
      if (this.criticalData.origin === "premio") {
        return this.criticalData.country === "CO" ? "$0" : "0 USD";
      } else if (this.event === "R21") {
        if (this.criticalData.mode === "F2F") {
          switch (this.criticalData.origin) {
            case "congregacion":
              return "$50.000";
            case "bono":
              return "$40.000";
            default:
              if (
                ["L", "M", "X", "J", "V", "S"].includes(
                  this.criticalData.origin
                )
              ) {
                return "$15.000";
              }
              return this.criticalData.country === "CO" ? "$60.000" : "18 USD";
          }
        }
        return this.criticalData.country === "CO" ? "$30.000" : "9 USD";
      } else {
        return this.criticalData.country === "CO" ? "$200.000" : "50 USD";
      }
    },
  },
  methods: {
    updateEvent(event: EventType): void {
      this.event = event;
    },
    async checkForm(): Promise<void> {
      this.loading = true;
      this.enrollment = EnrollmentManager.getEnrollmentInstance(
        this.event,
        this.criticalData.mode,
        this.criticalData.country
      );
      const result = await EnrollmentManager.checkCriticalData(
        this.criticalData.email,
        this.enrollment,
        this.criticalData.origin
      );
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
        this.event,
        this.criticalData,
        this.detailsData
      );
      let response = await EnrollmentManager.preEnroll(
        attendee,
        this.userExist
      );
      if (response) {
        response = await EnrollmentManager.staffEnroll(
          attendee,
          this.enrollment,
          this.criticalData.origin
        );
        if (response) {
          this.loading = false;
          this.formIndex = 3;
        } else {
          this.$emit("closeModal");
          EnrollmentManager.somethingWentWrong();
        }
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
  --aspect-ratio: 0;
  height: 100%;
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

@media only screen and (max-width: 767px) {
  .modal-cntr {
    grid-template-columns: none;
    display: grid;
  }

  .modal-bckgnd {
    --aspect-ratio: 0;
    height: 100%;
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
