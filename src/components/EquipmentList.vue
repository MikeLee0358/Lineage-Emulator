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
// 控制css字體的顏色
const color = {
  // 已鑑定顏色
  white: "#eee",
  // 未鑑定顏色
  gray: "#afaeac",
  // 祝福的顏色
  yellow: "#f0ec92",
  // 受詛咒的顏色
  red: "red",
};
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
    title: "妖魔戰士護身符",
    src: "/src/assets/equipment_amulet.png",
    armor: 0,
    currentValue: 0,
    stableValue: 0,
  },
  {
    id: 3,
    title: "T恤",
    src: "/src/assets/equipment_shirt.jpg",
    armor: 0,
    currentValue: 0,
    stableValue: 4,
  },
  {
    id: 4,
    title: "精靈金屬盔甲",
    src: "/src/assets/equipment_armor.jpg",
    armor: -6,
    currentValue: 0,
    stableValue: 6,
  },
  {
    id: 5,
    title: "保護者斗篷",
    src: "/src/assets/equipment_cloak.jpg",
    armor: -3,
    currentValue: 0,
    stableValue: 4,
  },
  {
    id: 6,
    title: "瞬間移動控制戒指",
    src: "/src/assets/equipment_left-ring.png",
    armor: 0,
    currentValue: 0,
    stableValue: 0,
  },
  {
    id: 7,
    title: "歐吉皮帶",
    src: "/src/assets/equipment_belt.png",
    armor: 0,
    currentValue: 0,
    stableValue: 0,
  },
  {
    id: 8,
    title: "精靈盾牌",
    src: "/src/assets/equipment_shield.jpg",
    armor: -2,
    currentValue: 0,
    stableValue: 6,
  },
  {
    id: 9,
    title: "力量手套",
    src: "/src/assets/equipment_gloves.jpg",
    armor: 0,
    currentValue: 0,
    stableValue: 4,
  },
  {
    id: 10,
    title: "形體控制戒指",
    src: "/src/assets/equipment_right-ring.png",
    armor: 0,
    currentValue: 0,
    stableValue: 0,
  },
  {
    id: 11,
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
  color: v-bind(color.white);
}
li::after {
  /* 透過attr()的ＣＳＳ方法，可以抓取Dom的屬性使用（content以外都在實驗階段），也藉由template可以使用ＪＳ的特性，所以實現出動態渲染   + X 某某裝備   */
  content: attr(data-fullTitle);
  position: relative;
  top: -15px;
  /* 每樣道具名稱長度不同，找到這個解決方案，讓文字長度有span效果(隨字體同寬) */
  display: ruby;
  /* 讓文字權重高於圖片 */
  z-index: 1;
  font-size: 10px;
}
li:hover::after {
  opacity: 1;
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
.amulet {
  top: 16.5%;
  left: 31.75%;
  background-image: url("/src/assets/equipment_amulet.png");
  color: v-bind(color.gray);
}
.shirt {
  top: 23.35%;
  left: 27.75%;
  background-image: url("../assets/equipment_shirt.jpg");
}
.armor {
  top: 23.35%;
  left: 32.25%;
  background-image: url("../assets/equipment_armor.jpg");
}
.cloak {
  top: 23.35%;
  left: 36.85%;
  background-image: url("../assets/equipment_cloak.jpg");
}
.left-ring {
  top: 30%;
  left: 22.8%;
  background-image: url("/src/assets/equipment_right-ring.png");
  color: v-bind(color.gray);
}
.belt {
  top: 29.5%;
  left: 34%;
  background-image: url("/src/assets/equipment_belt.png");
}
.shield {
  top: 31.3%;
  left: 39.3%;
  background-image: url("../assets/equipment_shield.jpg");
  color: v-bind(color.yellow);
}
.gloves {
  top: 34%;
  left: 28%;
  background-image: url("../assets/equipment_gloves.jpg");
}
.right-ring {
  top: 37.45%;
  left: 38.75%;
  background-image: url("/src/assets/equipment_right-ring.png");
}
.boots {
  top: 52.3%;
  left: 38.7%;
  background-image: url("../assets/equipment_boots.jpg");
}
</style>
