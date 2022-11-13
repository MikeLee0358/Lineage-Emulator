<template>
  <ul @click="algorithmStore.algorithm" @load="a">
    <li
      v-for="equip in equipList"
      :key="equip.id"
      :class="equip.category"
      :data-displayEquipInfo="getEquipInfo(equip)"
      :style="{ backgroundImage: `url(${equip.src})` }"
      @click="dataForAlgorithm(equip)"
    ></li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { useAlgorithmStore } from "../stores/algorithm";

const algorithmStore = useAlgorithmStore();

const equipList = ref([
  {
    id: 0,
    name: "大馬士革刀",
    src: "/src/assets/equip_weapon.png",
    category: "weapon",
    toDisplay: {
      attack: {
        small: 10,
        large: 11,
      },
      grip: "單手武器",
      value: 0,
      safetyValue: 6,
      material: "鐵",
      weight: 45,
      occupation: "[妖精][王族][騎士][黑暗妖精][龍騎士]",
      feature: "不會損壞",
    },
  },
  {
    id: 1,
    name: "抗魔法頭盔",
    src: "/src/assets/equip_helmet.png",
    category: "helmet armor",
    toDisplay: {
      armor: 2,
      value: 0,
      safetyValue: 4,
      material: "鐵",
      weight: 35,
      occupation: "[妖精][幻術士][法師][王族][騎士][黑暗妖精][龍騎士]",
      feature: "魔法防禦額外點數 +4",
    },
  },
  {
    id: 2,
    name: "妖魔戰士護身符",
    src: "/src/assets/equip_amulet.png",
    category: "amulet",
    toDisplay: {
      armor: 0,
      value: 0,
      safetyValue: 0,
      material: "寶石",
      weight: 5,
      occupation: "[所有職業]",
      feature: "體力上限+20",
    },
  },
  {
    id: 3,
    name: "T恤",
    src: "/src/assets/equip_shirt.png",
    category: "shirt",
    toDisplay: {
      armor: 0,
      value: 0,
      safetyValue: 4,
      material: "布",
      weight: 5,
      occupation: "[所有職業]",
      feature: null,
    },
  },
  {
    id: 4,
    name: "精靈鏈甲",
    src: "/src/assets/equip_armor.png",
    category: "bodyArmor",
    toDisplay: {
      armor: 5,
      value: 0,
      safetyValue: 6,
      material: "米索莉",
      weight: 150,
      occupation: "[妖精][幻術士][法師][王族][騎士][黑暗妖精][龍騎士]",
      feature: null,
    },
  },
  {
    id: 5,
    name: "保護者斗篷",
    src: "/src/assets/equip_cloak.png",
    category: "cloak",
    toDisplay: {
      armor: 3,
      value: 0,
      safetyValue: 4,
      material: "布",
      weight: 10,
      occupation: "[所有職業]",
      feature: null,
    },
  },
  {
    id: 6,
    name: "瞬間移動控制戒指",
    src: "/src/assets/equip_left-ring.png",
    category: "left-ring",
    toDisplay: {
      armor: 0,
      value: 0,
      safetyValue: 0,
      material: "金",
      weight: 3,
      occupation: "[所有職業]",
      feature: "使用傳送術或傳送道具時，可以指定傳送到曾經記憶過的地點",
    },
  },
  {
    id: 7,
    name: "歐吉皮帶",
    src: "/src/assets/equip_belt.png",
    category: "belt",
    toDisplay: {
      armor: 0,
      value: 0,
      safetyValue: 0,
      material: "皮",
      weight: 50,
      occupation: "[所有職業]",
      feature: "增加負重+1000",
    },
  },
  {
    id: 8,
    name: "反射之盾",
    src: "/src/assets/equip_shield.png",
    category: "shield",
    toDisplay: {
      armor: 2,
      value: 0,
      safetyValue: 4,
      material: "銀",
      weight: 50,
      occupation: "[妖精][王族][騎士][黑暗妖精][龍騎士]",
      feature: null,
    },
  },
  {
    id: 9,
    name: "力量手套",
    src: "/src/assets/equip_gloves.png",
    category: "gloves",
    toDisplay: {
      armor: 0,
      value: 0,
      safetyValue: 4,
      material: "皮",
      weight: 18,
      occupation: "[所有職業]",
      feature: "力量 +2",
    },
  },
  {
    id: 10,
    name: "形體控制戒指",
    src: "/src/assets/equip_right-ring.png",
    category: "right-ring",
    toDisplay: {
      armor: 0,
      value: 0,
      safetyValue: 0,
      material: "金",
      weight: 3,
      occupation: "[所有職業]",
      feature: "使用變身術或變身道具時，可以指定要變身的怪物",
    },
  },
  {
    id: 11,
    name: "鋼鐵長靴",
    src: "/src/assets/equip_boots.png",
    category: "boots",
    toDisplay: {
      armor: 3,
      value: 0,
      safetyValue: 4,
      material: "鐵",
      weight: 50,
      occupation: "[所有職業]",
      feature: null,
    },
  },
]);

