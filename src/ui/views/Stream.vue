<template>
  <a-spin :spinning="fetchingData">
    <div class="stm-cntr">
      <div class="stream-cntr">
        <Error :error="streamError" v-if="streamError" />
        <div class="ratio-container" v-html="embed" v-else></div>
      </div>
      <div class="stm-opt">
        <BaseField v-model="event" type="select" :options="eventOptions" />
        <ChatView :socket="socket" />
        <BaseField
          v-model="messageContent"
          type="multiline"
          placeholder="Escribe tu mensaje aqui..."
          :rows="2"
        />
        <BaseButton
          text="Enviar"
          :dark="true"
          :disabled="!messageContent"
          @click="sendMessage"
        />
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseField from "@/ui/components/common/BaseField.vue";
import BaseButton from "@/ui/components/common/BaseButton.vue";
import { ChatMessage } from "@/domain/interfaces/common";
import ChatView from "@/ui/components/stream/ChatView.vue";
import { Socket } from "socket.io-client";
import SocketIO from "@/data/services/socket-io";
import FirebaseAuth from "@/data/services/firebase-auth";
import EnrollmentManager from "@/domain/use_cases/enrollment-manager";
import Error from "@/ui/components/stream/Error.vue";

export default defineComponent({
  name: "Stream",
  components: {
    BaseField,
    BaseButton,
    ChatView,
    Error,
  },
  created() {
    if (navigator.onLine) {
      this.socket = SocketIO.connectServer(
        "https://eventos-cc-backend.herokuapp.com"
      );
      // SocketIO.connectServer("http://192.168.1.2:3005");
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.fetchData();
      SocketIO.addListener(
        this.socket as Socket,
        "stream-focus",
        (message): void => {
          const uid = FirebaseAuth.currentUser?.uid ?? "";
          if (uid === (message as string)) {
            this.streamError = "focus";
          }
        }
      );
      SocketIO.emitMessage(
        this.socket as Socket,
        "stream-focus",
        FirebaseAuth.currentUser?.uid ?? ""
      );
      const claims = await FirebaseAuth.getClaims(true);
      if (claims.checkIn) {
        const checkIn = claims.checkIn as number;
        const now = Date.now();
        if (now - checkIn < 4 * 60 * 60 * 1000) {
          this.streamError = "time";
        }
      }
      if (!claims.CE) {
        delete this.eventOptions.CE;
      }
    });
  },
  beforeUnmount() {
    SocketIO.removeAllListeners(this.socket as Socket);
    SocketIO.disconnect(this.socket as Socket);
  },
  watch: {
    event: {
      handler(): void {
        this.fetchData();
      },
    },
  },
  data() {
    return {
      fetchingData: false,
      streamError: "",
      user: FirebaseAuth.currentUser,
      socket: undefined as unknown as Socket,
      event: "R21",
      embed: "",
      eventOptions: {
        R21: "Influyentes",
        CE: "Café Emprender",
      } as Record<string, string>,
      messageContent: "",
    };
  },
  methods: {
    fetchData(): void {
      this.fetchingData = true;
      EnrollmentManager.fetchEmbed(this.event).then((embed) => {
        this.fetchingData = false;
        this.embed = embed;
      });
    },
    sendMessage(): void {
      const name = this.user?.displayName ?? "";
      SocketIO.emitMessage(this.socket as Socket, "stream-chat", {
        displayName: name.replace(";", " "),
        message: this.messageContent,
      } as ChatMessage);
      this.messageContent = "";
    },
  },
});
</script>

<style scoped>
.stm-cntr {
  height: 100vh;
  box-sizing: border-box;
  padding: 5rem;
  padding-left: 15rem;
  column-gap: 3rem;
  grid-template-columns: 75% calc(25% - 3rem);
  display: grid;
}

.stream-cntr {
  align-items: center;
  justify-content: center;
  display: flex;
}

.stm-opt {
  flex-direction: column;
  height: calc(100vh - 10rem);
  row-gap: 1rem;
  display: flex;
}

.actions > .las,
.events > .las {
  color: var(--c-java);
  font-size: 20px;
  padding: 0 8px;
}

.actions > .las {
  cursor: pointer;
  color: var(--c-crimson);
}

.ratio-container {
  --aspect-ratio: calc(9 / 16 * 100%);
  width: min(1520px, 100%);
  height: 0;
  padding-top: var(--aspect-ratio);
  border-radius: 8px;
  position: relative;
}

:deep()iframe {
  object-fit: cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 8px;
  position: absolute !important;
}

@media only screen and (max-width: 1280px) {
  .stm-cntr {
    grid-template-columns: auto;
  }

  .stm-opt {
    height: auto;
  }
}

@media only screen and (max-width: 767px) {
  .stm-cntr {
    padding: 3rem;
    padding-top: 7rem;
    grid-template-columns: auto;
  }
}
</style>
