<template>
  <ContentNavigation />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContentNavigation from "@/components/common/ContentNavigation.vue";

export default defineComponent({
  components: {
    ContentNavigation,
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap");
@import "./assets/styles/variables.css";
@import "./assets/styles/fonts.css";
@import "./assets/styles/antd.css";

body {
  margin: 0;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.user-avatar {
  --avatar-size: 12.8rem;
  height: var(--avatar-size);
  width: var(--avatar-size);
  object-fit: cover;
  border-radius: 50%;
}
</style>
