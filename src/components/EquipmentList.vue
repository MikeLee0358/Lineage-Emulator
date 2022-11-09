<template>
  <ul ref="dom">
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
    name: "大馬士革刀",
    src: "/src/assets/equip_weapon.png",
    category: "weapon",
    toDisplay: {
      attack: {
        small: 10,
        larger: 11,
      },
      grip: "單手武器",
      currentValue: 9,
      stableValue: 6,
      material: "鐵",
      weight: 45,
      occupation: ["妖精", "王族", "騎士", "黑暗妖精", "龍騎士"],
      description: "不會損壞",
    },
  },
  {
    id: 1,
    name: "抗魔法頭盔",
    src: "/src/assets/equip_helmet.png",
    category: "helmet",
    toDisplay: {
      armor: -2,
      currentValue: 0,
      stableValue: 4,
      material: "鐵",
      weight: 35,
      occupation: ["妖精", "幻術士", "法師", "王族", "騎士", "黑暗妖精", "龍騎士"],
      description: ["魔法防禦+4", "使用防卷成功+1，魔法防禦也會+1"],
    },
  },
  {
    id: 2,
    name: "妖魔戰士護身符",
    src: "/src/assets/equip_amulet.png",
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
    src: "/src/assets/equip_shirt.png",
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
    name: "精靈鏈甲",
    src: "/src/assets/equip_armor.png",
    category: "armor",
    toDisplay: {
      armor: -5,
      currentValue: 0,
      stableValue: 6,
      material: "米索莉",
      weight: 150,
      occupation: ["王族", "騎士", "黑暗妖精", "龍騎士", "戰士"],
      description: null,
    },
  },
  {
    id: 5,
    name: "保護者斗篷",
    src: "/src/assets/equip_cloak.png",
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
    src: "/src/assets/equip_left-ring.png",
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
    src: "/src/assets/equip_belt.png",
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
    name: "反射之盾",
    src: "/src/assets/equip_shield.png",
    category: "shield",
    toDisplay: {
      armor: -2,
      currentValue: 0,
      stableValue: 4,
      material: "銀",
      weight: 50,
      occupation: ["妖精", "王族", "騎士", "黑暗妖精", "龍騎士"],
      description: "妖精裝備，魔法防禦+5",
    },
  },
  {
    id: 9,
    name: "力量手套",
    src: "/src/assets/equip_gloves.png",
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
    src: "/src/assets/equip_right-ring.png",
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
    src: "/src/assets/equip_boots.png",
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

const dom = ref();

const color = {
  grey: "#717070",
  white: "#e8e8e8",
  yellow: "#E9EE8B",
  red: "#FF2424",
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

  if (equip.name === "大馬士革刀")
    return `+${equip.toDisplay.currentValue} ${equip.name} (揮舞)`;
  else if (blockEquipInfo.includes(equip.name)) return `${equip.name} (使用中)`;
  else return `+${equip.toDisplay.currentValue} ${equip.name} (使用中)`;
}

onMounted(() => {
  addCategoryToClass();
});
</script>

<style lang="scss" scoped>
li {
  position: absolute;
  width: 11%;
  height: 9%;
  background-repeat: round;
  background-size: cover;

  &.weapon {
    top: 52.5%;
    left: 37.2%;
    background-image: url("../assets/equip_weapon.png");
  }
  &.helmet {
    top: 13.2%;
    left: 73.1%;
    background-image: url("../assets/equip_helmet.png");
  }

  &.necklace {
    top: 19.3%;
    left: 60.3%;
    background-image: url("/src/assets/equip_amulet.png");
  }

  &.shirt {
    top: 31%;
    left: 49%;
    background-image: url("../assets/equip_shirt.png");
  }

  &.armor {
    top: 31%;
    left: 61.7%;
    background-image: url("/src/assets/equip_armor.png");
  }
  &.cloak {
    top: 31%;
    left: 74.2%;
    background-image: url("../assets/equip_cloak.png");
  }

  &.left-ring {
    top: 42.2%;
    left: 35.5%;
    background-image: url("/src/assets/equip_right-ring.png");
  }

  &.belt {
    top: 41.2%;
    left: 66.6%;
    background-image: url("/src/assets/equip_belt.png");
    display: block;
  }

  &.shield {
    top: 44.3%;
    left: 81.5%;
    background-image: url("../assets/equip_shield.png");
  }
  .shield::after {
    color: v-bind("red");
  }

  &.gloves {
    top: 48.8%;
    left: 49.8%;
    background-image: url("../assets/equip_gloves.png");
  }

  &.right-ring {
    top: 55%;
    left: 79.8%;
    background-image: url("/src/assets/equip_right-ring.png");
  }
  &.boots {
    top: 80.1%;
    left: 79.7%;
    background-image: url("../assets/equip_boots.png");
  }
}
li::after {
  content: attr(data-displayEquipInfo);
  position: absolute;
  top: 33px;
  left: -25px;
  z-index: 1;

  display: none;
  width: 150px;
  height: 50px;

  padding: 5px;
  background: rgba(0, 0, 0, 0.4);
  border: 1.75px solid;
  border-color: gainsboro #717070 #717070 gainsboro;

  color: v-bind("color.white");
  font-family: "Noto Sans SC", sans-serif;
  font-weight: 300;
  font-size: 13px;
  line-height: 13px;
}

li:hover::after {
  display: block;
}

.necklace::after,
.belt::after,
.left-ring::after,
.right-ring::after {
  color: v-bind("color.grey");
  border: unset;
  background: unset;
  padding: unset;
  height: 1rem;
  overflow-y: hidden;
}
</style>
