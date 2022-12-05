<template>
  <ul class="uiRoleNumber">
    <ul class="level">
      <li class="lv">{{ basic.lv }}</li>
      <li class="exp">{{ basic.exp }}</li>
    </ul>
    <ul class="basic">
      <li>{{ basic.hp }}/{{ basic.hp }}</li>
      <li>{{ basic.mp }}/{{ basic.mp }}</li>
      <li>{{ basic.ac }}</li>
    </ul>
    <ul class="attributes">
      <li>{{ basic.str }}</li>
      <li>{{ basic.dex }}</li>
      <li>{{ basic.con }}</li>
      <li>{{ basic.int }}</li>
      <li>{{ basic.wis }}</li>
      <li>{{ basic.cha }}</li>
    </ul>
    <li class="mr">{{ basic.mr }}</li>
  </ul>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoleStore } from "../stores/role";
const roleStore = useRoleStore();
const { role } = storeToRefs(roleStore);
const basic = role.value.data.basic;
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
