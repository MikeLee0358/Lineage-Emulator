<template>
  <main>
    <article class="roleBg">
      <section class="panelView"></section>
      <section class="panelUI">
        <UISlot class="uiSlot" />
        <UIFunction class="uiFunction" />
      </section>
    </article>
  </main>
</template>

<script setup>
import { useRoleStore } from "./stores/roles";
import { useAlgorithmStore } from "./stores/algorithm";
import UISlot from "./components/UIslot.vue";
import UIFunction from "./components/UIFunction.vue";
const roleStore = useRoleStore();

const changeCursor = () => {
  const algorithmStore = useAlgorithmStore();

  if (algorithmStore.targetScroll === null) {
    return 'url("/src/assets/UI/UI_pointer.png")15 8, auto';
  } else return 'url("/src/assets/UI/UI_target.png")11 17, auto';
};
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
    cursor: v-bind(changeCursor());

    .panelView {
      position: relative;
      height: 73%;
    }
    .panelUI {
      display: grid;
      grid-template-columns: 18% 1fr 22.5%;
      grid-template-rows: 20% 1fr 16%;
      grid-template-areas:
        ". hpUI ."
        "armorUI chattingUI uiSlot"
        "armorUI chattingUI uiFunction";

      position: relative;
      height: 27%;

      .uiSlot {
        grid-area: uiSlot;
        position: absolute;
        inset: 0;
        display: grid;
        grid-template-columns: repeat(4, 22%);
        grid-template-rows: repeat(2, 47%);
        gap: 3%;
        padding: 5% 3% 3% 3%;
      }

      .uiFunction {
        grid-area: uiFunction;
        position: relative;
      }
    }
  }
}
</style>
