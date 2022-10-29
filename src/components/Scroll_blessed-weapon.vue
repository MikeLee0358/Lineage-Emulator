<script setup>
import { ref } from "vue";
const active = ref("active");
const activeState = ref(false);

function toggleActive() {
  activeState.value = !activeState.value;
  console.log("已點選，祝福的對武器施法的卷軸");
}
</script>

<template>
  <img
    @click="toggleActive"
    :class="activeState ? active : null"
    class="scroll_weapon"
    src="../assets/scroll_blessed-weapon.png"
  />
</template>

<style scoped>
.scroll_weapon {
  position: absolute;
  top: 81%;
  right: 11.4%;
}
.active {
  outline: 1px solid #ffe0cb;
}
</style>
