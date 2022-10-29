<script setup>
import { ref } from "vue";

// 在vue中要使用原生ＪＳ的event target功能，故參數要寫入event
function toggleActive(event) {
  const target = event.target;
  const slots = target.parentElement.querySelectorAll("img");
  // 為了切換樣式功能，先把全部node的active移除，在使目標active。
  slots.forEach((slot) => {
    slot.classList.remove("active");
    if (slot.classList === target.classList) {
      target.classList.add("active");
      console.log(`點選了卷軸 or 空格`);
    }
  });
}
const scrolls = ref([
  {
    id: 0,
    title: "對武器施法的卷軸",
    url: "/src/assets/scroll_weapon.png",
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
    url: "/src/assets/scroll_armor.png",
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
    <img src="" @click="toggleActive" class="f8" />
    <img src="" @click="toggleActive" class="f12" />
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
  top: 81%;
  left: 79.4%;
  /* outline: 1px solid red; */
}

img {
  width: 34px;
  height: 34px;
}
img[src=""],
img:not([src]) {
  opacity: 0;
}
.f8 {
  grid-column: 4/5;
  grid-row: 1/2;
}
.f12 {
  grid-column: 4/5;
  grid-row: 2/3;
}
.active {
  outline: 1px solid #ffe0cb;
}
</style>
