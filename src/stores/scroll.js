import { ref } from "vue";
import { defineStore } from "pinia";

export const useScrollStore = defineStore("scroll", () => {
  const targetScroll = ref(null); //null: pointer icon ; else: target icon

  const changeScroll = (targetEventKey) => {
    switch (targetEventKey) {
      case "F6":
        targetScroll.value = "whiteArmor";
        break;

      case "F7":
        targetScroll.value = "blessedArmor";
        break;

      case "F8":
        targetScroll.value = "cursedArmor";
        break;
      case "F10":
        targetScroll.value = "whiteWeapon";
        break;

      case "F11":
        targetScroll.value = "blessedWeapon";
        break;

      case "F12":
        targetScroll.value = "cursedWeapon";
        break;

      default:
        targetScroll.value = null;
        break;
    }
  };
  const isScrollType = (text) =>
    targetScroll.value.toLowerCase().includes(text.toLowerCase());

  return {
    isScrollType,
    changeScroll,
    targetScroll,
  };
});
