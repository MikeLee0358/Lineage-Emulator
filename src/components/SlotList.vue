<template>
  <div ref="dom" class="container" @click="defaultActive">
    <img
      v-for="slot in slotList"
      :key="slot.id"
      :src="slot.src"
      @click="mouseToggleActive"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
// 抓取<div class="container">節點，加工成nodeList，就會涵蓋slot 1 ~ 8的節點陣列，之後資料都是用這個來操作
const dom = ref();
onMounted(() => {
  const nodeList = Array.from(dom.value.children);
  nodeList[0].classList.add("empty-default");
  nodeList[4].classList.add("empty-default");
  document.addEventListener("keypress", keyboardToggleActive);
});

function keyboardToggleActive(e) {
  const nodeList = Array.from(dom.value.children);

  nodeList.forEach((node) => {
    node.classList.remove("active");
  });

  switch (e.key) {
    // 按鍵1，白武 +1
    case "1":
      console.log("空格");
      nodeList[0].classList.add("active");
      break;
    // 按鍵2，祝武 +1 ~ +3
    case "2":
      console.log("白武，參數+1");
      nodeList[1].classList.add("active");
      break;
    // 按鍵3，紅武 -1
    case "3":
      console.log("祝武，參數+1 - 3");
      nodeList[2].classList.add("active");
      break;
    // 按鍵4，空格
    case "4":
      console.log("紅武，參數-1");

      nodeList[3].classList.add("active");
      break;
    // 按鍵5，白防 ＋1
    case "5":
      console.log("空格");
      nodeList[4].classList.add("active");
      break;
    // 按鍵6，祝防 +1 ~ +3
    case "6":
      console.log("白防，參數+1");
      nodeList[5].classList.add("active");
      break;
    // 按鍵7，紅防 -1
    case "7":
      console.log("祝防，參數+1 - 3");
      nodeList[6].classList.add("active");
      break;
    // 按鍵8，空格
    case "8":
      console.log("紅防，參數-1");
      nodeList[7].classList.add("active");
      break;
    // 其他，不回應
    default:
      console.log("其他按鍵");
      break;
  }
}
function mouseToggleActive(e) {
  const nodeList = Array.from(dom.value.children);
  const target = e.target;

  nodeList.forEach((node) => {
    node.classList.remove("active");
    if (node.classList === target.classList) {
      target.classList.add("active");
      switch (target.src.slice(40)) {
        // 白武 +1
        case "white-weapon.png":
          console.log("白武，參數+1");
          break;
        // 祝武 +1 ~ +3
        case "blessed-weapon.png":
          console.log("祝武，參數+1 - 3");
          break;
        // 紅武 -1
        case "cursed-weapon.png":
          console.log("紅武，參數-1");
          break;
        // 白防 ＋1
        case "white-armor.png":
          console.log("白防，參數+1");
          break;
        // 祝防 +1 ~ +3
        case "blessed-armor.png":
          console.log("祝防，參數+1 - 3");
          break;
        // 紅防 -1
        case "cursed-armor.png":
          console.log("紅防，參數-1");
          break;
        // 空格
        default:
          console.log("空格");
          break;
      }
    }
  });
}
//圖檔資料，對應數字 1 ~ 8
const slotList = ref([
  {
    id: 0,
    title: "空格",
    src: "/src/assets/scroll_empty-slot.jpg",
  },
  {
    id: 1,
    title: "對武器施法的卷軸",
    src: "/src/assets/scroll_white-weapon.png",
  },
  {
    id: 2,
    title: "祝福的對武器施法的卷軸",
    src: "/src/assets/scroll_blessed-weapon.png",
  },
  {
    id: 3,
    title: "受詛咒的對武器施法的卷軸",
    src: "/src/assets/scroll_cursed-weapon.png",
  },
  {
    id: 4,
    title: "空格",
    src: "/src/assets/scroll_empty-slot.jpg",
  },
  {
    id: 5,
    title: "對盔甲施法的卷軸",
    src: "/src/assets/scroll_white-armor.png",
  },
  {
    id: 6,
    title: "祝福的對盔甲施法的卷軸",
    src: "/src/assets/scroll_blessed-armor.png",
  },
  {
    id: 7,
    title: "受詛咒的對盔甲施法的卷軸",
    src: "/src/assets/scroll_cursed-armor.png",
  },
]);
</script>

<style scoped>
.container {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(2, auto);
  padding: 2px;
  gap: 4px;
  top: 81.1%;
  left: 79.4%;
}
img {
  width: 34px;
  height: 34px;
}
.empty-default {
  opacity: 0;
}
.active {
  outline: 1.75px solid rgba(245, 217, 198, 0.83);
  box-shadow: 0 0 2px 0px rgb(245, 217, 198, 0.83);
  opacity: 1;
}
</style>
