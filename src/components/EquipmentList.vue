<template>
  <ul ref="dom" class="container">
    <li
      v-for="equip in equipList"
      :key="equip.id"
      :data-id="equip.id"
      :data-displayEquipInfo="getEquipInfo(equip)"
    ></li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
const equipList = ref([
  {
    id: 0,
    name: "瑟魯基之劍",
    src: "/src/assets/equip_weapon.jpg",
    category: "oneHandedSword",
    toDisplay: {
      attack: {
        small: 16,
        larger: 10,
      },
      grip: "單手武器",
      currentValue: 9,
      stableValue: 6,
      material: "金屬",
      weight: 120,
      occupation: ["騎士", "龍騎士"],
      description: "近距離命中+2",
    },
  },
  {
    id: 1,
    name: "騎士面甲",
    src: "/src/assets/equip_helmet.jpg",
    category: "helmet",
    toDisplay: {
      armor: -3,
      currentValue: 4,
      stableValue: 4,
      material: "金屬",
      weight: 40,
      occupation: ["騎士", "戰士"],
      description: null,
    },
  },
  {
    id: 2,
    name: "妖魔戰士護身符",
    src: "/src/assets/equip_amulet.jpg",
    category: "necklace",
    toDisplay: {
      armor: 0,
      currentValue: 0,
      stableValue: 0,
      material: "寶石",
      weight: 5,
      occupation: ["全職業"],
      description: ["體力上限+20", "限制等級：Lv.10"],
    },
  },
  {
    id: 3,
    name: "T恤",
    src: "/src/assets/equip_shirt.jpg",
    category: "shirt",
    toDisplay: {
      armor: 0,
      currentValue: 0,
      stableValue: 0,
      material: "布",
      weight: 5,
      occupation: ["全職業"],
      description: null,
    },
  },
  {
    id: 4,
    name: "精靈金屬盔甲",
    src: "/src/assets/equip_armor.jpg",
    category: "armor",
    toDisplay: {
      armor: -6,
      currentValue: 0,
      stableValue: 6,
      material: "奧里哈魯根",
      weight: 250,
      occupation: ["騎士", "妖精", "黑暗妖精", "戰士"],
      description: null,
    },
  },
  {
    id: 5,
    name: "保護者斗篷",
    src: "/src/assets/equip_cloak.jpg",
    category: "cloak",
    toDisplay: {
      armor: -3,
      currentValue: 0,
      stableValue: 4,
      material: "布",
      weight: 10,
      occupation: ["全職業"],
      description: null,
    },
  },
  {
    id: 6,
    name: "瞬間移動控制戒指",
    src: "/src/assets/equip_left-ring.jpg",
    category: "left-ring",
    toDisplay: {
      armor: 0,
      currentValue: 0,
      stableValue: 0,
      material: "金",
      weight: 3,
      occupation: ["全職業"],
      description: "使用傳送術或傳送道具時，可以指定傳送到曾經記憶過的地點",
    },
  },
  {
    id: 7,
    name: "歐吉皮帶",
    src: "/src/assets/equip_belt.jpg",
    category: "belt",
    toDisplay: {
      armor: 0,
      currentValue: 0,
      stableValue: 0,
      material: "皮",
      weight: 50,
      occupation: ["全職業"],
      description: "增加負重+1000",
    },
  },
  {
    id: 8,
    name: "精靈盾牌",
    src: "/src/assets/equip_shield.jpg",
    category: "shield",
    toDisplay: {
      armor: -2,
      currentValue: 0,
      stableValue: 6,
      material: "銀",
      weight: 50,
      occupation: ["騎士", "妖精", "法師", "黑暗妖精", "龍騎士", "幻術士"],
      description: "妖精裝備，魔法防禦+5",
    },
  },
  {
    id: 9,
    name: "力量手套",
    src: "/src/assets/equip_gloves.jpg",
    category: "gloves",
    toDisplay: {
      armor: 0,
      currentValue: 0,
      stableValue: 4,
      material: "皮",
      weight: 18,
      occupation: ["全職業"],
      description: "力量+2",
    },
  },
  {
    id: 10,
    name: "形體控制戒指",
    src: "/src/assets/equip_right-ring.jpg",
    category: "right-ring",
    toDisplay: {
      armor: 0,
      currentValue: 0,
      stableValue: 0,
      material: "金",
      weight: 3,
      occupation: ["全職業"],
      description: "使用變身術或變身道具時，可以指定要變身的怪物",
    },
  },
  {
    id: 11,
    name: "鋼鐵長靴",
    src: "/src/assets/equip_boots.jpg",
    category: "boots",
    toDisplay: {
      armor: -3,
      currentValue: 0,
      stableValue: 4,
      material: "鐵",
      weight: 50,
      occupation: ["全職業"],
      description: null,
    },
  },
]);
// 透過vue方法，抓取<ul>的DOM，經過一些處理變成array，再來操作資料。
const dom = ref();
// 透過vue方法，控制css字體的顏色
const color = {
  // 已鑑定顏色
  white: "#f2f2f2",
  // 未鑑定顏色
  gray: "#717070",
  // 祝福的顏色
  yellow: "#ECF0A3",
  // 受詛咒的顏色
  red: "red",
};

