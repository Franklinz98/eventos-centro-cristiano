<template>
  <a-spin :spinning="loading">
    <div class="pass-cntr">
      <div class="pass-hdr">
        <img
          src="@/ui/assets/images/eventos-logo.svg"
          alt="Eventos Centro Cristiano"
          class="eventos-logo"
        />
        <h2 class="pass-title">PASE DE ENTRADA</h2>
      </div>
      <div class="pass-cnt">
        <h2 class="pass-holder">{{ name }}</h2>
        <h3 class="pass-id">{{ id }}</h3>
        <img :src="url" alt="Eventos Centro Cristiano" class="pass-qr" />
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
import FirebaseAuth from "@/data/services/firebase-auth";
import { defineComponent } from "vue";

export default defineComponent({
  name: "EntryPass",
  mounted() {
    this.$nextTick(async () => {
      const online = navigator.onLine;
      const user = FirebaseAuth.currentUser;
      if (user) {
        if (online) {
          let displayName = user.displayName ?? "";
          displayName = displayName.replace(";", " ");
          this.name = displayName.toUpperCase();
          const claims = await FirebaseAuth.getClaims(online);
          this.id = claims["id"];
          this.url = `https://storage.googleapis.com/eventos-5d8d7.appspot.com/credentials/${claims["credential"]}.png`;
          this.storage.setItem("cc-evt-pass-name", this.name);
          this.storage.setItem("cc-evt-pass-id", this.id);
          this.storage.setItem("cc-evt-pass-url", this.url);
          this.storage.setItem("cc-evt-auth", JSON.stringify(true));
          this.storage.setItem(
            "cc-evt-days",
            JSON.stringify(claims.days ?? [])
          );
        } else {
          this.name = this.storage.getItem("cc-evt-pass-name") ?? "Usuario";
          this.id = this.storage.getItem("cc-evt-pass-id") ?? "CC XXXXXXXXX";
          this.url = this.storage.getItem("cc-evt-pass-url") ?? "none";
          this.days = JSON.parse(
            this.storage.getItem("cc-evt-days") ?? "[]"
          ) as Array<string>;
        }
      }
    });
  },
  data() {
    return {
      storage: window.localStorage,
      name: "",
      id: "",
      url: "",
      days: [] as Array<string>,
    };
  },
  computed: {
    loading(): boolean {
      return !this.name || !this.id || !this.url;
    },
  },
});
</script>

<style scoped>
.pass-cntr {
  font-family: "Poppins", sans-serif !important;
  text-align: center;
}

.pass-hdr {
  border-radius: 8px 8px 0px 0px;
  background: linear-gradient(#6d5193 0%, #423455 100%);
  padding: 2rem 2rem 1rem;
}

.eventos-logo {
  height: 5.5rem;
  width: auto;
  margin-bottom: 0.8rem;
}

.pass-title {
  font-weight: var(--f-medium);
  font-size: 2rem;
  text-align: center;
  color: #fff;
}

.pass-cnt {
  padding: 3rem 4rem 5rem;
}

.pass-holder {
  font-weight: var(--f-semibold);
  font-size: 2.4rem;
  color: #676666;
  margin: 0;
}

.pass-id {
  font-weight: var(--f-medium);
  font-size: 1.2rem;
  color: #676666;
  margin-bottom: 1rem;
}

.pass-qr {
  width: 20rem;
  height: 20rem;
  border-radius: 8px;
  border: 3px solid #523f6d;
}
</style>
