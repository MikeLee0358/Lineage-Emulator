<template>
  <ul class="uiFunction" @click="btnToggle">
    <li class="btnRole">
      <UIRole />
    </li>
    <li class="btnLogout">
      <UILogout />
    </li>
  </ul>
</template>

<script setup>
import UILogout from "./UILogout.vue";
import UIRole from "./UIRole.vue";

const btnToggle = (e) => {
  if (e.target.tagName !== "LI") return;
  const uiTarget = e.target.firstElementChild.classList;
  const uiRoleList = e.target.firstElementChild.children[1].firstElementChild.classList;

  uiTarget.toggle("show");
  uiRoleList.remove("show");
};
</script>

<style lang="scss" scoped>
.uiFunction {
  grid-area: uiFunction;
  position: relative;
  .btnRole {
    position: absolute;
    inset: 0 72% 0 15%;
  }
  .btnLogout {
    position: absolute;
    inset: 0% 0% 0% 86.5%;
  }
}

.show {
  visibility: visible !important;
}
</style>
