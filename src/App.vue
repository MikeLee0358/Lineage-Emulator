<template>
  <main>
    <img src="./assets/base_prince.png" class="bg" alt="base-prince" />
    <EquipmentList />
    <SlotList />
  </main>
</template>

<script setup>
import EquipmentList from "./components/EquipmentList.vue";
import SlotList from "./components/SlotList.vue";
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.bg {
  width: 800px;
  height: 600px;
}
</style>
