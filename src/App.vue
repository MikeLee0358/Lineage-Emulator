<script setup>
import weapon from "./components/weapon.vue";
import Scrolls from "./Scrolls.vue";
</script>

<template>
  <main>
    <weapon />
    <Scrolls />
    <img src="./assets/base.png" alt="base-picture" />
  </main>
</template>

<style>
main {
  position: relative;
  width: 800px;
  margin: 0 auto;
}
</style>
