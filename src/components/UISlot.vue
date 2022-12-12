<template>
  <ul class="uiSlot" ref="nodeForArray">
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
import { useChatStore } from "../stores/chat";
import { useScrollStore } from "../stores/scroll";
const slotList = ref([
  {
    id: 0,
    name: "F5",
    src: "/src/assets/slot/slot_empty.png",
    toDisplay: {
      myPurpose: `                          Side project由來

          由於一直找不到以前的天堂衝裝
        模擬器過過乾癮，正好剛學的轉職
        技能可以練習，另外歌很好聽，可
        以勾起很多當時的回憶。

          這也是向當初的天堂衝裝模擬器
        作者致敬（騎士）。
        
                                        希望你會喜歡 !`,
    },
  },
  {
    id: 1,
    name: "F6",
    src: "/src/assets/slot/slot_white-armor.png",
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
    src: "/src/assets/slot/slot_blessed-armor.png",
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
    src: "/src/assets/slot/slot_cursed-armor.png",
    toDisplay: {
      item: "對盔甲施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
  {
    id: 4,
    name: "F9",
    src: "/src/assets/slot/slot_empty.png",
    toDisplay: {
      msgToAll: `暫時空白`,
    },
  },
  {
    id: 5,
    name: "F10",
    src: "/src/assets/slot/slot_blessed-weapon.png",
    toDisplay: {
      item: "對武器施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
  {
    id: 6,
    name: "F11",
    src: "/src/assets/slot/slot_blessed-weapon.png",
    toDisplay: {
      item: "對武器施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
  {
    id: 7,
    name: "F12",
    src: "/src/assets/slot/slot_cursed-weapon.png",
    toDisplay: {
      item: "對武器施法的卷軸",
      material: "紙",
      weight: "1",
    },
  },
]);
const namedBox = ref("");
const nodeForArray = ref();
const storeScroll = useScrollStore();
const storeChat = useChatStore();

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

    if (slotBlessed.includes(namedBox.value)) colorCss.value = color.yellow;
    else if (slotCursed.includes(namedBox.value)) colorCss.value = color.red;
    else colorCss.value = color.white;
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

        storeScroll.scroll.changeScroll(e.key);
        storeChat.updateChatScroll();
      });
    });
  };
  whenKeyDown();
});
</script>

<style lang="scss" scoped>
@use "../scss/common.scss";

.uiSlot {
  // padding: 3.5% 9% 5.5% 4.5%;

  grid-area: uiSlot;
  position: relative;
  padding: 1.7vh 2.2vw 2.1vh 1.1vw;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(2, 50%);
  gap: 6% 1.75%;

  img {
    padding-bottom: 1%;
  }

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
    font-size: 1.2vw;
    line-height: 100%;
  }

  .active {
    opacity: 1;
    background-image: url("/src/assets/slot/slot_empty.png");
    background-repeat: round;
    background-size: cover;
    @extend %activeStyle;
  }
}
</style>
