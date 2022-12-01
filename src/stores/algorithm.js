import { defineStore } from "pinia";
import { ref } from "vue";
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

  const chatStore = useChatStore();
  const scrollStore = useScrollStore();

  const typeEquip = (text) =>
    targetCategory.value.toLowerCase().includes(text.toLowerCase());

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

  const diceStateOneTo = (num) =>
    (diceState.value = Number(Math.floor(Math.random() * num) + 1));

  const algorithm = () => {
    if (targetCategory.value === null) return;
    if (scrollStore.targetScroll === null) return;
    const equipReg = /(armor|weapon)/g;
    const equipStr = equipReg.exec(targetCategory.value)[0];
    const isScrollMatchEquip = scrollStore.isScrollType(equipStr);
    if (!isScrollMatchEquip) return;

    if (isDiceSuccess()) {
      if (scrollStore.isScrollType("blessed")) {
        if (targetValue.value < 3) {
          diceStateOneTo(3);
          chatStore.chatUpdateState();
          targetValue.value += diceState.value;
        } else if (targetValue.value < 6) {
          diceStateOneTo(2);
          chatStore.chatUpdateState();
          targetValue.value += diceState.value;
        } else if (targetValue.value < 9) {
          diceStateOneTo(1);
          chatStore.chatUpdateState();
          targetValue.value++;
        } else {
          diceStateOneTo(3);
          if (diceState.value === 1) {
            diceState.value = -1;
            chatStore.chatUpdateState();
          } else {
            diceState.value = 1;
            chatStore.chatUpdateState();
            targetValue.value++;
          }
        }
      } else {
        // white & cursed scroll
        if (Math.abs(targetValue.value) < 9) {
          diceStateOneTo(1);
          if (scrollStore.isScrollType("white")) {
            chatStore.chatUpdateState();
            targetValue.value++;
          } else {
            chatStore.chatUpdateState();
            targetValue.value--;
          }
        } else {
          if (scrollStore.isScrollType("white")) {
            diceStateOneTo(3);
            if (diceState.value === 1) {
              chatStore.chatUpdateState();
              targetValue.value++;
            } else {
              diceState.value = -1;
              chatStore.chatUpdateState();
            }
          } else {
            // cursed scroll
            diceStateOneTo(2);
            if (diceState.value === 1) {
              chatStore.chatUpdateState();
              targetValue.value--;
            } else {
              diceState.value = -1;
              chatStore.chatUpdateState();
            }
          }
        }
      }
    } else {
      diceState.value = 0;
      chatStore.chatUpdateState();
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
