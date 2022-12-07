<template>
  <ul class="uiRoleNumber">
    <ul class="level">
      <li class="lv">{{ role.currentData.basic.lv }}</li>
      <li class="exp">{{ role.currentData.basic.exp }}</li>
    </ul>
    <ul class="basic">
      <li>{{ role.currentData.basic.hp }}/{{ role.currentData.basic.hp }}</li>
      <li>{{ role.currentData.basic.mp }}/{{ role.currentData.basic.mp }}</li>
      <li>{{ role.calcAC }}</li>
    </ul>
    <ul class="attributes">
      <li>{{ role.currentData.basic.str }}</li>
      <li>{{ role.currentData.basic.dex }}</li>
      <li>{{ role.currentData.basic.con }}</li>
      <li>{{ role.currentData.basic.int }}</li>
      <li>{{ role.currentData.basic.wis }}</li>
      <li>{{ role.currentData.basic.cha }}</li>
    </ul>
    <li class="mr">{{ mr }}</li>
  </ul>
</template>

<script setup>
import { useRoleStore } from "../stores/role";
import { storeToRefs } from "pinia";
const storeRole = useRoleStore();
const { role } = storeToRefs(storeRole);
</script>

<style lang="scss">
.uiRoleNumber {
  position: absolute;
  inset: -32.65%;
  text-align: center;
  line-height: 50%;
  transform: scale(0.6);

  .level {
    position: absolute;
    inset: 2.5% 15% 90.5% 30%;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 5%;
    padding-top: 0.75%;

    .lv {
      justify-self: right;
    }
    .exp {
      justify-self: left;
    }
  }
  .basic {
    position: absolute;
    inset: 12.5% 46% 73% 30%;
    display: grid;
    align-items: center;
  }
  .attributes {
    position: absolute;
    inset: 41.5% 68% 30% 13%;
    display: grid;
    align-items: center;
  }
  .mr {
    position: absolute;
    inset: 90.5% 23% 6% 63%;
    display: grid;
    align-items: center;
  }
}

@media screen and (min-height: 433px) {
  .uiRoleNumber {
    transform: unset;
    inset: 0%;
    top: 0.5%;
    font-size: clamp(9.5px, 2.65vmin, 2.5rem);
  }
}
</style>
