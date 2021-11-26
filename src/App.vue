<template>
  <ContentNavigation v-if="route != 'Home'" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContentNavigation from "@/ui/components/common/ContentNavigation.vue";
import Firebase from "./data/services/firebase";
import FirebaseAuth from "./data/services/firebase-auth";

export default defineComponent({
  components: {
    ContentNavigation,
  },
  mounted() {
    this.$nextTick(() => {
      Firebase.initialize();
      FirebaseAuth.checkAuth();
    });
  },
  computed: {
    route(): string {
      const route = this.$route.name;
      if (route) {
        console.log(route.toString());
        return route.toString();
      }
      return "Home";
    },
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap");
@import "./ui/assets/styles/variables.css";
@import "./ui/assets/styles/fonts.css";
@import "./ui/assets/styles/antd.css";

body {
  margin: 0;
}

#app {
  font-family: "Poppins", sans-serif;
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

.hidden-form {
  display: none;
  top: 0;
  left: 0;
  position: absolute;
}
</style>
