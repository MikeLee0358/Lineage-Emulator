<template>
  <section class="show uiRole">
    <div class="close" @click.stop="closeUI"></div>
    <UIRoleNumber class="uiRoleNumber" />
    <uiRoleEquip class="uiRoleEquip" />
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
.show {
  visibility: visible !important;
}

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
  .uiRoleEquip {
    position: absolute;
    inset: 0;
  }
  .uiRoleNumber {
    position: absolute;
    inset: -32.65%;
    text-align: center;
    line-height: 50%;
    transform: scale(0.6);
  }
}

@media screen and (min-height: 433px) {
  .uiRole .uiRoleNumber {
    transform: unset;
    inset: 0%;
    top: 0.5%;
    font-size: clamp(9.5px, 2.65vmin, 2.5rem);
  }
}
</style>
