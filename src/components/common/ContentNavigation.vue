<template>
  <div class="nav-cntr">
    <div class="nav-logo">
      <img src="@/assets/images/r21.svg" alt="Renovación 21" />
    </div>
    <router-link :to="{ name: 'Schedule' }">
      <div class="nav-item">
        <i class="las la-calendar-week"></i>
        <div class="item-label">Programa</div>
      </div>
    </router-link>
    <router-link :to="{ name: 'Stream' }">
      <div class="nav-item">
        <i class="las la-desktop"></i>
        <div class="item-label">Remoto</div>
      </div>
    </router-link>
    <div class="nav-item">
      <i class="las la-id-card-alt"></i>
      <div class="item-label">Credencial</div>
    </div>
    <div class="nav-item">
      <i class="las la-qrcode"></i>
      <div class="item-label">Lector</div>
    </div>
    <div class="nav-logout">
      <i class="las la-sign-out-alt" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentNavigation",
});
</script>

<style scoped>
.nav-cntr {
  width: 10rem;
  height: 100vh;
  background: linear-gradient(#4d4461 0%, #4f4563 100%);
  box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.16);
  position: fixed;
  justify-content: center;
  flex-flow: column;
  row-gap: 3rem;
  display: flex;
  z-index: 9999;
}

.nav-logo {
  width: 100%;
  height: 95px;
  border-radius: 0px 0px 8px 8px;
  background: linear-gradient(var(--c-shiraz) 0%, var(--c-crimson) 100%);
  align-items: center;
  justify-content: center;
  display: flex;
  top: 0;
  left: 0;
  position: absolute;
}

.nav-logo > img {
  height: 54px;
  width: auto;
}

.nav-item {
  color: white;
  opacity: 0.75;
}

a.router-link-exact-active {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0px 8px 8px 0px;
  background: rgba(111, 98, 142, 0.5);
}

a.router-link-exact-active > .nav-item {
  opacity: 1;
}

a > .nav-item > .item-label {
  transform-origin: top;
  transform: scaleY(0);
  opacity: 0;
  transition: 0.3s ease-in-out;
}

a.router-link-exact-active > .nav-item > .item-label {
  transform: scaleY(1);
  opacity: 1;
}

.nav-item > .las {
  font-size: 2.4rem;
}

.nav-item > .item-label {
  font-size: 1.4rem;
  font-weight: var(--f-regular);
}

.nav-logout {
  width: 9rem;
  height: 6rem;
  align-items: center;
  justify-content: center;
  display: flex;
  bottom: 0;
  left: 0;
  position: absolute;
}

.nav-logout > .las {
  color: rgba(255, 255, 255, 0.8);
  font-size: 2.4rem;
}
</style>
