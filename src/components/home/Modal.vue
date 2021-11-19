<template>
  <div class="modal-cntr">
    <div class="modal-img">
      <AspecRatioImage
        class="modal-bckgnd"
        :source="require('@/assets/images/modal.jpg')"
        alt="Inscripciones Centro Cristiano"
      />
      <div class="modal-bckdp" />
      <div class="modal-desc">
        <img
          src="@/assets/images/eventos-logo.svg"
          alt="Eventos Centro Cristiano"
          class="eventos-logo"
        />
        <h1 class="modal-title">{{ title }}</h1>
        <h1 class="modal-title">VALOR: {{ cost }}</h1>
        <div>
          <h2 class="modal-subtitle">NECESITAMOS ALGUNOS DE TUS DATOS</h2>
          <p class="modal-description">
            Sigue los siguientes pasos para completar tu registro en el evento.
          </p>
        </div>
      </div>
    </div>
    <div class="modal-cnt">
      <CriticalForm v-model="criticalData" v-if="false" />
      <DetailsForm v-model="detailsData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import AspecRatioImage from "@/components/common/AspecRatioImg.vue";
import { DetailsData, Enrollment } from "@/models/enrollment";
import EnrollmentManager from "@/controllers/enrollment";
import CriticalForm from "@/components/enroll/CriticalForm.vue";
import DetailsForm from "@/components/enroll/DetailsForm.vue";

export default defineComponent({
  name: "InscriptionModal",
  components: {
    AspecRatioImage,
    CriticalForm,
    DetailsForm,
  },
  props: {
    event: {
      type: String as PropType<Enrollment>,
      required: true,
    },
  },
  data() {
    return {
      criticalData: EnrollmentManager.defaultCriticalData(),
      detailsData: {
        profilePic: "",
      } as DetailsData,
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
      if (this.event === "R21") {
        if (this.criticalData.mode === "F2F") {
          return this.criticalData.country === "CO" ? "$60.000" : "18 USD";
        }
        return this.criticalData.country === "CO" ? "$30.000" : "9 USD";
      } else {
        if (this.criticalData.mode === "F2F") {
          return this.criticalData.country === "CO" ? "$60.000" : "18 USD";
        }
        return this.criticalData.country === "CO" ? "$30.000" : "9 USD";
      }
    },
  },
});
</script>

<style scoped>
.modal-cntr {
  font-family: "Montserrat", sans-serif;
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
</style>
