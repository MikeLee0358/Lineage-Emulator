<template>
  <ul @click="btnToggle">
    <li class="btnCharacter">
      <UICharacter />
    </li>
    <li class="btnLogout">
      <UIlogout />
    </li>
  </ul>
</template>

<script setup>
import UIlogout from "./UILogout.vue";
import UICharacter from "./UICharacter.vue";

const btnToggle = (e) => {
  if (e.target.tagName !== "LI") return;
  const uiTarget = e.target.firstElementChild.classList;
  const uiRoleList = e.target.firstElementChild.children[1].firstElementChild.classList;

  uiTarget.toggle("show");
  uiRoleList.remove("show");
};
</script>

<style>
.show {
  visibility: visible !important;
}

.btnCharacter {
  position: absolute;
  inset: 0 72% 0 15%;
}
.btnLogout {
  position: absolute;
  inset: 0% 0% 0% 86.5%;
}
</style>
