<template>
  <ul ref="dom" class="container">
    <li
      v-for="equipment in equipmentList"
      :key="equipment.id"
      :data-id="equipment.id"
      :data-fullTitle="`+${equipment.currentValue} ${equipment.title}`"
    ></li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
const dom = ref();
const equipmentList = ref([
  {
    id: 0,
    title: "瑟魯基之劍",
    src: "/src/assets/equipment_weapon.jpg",
    currentValue: 9,
    stableValue: 6,
  },
  {
    id: 1,
    title: "騎士面甲",
    src: "/src/assets/equipment_helmet.jpg",
    armor: 3,
    currentValue: 4,
    stableValue: 4,
  },
  {
    id: 2,
    title: "T恤",
    src: "/src/assets/equipment_shirt.jpg",
    armor: 0,
    currentValue: 0,
    stableValue: 4,
  },
  {
    id: 3,
    title: "精靈金屬盔甲",
    src: "/src/assets/equipment_armor.jpg",
    armor: -6,
    currentValue: 0,
    stableValue: 6,
  },
  {
    id: 4,
    title: "保護者斗篷",
    src: "/src/assets/equipment_cloak.jpg",
    armor: -3,
    currentValue: 0,
    stableValue: 4,
  },
  {
    id: 5,
    title: "力量手套",
    src: "/src/assets/equipment_gloves.jpg",
    armor: 0,
    currentValue: 0,
    stableValue: 4,
  },
  {
    id: 6,
    title: "精靈盾牌",
    src: "/src/assets/equipment_shield.jpg",
    armor: -2,
    currentValue: 0,
    stableValue: 6,
  },
  {
    id: 7,
    title: "鋼鐵長靴",
    src: "/src/assets/equipment_boots.jpg",
    armor: -3,
    currentValue: 0,
    stableValue: 4,
  },
]);

function addClassToNode() {
  const nodeList = Array.from(dom.value.children);

  nodeList.forEach((node) => {
    const nodeId = Number(node.dataset.id);
    const equipmentListArray = Array.from(equipmentList.value);

    equipmentListArray.forEach((equipment) => {
      if (equipment.id === nodeId) {
        const className = equipment.src.split("_")[1].split(".")[0];
        node.classList.add(className);
      }
    });
  });
}
onMounted(() => {
  addClassToNode();
});
</script>

<style scoped>
li {
  position: absolute;
  width: 31px;
  height: 31px;
  color: white;
}
li::after {
  /* 透過attr()的ＣＳＳ方法，可以抓取Dom的屬性使用（content以外都在實驗階段），也藉由template可以使用ＪＳ的特性，所以實現出動態渲染   + X 某某裝備   */
  content: attr(data-fullTitle);
  position: absolute;
  /* color: #9e9e9e; */
  top: -15px;
  left: 5px;
  z-index: 1;
  display: block ruby;

  font-size: 10px;
}
li:hover::after {
  background: green;
}
.weapon {
  top: 36%;
  left: 23.5%;
  background-image: url("../assets/equipment_weapon.jpg");
}

.helmet {
  top: 13%;
  left: 36.3%;
  background-image: url("../assets/equipment_helmet.jpg");
}
.cloak {
  top: 23.35%;
  left: 36.85%;
  background-image: url("../assets/equipment_cloak.jpg");
}
.armor {
  top: 23.35%;
  left: 32.25%;
  background-image: url("../assets/equipment_armor.jpg");
}
.shirt {
  top: 23.35%;
  left: 27.75%;
  background-image: url("../assets/equipment_shirt.jpg");
}
.shield {
  top: 31.3%;
  left: 39.3%;
  background-image: url("../assets/equipment_shield.jpg");
  /* 祝福的顏色 */
  color: #fff84f;
}
.gloves {
  top: 34%;
  left: 28%;
  background-image: url("../assets/equipment_gloves.jpg");
}
.boots {
  top: 52.3%;
  left: 38.7%;
  background-image: url("../assets/equipment_boots.jpg");
}

/* .test {
  position: relative;
  width: 30px;
  height: 30px;
  background-image: url("../assets/equipment_armor.jpg");
}
.test::after {
  content: "+10 精靈金屬盔甲";
  color: white;
  position: absolute;
  top: -10px;
  opacity: 0;
}
.test:hover::after {
  opacity: 1;
} */
</style>
