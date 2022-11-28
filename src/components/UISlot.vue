<template>
  <ul ref="nodeForArray">
    <li
      v-for="slot in slotList"
      :key="slot.id"
      :class="slot.name"
      class="templateInfo"
      :data-Content="getSlotInfo(slot.name, slot.toDisplay)"
      @click.stop="clickToActive(slot.name)"
    >
      <img :src="slot.src" />
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useScrollStore } from "../stores/scroll";
const slotList = ref([
  {
    id: 0,
    name: "F5",
    src: "/src/assets/image_slot/slot_empty.png",
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
    src: "/src/assets/image_slot/slot_white-armor.png",
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
    src: "/src/assets/image_slot/slot_blessed-armor.png",
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
    src: "/src/assets/image_slot/slot_cursed-armor.png",
    toDisplay: {
      item: "對盔甲施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
  {
    id: 4,
    name: "F9",
    src: "/src/assets/image_slot/slot_empty.png",
    toDisplay: {
      msgToAll: `                 還沒想法
      1.機率公告
      2.內容概要？`,
    },
  },
  {
    id: 5,
    name: "F10",
    src: "/src/assets/image_slot/slot_white-weapon.png",
    toDisplay: {
      item: "對武器施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
  {
    id: 6,
    name: "F11",
    src: "/src/assets/image_slot/slot_blessed-weapon.png",
    toDisplay: {
      item: "對武器施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
  {
    id: 7,
    name: "F12",
    src: "/src/assets/image_slot/slot_cursed-weapon.png",
    toDisplay: {
      item: "對武器施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
]);
const namedBox = ref("");
const nodeForArray = ref();
const scrollStore = useScrollStore();

const clickToActive = (name) => {
  let colorCss = ref("");

  const classAdd = () => {
    const nodeList = Array.from(nodeForArray.value.children);

    nodeList.forEach((node) => {
      node.classList.remove("active");
      node.classList.remove("templateInfo");

      if (node.matches(`.${name}`)) {
        node.classList.add("active");
        node.classList.add("templateInfo");
      }
    });
  };

  const getColorCss = () => {
    // I try to all logic in JS, so requiring reactive variable(namedBox) & v-bind(function ()).
    const color = {
      grey: "var(--color-grey)",
      white: "var(--color-white)",
      yellow: "var(--color-yellow)",
      red: "var(--color-red)",
    };
    const slotBlessed = ["F7", "F11"];
    const slotCursed = ["F8", "F12"];

    name === undefined ? undefined : (namedBox.value = name);

    if (slotBlessed.includes(namedBox.value)) colorCss = color.yellow;
    else if (slotCursed.includes(namedBox.value)) colorCss = color.red;
    else colorCss = color.white;
  };

  classAdd();
  getColorCss();

  return colorCss;
};
const getSlotInfo = (name, toDisplay) => {
  if (name === "F5") return toDisplay.myPurpose;
  else if (name === "F9") return toDisplay.msgToAll;
  else {
    return `${toDisplay.item}
材質:${toDisplay.material}
 重量 ${toDisplay.weight}`;
  }
};
onMounted(() => {
  const whenKeyDown = () => {
    const nodeList = Array.from(nodeForArray.value.children);

    document.addEventListener("keydown", (e) => {
      e.preventDefault(); 
      e.stopPropagation();

      nodeList.forEach((node) => {
        node.classList.remove("active");
        node.classList.remove("templateInfo");

        if (!node.matches(`.${e.key}`)) return;
        node.classList.add("active");
        scrollStore.changeScroll(e.key)

      });
      // algorithmStore.scrollChat;
    });
  };
  whenKeyDown();
});
</script>

<style lang="scss" scoped>
@use '../scss/common.scss';

.templateInfo {
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
    @extend %templateInfoStyle;
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
  background-image: url("/src/assets/image_slot/slot_empty.png");
  @extend %activeStyle;
}
</style>
