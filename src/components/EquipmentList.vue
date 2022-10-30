<template>
  <!-- <img src="../assets/equipment_weapon.jpg" alt="weapon-img" /> -->
  <img v-for="equipment in equipmentList" :key="equipment.id" :src="equipment.src" />
</template>

<script setup>
import { ref } from "vue";

const equipmentList = ref([
  {
    id: 0,
    title: "武器",
    src: "/src/assets/equipment_weapon.jpg",
    value: 0,
    stableValue: -6,
  },
  {
    id: 1,
    title: "頭盔",
    src: "/src/assets/equipment_helmet.jpg",
    value: 0,
    stableValue: -4,
  },
  {
    id: 2,
    title: "斗篷",
    src: "/src/assets/equipment_cloak.jpg",
    value: 0,
    stableValue: -4,
  },
  {
    id: 3,
    title: "盔甲",
    src: "/src/assets/equipment_armor.jpg",
    value: 0,
    stableValue: -6,
  },
  {
    id: 4,
    title: "內衣",
    src: "/src/assets/equipment_t-shirt.jpg",
    value: 0,
    stableValue: -4,
  },
  {
    id: 5,
    title: "盾牌",
    src: "/src/assets/equipment_shield.jpg",
    value: 0,
    stableValue: -6,
  },
  {
    id: 6,
    title: "手套",
    src: "/src/assets/equipment_gloves.jpg",
    value: 0,
    stableValue: -4,
  },
  {
    id: 7,
    title: "鞋子",
    src: "/src/assets/equipment_armor.jpg",
    value: 0,
    stableValue: -4,
  },
]);
</script>

<style scoped>
img {
  position: absolute;
  width: 30.5px;
  height: 30.5px;
  left: 23.5%;
  top: 35.75%;
}
img:hover {
  outline: 1px solid green;
}
.armor {
  position: absolute !important;
  left: 50% !important;
}
</style>
