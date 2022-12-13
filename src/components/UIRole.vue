<template>
  <section class="uiRole visible">
    <div class="close" @click.stop="closeUI"></div>
    <UIRoleNumber />
    <uiRoleEquip />
  </section>
</template>

<script setup>
import UIRoleNumber from "./UIRoleNumber.vue";
import uiRoleEquip from "./uiRoleEquip.vue";

const closeUI = (e) => {
  e.target.parentElement.classList.remove("visible");
};
</script>

<style lang="scss" scoped>
@use '../scss/common.scss';
.uiRole {
  position: absolute;
  inset: -2216% 1359.3% 704.8% -2500%;
  background-image: url("/src/assets/UI/UI_role.png");
  background-size: cover;
  background-repeat: round;
  visibility: hidden;

  .close {
    inset: 0 0 93% 87%;
    @extend %close;
  }
}
</style>
