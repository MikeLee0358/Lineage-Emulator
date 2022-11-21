<template>
  <main>
    <article class="roleBg">
      <section class="view"></section>
      <section class="UIPanel">
        <SlotUI class="slotUI" />
        <FunctionUI class="functionUI" />
      </section>
    </article>
  </main>
</template>

<script setup>
import { useRoleStore } from "./stores/roles";
import FunctionUI from "./components/FunctionUI.vue";
import SlotUI from "./components/SlotUI.vue";
const roleStore = useRoleStore();
</script>

<style lang="scss">
main {
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;

  .roleBg {
    width: 100%;
    height: 80%;
    background-image: v-bind("roleStore.roleBg");
    background-repeat: round;
    background-size: cover;

    .view {
      position: relative;
      height: 73%;
    }
    .UIPanel {
      display: grid;
      grid-template-columns: 18% 1fr 22.5%;
      grid-template-rows: 20% 1fr 16%;
      grid-template-areas:
        ". hpUI ."
        "armorUI chattingUI slotUI"
        "armorUI chattingUI functionUI";

      position: relative;
      height: 27%;

      .slotUI {
        grid-area: slotUI;
        position: absolute;
        inset: 0;
        display: grid;
        grid-template-columns: repeat(4, 22%);
        grid-template-rows: repeat(2, 47%);
        gap: 3%;
        padding: 5% 3% 3% 3%;
      }

      .functionUI {
        grid-area: functionUI;
        position: relative;
      }
    }
  }
}
</style>
