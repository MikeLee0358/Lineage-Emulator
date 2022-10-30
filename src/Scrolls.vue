<script setup>
import { ref } from "vue";

// 在vue中要使用原生ＪＳ的event target功能，故參數要寫入event
function toggleActive(event) {
  const target = event.target;
  const slots = target.parentElement.querySelectorAll("img");

  slots.forEach((slot) => {
    // 為了切換樣式功能，先把全部node的active移除
    slot.classList.remove("active");
    if (slot.classList === target.classList) {
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
        // 空格 沒有任何事
        default:
          console.log("空格，沒有事情");
          break;
      }
    }
  });
}

const scrolls = ref([
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
    title: "對盔甲施法的卷軸",
    url: "/src/assets/scroll_white-armor.png",
  },
  {
    id: 4,
    title: "祝福的對盔甲施法的卷軸",
    url: "/src/assets/scroll_blessed-armor.png",
  },
  {
    id: 5,
    title: "受詛咒的對盔甲施法的卷軸",
    url: "/src/assets/scroll_cursed-armor.png",
  },
]);
</script>

<template>
  <div class="container" @click="defaultActive">
    <img
      v-for="scroll in scrolls"
      :key="scroll.id"
      :src="scroll.url"
      @click="toggleActive"
    />
    <img src="./assets/scroll_empty-slot.jpg" @click="toggleActive" class="f8" />
    <img src="./assets/scroll_empty-slot.jpg" @click="toggleActive" class="f12" />
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
.f8 {
  grid-column: 4/5;
  grid-row: 1/2;
  opacity: 0;
}
.f12 {
  grid-column: 4/5;
  grid-row: 2/3;
  opacity: 0;
}
.active[data-v-613df293] {
  outline: 1.75px solid rgba(245, 217, 198, 0.83);
  box-shadow: 0 0 2px 0px rgb(245, 217, 198, 0.83);
  opacity: 1;
}
</style>
