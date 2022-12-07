import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { useScrollStore } from "./scroll";
import { useChatStore } from "./chat";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const storeChat = useChatStore();
  const storeScroll = useScrollStore();

  const dice = reactive({
    bonus: 0,
    value: null,
    state: null,
    success: null,
    rollStateOneTo: (num) => {
      dice.state = Number(Math.floor(Math.random() * num) + 1);
    },
  });
  const target = reactive({
    name: null,
    value: null,
    category: null,
    safetyValue: null,
    isEquipMatchScroll: computed(() => {
      return storeScroll.scroll.isScrollType(target.category.substring(0, 6));
    }),
    isCategoryType: (text) => {
      if (target.category === null) return;
      if (typeof text !== "string") return "not a string", text;
      return target.category.toLowerCase().includes(text.toLowerCase());
    },
  });
  const isInSuccessRate = computed(() => {
    // HANDLE SUCESS RATE WITH ARMOR/WEAPON/SCROLLS, BUT DOESN'T CONTROLL VAULE(+1/+2/+3/-1).
    // setting range (0.00% ~ 100.00%) because I use toFixed() rounding.
    (function rollDice() {
      dice.value = Number((Math.random() * 100).toFixed(2));
    })();

    (function diceSuccessRate() {
      const getWeaponSucessRate = () => {
        const isUnderSafety = computed(() => {
          return Math.abs(target.value) < target.safetyValue;
        });
        const isUnderValue = (num) => {
          return Math.abs(target.value) < num;
        };

        if (isUnderSafety.value) dice.success = 100;
        else if (isUnderValue(9)) dice.success = 33.33 + dice.bonus;
        else dice.success = 10 + dice.bonus;
      };
      const getArmorSuccessRate = () => {
        const isUnderSafety = computed(() => {
          return Math.abs(target.value) < target.safetyValue;
        });
        const getUnder9SuccessRate = computed(() => {
          return (dice.success = Number(
            ((1 / Math.abs(target.value)) * 100 + dice.bonus).toFixed(2)
          ));
        });
        const isUnderValue = (num) => {
          return Math.abs(target.value) < num;
        };

        if (isUnderSafety.value) dice.success = 100;
        else if (isUnderValue(9)) getUnder9SuccessRate.value;
        else dice.success = 10 + dice.bonus;
      };
      const isPlusScrollUnderZero = computed(() => {
        return (
          (target.value < 0 && storeScroll.scroll.isScrollType("blessed")) ||
          (target.value < 0 && storeScroll.scroll.isScrollType("white"))
        );
      });
      const isMinusScrollOverSafety = computed(() => {
        return (
          target.safetyValue <= target.value &&
          storeScroll.scroll.isScrollType("cursed")
        );
      });

      // first and second are special cases. In normal situation, when |9| up will get chance 'nothing happend',to prevent that situation have to set 100%.
      if (isMinusScrollOverSafety.value) return (dice.success = 100);
      else if (isPlusScrollUnderZero.value) return (dice.success = 100);
      else if (target.isCategoryType("weapon")) getWeaponSucessRate();
      else if (target.isCategoryType("armor")) getArmorSuccessRate();
    })();
    return dice.value <= dice.success;
  });

  function algorithmSystem() {
    if (!target.isEquipMatchScroll) return;

    if (isInSuccessRate.value) {
      const targetReg = /(blessed)|(white)|(cursed)/g;
      const targetRegStr = targetReg.exec(storeScroll.scroll.targetScroll)[0];

      // I choose switch not if else because...
      //   1. too much if else, my eyes want to take a break.
      //   2. this is a center alogrithm of my app, so if can be faster a liite bit, will be great.
      switch (targetRegStr) {
        case "blessed":
          if (target.value < 3) {
            dice.rollStateOneTo(3);
            storeChat.updateChatState();
            target.value += dice.state;
          } else if (target.value < 6) {
            dice.rollStateOneTo(2);
            storeChat.updateChatState();
            target.value += dice.state;
          } else if (target.value < 9) {
            dice.rollStateOneTo(1);
            storeChat.updateChatState();
            target.value++;
          } else {
            //+9up: 66% +1; 33% nothing happened(state: -1)
            dice.rollStateOneTo(3);
            if (dice.state === 1) {
              dice.state = -1;
              storeChat.updateChatState();
            } else {
              dice.state = 1;
              storeChat.updateChatState();
              target.value++;
            }
          }
          break;

        case "white":
          if (9 <= target.value) {
            //+9up: 33% +1; 66% nothing happened(state: -1)
            dice.rollStateOneTo(3);
            if (dice.state === 1) {
              storeChat.updateChatState();
              target.value++;
            } else {
              dice.state = -1;
              storeChat.updateChatState();
            }
          } else {
            dice.rollStateOneTo(1);
            storeChat.updateChatState();
            target.value++;
          }
          break;

        case "cursed":
          if (target.value <= -9) {
            //-9up: 50% -1; 50% nothing happened(state: -1)
            dice.rollStateOneTo(2);
            if (dice.state === 1) {
              storeChat.updateChatState();
              target.value--;
            } else {
              dice.state = -1;
              storeChat.updateChatState();
            }
          } else {
            dice.rollStateOneTo(1);
            storeChat.updateChatState();
            target.value--;
          }
          break;
      }
    } else {
      dice.state = 0;
      storeChat.updateChatState();
      target.value = 0;
    }

    dice.state = null;
    storeScroll.scroll.targetScroll = null;
  }

  return {
    dice,
    target,
    algorithmSystem,
  };
});
