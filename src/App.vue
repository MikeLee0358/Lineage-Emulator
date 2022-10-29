<script setup>
import weapon from "./components/weapon.vue";
import Scrolls from "./Scrolls.vue";
</script>

<template>
  <main>
    <img src="./assets/base.png" alt="base-picture" />
    <weapon />
    <Scrolls />
  </main>
</template>

<style>
main {
  position: relative;
  width: 800px;
  margin: 0 auto;
}
</style>
