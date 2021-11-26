<template>
  <a-spin :spinning="loading">
    <div class="reader-cntr">
      <div class="reader-hdr">
        <img
          src="@/ui/assets/images/eventos-logo.svg"
          alt="Eventos Centro Cristiano"
          class="eventos-logo"
        />
        <h2 class="reader-title">ESCANEAR PASE</h2>
      </div>
      <div class="reader-cnt">
        <div class="ratio-container" v-if="reading">
          <QrcodeStream
            class="ratio-fill pass-reader"
            @init="onInit"
            @decode="onDecode"
          />
        </div>
        <div class="reader-result" v-else>
          <h2 class="pass-holder">{{ name }}</h2>
          <h3 class="pass-id">{{ id }}</h3>
          <h3 class="pass-email">{{ email }}</h3>
          <h2 class="pass-events">EVENTOS AUTORIZADOS</h2>
          <div class="auth-events">
            <div class="pass-event" v-if="r21">
              <i class="las la-globe-americas"></i>
              <h3 class="event-title">Influyentes - La Misión</h3>
            </div>
            <div class="pass-event" v-if="ce">
              <i class="las la-coffee"></i>
              <h3 class="event-title">Café Emprender</h3>
            </div>
          </div>
          <BaseButton
            text="Escanear"
            :dark="true"
            :isSmall="true"
            @click="scanAgain"
          />
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import BaseButton from "@/ui/components/common/BaseButton.vue";
import CredentialsManager from "@/domain/use_cases/credentials-manager";

export default defineComponent({
  name: "EntryPassReader",
  components: {
    QrcodeStream,
    BaseButton,
  },
  data() {
    return {
      reading: true,
      loading: false,
      name: "JOHN DOE",
      id: "CC 12346579",
      r21: "",
      ce: "",
      email: "test@text.com",
    };
  },
  methods: {
    async onInit(
      promise: Promise<{
        // eslint-disable-next-line
        capabilities: any;
      }>
    ) {
      this.loading = true;

      try {
        await promise;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async onDecode(decodedData: string) {
      const json = JSON.parse(decodedData);
      this.name = json["name"];
      this.id = json["id"];
      this.r21 = json["r21"];
      this.ce = json["ce"];
      this.email = json["email"];
      await CredentialsManager.checkInAttendee(this.email);
      this.reading = false;
    },
    scanAgain(): void {
      this.reading = true;
    },
  },
});
</script>

<style scoped>
.reader-cntr {
  font-family: "Poppins", sans-serif !important;
  text-align: center;
}

.reader-hdr {
  border-radius: 8px 8px 0px 0px;
  background: linear-gradient(#6d5193 0%, #423455 100%);
  padding: 2rem 2rem 1rem;
}

.eventos-logo {
  height: 5.5rem;
  width: auto;
  margin-bottom: 0.8rem;
}

.reader-result {
  padding: 3rem 4rem 5rem;
}

.reader-title {
  font-weight: var(--f-medium);
  font-size: 2rem;
  text-align: center;
  color: #fff;
}

.ratio-container {
  --aspect-ratio: 100%;
  height: 0;
  padding-top: var(--aspect-ratio);
  position: relative;
}

.ratio-container > .ratio-fill {
  object-fit: cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute !important;
}

.pass-reader > :deep().qrcode-stream-camera {
  border-radius: 0px 0px 8px 8px;
}

.pass-holder,
.pass-events {
  font-weight: var(--f-semibold);
  font-size: 2rem;
  color: #676666;
  margin: 0;
}
.pass-events {
  padding-top: 2rem;
}

.pass-id,
.pass-email {
  font-weight: var(--f-medium);
  font-size: 1.4rem;
  color: #676666;
  margin-bottom: 1rem;
}

.auth-events {
  height: 10rem;
  margin-bottom: 2rem;
  flex-flow: column;
  justify-content: space-evenly;
  display: flex;
}

.pass-event {
  font-size: 1.4rem;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
  display: flex;
}

.pass-event > .las {
  color: var(--c-java);
  font-size: 24px;
}

.pass-event > .event-title {
  margin: 0;
}
</style>
