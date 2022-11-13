<template>
  <ul ref="nodeForArray">
    <li
      v-for="slot in slotList"
      :key="slot.id"
      :class="slot.name"
      class="infoTemplate"
      :data-Content="getSlotInfo(slot.name, slot.toDisplay)"
      @click.stop="clickToActive(slot.name)"
    >
      <img :src="slot.src" />
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAlgorithmStore } from "../stores/algorithm";

const algorithmStore = useAlgorithmStore();
const nodeForArray = ref();
const nameBox = ref("");

const slotList = ref([
  {
    id: 0,
    name: "F5",
    src: "/src/assets/slot_empty.png",
    toDisplay: {
      myPurpose: `                Side project由來

   一直找不到天堂衝裝模擬器過
   過乾癮，正好轉職的技能可以
   練習，藉此機會磨練自己的技
   能，也是私心想回憶衝裝的天
   堂，打到人生第一張祝防的喜
   悅，開心沒過多久，隔天就被
   盜帳號...  總之
                                       Enjoy it !`,
    },
  },
  {
    id: 1,
    name: "F6",
    src: "/src/assets/slot_white-armor.png",
    toggle: true,
    toDisplay: {
      item: "對盔甲施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
  {
    id: 2,
    name: "F7",
    src: "/src/assets/slot_blessed-armor.png",
    toggle: 1,
    toDisplay: {
      item: "對盔甲施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
  {
    id: 3,
    name: "F8",
    src: "/src/assets/slot_cursed-armor.png",
    toDisplay: {
      item: "對盔甲施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
  {
    id: 4,
    name: "F9",
    src: "/src/assets/slot_empty.png",
    toDisplay: {
      msgToAll: `                 還沒想法
      1.機率公告
      2.內容概要？`,
    },
  },
  {
    id: 5,
    name: "F10",
    src: "/src/assets/slot_white-weapon.png",
    toDisplay: {
      item: "對武器施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
  {
    id: 6,
    name: "F11",
    src: "/src/assets/slot_blessed-weapon.png",
    toDisplay: {
      item: "對武器施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
  {
    id: 7,
    name: "F12",
    src: "/src/assets/slot_cursed-weapon.png",
    toDisplay: {
      item: "對武器施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
]);
const color = {
  grey: "var(--color-grey)",
  white: "var(--color-white)",
  yellow: "var(--color-yellow)",
  red: "var(--color-red)",
};

function clickToActive(name) {
  let cssColor = ref("");

  function addClass() {
    const nodeList = Array.from(nodeForArray.value.children);
    nodeList.forEach((node) => {
      node.classList.remove("active");
      node.classList.remove("infoTemplate");
      if (node.matches(`.${name}`)) {
        node.classList.add("active");
        node.classList.add("infoTemplate");
      }
    });
  }
  // I try to all logic in JS, so requiring reactive variable(nameBox) & v-bind(function ()).
  function getCssColor() {
    const slotYellow = ["F7", "F11"];
    const slotRed = ["F8", "F12"];

    name === undefined ? undefined : (nameBox.value = name);
    if (slotYellow.includes(nameBox.value)) cssColor = color.yellow;
    else if (slotRed.includes(nameBox.value)) cssColor = color.red;
    else cssColor = color.white;
  }

  addClass();
  getCssColor();

  return cssColor;
}
function getSlotInfo(name, toDisplay) {
  // The space relate to 'white-space' attribute
  const content = `${toDisplay.item}
材質:${toDisplay.material}
 重量 ${toDisplay.weight}`;

  if (name === "F5") return toDisplay.myPurpose;
  else if (name === "F9") return toDisplay.msgToAll;
  else return content;
}
onMounted(function whenPressKeyboard() {
  const nodeList = Array.from(nodeForArray.value.children);

  document.addEventListener("keydown", (e) => {
    e.preventDefault(); // to prevent F5, F11 default
    e.stopPropagation();
    nodeList.forEach((node) => {
      node.classList.remove("active");
      node.classList.remove("infoTemplate");

      if (!node.matches(`.${e.key}`)) return;
      node.classList.add("active");

      switch (e.key) {
        case "F6":
          algorithmStore.scroll = "whiteArmor";
          break;

        case "F7":
          algorithmStore.scroll = "blessedArmor";
          break;

        case "F8":
          algorithmStore.scroll = "cursedArmor";
          break;
        case "F10":
          algorithmStore.scroll = "whiteWeapon";
          break;

        case "F11":
          algorithmStore.scroll = "blessedWeapon";
          break;

        case "F12":
          algorithmStore.scroll = "cursedWeapon";
          break;

        default:
          algorithmStore.scroll = null;
          break;
      }
    });
  });
});
</script>

<style lang="scss" scoped>
@use '../scss/custom.scss';
.infoTemplate {
  color: v-bind(clickToActive());
  &:nth-of-type(0) {
    position: relative;
  }
  &::after {
    content: attr(data-content);
    position: absolute;
    bottom: 105%;
    left: -3.5%;
    width: 99%;
    font-size: 2vw;
    @extend %infoTemplateStyle;
  }
}
.F5,
.F9 {
  opacity: 0;
}
.F5::after,
.F9::after {
  height: 235%;
  font-size: 1rem;
  line-height: 100%;
}
.active {
  opacity: 1;
  background-image: url("/src/assets/slot_empty.png");
  @extend %activeStyle;
}
</style>
