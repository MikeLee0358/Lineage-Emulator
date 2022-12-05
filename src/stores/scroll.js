import { reactive } from "vue";
import { defineStore } from "pinia";

export const useScrollStore = defineStore("scroll", () => {
  const scroll = reactive({
    targetScroll: null, //null: pointer icon ; else: target icon
    changeScroll: (targetEventKey) => {
      switch (targetEventKey) {
        case "F6":
          scroll.targetScroll = "whiteArmor";
          break;

        case "F7":
          scroll.targetScroll = "blessedArmor";
          break;

        case "F8":
          scroll.targetScroll = "cursedArmor";
          break;
        case "F10":
          scroll.targetScroll = "whiteWeapon";
          break;

        case "F11":
          scroll.targetScroll = "blessedWeapon";
          break;

        case "F12":
          scroll.targetScroll = "cursedWeapon";
          break;

        default:
          scroll.targetScroll = null;
          break;
      }
    },
    isScrollType: (text) => {
      if (scroll.targetScroll === null) return;
      if (typeof text !== "string") return;

      return scroll.targetScroll
        .toLowerCase()
        .includes(text.toLowerCase().trim());
    },
  });

  return {
    scroll,
  };
});
