<template>
  <main>
    <article>
      <img src="./assets/base_prince.png" class="baseImage" alt="base-prince" />
      <EquipmentList class="equipmentList" />
      <SlotList class="slotList" />
    </article>
  </main>
</template>

<script setup>
import EquipmentList from "./components/EquipmentList.vue";
import SlotList from "./components/SlotList.vue";
</script>

<style lang="scss">
main {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;

  article {
    position: relative;
    width: 100%;
    height: 80%;
    .baseImage {
      position: absolute;
    }
    .equipmentList {
      position: absolute;
      inset: 5% 54% 36% 10%;
    }
    .slotList {
      position: absolute;
      inset: 80% 0% 6% 78.3%;
      display: grid;
      grid-template-columns: repeat(4, 22.9%);
      grid-template-rows: repeat(2, 49%);
      gap: 3% 1.5%;
    }
  }
}
</style>
