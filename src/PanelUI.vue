<template>
  <section class="panelUI">
    <UISlot />
    <UIFunction />
    <UIChat />
  </section>
</template>

<script setup>
import UIChat from "./components/UIChat.vue";
import UISlot from "./components/UIslot.vue";
import UIFunction from "./components/UIFunction.vue";
</script>

<style lang="scss">
.panelUI {
  display: grid;
  grid-template-columns: 18% 1fr 22.5%;
  grid-template-rows: 20% 64% 16%;
  grid-template-areas:
    ". uiHp ."
    "uiInterface uiChat uiSlot"
    "uiInterface . uiFunction";

  position: relative;
  height: 27%;
}
</style>
