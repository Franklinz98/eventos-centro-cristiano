<template>
  <div class="chat-cntr">
    <ChatPreview
      v-for="(message, i) in messagesList"
      :key="i"
      :data="message"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ChatPreview from "@/ui/components/stream/ChatMessage.vue";
import { ChatMessage } from "@/domain/interfaces/common";
import { Socket } from "socket.io-client";
import SocketIO from "@/data/services/socket-io";
import { PropType } from "vue";

export default defineComponent({
  name: "ChatView",
  components: {
    ChatPreview,
  },
  props: {
    socket: {
      type: Object as PropType<Socket>,
      required: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      SocketIO.addListener(
        this.socket as Socket,
        "stream-chat",
        (message): void => {
          this.messages.push(message as ChatMessage);
        }
      );
    });
  },
  data() {
    return {
      messages: [] as Array<ChatMessage>,
    };
  },
  computed: {
    messagesList(): Array<ChatMessage> {
      return this.messages.slice().reverse();
    },
  },
});
</script>

<style scoped>
.chat-cntr {
  overflow-y: auto;
  flex-grow: 1;
  flex-flow: column-reverse;
  row-gap: 1rem;
  border-radius: 8px;
  background: var(--c-concrete);
  box-sizing: border-box;
  padding: 1em;
  width: 100%;
  display: flex;
}
</style>
