<template>
  <ul ref="dom" class="container">
    <li
      v-for="equipment in equipmentList"
      :key="equipment.id"
      :data-id="equipment.id"
      :data-fullTitle="showFullTitle(equipment)"
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
    currentValue: 12,
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
    currentValue: 12,
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
// 控制css字體的顏色
const color = {
  // 已鑑定顏色
  white: "#fffdfd",
  // 未鑑定顏色
  gray: "#b3b1b1",
  // 祝福的顏色
  yellow: "#ECF0A3",
  // 受詛咒的顏色
  red: "red",
};
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
function showFullTitle(equipment) {
  // 針對飾品，不打算開放飾品衝裝，想保持未鑑定的灰色。   +X 飾品 沒有美感～
  const blockList = ["妖魔戰士護身符", "瞬間移動控制戒指", "歐吉皮帶", "形體控制戒指"];

  // 例子： 妖魔戰士的護身符
  if (blockList.includes(equipment.title)) return `${equipment.title}`;
  // 例子： +9 精靈金屬盔甲
  else return `+${equipment.currentValue} ${equipment.title}`;
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
  -webkit-text-stroke: 0.05px black;
  /* width and color */
  font-family: "Noto Sans TC", sans-serif;
  font-weight: 400;
  font-size: 12px;
}

li::after {
  /* 透過attr()的ＣＳＳ方法，可以抓取Dom的屬性使用（content以外都在實驗階段），也藉由template可以使用ＪＳ的特性，所以實現出動態渲染   + X 某某裝備   */
  content: attr(data-fullTitle);
  position: relative;
  top: 30px;

  display: block;
  z-index: 1;
  opacity: 0;
  /* 顯示名稱寬度 */
  width: 100px;
}

li:hover::after {
  /* 滑鼠移到時，顯示文字 */
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

.amulet::after {
  left: 35px;
  top: 10px;
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

.left-ring::after {
  top: -20px;
  left: -60px;
}

.belt {
  top: 29.5%;
  left: 34%;
  background-image: url("/src/assets/equipment_belt.png");
  color: v-bind(color.gray);
}

.belt::after {
  width: 50px;
  left: -10px;
}

.shield {
  top: 31.3%;
  left: 39.3%;
  background-image: url("../assets/equipment_shield.jpg");
  color: v-bind(color.yellow);
}

.shield::after {
  left: -15px;
}

.gloves {
  top: 34%;
  left: 28%;
  background-image: url("../assets/equipment_gloves.jpg");
}
.gloves::after {
  width: 80px;
}
.right-ring {
  top: 37.45%;
  left: 38.75%;
  background-image: url("/src/assets/equipment_right-ring.png");
  color: v-bind(color.gray);
}

.boots {
  top: 52.3%;
  left: 38.7%;
  background-image: url("../assets/equipment_boots.jpg");
}
</style>
