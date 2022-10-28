<script setup>
import { ref } from "vue";
const active = ref("active");
const activeState = ref(false);

function toggleActive() {
  activeState.value = !activeState.value;
}
</script>

<template>
  <img
    @click="toggleActive"
    :class="activeState ? active : null"
    class="scroll_weapon"
    src="../assets/scroll_weapon.png"
  />
</template>

<style scoped>
.scroll_weapon {
  position: absolute;
  top: 80.8%;
  right: 16.2%;
}
.active {
  outline: 1px solid #ffe0cb;
}
</style>
