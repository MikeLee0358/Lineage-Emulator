<template>
  <ul>
    <ul class="level">
      <li class="lv">{{ role.data.basic.lv }}</li>
      <li class="exp">{{ role.data.basic.exp }}</li>
    </ul>
    <ul class="basic">
      <li class="hp">{{ role.data.basic.hp }}/{{ role.data.basic.hp }}</li>
      <li class="mp">{{ role.data.basic.mp }}/{{ role.data.basic.mp }}</li>
      <li class="ac">{{ role.data.basic.ac }}</li>
    </ul>
    <ul class="attributes">
      <li class="str">{{ role.data.basic.str }}</li>
      <li class="dex">{{ role.data.basic.dex }}</li>
      <li class="con">{{ role.data.basic.con }}</li>
      <li class="int">{{ role.data.basic.int }}</li>
      <li class="wis">{{ role.data.basic.wis }}</li>
      <li class="cha">{{ role.data.basic.cha }}</li>
    </ul>
    <li class="mr">{{ role.data.basic.mr }}</li>
  </ul>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoleStore } from "../stores/role";
const roleStore = useRoleStore();
const { role } = storeToRefs(roleStore);
</script>

<style lang="scss">
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
</style>
