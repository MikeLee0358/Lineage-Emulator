import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { useScrollStore } from "./scroll";
import { useChatStore } from "./chat";
import { useRoleStore } from "./role";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const storeRole = useRoleStore();

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
    delayTime: 3000,
    safetyValue: null,
    isEquipMatchScroll: computed(() => {
      return storeScroll.isScrollType(target.category.substring(0, 6));
    }),
    goneEffect: (equip, event) => {
      let boxAC = equip.armor;
      let boxMR = equip.mr;

      event.target.classList.toggle("hidden");
      equip.armor = 0;
      // this sentence is for UX, to make display MR value not shaking
      boxMR === undefined ? boxMR : (equip.mr = 0);

      setTimeout(() => {
        event.target.classList.toggle("hidden");
        equip.armor = boxAC;
        equip.mr = boxMR;
        storeRole.isEquipedAttrArmor();
      }, target.delayTime);
    },
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
          (target.value < 0 && storeScroll.isScrollType("blessed")) ||
          (target.value < 0 && storeScroll.isScrollType("white"))
        );
      });
      const isMinusScrollOverSafety = computed(() => {
        return (
          target.safetyValue <= target.value &&
          storeScroll.isScrollType("cursed")
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

  function algorithmSystem(equip, event) {
    if (!target.isEquipMatchScroll) return;

    const updataChatAndValue = (value) => {
      if (!isInSuccessRate.value) {
        dice.state = 0;
        storeChat.updateChatState();
        target.value = 0;
        target.goneEffect(equip, event);
        storeRole.isEquipedAttrArmor(false);

        return;
      }

      dice.rollStateOneTo(value);
      storeChat.updateChatState();
      if (storeScroll.isScrollType("cursed")) target.value--;
      else target.value += dice.state;

      dice.state = null;
      storeScroll.scroll.targetScroll = null;
    };

    const updateOver9 = (value) => {
      let update = 0;
      dice.rollStateOneTo(value);
      const updateChatState = () => {
        dice.state = update === 0 ? -1 : 1;
        storeChat.updateChatState();
      };
      if (dice.state === 1) {
        if (storeScroll.isScrollType("white")) update = 1;
      } else {
        if (storeScroll.isScrollType("cursed")) update = -1;
        if (storeScroll.isScrollType("blessed")) update = 1;
      }

      updateChatState();
      target.value += update;
      dice.state = null;
      storeScroll.scroll.targetScroll = null;
    };

    const getTargetScrollType = () => {
      const targetReg = /(blessed)|(white)|(cursed)/g;
      return targetReg.exec(storeScroll.scroll.targetScroll)[0];
    };

    if (isInSuccessRate.value) {
      // I choose switch not if else because...
      //   1. too much if else.
      //   2. this is my app core.
      switch (getTargetScrollType()) {
        case "blessed":
          if (target.value < 3) return updataChatAndValue(3);
          else if (target.value < 6) return updataChatAndValue(2);
          else if (target.value < 9) return updataChatAndValue(1);
          else updateOver9(3);
          break;

        case "white":
          if (target.value >= 9) return updateOver9(3);
          updataChatAndValue(1);
          break;

        case "cursed":
          if (target.value <= -9) return updateOver9(2);
          updataChatAndValue(1);
          break;
      }
      return;
    }
    updataChatAndValue(0);
  }

  return {
    dice,
    target,
    algorithmSystem,
  };
});
