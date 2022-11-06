<template>
  <ul ref="nodeForArray" class="slotContainer">
    <li
      v-for="slot in slotList"
      :key="slot.id"
      :class="slot.name"
      class="infoTemplate"
      :data-showInfo="getInfoData(slot.name, slot.toDisplay)"
    >
      <img :src="checkSrc(slot.src)" @click="clickToActive" />
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
const nodeForArray = ref();
const slotList = ref([
  {
    id: 0,
    name: "F5",
    src: "/src/assets/slot_empty.png",
    toDisplay: {
      myPurpose: `          Side project由來

   一直找不到天堂衝裝模
   擬器過過乾癮，正好轉
   職的技能可以練習，藉
   此機會磨練自己的技能
   ，也是私心想回憶衝裝
   的天堂，打到人生第一
   張祝防的喜悅，開心沒
   過多久，隔天就被盜帳
   號...  總之
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

onMounted(function keydownToActives() {
  const nodeList = Array.from(nodeForArray.value.children);
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
  const nodeList = Array.from(nodeForArray.value.children);
  nodeList.forEach((node) => {
    node.classList.remove("active");
    const targetClass = e.target.parentElement.classList[0];
    if (node.classList[0] === targetClass) node.classList.add("active");
  });
}
function getInfoData(name, toDisplay) {
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
.slotContainer[data-v-0e48e3e6] {
  position: absolute;
  top: 80.2%;
  left: 78.3%;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(2, auto);
  gap: 3px;
}

/* 統一排版位置：
第0個定位為relative，absolute做定位。*/
.infoTemplate {
  z-index: 1;
  width: 40px;
}
.infoTemplate:nth-of-type(0) {
  position: relative;
}
.F5,
.F9 {
  /* 圖片顯示開關 */
  opacity: 0;
}
.infoTemplate::after {
  content: attr(data-showInfo);
  position: absolute;
  top: -75%;
  left: -3%;
  /* template顯示開關 */
  opacity: 0;
  transition: opacity 0.1s ease-in 0.35s;
}

.infoTemplate:hover::after {
  opacity: 1;
}

.F5::after,
.F9::after {
  top: -250%;
  height: 190px;
  line-height: 15px;
  font-size: 13px;
  line-height: 13.5px;
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
  opacity: 1;
  background-image: url("../assets/slot_empty.png");
  outline: 1.75px solid rgba(245, 217, 198, 0.83);

  box-shadow: 0 0 2px 0px rgb(245, 217, 198, 0.83);
}
</style>
