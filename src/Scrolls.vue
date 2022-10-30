<script setup>
import { onMounted, ref } from "vue";
// 抓取div的節點，主要是empty-slot加上樣式。
const dom = ref();
onMounted(() => {
  // 為了一開始就跑空白預設樣式，所以在mounted時，新增class
  dom.value.children[3].classList.add("empty-default");
  dom.value.children[7].classList.add("empty-default");
  window.addEventListener("keypress", keyboardToggleActive);
});

//圖檔位置，對應數字 1 ~ 8
const slots = ref([
  {
    id: 0,
    title: "對武器施法的卷軸",
    url: "/src/assets/scroll_white-weapon.png",
  },
  {
    id: 1,
    title: "祝福的對武器施法的卷軸",
    url: "/src/assets/scroll_blessed-weapon.png",
  },
  {
    id: 2,
    title: "受詛咒的對武器施法的卷軸",
    url: "/src/assets/scroll_cursed-weapon.png",
  },
  {
    id: 3,
    title: "空格",
    url: "/src/assets/scroll_empty-slot.jpg",
  },
  {
    id: 4,
    title: "對盔甲施法的卷軸",
    url: "/src/assets/scroll_white-armor.png",
  },
  {
    id: 5,
    title: "祝福的對盔甲施法的卷軸",
    url: "/src/assets/scroll_blessed-armor.png",
  },
  {
    id: 6,
    title: "受詛咒的對盔甲施法的卷軸",
    url: "/src/assets/scroll_cursed-armor.png",
  },
  {
    id: 7,
    title: "空格",
    url: "/src/assets/scroll_empty-slot.jpg",
  },
]);
// 鍵盤觸發event事件，window為全畫面媒介，切換1 ~ 8。
function keyboardToggleActive(e) {
  // 把dom節點轉成Array好處理個別資料
  const slotListKeyboard = Array.from(
    e.target.children[0].children[0].children[2].children
  );
  slotListKeyboard.forEach((slotKeyboard) => {
    slotKeyboard.classList.remove("active");
  });
  switch (e.key) {
    // 按鍵1，白武 +1
    case "1":
      console.log("白武，參數+1");
      slotListKeyboard[0].classList.add("active");
      break;
    // 按鍵2，祝武 +1 ~ +3
    case "2":
      console.log("祝武，參數+1 - 3");
      slotListKeyboard[1].classList.add("active");
      break;
    // 按鍵3，紅武 -1
    case "3":
      console.log("紅武，參數-1");
      slotListKeyboard[2].classList.add("active");
      break;
    // 按鍵4，空格
    case "4":
      console.log("空格");
      slotListKeyboard[3].classList.add("active");
      break;
    // 按鍵5，白防 ＋1
    case "5":
      console.log("白防，參數+1");
      slotListKeyboard[4].classList.add("active");
      break;
    // 按鍵6，祝防 +1 ~ +3
    case "6":
      console.log("祝防，參數+1 - 3");
      slotListKeyboard[5].classList.add("active");
      break;
    // 按鍵7，紅防 -1
    case "7":
      console.log("紅防，參數-1");
      slotListKeyboard[6].classList.add("active");
      break;
    // 按鍵8，空格
    case "8":
      console.log("空格");
      slotListKeyboard[7].classList.add("active");
      break;
    // 其他，不回應
    default:
      console.log("其他按鍵");
      break;
  }
}
// 滑鼠觸發event事件，img tag為媒介，切換1 ~ 8。
function mouseToggleActive(e) {
  const target = e.target;
  const slotListMouse = target.parentElement.querySelectorAll("img");

  slotListMouse.forEach((slotMouse) => {
    // 為了切換樣式功能，把全部的active移除
    slotMouse.classList.remove("active");
    if (slotMouse.classList === target.classList) {
      target.classList.add("active");

      // 透過slice切割網址，針對不同情況給不同係數
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
</script>

<template>
  <div ref="dom" class="container" @click="defaultActive">
    <img
      v-for="slot in slots"
      :key="slot.id"
      :src="slot.url"
      @click="mouseToggleActive"
    />
  </div>
</template>

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
.active[data-v-613df293] {
  outline: 1.75px solid rgba(245, 217, 198, 0.83);
  box-shadow: 0 0 2px 0px rgb(245, 217, 198, 0.83);
  opacity: 1;
}
</style>
