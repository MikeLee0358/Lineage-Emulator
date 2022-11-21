<template>
  <ul @click="toggle">
    <li class="characterBtn">
      <CharacterUI />
    </li>
    <li class="logoutBtn">
      <LogoutUI />
    </li>
  </ul>
</template>

<script setup>
import LogoutUI from "./LogoutUI.vue";
import CharacterUI from "./CharacterUI.vue";

function toggle(e) {
  if (e.target.tagName !== "LI") return;
  const targetUI = e.target.firstElementChild.classList;
  const roleListUI = e.target.firstElementChild.children[1].firstElementChild.classList;

  targetUI.toggle("show");
  roleListUI.remove("show");
}
</script>

<style>
.show {
  visibility: visible !important;
}

.characterBtn {
  position: absolute;
  inset: 0 72% 0 15%;
}
.logoutBtn {
  position: absolute;
  inset: 0% 0% 0% 86.5%;
}
</style>
