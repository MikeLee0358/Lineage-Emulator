import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useScrollStore } from "./scroll";
import { useAlgorithmStore } from "./algorithm";

export const useChatStore = defineStore("chat", () => {
  const chatLines = ref(Array(7));
  const scrollStore = useScrollStore();
  const algorithmStore = useAlgorithmStore();

  const showNumber = computed(() => {
    if (algorithmStore.targetValue === 0)
      return `+${algorithmStore.targetValue}`;
    return algorithmStore.targetValue > 0
      ? `+${algorithmStore.targetValue}`
      : algorithmStore.targetValue;
  });
  const detectColor = computed(() => {
    if (scrollStore.typeScroll("cursed")) return "黑色的";
    else if (algorithmStore.typeEquip("weapon")) return "藍色的";
    else return "銀色的";
  });
  const shiftAndPushArr = (text) => {
    chatLines.value.push(text);
    chatLines.value.shift();
  };
  const chatUpdateOne = () => {
    shiftAndPushArr(
      `${showNumber.value} ${algorithmStore.targetName} 一瞬間發出 ${detectColor.value} 光芒。`
    );
  };
  const chatUpdateMore = () => {
    shiftAndPushArr(
      `${showNumber.value} ${algorithmStore.targetName} 持續發出 ${detectColor.value} 光芒。`
    );
  };
  const chatUpdateGone = () => {
    shiftAndPushArr(
      `${showNumber.value} ${algorithmStore.targetName} 產生激烈的 ${detectColor.value} 光芒，一會兒後就消失了。`
    );
  };
  const chatUpdateNope = () => {
    shiftAndPushArr(
      `${showNumber.value} ${algorithmStore.targetName} 持續發出 產生激烈的 ${detectColor.value} 光芒，但是沒有任何事情發生。`
    );
  };
  const chatUpdateWeapon = () => shiftAndPushArr("請選擇一種武器。");
  const chatUpdateArmor = () => shiftAndPushArr("請選擇一種防具。");

  const chatUpdate = () => {
    if (scrollStore.targetScroll === null) return;
    else if (scrollStore.targetScroll.includes("Weapon")) chatUpdateWeapon();
    else if (scrollStore.targetScroll.includes("Armor")) chatUpdateArmor();

    if (algorithmStore.diceChatState === null) return;
    else if (algorithmStore.diceChatState === -1) chatUpdateNope();
    else if (algorithmStore.diceChatState === 0) chatUpdateGone();
    else if (algorithmStore.diceChatState === 1) chatUpdateOne();
    else chatUpdateMore();
  };

  return {
    chatUpdate,
    chatLines,
  };
});
