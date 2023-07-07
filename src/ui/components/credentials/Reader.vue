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
          <img class="user-avatar" :src="userPic" alt="Foto de Perfil" />
          <h2 class="pass-holder">{{ name }}</h2>
          <h3 class="pass-id">{{ id }}</h3>
          <h3 class="pass-email">{{ email }}</h3>
          <h2 class="pass-events" v-if="valid">
            EVENTOS AUTORIZADOS: {{ state }}
          </h2>
          <h2 class="pass-events" v-else>{{ state }}</h2>
          <div class="auth-events">
            <div class="pass-event" v-if="(r21 || ce) && valid">
              <i class="las la-globe-americas"></i>
              <h3 class="event-title">Influyentes - La Misión</h3>
            </div>
            <h3 class="event-title" v-if="(r21 || ce) && valid && authDays">
              {{ authDays }}
            </h3>
            <div class="pass-event" v-if="ce && valid">
              <i class="las la-coffee"></i>
              <h3 class="event-title">Café Emprender</h3>
            </div>
            <div class="pass-event" v-if="!valid">
              <i class="las la-ban"></i>
              <h3 class="event-title">Ha hecho check-in recientemente.</h3>
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
import FirebaseAuth from "@/data/services/firebase-auth";
import PopUpMessage, { NotificationType } from "@/domain/models/popup";

export default defineComponent({
  name: "EntryPassReader",
  components: {
    QrcodeStream,
    BaseButton,
  },
  async mounted() {
    const online = navigator.onLine;
    if (online) {
      const claims = (await FirebaseAuth.getClaims(true)) ?? {};
      this.clearance = claims.clearance;
    } else {
      let message = new PopUpMessage({
        title: "No estas conectado",
        message: "Conectate para continuar",
        type: NotificationType.Error,
      });
      message.show();
    }
  },
  data() {
    return {
      state: "",
      clearance: "",
      reading: true,
      loading: false,
      name: "",
      id: "",
      r21: "",
      ce: "",
      email: "",
      picture: "",
      days: [] as Array<string>,
      dayNames: {
        L: "Lunes",
        M: "Martes",
        X: "Miércoles",
        J: "Jueves",
        V: "Viernes",
        S: "Sábado",
      } as Record<string, string>,
      valid: false,
    };
  },
  computed: {
    userPic(): string {
      return `https://storage.googleapis.com/eventos-5d8d7.appspot.com/attendee/${this.picture}`;
    },
    authDays(): string {
      let names = this.days.map((day) => this.dayNames[day]);
      return names.join(", ");
    },
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
      this.loading = true;
      console.log(decodedData);
      const json = JSON.parse(decodedData);
      this.name = json["name"];
      this.id = json["id"];
      this.r21 = json["r21"];
      this.ce = json["ce"];
      this.email = json["email"];
      this.picture = json["picture"];
      this.days = await CredentialsManager.authDays(this.email);
      this.valid = await CredentialsManager.validatePass(this.email);
      if (["admin", "staff"].includes(this.clearance)) {
        if (this.valid) {
          if (["admin", "staff"].includes(this.clearance)) {
            console.log("This pass is valid, checking in");
            await CredentialsManager.checkInAttendee(this.email);
            this.state = "INGRESANDO";
          }
        } else {
          console.log("This pass is invalid");
          await CredentialsManager.checkOutAttendee(this.email);
          this.state = "SALIENDO...";
        }
      }

      this.loading = false;
      this.reading = false;
    },
    scanAgain(): void {
      this.reading = true;
    },
  },
});
</script>

<style scoped>
.user-avatar {
  --avatar-size: 16rem;
  margin-bottom: 2rem;
}

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

.pass-event > .la-ban {
  color: var(--c-crimson);
}

.pass-event > .event-title {
  margin: 0;
}
</style>
