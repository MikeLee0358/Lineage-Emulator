import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useScrollStore } from "./scroll";
import { useChatStore } from "./chat";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const chatStore = useChatStore();
  const scrollStore = useScrollStore();

  const dice = reactive({
    bonus: 0,
    value: null,
    state: null,
    success: null,
    rollDice: () => {
      dice.value = Number((Math.random() * 100).toFixed(2));
    },
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
      return scrollStore.isScrollType(target.category.substring(0, 6));
    }),
    isEquipType: (text) => {
      if (typeof text !== "string") return "not a string", text;
      return target.category.toLowerCase().includes(text.toLowerCase());
    },
  });

  const isDiceSuccess = () => {
    // HANDLE SUCESS RATE ONLY, DOSEN NOT CARE WHAT SCROLLS ARE.
    // setting range (0.00% ~ 100.00%) because I use toFixed() rounding.
    dice.rollDice();
    
    (function diceSuccessRate() {
      const isPlusScrollUnderZero =
        (target.value < 0 && scrollStore.isScrollType("blessed")) ||
        (target.value < 0 && scrollStore.isScrollType("white"));
      const isMinusScrollOverSafety =
        target.safetyValue <= target.value &&
        scrollStore.isScrollType("cursed");
      const isUnderSafety = Math.abs(target.value) < target.safetyValue;
      const diceSuccessArmor = (dice.success = Number(
        ((1 / Math.abs(target.value)) * 100 + dice.bonus).toFixed(2)
      ));
      const isUnder = (num) => Math.abs(target.value) < num;

      //special case! so need to return first.
      if (isMinusScrollOverSafety) return (dice.success = 100);
      else if (isPlusScrollUnderZero) return (dice.success = 100);

      if (target.isEquipType("weapon") && scrollStore.isScrollType("weapon")) {
        if (isUnderSafety) dice.success = 100;
        else if (isUnder(9)) dice.success = 33.33 + dice.bonus;
        else dice.success = 10 + dice.bonus;
      } else if (
        target.isEquipType("armor") &&
        scrollStore.isScrollType("armor")
      ) {
        if (isUnderSafety) dice.success = 100;
        else if (isUnder(9)) diceSuccessArmor;
        else dice.success = 10 + dice.bonus;
      }
    })();
    return dice.value <= dice.success;
  };

  const algorithm = () => {
    if (target.category === null) return;
    if (scrollStore.targetScroll === null) return;

    if (!target.isEquipMatchScroll) return;
    if (isDiceSuccess()) {
      if (scrollStore.isScrollType("blessed")) {
        if (target.value < 3) {
          dice.rollStateOneTo(3);
          chatStore.chatStateUpdate();
          target.value += dice.state;
        } else if (target.value < 6) {
          dice.rollStateOneTo(2);
          chatStore.chatStateUpdate();
          target.value += dice.state;
        } else if (target.value < 9) {
          dice.rollStateOneTo(1);
          chatStore.chatStateUpdate();
          target.value++;
        } else {
          dice.rollStateOneTo(3);
          if (dice.state === 1) {
            dice.state = -1;
            chatStore.chatStateUpdate();
          } else {
            dice.state = 1;
            chatStore.chatStateUpdate();
            target.value++;
          }
        }
      } else {
        // white & cursed scroll
        if (Math.abs(target.value) < 9) {
          dice.rollStateOneTo(1);
          if (scrollStore.isScrollType("white")) {
            chatStore.chatStateUpdate();
            target.value++;
          } else {
            chatStore.chatStateUpdate();
            target.value--;
          }
        } else {
          if (scrollStore.isScrollType("white")) {
            dice.rollStateOneTo(3);
            if (dice.state === 1) {
              chatStore.chatStateUpdate();
              target.value++;
            } else {
              dice.state = -1;
              chatStore.chatStateUpdate();
            }
          } else {
            // cursed scroll
            dice.rollStateOneTo(2);
            if (dice.state === 1) {
              chatStore.chatStateUpdate();
              target.value--;
            } else {
              dice.state = -1;
              chatStore.chatStateUpdate();
            }
          }
        }
      }
    } else {
      dice.state = 0;
      chatStore.chatStateUpdate();
      target.value = 0;
    }

    dice.state = null;
    scrollStore.targetScroll = null;
  };

  return {
    dice,
    target,
    algorithm,
  };
});
