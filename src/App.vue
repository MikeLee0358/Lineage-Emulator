<script setup>
import weapon from "./components/weapon.vue";
import SlotList from "./SlotList.vue";
</script>

<template>
  <main>
    <img src="./assets/base.png" alt="base-picture" />
    <weapon />
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
