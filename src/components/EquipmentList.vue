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
  white: "#f2f2f2",
  // 未鑑定顏色
  gray: "#999",
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
  // 不打算開放飾品衝裝，想保持未鑑定的狀態。  不喜歡 '+3 妖魔戰士護身符' 的感覺
  const blockList = ["妖魔戰士護身符", "瞬間移動控制戒指", "歐吉皮帶", "形體控制戒指"];

  if (blockList.includes(equipment.title)) return `${equipment.title} (使用中)`;
  else return `+${equipment.currentValue} ${equipment.title} (使用中)`;
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
}

li::after {
  /* 透過attr()的ＣＳＳ方法，可以抓取Dom的屬性使用（content以外都在實驗階段），也藉由template可以使用ＪＳ的特性，所以實現出動態渲染   + X 某某裝備   */
  content: attr(data-fullTitle);
  position: relative;
  top: 33px;
  left: -25px;
  z-index: 1;

  /* 裝備提示框樣式 */
  display: none; /* 預設off*/
  width: 150px;
  height: 50px;

  padding: 3px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid;
  border-color: v-bind(color.white) v-bind(color.gray) v-bind(color.gray)
    v-bind(color.white);

  color: v-bind(color.white);
  font-family: "Noto Sans SC", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 10px;
}

li:hover::after {
  /* 滑到圖案時，裝備提示框on */
  display: block;
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
}

.belt {
  top: 29.5%;
  left: 34%;
  background-image: url("/src/assets/equipment_belt.png");
  display: block;
}

.shield {
  top: 31.2%;
  left: 39.35%;
  background-image: url("../assets/equipment_shield.jpg");
}
.shield::after {
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
/* 裝備提示框，顯示一行（未鑑定） */
.amulet::after,
.belt::after,
.left-ring::after,
.right-ring::after {
  color: v-bind(color.white);
  height: 1rem;
  border: unset;
  background: unset;
  padding: unset;
  overflow-y: hidden;
}
</style>
