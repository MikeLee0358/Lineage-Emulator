<template>
  <ul ref="nodeContainer" class="container">
    <li
      v-for="slot in slotList"
      :key="slot.id"
      class="infoBox"
      :class="slot.title"
      :data-infoBox="getInfo(slot.toDisplay, slot.title)"
    >
      <img :src="checkSrc(slot.src)" />
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
const nodeContainer = ref();
const slotList = ref([
  {
    id: 0,
    title: "F5",
    src: "/src/assets/Slot_empty.png",
    category: "empty",
    toDisplay: {
      name: "空格圖案",
      material: "紙",
      weight: "-",
    },
  },
  {
    id: 1,
    title: "F6",
    src: "/src/assets/slot_white-armor.png",
    category: "scroll",
    toDisplay: {
      name: "對盔甲施法的卷軸 (∞)",
      material: "紙",
      weight: "-",
    },
  },
  {
    id: 2,
    title: "F7",
    src: "/src/assets/slot_blessed-armor.png",
    category: "scroll",
    toDisplay: {
      name: "對盔甲施法的卷軸 (∞)",
      material: "紙",
      weight: "-",
    },
  },
  {
    id: 3,
    title: "F8",
    src: "/src/assets/slot_cursed-armor.png",
    category: "scroll",
    toDisplay: {
      name: "對盔甲施法的卷軸 (∞)",
      material: "紙",
      weight: "-",
    },
  },
  {
    id: 4,
    title: "F9",
    src: "/src/assets/slot_empty.png",
    category: "scroll",
    toDisplay: {
      name: "空格圖案",
      material: "紙",
      weight: "-",
    },
  },
  {
    id: 5,
    title: "F10",
    src: "/src/assets/slot_white-weapon.png",
    category: "scroll",
    toDisplay: {
      name: "對武器施法的卷軸 (∞)",
      material: "紙",
      weight: "-",
    },
  },
  {
    id: 6,
    title: "F11",
    src: "/src/assets/slot_blessed-weapon.png",
    category: "scroll",
    toDisplay: {
      name: "對武器施法的卷軸 (∞)",
      material: "紙",
      weight: "-",
    },
  },
  {
    id: 7,
    title: "F12",
    src: "/src/assets/slot_cursed-weapon.png",
    category: "scroll",
    toDisplay: {
      name: "對武器施法的卷軸 (∞)",
      material: "紙",
      weight: "-",
    },
  },
]);
const color = {
  // 已鑑定顏色
  white: "#f0f0f0",
  // 未鑑定顏色
  gray: "#717070",
  // 祝福的顏色
  yellow: "#ECF0A3",
  // 受詛咒的顏色
  red: "#FB293B",
};
function getInfo(show, title) {
  // 這排版是故意的，white-space跟空白有關
  const content = `${show.name} 
材質:${show.material}
 重量 ${show.weight}`;

  const myPurpose = `        Side project由來

  一直找不到天堂衝裝模
  擬器過過乾癮，正好轉
  職的技能可以練習，藉
  此機會磨練自己的技能
  ，也是真心想回憶衝裝
  的天堂，打到人生第一
  張祝防的喜悅，開心沒
  多久，隔天就被盜帳號
  了...
                             Enjoy it!`;

  const msgToAll = `還沒想法
  1.機率公告
  2.內容概要？`;

  if (title === "F5") return myPurpose;
  else if (title === "F9") return msgToAll;
  else return content;
}
function checkSrc(imgSrc) {
  // How to use:  https://fakeimg.pl
  const fakeImgSrc = "https://fakeimg.pl/34x34/";
  return !imgSrc ? fakeImgSrc : imgSrc;
}
onMounted(() => {
  const nodeList = Array.from(nodeContainer.value.children);
  const whiteSlot = ["F6", "F10"];
  const blessedSlot = ["F7", "F11"];
  const cursedSlot = ["F8", "F12"];

  document.addEventListener("keydown", keydownToActive);
  function keydownToActive(e) {
    e.preventDefault(); // 關閉瀏覽器的預設，Ｆ5的重新整理、Ｆ11的全螢幕等。
    nodeList.forEach((node) => {
      node.classList.remove("active");
      if (node.classList[1] !== e.key) return;
      else if (whiteSlot.includes(e.key)) node.classList.add("active");
      else if (blessedSlot.includes(e.key)) node.classList.add("active");
      else if (cursedSlot.includes(e.key)) node.classList.add("active");
      else node.classList.add("active");
    });
  }
});
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

.infoBox:nth-of-type(0) {
  position: relative;
}
.infoBox:after {
  content: attr(data-infoBox);
  position: absolute;
  top: -95%;
  left: -3%;
  /* 針對content的換行css語法 */
  white-space: pre-wrap;

  /* 裝備提示框樣式 */
  display: none;
  width: 150px;
  height: 45px;
  padding: 3px 0px 0px 3px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid;
  border-color: v-bind(color.white) v-bind(color.gray) v-bind(color.gray)
    v-bind(color.white);
  color: v-bind(color.white);
  font-family: "Noto Sans SC", "Crimson Text", sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 13.2px;
}
.infoBox:hover::after {
  display: block;
}
.F5,
.F9 {
  opacity: 0;
}
.F5::after {
  content: “123”;
  height: 200px;
  top: -305%;
  line-height: 16px;
}
.F9::after {
  height: 200px;
  top: -305%;
}
.F7::after,
.F11::after {
  color: v-bind(color.yellow);
}
.F8::after,
.F12::after {
  color: v-bind(color.red);
}
.active {
  outline: 1.75px solid rgba(245, 217, 198, 0.83);
  box-shadow: 0 0 2px 0px rgb(245, 217, 198, 0.83);
  opacity: 1;
}
</style>
