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

  const chatStore = useChatStore();
  const scrollStore = useScrollStore();

  const typeEquip = (text) =>
    targetCategory.value.toLowerCase().includes(text.toLowerCase());

  const isEuipSucess = () => {
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

      if (typeEquip("weapon")) {
        if (isUnderSafety) diceSuccess.value = 100;
        else if (isUnder(9)) diceSuccess.value = 33.33 + diceBonus.value;
        else diceSuccess.value = 10 + diceBonus.value;
      }

      if (typeEquip("armor")) {
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
    if (scrollStore.targetScroll === null) return;

    if (isEuipSucess()) {
      // weapon

      console.log("in scroll System");
      if (scrollStore.isScrollType("blessed")) {
        console.log("in blessed scroll");
        // 0-2: 1 2 3
        if (targetValue.value < 3) {
          diceStateOneTo(3);
          console.log(diceState.value);
          targetValue.value += diceState.value;
        }
        // 3-5: 1 2
        else if (targetValue.value < 6) {
          diceStateOneTo(2);
          targetValue.value += diceState.value;
        }
        // 6-8: 1
        else if (targetValue.value < 9) {
          diceStateOneTo(1);
          targetValue.value++;
        }
        // 9up: 1 X
        else {
          diceStateOneTo(3);
          if (diceState.value === 1) {
            diceState.value = -1;
            // nope
          } else {
            diceState.value = 1;
            targetValue.value++;
          }
        }
        // armor
      } else {
        console.log("in white/curse scroll");
        // white & cursed
        // 0-8: 1
        if (Math.abs(targetValue.value) < 9) {
          diceStateOneTo(1);
          if (scrollStore.isScrollType("white")) {
            targetValue.value++;
          } else {
            targetValue.value--;
          }
        }
        // 9up: 133% X66% cursed 50% 50%
        else {
          if (scrollStore.isScrollType("white")) {
            diceStateOneTo(3);
            if (diceState.value === 1) {
              targetValue.value++;
            } else {
              diceState.value = -1;
              // nope
            }
          } else {
            // cursed scroll
            diceStateOneTo(2);
            if (diceState.value === 1) {
              targetValue.value--;
            } else {
              diceState.value = -1;
              // nope
            }
          }
        }
      }
    } else {
      console.log("boom");
      // boom
      diceState.value = 0;
      // msg
      targetValue.value = 0;
    }

    diceState.value = null;
    scrollStore.targetScroll = null;
  };

  return {
    dice,
    diceSuccess,
    diceState,
    typeEquip,
    algorithm,
    targetName,
    targetValue,
    targetCategory,
    targetSafetyValue,
  };
});
