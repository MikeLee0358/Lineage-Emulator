<template>
  <main class="app">
    <article class="container">
      <PanelView />
      <PanelUI />
    </article>
  </main>
</template>

<script setup>
import PanelView from "./components/PanelView.vue";
import PanelUI from "./components/PanelUI.vue";
import { useRoleStore } from "./stores/role";
const storeRole = useRoleStore();
</script>

<style lang="scss">
.app {
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;

  .container {
    width: 100%;
    height: 80%;
    background-image: v-bind("storeRole.role.currentBg");
    background-repeat: round;
    background-size: cover;
    cursor: url("/src/assets/UI/UI_pointer.png") 9 7, auto;
  }
}
</style>
