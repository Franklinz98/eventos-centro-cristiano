<template>
  <div class="event-cntr">
    <div class="event-img">
      <AspecRatioImage class="event-bckgnd" :source="imgSource" :alt="title" />
      <div class="event-bckdp" />
      <div class="event-logo">
        <div>
          <slot />
        </div>
      </div>
    </div>
    <div class="event-cnt">
      <h2 class="event-title">{{ title }}</h2>
      <p class="event-desc">{{ description }}</p>
      <div class="event-details">
        <i class="las la-map-marker-alt"></i>
        <span>{{ place }}</span>
        <i class="las la-calendar-alt"></i>
        <span>{{ date }}</span>
      </div>
      <BaseButton
        class="event-action"
        text="INSCRIBIRME"
        :dark="true"
        :isSmall="true"
        @click="onAction"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AspecRatioImage from "@/components/common/AspecRatioImg.vue";
import BaseButton from "@/components/common/BaseButton.vue";

export default defineComponent({
  name: "EventCard",
  components: {
    AspecRatioImage,
    BaseButton,
  },
  props: {
    imgSource: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  emits: ["register"],
  methods: {
    onAction(): void {
      this.$emit("register");
    },
  },
});
</script>

<style scoped>
.event-cntr {
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
  width: clamp(520px, 70%, 1320px);
  grid-template-columns: 40% 60%;
  display: grid;
}

.event-img {
  position: relative;
}

.event-bckgnd {
  --aspect-ratio: calc(2 / 3 * 100%);
}

.event-bckdp {
  background: rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(0.5px);
  --webkit-backdrop-filter: blur(0.5px);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}

.event-bckdp,
.event-bckgnd,
.event-bckgnd > :deep().ratio-fill {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.event-logo {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  grid-template-columns: 80%;
  display: flex;
  position: absolute;
}

.event-logo > div {
  width: 45%;
}

.event-cnt {
  padding: 4rem;
  box-sizing: border-box;
  position: relative;
}

.event-title {
  font-weight: var(--f-semibold);
  font-size: 2.2rem;
}

.event-desc {
  text-align: start;
  font-weight: var(--f-regular);
  font-size: 1.4rem;
}

.event-details {
  column-gap: 1rem;
  justify-content: center;
  align-items: center;
  display: flex;
}

.event-details > .las {
  color: var(--c-crimson);
  font-size: 2rem;
}

.event-details > span {
  font-size: 1.4rem;
  font-weight: var(--f-light);
  font-style: italic;
}

.event-action {
  right: 36px;
  bottom: 24px;
  position: absolute;
}
</style>
