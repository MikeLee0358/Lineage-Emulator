import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useScrollStore } from "./scroll";
import { useAlgorithmStore } from "./algorithm";

export const useChatStore = defineStore("chat", () => {
  const storeScroll = useScrollStore();
  const storeAlgorithm = useAlgorithmStore();

  const chat = reactive({
    lines: Array(7),
    showNumber: computed(() => {
      return storeAlgorithm.target.value < 0
        ? storeAlgorithm.target.value
        : `+${storeAlgorithm.target.value}`;
    }),

    detectColor: computed(() => {
      if (storeScroll.isScrollType("cursed")) return "黑色的";
      else if (storeAlgorithm.target.isCategoryType("weapon")) return "藍色的";
      else return "銀色的";
    }),
    updateArmor: () => {
      chat.pushAndShiftArrary("請選擇一種防具。");
    },
    updateWeapon: () => {
      chat.pushAndShiftArrary("請選擇一種武器。");
    },
    updateForOne: () => {
      chat.pushAndShiftArrary(
        `${chat.showNumber} ${storeAlgorithm.target.name} 一瞬間發出 ${chat.detectColor} 光芒。`
      );
    },
    updateForGone: () => {
      chat.pushAndShiftArrary(
        `${chat.showNumber} ${storeAlgorithm.target.name} 產生激烈的 ${chat.detectColor} 光芒，一會兒後就消失了。`
      );
    },
    updateForNope: () => {
      chat.pushAndShiftArrary(
        `${chat.showNumber} ${storeAlgorithm.target.name} 持續發出 激烈的 ${chat.detectColor}光芒，但是沒有任何事情發生。`
      );
    },
    updateForTwoUp: () => {
      chat.pushAndShiftArrary(
        `${chat.showNumber} ${storeAlgorithm.target.name} 持續發出 ${chat.detectColor} 光芒。`
      );
    },
    pushAndShiftArrary: (text) => {
      if (typeof text !== "string") return;

      chat.lines.push(text);
      chat.lines.shift();
    },
  });

  function cleanChatLines() {
    chat.lines = Array(7);
  }
  function updateChatScroll() {
    if (storeScroll.scroll.targetScroll === null) return;
    if (storeScroll.scroll.targetScroll.includes("Armor")) chat.updateArmor();
    if (storeScroll.scroll.targetScroll.includes("Weapon")) chat.updateWeapon();
  }
  function updateChatState() {
    if (storeAlgorithm.dice.state === -1) chat.updateForNope();
    else if (storeAlgorithm.dice.state === 0) chat.updateForGone();
    else if (storeAlgorithm.dice.state === 1) chat.updateForOne();
    else chat.updateForTwoUp();
  }

  return {
    chat,
    cleanChatLines,
    updateChatState,
    updateChatScroll,
  };
});
