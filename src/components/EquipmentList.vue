<template>
  <div ref="dom" class="container">
    <img v-for="equipment in equipmentList" :key="equipment.id" :src="equipment.src" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const dom = ref();
onMounted(() => {
  const nodeList = Array.from(dom.value.children);

  nodeList.forEach((node) => {
    // 從網址中擷取裝備名稱
    const className = node.src.split("_")[1].split(".")[0];
    node.classList.add(className);
  });
});
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
    src: "/src/assets/equipment_shirt.jpg",
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
    src: "/src/assets/equipment_boots.jpg",
    value: 0,
    stableValue: -4,
  },
]);
</script>

<style scoped>
img {
  position: absolute;
  width: 31px;
  height: 31px;
}
img:hover {
  outline: 1px solid green;
}
.weapon {
  top: 36%;
  left: 23.5%;
}
.helmet {
  top: 13%;
  left: 36.3%;
}
.cloak {
  top: 23.35%;
  left: 36.85%;
}
.armor {
  top: 23.35%;
  left: 32.25%;
}
.shirt {
  top: 23.35%;
  left: 27.75%;
}
.shield {
  top: 31.3%;
  left: 39.3%;
}
.gloves {
  top: 34%;
  left: 28%;
}
.boots {
  top: 52.3%;
  left: 38.7%;
}
</style>
