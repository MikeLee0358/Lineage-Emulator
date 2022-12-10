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
import { useScrollStore } from "./stores/scroll";
const storeRole = useRoleStore();
const storeScroll = useScrollStore();

const changeCursor = () => {
  if (storeScroll.scroll.targetScroll === null) {
    return 'url("/src/assets/UI/UI_pointer.png")15 8, auto';
  } else return 'url("/src/assets/UI/UI_target.png")11 17, auto';
};
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
    cursor: v-bind(changeCursor());
  }
}
</style>
