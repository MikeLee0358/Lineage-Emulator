<template>
  <main>
    <img src="./assets/base.jpg" class="bg" alt="base-picture" />
    <EquipmentList />
    <SlotList />
  </main>
</template>
q
<script setup>
import EquipmentList from "./components/EquipmentList.vue";
import SlotList from "./components/SlotList.vue";
</script>

<style scoped>
main {
  position: relative;
  top: 50%;
  width: 800px;
  height: 600px;
  margin: 0 auto;
}
.bg {
  width: 800px;
  height: 600px;
}
</style>
