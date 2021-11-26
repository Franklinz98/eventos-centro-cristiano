<template>
  <div class="message-cntr">
    <h3 class="dp-name">{{ data.displayName }}</h3>
    <p class="msg-cnt">{{ data.message }}</p>
    <h4 class="msg-time">
      {{ new Date().toLocaleTimeString("es-CO", options) }}
    </h4>
  </div>
</template>

<script lang="ts">
import { ChatMessage } from "@/domain/interfaces/common";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MessageView",
  props: {
    data: {
      type: Object as PropType<ChatMessage>,
      required: true,
    },
  },
  data() {
    return {
      options: {
        hour: "2-digit",
        minute: "2-digit",
      } as Intl.DateTimeFormatOptions,
    };
  },
});
</script>

<style scoped>
.message-cntr {
  text-align: start;
  background: white;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 8px;
}

.dp-name {
  font-size: 1.3rem;
  font-weight: var(--f-semibold);
  margin-bottom: 0;
}

.msg-cnt {
  margin: 0;
}

.msg-time {
  text-align: center;
  font-size: 1.2rem;
  margin: 0;
}
</style>
