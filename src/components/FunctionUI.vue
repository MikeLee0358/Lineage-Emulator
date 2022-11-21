<template>
  <ul>
    <li class="characterBtn">
      <EquipmentList class="equipmentList show" />
    </li>
    <LogoutBtn />

  </ul>
</template>

<script setup>
import LogoutBtn from './LogoutBtn.vue';
import EquipmentList from './EquipmentList.vue';
</script>


<style lang="scss" scoped>
.show {
  visibility: visible !important;
}

.characterBtn {
  position: absolute;
  inset: 0 73% 0 13.5%;

  .equipmentList {
    visibility: hidden;
    position: absolute;
    inset: -2210% 46vw 686% -80.5vw;
    background-image: url("/src/assets/UI/UI_equip.png");
    background-size: cover;
    background-repeat: round;
  }
}
</style>
