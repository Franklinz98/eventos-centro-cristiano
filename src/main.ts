import { createApp } from "vue";
import App from "./App.vue";
import router from "./domain/router";
import store from "./domain/store";
import { Modal, Spin } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

createApp(App).use(store).use(router).use(Modal).use(Spin).mount("#app");

// Check that service workers are supported
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    console.log(registrations.length);

    if (registrations.length == 0) {
      window.location.replace("https://centrocristiano.com.co/");
    }

    const registration = await navigator.serviceWorker.register("sw.js", {
      scope: "./",
    });
    // console.log("sw", registration, "20/02/2022 - 12:45");
    console.log("ServiceWorker", registration, "20/02/2022 - 12:55");
    if (navigator.onLine) {
      await registration.update();
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }
    }
  });
}
