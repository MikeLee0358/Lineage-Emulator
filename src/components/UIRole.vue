<template>
  <section class="uiRole show">
    <div class="close" @click.stop="closeUI"></div>
    <UIRoleNumber />
    <uiRoleEquip />
  </section>
</template>

<script setup>
import UIRoleNumber from "./UIRoleNumber.vue";
import uiRoleEquip from "./uiRoleEquip.vue";

const closeUI = (e) => {
  e.target.parentElement.classList.remove("show");
};
</script>

<style lang="scss">
.uiRole {
  position: absolute;
  inset: -2215% 1487% 704% -2759%;
  background-image: url("/src/assets/UI/UI_character.png");
  background-size: cover;
  background-repeat: round;
  visibility: hidden;

  .close {
    position: absolute;
    inset: 0 0 93% 87%;
    z-index: 1;
  }
}

.show {
  visibility: visible !important;
}
</style>
