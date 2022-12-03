import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useScrollStore } from "./scroll";
import { useChatStore } from "./chat";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const dice = ref(null);
  const diceState = ref(null);
  const diceBonus = ref(0);
  const diceSuccess = ref(null);

  const targetName = ref(null);
  const targetValue = ref(null);
  const targetCategory = ref(null);
  const targetSafetyValue = ref(null);
  const targetEquipType = computed(() => {
    if (targetCategory.value === null) return;
    return targetCategory.value.substring(0, 6);
  });

  const chatStore = useChatStore();
  const scrollStore = useScrollStore();

  const typeEquip = (text) =>
    targetCategory.value.toLowerCase().includes(text.toLowerCase());
  const diceChatStateOneTo = (num) =>
    (diceState.value = Number(Math.floor(Math.random() * num) + 1));

  const isDiceSuccess = () => {
    // HANDLE SUCESS RATE ONLY, DOSEN NOT CARE WHAT SCROLLS ARE.
    // setting range (0.00% ~ 100.00%) because I use toFixed() rounding.
    (function diceRoll() {
      dice.value = Number((Math.random() * 100).toFixed(2));
    })();

    (function diceSuccessRate() {
      const isPlusScrollUnderZero =
        (targetValue.value < 0 && scrollStore.isScrollType("blessed")) ||
        (targetValue.value < 0 && scrollStore.isScrollType("white"));
      const isMinusScrollOverSafety =
        targetSafetyValue.value <= targetValue.value &&
        scrollStore.isScrollType("cursed");
      const isUnderSafety =
        Math.abs(targetValue.value) < targetSafetyValue.value;
      const diceSuccessArmor = (diceSuccess.value = Number(
        ((1 / Math.abs(targetValue.value)) * 100 + diceBonus.value).toFixed(2)
      ));
      const isUnder = (num) => Math.abs(targetValue.value) < num;

      //special case! so need to return first.
      if (isMinusScrollOverSafety) return (diceSuccess.value = 100);
      else if (isPlusScrollUnderZero) return (diceSuccess.value = 100);

      if (typeEquip("weapon") && scrollStore.isScrollType("weapon")) {
        if (isUnderSafety) diceSuccess.value = 100;
        else if (isUnder(9)) diceSuccess.value = 33.33 + diceBonus.value;
        else diceSuccess.value = 10 + diceBonus.value;
      } else if (typeEquip("armor") && scrollStore.isScrollType("armor")) {
        if (isUnderSafety) diceSuccess.value = 100;
        else if (isUnder(9)) diceSuccessArmor;
        else diceSuccess.value = 10 + diceBonus.value;
      }
    })();
    return dice.value <= diceSuccess.value;
  };

  const algorithm = () => {
    if (targetCategory.value === null) return;
    if (scrollStore.targetScroll === null) return;

    if (!scrollStore.isScrollType(targetEquipType.value)) return;
    if (isDiceSuccess()) {
      if (scrollStore.isScrollType("blessed")) {
        if (targetValue.value < 3) {
          diceChatStateOneTo(3);
          chatStore.chatStateUpdate();
          targetValue.value += diceState.value;
        } else if (targetValue.value < 6) {
          diceChatStateOneTo(2);
          chatStore.chatStateUpdate();
          targetValue.value += diceState.value;
        } else if (targetValue.value < 9) {
          diceChatStateOneTo(1);
          chatStore.chatStateUpdate();
          targetValue.value++;
        } else {
          diceChatStateOneTo(3);
          if (diceState.value === 1) {
            diceState.value = -1;
            chatStore.chatStateUpdate();
          } else {
            diceState.value = 1;
            chatStore.chatStateUpdate();
            targetValue.value++;
          }
        }
      } else {
        // white & cursed scroll
        if (Math.abs(targetValue.value) < 9) {
          diceChatStateOneTo(1);
          if (scrollStore.isScrollType("white")) {
            chatStore.chatStateUpdate();
            targetValue.value++;
          } else {
            chatStore.chatStateUpdate();
            targetValue.value--;
          }
        } else {
          if (scrollStore.isScrollType("white")) {
            diceChatStateOneTo(3);
            if (diceState.value === 1) {
              chatStore.chatStateUpdate();
              targetValue.value++;
            } else {
              diceState.value = -1;
              chatStore.chatStateUpdate();
            }
          } else {
            // cursed scroll
            diceChatStateOneTo(2);
            if (diceState.value === 1) {
              chatStore.chatStateUpdate();
              targetValue.value--;
            } else {
              diceState.value = -1;
              chatStore.chatStateUpdate();
            }
          }
        }
      }
    } else {
      diceState.value = 0;
      chatStore.chatStateUpdate();
      targetValue.value = 0;
    }

    diceState.value = null;
    scrollStore.targetScroll = null;
  };

  return {
    dice,
    diceState,
    diceSuccess,

    targetName,
    targetValue,
    targetCategory,
    targetSafetyValue,

    typeEquip,
    algorithm,
  };
});
