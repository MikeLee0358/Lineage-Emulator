<template>
  <ul class="uiRoleNumber">
    <ul class="level">
      <li class="lv">{{ role.currentData.basic.lv }}</li>
      <li class="exp">{{ role.currentData.basic.exp }}</li>
    </ul>
    <ul class="basic">
      <li>{{ role.currentData.basic.hp }}/{{ role.currentData.basic.hp }}</li>
      <li>{{ role.currentData.basic.mp }}/{{ role.currentData.basic.mp }}</li>
      <li>{{ storeRole.getAC() }}</li>
    </ul>
    <ul class="attributes">
      <li>{{ role.currentData.basic.str }}</li>
      <li>{{ role.currentData.basic.dex }}</li>
      <li>{{ role.currentData.basic.con }}</li>
      <li>{{ role.currentData.basic.int }}</li>
      <li>{{ role.currentData.basic.wis }}</li>
      <li>{{ role.currentData.basic.cha }}</li>
    </ul>
    <li class="mr">{{ storeRole.getMR() }}</li>
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
  inset: -44%;
  transform: scale(0.53);

  .level {
    position: absolute;
    inset: 4.25% 15% 91.5% 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5%;
  }
  .basic {
    position: absolute;
    inset: 12.2% 46% 73% 30%;
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
      flex: 1;
      line-height: 100%;
      display: flex;
      align-items: center;
    }
  }
  .attributes {
    position: absolute;
    inset: 41.5% 68% 30% 13%;
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
      flex: 1;
      line-height: 100%;
      display: flex;
      align-items: center;
    }
  }
  .mr {
    position: absolute;
    inset: 89.8% 23% 5.5% 63%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
// galaxy fold
@media screen and (max-height: 300px) {
  .uiRoleNumber {
    font-size: clamp(9.5px, 14px, 2.5rem);
  }
}

@media screen and (min-height: 433px) {
  .uiRoleNumber {
    transform: unset;
    inset: 0%;
    font-size: clamp(9.5px, 2.6vmin, 2.5rem);

    .basic {
      top: 12.7%;
    }
  }
}
</style>
