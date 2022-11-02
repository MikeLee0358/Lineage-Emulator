<template>
  <div ref="dom" class="container" @click="defaultActive">
    <img
      v-for="slot in slotList"
      :key="slot.id"
      :class="slot.slotName"
      :src="slot.src"
      @click="mouseToggleActive"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const dom = ref();
const slotList = ref([
  {
    id: 0,
    slotName: "F5",
    name: "空格圖案",
    src: "/src/assets/Slot_empty.png",
  },

  {
    id: 1,
    slotName: "F6",
    name: "對盔甲施法的卷軸",
    src: "/src/assets/slot_white-armor.png",
  },
  {
    id: 2,
    slotName: "F7",
    name: "祝福的對盔甲施法的卷軸",
    src: "/src/assets/slot_blessed-armor.png",
  },
  {
    id: 3,
    slotName: "F8",
    name: "受詛咒的對盔甲施法的卷軸",
    src: "/src/assets/slot_cursed-armor.png",
  },
  {
    id: 4,
    slotName: "F9",
    name: "空格圖案",
    src: "/src/assets/slot_empty.png",
  },
  {
    id: 5,
    slotName: "F10",
    name: "對武器施法的卷軸",
    src: "/src/assets/slot_white-weapon.png",
  },
  {
    id: 6,
    slotName: "F11",
    name: "祝福的對武器施法的卷軸",
    src: "/src/assets/slot_blessed-weapon.png",
  },
  {
    id: 7,
    slotName: "F12",
    name: "受詛咒的對武器施法的卷軸",
    src: "/src/assets/slot_cursed-weapon.png",
  },
]);
onMounted(() => {
  const nodeList = Array.from(dom.value.children);
  const whiteSlot = ["F6", "F10"];
  const blessedSlot = ["F7", "F11"];
  const cursedSlot = ["F8", "F12"];

  document.addEventListener("keydown", keydownToActive);
  function keydownToActive(e) {
    // e.preventDefault(); // 關閉瀏覽器的預設，Ｆ5的重新整理、Ｆ11的全螢幕等。
    nodeList.forEach((node) => {
      node.classList.remove("active");

      if (node.className !== e.key) return;
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
  padding: 2px;
  gap: 4px;
  top: 81.1%;
  left: 79.4%;
}
.F5,
.F9 {
  opacity: 0;
}
.active {
  outline: 1.75px solid rgba(245, 217, 198, 0.83);
  box-shadow: 0 0 2px 0px rgb(245, 217, 198, 0.83);
  opacity: 1;
}
</style>
