<template>
  <ul ref="iNeedThisNode" class="container">
    <li
      v-for="slot in slotList"
      :key="slot.id"
      :class="slot.name"
      class="infoClass"
      :data-showInfo="getInfo(slot.name, slot.toDisplay)"
    >
      <img :src="checkSrc(slot.src)" @click="clickToActive" />
    </li>
  </ul>
  <input type="text" class="test" />
</template>

<script setup>
//想要更換圖片，只要在slotList更改圖片(34x34)，就可自動更換。
import { onMounted, ref } from "vue";
const iNeedThisNode = ref();
const slotList = ref([
  {
    id: 0,
    name: "F5",
    src: "/src/assets/slot_empty.png",
    toDisplay: {
      myPurpose: `       Side project由來

  一直找不到天堂衝裝模
  擬器過過乾癮，正好轉
  職的技能可以練習，藉
  此機會磨練自己的技能
  ，也是真心想回憶衝裝
  的天堂，打到人生第一
  張祝防的喜悅，開心沒
  過多久，隔天裝備全消
  失... 總之
  
                        Enjoy it !`,
    },
  },
  {
    id: 1,
    name: "F6",
    src: "/src/assets/slot_white-armor.png",
    toDisplay: {
      item: "對盔甲施法的卷軸",
      material: "紙",
      weight: "-",
    },
  },
  {
    id: 2,
    name: "F7",
    src: "/src/assets/slot_blessed-armor.png",
    toDisplay: {
      item: "對盔甲施法的卷軸",
      material: "紙",
      weight: "- .",
    },
  },
  {
    id: 3,
    name: "F8",
    src: "/src/assets/slot_cursed-armor.png",
    toDisplay: {
      item: "對盔甲施法的卷軸",
      material: "紙",
      weight: "∞",
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
      weight: "防禦 5+0",
    },
  },
  {
    id: 6,
    name: "F11",
    src: "/src/assets/slot_blessed-weapon.png",
    toDisplay: {
      item: "對武器施法的卷軸",
      material: "紙",
      weight: "∞",
    },
  },
  {
    id: 7,
    name: "F12",
    src: "/src/assets/slot_cursed-weapon.png",
    toDisplay: {
      item: "對武器施法的卷軸",
      material: "紙",
      weight: "82",
    },
  },
]);

onMounted(function keydownToActives() {
  const nodeList = Array.from(iNeedThisNode.value.children);
  const whiteSlot = ["F6", "F10"];
  const blessedSlot = ["F7", "F11"];
  const cursedSlot = ["F8", "F12"];

  document.addEventListener("keydown", (e) => {
    e.preventDefault(); // 關閉瀏覽器的預設，Ｆ5的重新整理、Ｆ11的全螢幕等。

    nodeList.forEach((node) => {
      node.classList.remove("active");
      if (node.classList[0] !== e.key) return;
      else if (whiteSlot.includes(e.key)) node.classList.add("active");
      else if (blessedSlot.includes(e.key)) node.classList.add("active");
      else if (cursedSlot.includes(e.key)) node.classList.add("active");
      else node.classList.add("active");
    });
  });
});
function clickToActive(e) {
  const nodeList = Array.from(iNeedThisNode.value.children);
  nodeList.forEach((node) => {
    node.classList.remove("active");
    const targetClass = e.target.parentElement.classList[0];
    if (node.classList[0] === targetClass) node.classList.add("active");
  });
}
function getInfo(name, toDisplay) {
  // 這排版是故意的，white-space跟空白有關
  const content = `${toDisplay.item}
材質:${toDisplay.material}
 重量 ${toDisplay.weight}`;

  if (name === "F5") return toDisplay.myPurpose;
  else if (name === "F9") return toDisplay.msgToAll;
  else return content;
}
function checkSrc(imgSrc) {
  // How to use:  https://fakeimg.pl
  const fakeImgSrc = "https://fakeimg.pl/34x34/";
  return !imgSrc ? fakeImgSrc : imgSrc;
}
</script>

<style scoped>
.container {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(2, auto);

  gap: 4px;
  top: 81.55%;
  left: 79.55%;
}
/* 統一排版位置：
第0個開始做relative讓之後從第1~8個的.infoClass::after可以把(0)的relative做定位。*/
.infoClass:nth-of-type(0) {
  position: relative;
}

.infoClass::after {
  content: attr(data-showInfo);
  position: absolute;
  top: -90%;
  left: -4%;
  /* 針對content的換行css語法 */
  white-space: pre-wrap;

  /* 裝備提示框樣式 */
  display: none;
  width: 150px;
  height: 40px;
  padding: 6px 0px 0px 3px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid;
  border-color: var(--color-white) var(--color-grey) var(--color-grey) var(--color-white);
  font-family: serif, "Noto Serif TC";
  font-weight: 400;
  font-size: 12.5px;
  line-height: 12.75px;
  color: var(--color-white);
}

.infoClass:hover::after {
  display: block;
}

.F5,
.F9 {
  opacity: 0;
}

.F5::after {
  content: “”;
  height: 200px;
  top: -310%;
  line-height: 14px;
  left: -1%;
}

.F9::after {
  height: 200px;
  top: -310%;
}

.F7::after,
.F11::after {
  color: var(--color-yellow);
}

.F8::after,
.F12::after {
  color: var(--color-red);
}

.active {
  outline: 1.75px solid rgba(245, 217, 198, 0.83);
  box-shadow: 0 0 2px 0px rgb(245, 217, 198, 0.83);
  background-image: url("../assets/slot_empty.png");
  opacity: 1;
}
.test {
  color: var(--color-red, orange);
}
</style>
