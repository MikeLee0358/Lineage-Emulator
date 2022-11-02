<template>
  <main>
    <img src="./assets/base.png" alt="base-picture" />
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
  position: relative;
  width: 800px;
  height: 100vh;
  margin: 0 auto;
}
</style>
