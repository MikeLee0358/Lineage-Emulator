import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useScrollStore } from "./scroll";
import { useChatStore } from "./chat";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const dice = ref(null);
  const secDice = ref(null);
  const diceChatState = ref(1); // set 1 to achieve message poping out for most of stuff whitout state.
  const targetName = ref(null);
  const targetValue = ref(null);
  const targetCategory = ref("");
  const targetSafetyValue = ref(null);

  const chatStore = useChatStore();
  const scrollStore = useScrollStore();
  const typeEquip = (text) =>
    targetCategory.value.toLowerCase().includes(text.toLowerCase());

  const algorithm = () => {
    // About equip number searching... I use switch to get more effect.
    // About other... I use if-else get readability more.

    if (scrollStore.targetScroll === "") return;

    const diceChatStateOneTo = (num) =>
      (diceChatState.value = Number(Math.floor(Math.random() * num) + 1));
    const diceRollForAlogrithm = () =>
      (dice.value = Number((Math.random() * 100 + 1).toFixed(2)));
    const successRate = computed(() =>
      Number((1 / Math.abs(targetValue.value)) * 100).toFixed(2)
    );

    const checkTargetSafetyValue = (num) => targetSafetyValue.value === num;

    diceRollForAlogrithm();

    if (
      typeEquip("weapon") &&
      scrollStore.typeScroll("Weapon") &&
      checkTargetSafetyValue(6)
    ) {
      switch (targetValue.value) {
        case -1:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatEquipV2();
            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);

            chatStore.chatEquipV2();
            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatEquipV2();
            targetValue.value++;
          }
          scrollStore.targetScroll = "";
          break;

        case 0:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatEquipV2();
            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatEquipV2();
            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatEquipV2();
            targetValue.value++;
          }
          scrollStore.targetScroll = "";
          break;

        case 6:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatEquipV2();
            targetValue.value--;
          } else if (successRate.value > dice.value) {
            chatStore.chatEquipV2();
            targetValue.value++;
          } else {
            diceChatState.value = 0;
            chatStore.chatEquipV2();
            targetValue.value = 0;
          }

          scrollStore.targetScroll = "";
          break;

        case 9:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatEquipV2();
            targetValue.value--;
          } else if (successRate.value > dice.value) {
            diceChatStateOneTo(3);

            if (diceChatState.value === 1) {
              chatStore.chatEquipV2();
              targetValue.value++;
            } else if (diceChatState.value === 2) {
              diceChatState.value = null;
              chatStore.chatEquipV2();
            } else {
              if (scrollStore.typeScroll("blessed")) {
                diceChatState.value = 1;
                chatStore.chatEquipV2();
                targetValue.value++;
              } else if (scrollStore.typeScroll("white")) {
                diceChatState.value = null;
                chatStore.chatEquipV2();
              }
            }
          } else {
            diceChatState.value = 0;
            chatStore.chatEquipV2();
            targetValue.value = 0;
          }
          scrollStore.targetScroll = "";
          break;
      }

      // switch (targetValue.value) {
      // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
      // white scroll # 100% +1
      // console.log('success', successRate.value)
      // console.log('dice', dice.value)

      // cursed scroll # 33.3% success  66.6% failure
      // case -6:
      //   if (scrollStore.typeScroll("cursed")) {
      //     if (successRate.value > dice.value) {
      //       chatStore.chatEquipV2();
      //       targetValue.value--;
      //     } else {
      //       diceChatState.value = 0;
      //       chatStore.chatEquipV2();
      //       targetValue.value = 0;
      //     }
      //   } else if (scrollStore.typeScroll("blessed")) {
      //     diceChatStateOneTo(3);
      //     chatStore.chatEquipV2();
      //     targetValue.value += diceChatState.value;
      //   } else {
      //     chatStore.chatEquipV2();
      //     targetValue.value++;
      //   }

      //   break;

      // if (scrollStore.typeScroll("cursed")) {
      //   diceChatStateOneTo(3);

      //   switch (dice.value) {
      //     case 1:
      //       targetValue.value--;
      //       break;
      //     default:
      //       targetValue.value = 0;
      //       break;
      //   }
      // } else if (scrollStore.typeScroll("blessed")) {
      //   diceChatStateOneTo(3);

      //   switch (dice.value) {
      //     case 2:
      //       targetValue.value += 2;
      //       break;
      //     case 3:
      //       targetValue.value += 3;
      //       break;
      //     default:
      //       targetValue.value++;
      //       break;
      //   }
      // } else targetValue.value++;

      // break;
      // (infinity loop) 10% success  90% failure and then
      // if cursed scroll # 50% +1 | 50% nothing happened
      // case targetValue.value:
      //   if (scrollStore.typeScroll("cursed")) {
      //     diceChatStateOneTo(10);

      //     switch (dice.value) {
      //       case 1:
      //         diceChatStateOneTo(2);

      //         switch (dice.value) {
      //           case 1:
      //             targetValue.value--;
      //             break;

      //           default:
      //             console.log("沒有任何事情發生");
      //             break;
      //         }
      //         break;

      //       default:
      //         targetValue.value = 0;
      //         break;
      //     }
      //   } else if (scrollStore.typeScroll("blessed")) {
      //     diceChatStateOneTo(3);

      //     switch (dice.value) {
      //       case 2:
      //         targetValue.value += 2;
      //         break;
      //       case 3:
      //         targetValue.value += 3;
      //         break;
      //       default:
      //         targetValue.value++;
      //         break;
      //     }
      //   } else targetValue.value++;

      //   break;
      // }
    }
    // else if (typeEquip('armor') && scrollStore.typeScroll('armor') && checkTargetSafetyValue(6)) {
    // scrollStore.targetScroll = "";
    //   if (targetValue.value >= 0) {
    //     switch (targetValue.value) {
    //       // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
    //       case 0:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)
    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             case 3:
    //               targetValue.value += 3
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('white')) targetValue.value++
    //         else targetValue.value--

    //         scrollStore.targetScroll = null
    //         break;
    //       case 1:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             case 3:
    //               targetValue.value += 3
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('white')) targetValue.value++
    //         else targetValue.value--

    //         scrollStore.targetScroll = null
    //         break;
    //       case 2:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             case 3:
    //               targetValue.value += 3
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('white')) targetValue.value++
    //         else targetValue.value--

    //         scrollStore.targetScroll = null
    //         break;
    //       // blessed scroll # 50% +1 | 50% +2
    //       case 3:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(2)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('white')) targetValue.value++
    //         else targetValue.value--

    //         scrollStore.targetScroll = null
    //         break;
    //       case 4:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(2)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('white')) targetValue.value++
    //         else targetValue.value--

    //         scrollStore.targetScroll = null
    //         break;
    //       case 5:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(2)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('white')) targetValue.value++
    //         else targetValue.value--

    //         scrollStore.targetScroll = null
    //         break;
    //       // white = blessed scroll # 1/n% success  n-1/n% failure
    //       case 6:
    //         if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
    //           diceChatStateOneTo(6)

    //           switch (dice.value) {
    //             case 1:
    //               targetValue.value++
    //               break;
    //             default:
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else targetValue.value--

    //         scrollStore.targetScroll = null
    //         break;
    //       case 7:
    //         if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
    //           diceChatStateOneTo(7)

    //           switch (dice.value) {
    //             case 1:
    //               targetValue.value++
    //               break;
    //             default:
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else targetValue.value--

    //         scrollStore.targetScroll = null
    //         break;
    //       case 8:
    //         if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
    //           diceChatStateOneTo(8)

    //           switch (dice.value) {
    //             case 1:
    //               targetValue.value++
    //               break;
    //             default:
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else targetValue.value--

    //         scrollStore.targetScroll = null
    //         break;
    //       // (infinity loop) 10% success  90% failure and then
    //       // if white scroll # 33.3% +1 | 66.6% nothing happened
    //       // if blessed scroll # 66.6% +1 | 33.3% nothing happened
    //       case targetValue.value:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(10)

    //           switch (dice.value) {
    //             case 1:
    //               diceChatStateOneTo(3)

    //               switch (dice.value) {
    //                 case 1:
    //                   console.log('沒有任何事情發生')
    //                   break;
    //                 default:
    //                   targetValue.value++
    //                   break;
    //               }
    //               break;

    //             default:
    //               targetValue.value = 0
    //               break;
    //           }

    //         }
    //         else if (scrollStore.typeScroll('white')) {
    //           diceChatStateOneTo(10)

    //           switch (dice.value) {
    //             case 1:
    //               diceChatStateOneTo(3)

    //               switch (dice.value) {
    //                 case 1:
    //                   targetValue.value++
    //                   break;
    //                 default:
    //                   console.log('沒有任何事情發生')
    //                   break;
    //               }
    //               break;

    //             default:
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else targetValue.value--

    //         scrollStore.targetScroll = null
    //         break;

    //     }
    //   }
    //   else {
    //     switch (targetValue.value) {
    //       // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
    //       // white scroll # 100% +1
    //       case -1:
    //         if (scrollStore.typeScroll('cursed')) targetValue.value--
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             case 3:
    //               targetValue.value += 3
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         } else targetValue.value++

    //         scrollStore.targetScroll = null
    //         break;
    //       case -2:
    //         if (scrollStore.typeScroll('cursed')) targetValue.value--
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             case 3:
    //               targetValue.value += 3
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         } else targetValue.value++

    //         scrollStore.targetScroll = null
    //         break;
    //       case -3:
    //         if (scrollStore.typeScroll('cursed')) targetValue.value--
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             case 3:
    //               targetValue.value += 3
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         } else targetValue.value++

    //         scrollStore.targetScroll = null
    //         break;
    //       case -4:
    //         if (scrollStore.typeScroll('cursed')) targetValue.value--
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             case 3:
    //               targetValue.value += 3
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         } else targetValue.value++

    //         scrollStore.targetScroll = null
    //         break;
    //       case -5:
    //         if (scrollStore.typeScroll('cursed')) targetValue.value--
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             case 3:
    //               targetValue.value += 3
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         } else targetValue.value++

    //         scrollStore.targetScroll = null
    //         break;
    //       // cursed scroll # 33.3% success  66.6% failure
    //       case -6:
    //         if (scrollStore.typeScroll('cursed')) {
    //           diceChatStateOneTo(6)

    //           switch (dice.value) {
    //             case 1:
    //               targetValue.value--
    //               break;
    //             default:
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             case 3:
    //               targetValue.value += 3
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         } else targetValue.value++

    //         scrollStore.targetScroll = null
    //         break;
    //       case -7:
    //         if (scrollStore.typeScroll('cursed')) {
    //           diceChatStateOneTo(7)

    //           switch (dice.value) {
    //             case 1:
    //               targetValue.value--
    //               break;
    //             default:
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             case 3:
    //               targetValue.value += 3
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         } else targetValue.value++

    //         scrollStore.targetScroll = null
    //         break;
    //       case -8:
    //         if (scrollStore.typeScroll('cursed')) {
    //           diceChatStateOneTo(8)

    //           switch (dice.value) {
    //             case 1:
    //               targetValue.value--
    //               break;
    //             default:
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             case 3:
    //               targetValue.value += 3
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         } else targetValue.value++

    //         scrollStore.targetScroll = null
    //         break;
    //       // (infinity loop) 10% success  90% failure and then
    //       // if cursed scroll # 50% +1 | 50% nothing happened
    //       case targetValue.value:
    //         if (scrollStore.typeScroll('cursed')) {
    //           diceChatStateOneTo(10)

    //           switch (dice.value) {
    //             case 1:
    //               diceChatStateOneTo(2)

    //               switch (dice.value) {
    //                 case 1:
    //                   targetValue.value--
    //                   break;

    //                 default:
    //                   console.log('沒有任何事情發生')
    //                   break;
    //               }
    //               break;

    //             default:
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               targetValue.value += 2
    //               break;
    //             case 3:
    //               targetValue.value += 3
    //               break;
    //             default:
    //               targetValue.value++
    //               break;
    //           }
    //         } else targetValue.value++

    //         scrollStore.targetScroll = null
    //         break;

    //     }
    //   }
    // }
    // else if (typeEquip('armor') && scrollStore.typeScroll('armor') && checkTargetSafetyValue(4)) {
    //   scrollStore.targetScroll = "";
    //   if (targetValue.value >= 0) {

    //     switch (targetValue.value) {
    //       case 0:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             case 3:
    //               chatStore.chatEquip
    //               targetValue.value += 3
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('white')) {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }
    //         else {
    //           chatStore.chatEquip
    //           targetValue.value--
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case 1:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             case 3:
    //               chatStore.chatEquip
    //               targetValue.value += 3
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('white')) {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }
    //         else {
    //           chatStore.chatCurse
    //           targetValue.value--
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case 2:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             case 3:
    //               chatStore.chatEquip
    //               targetValue.value += 3
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('white')) {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }
    //         else {
    //           chatStore.chatCurse
    //           targetValue.value--
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case 3:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(2)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('white')) {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }
    //         else {
    //           chatStore.chatCurse
    //           targetValue.value--
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case 4:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(8)

    //           switch (dice.value) {
    //             case 1:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;

    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('white')) {
    //           diceChatStateOneTo(4)

    //           switch (dice.value) {
    //             case 1:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else {
    //           chatStore.chatCurse
    //           targetValue.value--
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case 5:
    //         if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(10)

    //           switch (dice.value) {
    //             case 1:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;

    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('white')) {
    //           diceChatStateOneTo(5)

    //           switch (dice.value) {
    //             case 1:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else {
    //           chatStore.chatCurse
    //           targetValue.value--
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case 6:
    //         if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
    //           diceChatStateOneTo(6)

    //           switch (dice.value) {
    //             case 1:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else {
    //           chatStore.chatCurse
    //           targetValue.value--
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case 7:
    //         if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
    //           diceChatStateOneTo(7)

    //           switch (dice.value) {
    //             case 1:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else {
    //           chatStore.chatCurse
    //           targetValue.value--
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case 8:
    //         if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
    //           diceChatStateOneTo(8)

    //           switch (dice.value) {
    //             case 1:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else {
    //           chatStore.chatCurse
    //           targetValue.value--
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case targetValue.value:
    //         if (scrollStore.typeScroll('blessed')) {
    //           secDice.value = diceChatStateOneTo(10)

    //           switch (dice.value) {
    //             case 1:
    //               diceChatStateOneTo(3)

    //               switch (dice.value) {
    //                 case 1:
    //                   chatStore.chatEquip
    //                   break;

    //                 default:
    //                   chatStore.chatEquip
    //                   targetValue.value++
    //                   break;
    //               }
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }

    //         }
    //         else if (scrollStore.typeScroll('white')) {
    //           secDice.value = diceChatStateOneTo(10)

    //           switch (dice.value) {
    //             case 1:
    //               diceChatStateOneTo(3)

    //               switch (dice.value) {
    //                 case 1:
    //                   chatStore.chatEquip
    //                   targetValue.value++
    //                   break;

    //                 default:
    //                   chatStore.chatEquip
    //                   break;
    //               }
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }

    //         }
    //         else {
    //           chatStore.chatCurse
    //           targetValue.value--
    //         }

    //         scrollStore.targetScroll = null
    //         break;

    //     }
    //   }
    //   else {
    //     switch (targetValue.value) {
    //       // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
    //       // white scroll # 100% +1

    //       // -3~-8 : cursed scroll # 1/n% success  n-1/n% failure

    //       // (infinity loop) 10% success  90% failure and then
    //       // if cursed scroll # 50% +1 | 50% nothing happened
    //       case -1:
    //         if (scrollStore.typeScroll('cursed')) {
    //           chatStore.chatEquip
    //           targetValue.value--
    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             case 3:
    //               chatStore.chatEquip
    //               targetValue.value += 3
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         } else {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case -2:
    //         if (scrollStore.typeScroll('cursed')) {
    //           chatStore.chatEquip
    //           targetValue.value--
    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             case 3:
    //               chatStore.chatEquip
    //               targetValue.value += 3
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         } else {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case -3:
    //         if (scrollStore.typeScroll('cursed')) {
    //           chatStore.chatEquip
    //           targetValue.value--
    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             case 3:
    //               chatStore.chatEquip
    //               targetValue.value += 3
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         } else {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case -4:
    //         if (scrollStore.typeScroll('cursed')) {
    //           diceChatStateOneTo(4)

    //           switch (dice.value) {
    //             case 1:
    //               chatStore.chatEquip
    //               targetValue.value--
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             case 3:
    //               chatStore.chatEquip
    //               targetValue.value += 3
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         } else {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case -5:
    //         if (scrollStore.typeScroll('cursed')) {
    //           diceChatStateOneTo(5)

    //           switch (dice.value) {
    //             case 1:
    //               chatStore.chatEquip
    //               targetValue.value--
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             case 3:
    //               chatStore.chatEquip
    //               targetValue.value += 3
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         } else {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case -6:
    //         if (scrollStore.typeScroll('cursed')) {
    //           diceChatStateOneTo(6)

    //           switch (dice.value) {
    //             case 1:
    //               chatStore.chatEquip
    //               targetValue.value--
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             case 3:
    //               chatStore.chatEquip
    //               targetValue.value += 3
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         } else {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case -7:
    //         if (scrollStore.typeScroll('cursed')) {
    //           diceChatStateOneTo(7)

    //           switch (dice.value) {
    //             case 1:
    //               chatStore.chatEquip
    //               targetValue.value--
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             case 3:
    //               chatStore.chatEquip
    //               targetValue.value += 3
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         } else {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case -8:
    //         if (scrollStore.typeScroll('cursed')) {
    //           diceChatStateOneTo(8)

    //           switch (dice.value) {
    //             case 1:
    //               chatStore.chatEquip
    //               targetValue.value--
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }
    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             case 3:
    //               chatStore.chatEquip
    //               targetValue.value += 3
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         } else {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //       case targetValue.value:
    //         if (scrollStore.typeScroll('cursed')) {
    //           secDice.value = diceChatStateOneTo(10)

    //           switch (dice.value) {
    //             case 1:
    //               diceChatStateOneTo(2)

    //               switch (dice.value) {
    //                 case 1:
    //                   chatStore.chatEquip
    //                   targetValue.value--
    //                   break;

    //                 default:
    //                   chatStore.chatEquip
    //                   break;
    //               }
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value = 0
    //               break;
    //           }

    //         }
    //         else if (scrollStore.typeScroll('blessed')) {
    //           diceChatStateOneTo(3)

    //           switch (dice.value) {
    //             case 2:
    //               chatStore.chatEquip
    //               targetValue.value += 2
    //               break;

    //             case 3:
    //               chatStore.chatEquip
    //               targetValue.value += 3
    //               break;

    //             default:
    //               chatStore.chatEquip
    //               targetValue.value++
    //               break;
    //           }
    //         } else {
    //           chatStore.chatEquip
    //           targetValue.value++
    //         }

    //         scrollStore.targetScroll = null
    //         break;
    //     }
    //   }
    // }
  };

  return {
    dice,
    secDice,
    diceChatState,
    typeEquip,
    algorithm,
    targetName,
    targetValue,
    targetCategory,
    targetSafetyValue,
  };
});
