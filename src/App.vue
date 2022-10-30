<script setup>
import EquipmentList from "./components/EquipmentList.vue";
import SlotList from "./components/SlotList.vue";
</script>

<template>
  <main>
    <img src="./assets/base.png" alt="base-picture" />
    <EquipmentList />
    <SlotList />
  </main>
</template>

<style>
main {
  position: relative;
  top: 10px;
  width: 800px;
  margin: 0 auto;
}
</style>
