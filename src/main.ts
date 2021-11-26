import { createApp } from "vue";
import App from "./App.vue";
import router from "./domain/router";
import store from "./domain/store";
import { Modal, Spin } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

createApp(App).use(store).use(router).use(Modal).use(Spin).mount("#app");