function dataForAlgorithm(equip) {
  algorithmStore.targetCategory = equip.category;
  algorithmStore.targetSafetyValue = equip.toDisplay.safetyValue;
  //To fixed when clicked, item will show deferent value (global/local) .
  // if i want to have save equip data feature, keeping this on.
  algorithmStore.targetValue = equip.toDisplay.value;

  // global data updated to local data, to trigger reactivity for rendering getEquipInfo()
  setTimeout(() => {
    equip.toDisplay.value = algorithmStore.targetValue;
  }, 0);
}

function getEquipInfo(equip) {
  const jewelryCategory = ["amulet", "left-ring", "belt", "right-ring"];
  const armorCategory = ["helmet", "shirt", "armor", "cloak", ""];
  const toDisplay = equip.toDisplay;

  const jewelry = jewelryCategory.includes(equip.category);
  const weapon = equip.category === "weapon";
  const hasFeature = !!toDisplay.feature;

  let name = null;
  let career = ` 可使用職業:
${toDisplay.occupation}`;
  let material = ` 材質:${toDisplay.material}
 重量 ${toDisplay.weight}`;

  function showPlusOrMinus(value) {
    if (value === 0) return `+0`;
    return value > 0 ? `+${value}` : value;
  }

  if (jewelry) return `${equip.name} (使用中)`;
  if (weapon)
    name = `${showPlusOrMinus(equip.toDisplay.value)} ${equip.name} (揮舞)
攻擊力 ${toDisplay.attack.small}+${toDisplay.value}/${toDisplay.attack.large}+${
      toDisplay.value
    }`;
  if (!weapon)
    name = `${showPlusOrMinus(equip.toDisplay.value)} ${equip.name} (使用中)
防禦 ${toDisplay.armor}+${toDisplay.value}`;

  if (hasFeature)
    return `${name}
${career}
 ${toDisplay.feature}
${material}`;
  return `${name}
${career}
${material}`;
}
</script>

<style lang="scss" scoped>
@use '../scss/custom.scss';

li {
  position: absolute;
  width: 11%;
  height: 9%;
  background-repeat: round;
  background-size: cover;
  color: transparent;

  &::after {
    content: attr(data-displayEquipInfo);
    position: absolute;
    top: 102%;
    z-index: 1;
    width: 400%;
    border-width: 0.2vw;
    display: none;

    font-size: 1.3vw;
    line-height: 106%;
    @extend %infoTemplateStyle;
    color: var(--color-white);
  }
  &:hover::after {
    display: block;
  }
  &.weapon {
    top: 52.5%;
    left: 37.2%;
  }
  &.helmet.armor {
    top: 13.2%;
    left: 73.1%;
  }
  &.amulet {
    top: 19.3%;
    left: 60.3%;
  }
  &.shirt {
    top: 31%;
    left: 49%;
  }
  &.bodyArmor {
    top: 31%;
    left: 61.7%;
  }
  &.cloak {
    top: 31%;
    left: 74.2%;
  }
  &.left-ring {
    top: 42.3%;
    left: 35.9%;
  }
  &.belt {
    top: 41.2%;
    left: 66.6%;
  }
  &.shield {
    top: 44.3%;
    left: 81.5%;
  }
  &.gloves {
    top: 48.8%;
    left: 49.8%;
  }
  &.right-ring {
    top: 55%;
    left: 80%;
  }
  &.boots {
    top: 80.1%;
    left: 79.7%;
  }
  &.amulet::after,
  &.belt::after,
  &.left-ring::after,
  &.right-ring::after {
    color: var(--color-grey);
    border: unset;
    background: unset;
    padding: unset;
    white-space: nowrap;
  }
}
</style>