function addCategoryToClass() {
  const nodeList = Array.from(dom.value.children);

  nodeList.forEach((node) => {
    const nodeId = Number(node.dataset.id);
    const equipListArray = Array.from(equipList.value);

    equipListArray.forEach((equip) => {
      if (equip.id === nodeId) node.classList.add(equip.category);
    });
  });
}
function getEquipInfo(equip) {
  // 未鑑定狀態： 不打算開放飾品衝裝，不喜歡 '+3 妖魔戰士護身符' 的感覺。
  const blockEquipInfo = [
    "妖魔戰士護身符",
    "瞬間移動控制戒指",
    "歐吉皮帶",
    "形體控制戒指",
  ];

  if (equip.name === "瑟魯基之劍")
    return `+${equip.toDisplay.currentValue} ${equip.name} (揮舞)`;
  else if (blockEquipInfo.includes(equip.name)) return `${equip.name} (使用中)`;
  else return `+${equip.toDisplay.currentValue} ${equip.name} (使用中)`;
}

onMounted(() => {
  addCategoryToClass();
});
</script>

<style scoped>
li {
  position: absolute;
  width: 30px;
  height: 30px;
}
/* infoBox : 動態渲染 + X 某某裝備 
     透過attr()的ＣＳＳ方法，抓取Dom屬性使用（content以外都在實驗階段），
     也藉著template特性使用ＪＳ實現出來， */
li::after {
  content: attr(data-displayEquipInfo);
  position: absolute;
  top: 33px;
  left: -25px;
  z-index: 1;

  /* 裝備提示框樣式 */
  display: none; /* 預設off*/
  width: 150px;
  height: 50px;

  padding: 5px;
  background: rgba(0, 0, 0, 0.4);
  border: 1.75px solid;
  border-color: v-bind(color.white) v-bind(color.gray) v-bind(color.gray)
    v-bind(color.white);

  color: v-bind(color.white);
  font-family: "Noto Sans SC", sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 13px;
}

li:hover::after {
  display: block; /* 滑到圖案時，裝備提示框on */
}

.oneHandedSword {
  top: 36%;
  left: 23.5%;
  background-image: url("../assets/equip_weapon.jpg");
}

.helmet {
  top: 13%;
  left: 36.3%;
  background-image: url("../assets/equip_helmet.jpg");
}

.necklace {
  top: 16.5%;
  left: 31.75%;
  background-image: url("/src/assets/equip_amulet.jpg");
}

.shirt {
  top: 23.35%;
  left: 27.75%;
  background-image: url("../assets/equip_shirt.jpg");
}

.armor {
  top: 23.35%;
  left: 32.25%;
  background-image: url("../assets/equip_armor.jpg");
}
.cloak {
  top: 23.35%;
  left: 36.85%;
  background-image: url("../assets/equip_cloak.jpg");
}

.left-ring {
  top: 30%;
  left: 22.8%;
  background-image: url("/src/assets/equip_right-ring.jpg");
}

.belt {
  top: 29.5%;
  left: 34%;
  background-image: url("/src/assets/equip_belt.jpg");
  display: block;
}

.shield {
  top: 31.2%;
  left: 39.35%;
  background-image: url("../assets/equip_shield.jpg");
}
.shield::after {
  color: v-bind(color.yellow);
}

.gloves {
  top: 34%;
  left: 28%;
  background-image: url("../assets/equip_gloves.jpg");
}

.right-ring {
  top: 37.45%;
  left: 38.75%;
  background-image: url("/src/assets/equip_right-ring.jpg");
}

.boots {
  top: 52.3%;
  left: 38.7%;
  background-image: url("../assets/equip_boots.jpg");
}
/*  blockEquipInfo的樣式（未鑑定），只會顯示一行 */
.necklace::after,
.belt::after,
.left-ring::after,
.right-ring::after {
  color: v-bind(color.white);
  border: unset;
  background: unset;
  padding: unset;
  height: 1rem;
  overflow-y: hidden;
}
</style>
