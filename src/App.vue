<template>
  <main>
    <img src="./assets/base.jpg" alt="base-picture" />
    <EquipmentList />
    <SlotList />
  </main>
</template>
q
<script setup>
import EquipmentList from "./components/EquipmentList.vue";
import SlotList from "./components/SlotList.vue";
</script>

<style>
main {
  display: grid;
  place-content: center;

  position: relative;
  width: 800px;
  height: 600px;
}
</style>
