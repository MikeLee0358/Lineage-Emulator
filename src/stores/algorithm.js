import { defineStore } from "pinia";
import { ref } from "vue";
import { useScrollStore } from "./scroll";
import { useChatStore } from "./chat";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const dice = ref(null);
  const secDice = ref(null);

  const diceChatState = ref(null); // set 1 to achieve message poping out for most of stuff whitout state.
  const targetName = ref(null);
  const targetValue = ref(null);
  const targetCategory = ref("");
  const targetSafetyValue = ref(null);

  const chatStore = useChatStore();
  const scrollStore = useScrollStore();

  const typeEquip = (text) =>
    targetCategory.value.toLowerCase().includes(text.toLowerCase());
  const successRate = () => {
    if (targetCategory.value.includes("weapon")) {
      if ([0, 1, 2, 3, 4, 5].includes(Math.abs(targetValue.value))) return 100;
      else if ([6, 7, 8].includes(Math.abs(targetValue.value))) return 33.33;
      else return 10;
    } else if (targetCategory.value.includes("armor"))
      return Number((100 / Math.abs(targetValue.value)) * 100).toFixed(2);
  };
  const diceChatStateOneTo = (num) =>
    (diceChatState.value = Number(Math.floor(Math.random() * num) + 1));
  const diceRollForAlogrithm = () =>
    (dice.value = Number((Math.random() * 100).toFixed(2)));
  const checkTargetSafetyValue = (num) => targetSafetyValue.value === num;








  const algorithm = () => {
    if (scrollStore.targetScroll === null) return;
    // About equip number searching... I use switch to get more effect.
    // About other... I use if-else to get readability.

    diceRollForAlogrithm();
    diceChatState.value = 1;

    if (
      typeEquip("Weapon") &&
      scrollStore.typeScroll("Weapon") &&
      checkTargetSafetyValue(6)
    ) {
      switch (targetValue.value) {
        case -14:
          if (scrollStore.typeScroll("cursed")) {
            if (successRate() > dice.value) {
              diceChatStateOneTo(2);

              if (diceChatState.value === 1) {
                chatStore.chatUpdate();

                targetValue.value--;
              } else {
                diceChatState.value = -1;
                chatStore.chatUpdate();
              }
            } else {
              diceChatState.value = 0;
              chatStore.chatUpdate();

              targetValue.value = 0;
            }
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case -13:
          if (scrollStore.typeScroll("cursed")) {
            if (successRate() > dice.value) {
              diceChatStateOneTo(2);

              if (diceChatState.value === 1) {
                chatStore.chatUpdate();

                targetValue.value--;
              } else {
                diceChatState.value = -1;
                chatStore.chatUpdate();
              }
            } else {
              diceChatState.value = 0;
              chatStore.chatUpdate();

              targetValue.value = 0;
            }
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case -12:
          if (scrollStore.typeScroll("cursed")) {
            if (successRate() > dice.value) {
              diceChatStateOneTo(2);

              if (diceChatState.value === 1) {
                chatStore.chatUpdate();

                targetValue.value--;
              } else {
                diceChatState.value = -1;
                chatStore.chatUpdate();
              }
            } else {
              diceChatState.value = 0;
              chatStore.chatUpdate();

              targetValue.value = 0;
            }
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case -11:
          if (scrollStore.typeScroll("cursed")) {
            if (successRate() > dice.value) {
              diceChatStateOneTo(2);

              if (diceChatState.value === 1) {
                chatStore.chatUpdate();

                targetValue.value--;
              } else {
                diceChatState.value = -1;
                chatStore.chatUpdate();
              }
            } else {
              diceChatState.value = 0;
              chatStore.chatUpdate();

              targetValue.value = 0;
            }
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case -10:
          if (scrollStore.typeScroll("cursed")) {
            if (successRate() > dice.value) {
              diceChatStateOneTo(2);

              if (diceChatState.value === 1) {
                chatStore.chatUpdate();

                targetValue.value--;
              } else {
                diceChatState.value = -1;
                chatStore.chatUpdate();
              }
            } else {
              diceChatState.value = 0;
              chatStore.chatUpdate();

              targetValue.value = 0;
            }
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case -9:
          if (scrollStore.typeScroll("cursed")) {
            if (successRate() > dice.value) {
              diceChatStateOneTo(2);

              if (diceChatState.value === 1) {
                chatStore.chatUpdate();

                targetValue.value--;
              } else {
                diceChatState.value = -1;
                chatStore.chatUpdate();
              }
            } else {
              diceChatState.value = 0;
              chatStore.chatUpdate();

              targetValue.value = 0;
            }
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case -8:
          if (scrollStore.typeScroll("cursed")) {
            if (successRate() > dice.value) {
              chatStore.chatUpdate();

              targetValue.value--;
            } else {
              diceChatState.value = 0;
              chatStore.chatUpdate();

              targetValue.value = 0;
            }
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;

          break;
        case -7:
          if (scrollStore.typeScroll("cursed")) {
            if (successRate() > dice.value) {
              chatStore.chatUpdate();

              targetValue.value--;
            } else {
              diceChatState.value = 0;
              chatStore.chatUpdate();

              targetValue.value = 0;
            }
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;

          break;
        case -6:
          if (scrollStore.typeScroll("cursed")) {
            if (successRate() > dice.value) {
              chatStore.chatUpdate();

              targetValue.value--;
            } else {
              diceChatState.value = 0;
              chatStore.chatUpdate();

              targetValue.value = 0;
            }
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;

          break;
        case -5:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;

          break;
        case -4:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;

          break;
        case -3:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;

          break;
        case -2:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;

          break;
        case -1:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;

          break;
        case 0:
          console.log(successRate());
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 1:
          console.log(successRate());
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 2:
          console.log(successRate());
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(3);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 3:
          console.log(successRate());
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(2);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 4:
          console.log(successRate());
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(2);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 5:
          console.log(successRate());
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (scrollStore.typeScroll("blessed")) {
            diceChatStateOneTo(2);
            chatStore.chatUpdate();

            targetValue.value += diceChatState.value;
          } else {
            chatStore.chatUpdate();

            targetValue.value++;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 6:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (successRate() > dice.value) {
            chatStore.chatUpdate();

            targetValue.value++;
          } else {
            diceChatState.value = 0;
            chatStore.chatUpdate();

            targetValue.value = 0;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 7:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (successRate() > dice.value) {
            chatStore.chatUpdate();

            targetValue.value++;
          } else {
            diceChatState.value = 0;
            chatStore.chatUpdate();

            targetValue.value = 0;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 8:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();

            targetValue.value--;
          } else if (successRate() > dice.value) {
            chatStore.chatUpdate();

            targetValue.value++;
          } else {
            diceChatState.value = 0;
            chatStore.chatUpdate();

            targetValue.value = 0;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 9:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();
            targetValue.value--;
          } else if (successRate() > dice.value) {
            diceChatStateOneTo(3);

            if (diceChatState.value === 1) {
              chatStore.chatUpdate();

              targetValue.value++;
            } else if (diceChatState.value === 2) {
              diceChatState.value = -1;
              chatStore.chatUpdate();
            } else {
              if (scrollStore.typeScroll("blessed")) {
                diceChatState.value = 1;
                chatStore.chatUpdate();

                targetValue.value++;
              } else if (scrollStore.typeScroll("white")) {
                diceChatState.value = -1;
                chatStore.chatUpdate();
              }
            }
          } else {
            diceChatState.value = 0;
            chatStore.chatUpdate();

            targetValue.value = 0;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 10:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();
            targetValue.value--;
          } else if (successRate() > dice.value) {
            diceChatStateOneTo(3);

            if (diceChatState.value === 1) {
              chatStore.chatUpdate();

              targetValue.value++;
            } else if (diceChatState.value === 2) {
              diceChatState.value = -1;
              chatStore.chatUpdate();
            } else {
              if (scrollStore.typeScroll("blessed")) {
                diceChatState.value = 1;
                chatStore.chatUpdate();

                targetValue.value++;
              } else if (scrollStore.typeScroll("white")) {
                diceChatState.value = -1;
                chatStore.chatUpdate();
              }
            }
          } else {
            diceChatState.value = 0;
            chatStore.chatUpdate();

            targetValue.value = 0;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 11:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();
            targetValue.value--;
          } else if (successRate() > dice.value) {
            diceChatStateOneTo(3);

            if (diceChatState.value === 1) {
              chatStore.chatUpdate();

              targetValue.value++;
            } else if (diceChatState.value === 2) {
              diceChatState.value = -1;
              chatStore.chatUpdate();
            } else {
              if (scrollStore.typeScroll("blessed")) {
                diceChatState.value = 1;
                chatStore.chatUpdate();

                targetValue.value++;
              } else if (scrollStore.typeScroll("white")) {
                diceChatState.value = -1;
                chatStore.chatUpdate();
              }
            }
          } else {
            diceChatState.value = 0;
            chatStore.chatUpdate();

            targetValue.value = 0;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 12:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();
            targetValue.value--;
          } else if (successRate() > dice.value) {
            diceChatStateOneTo(3);

            if (diceChatState.value === 1) {
              chatStore.chatUpdate();

              targetValue.value++;
            } else if (diceChatState.value === 2) {
              diceChatState.value = -1;
              chatStore.chatUpdate();
            } else {
              if (scrollStore.typeScroll("blessed")) {
                diceChatState.value = 1;
                chatStore.chatUpdate();

                targetValue.value++;
              } else if (scrollStore.typeScroll("white")) {
                diceChatState.value = -1;
                chatStore.chatUpdate();
              }
            }
          } else {
            diceChatState.value = 0;
            chatStore.chatUpdate();

            targetValue.value = 0;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 13:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();
            targetValue.value--;
          } else if (successRate() > dice.value) {
            diceChatStateOneTo(3);

            if (diceChatState.value === 1) {
              chatStore.chatUpdate();

              targetValue.value++;
            } else if (diceChatState.value === 2) {
              diceChatState.value = -1;
              chatStore.chatUpdate();
            } else {
              if (scrollStore.typeScroll("blessed")) {
                diceChatState.value = 1;
                chatStore.chatUpdate();

                targetValue.value++;
              } else if (scrollStore.typeScroll("white")) {
                diceChatState.value = -1;
                chatStore.chatUpdate();
              }
            }
          } else {
            diceChatState.value = 0;
            chatStore.chatUpdate();

            targetValue.value = 0;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
        case 14:
          if (scrollStore.typeScroll("cursed")) {
            chatStore.chatUpdate();
            targetValue.value--;
          } else if (successRate() > dice.value) {
            diceChatStateOneTo(3);

            if (diceChatState.value === 1) {
              chatStore.chatUpdate();

              targetValue.value++;
            } else if (diceChatState.value === 2) {
              diceChatState.value = -1;
              chatStore.chatUpdate();
            } else {
              if (scrollStore.typeScroll("blessed")) {
                diceChatState.value = 1;
                chatStore.chatUpdate();

                targetValue.value++;
              } else if (scrollStore.typeScroll("white")) {
                diceChatState.value = -1;
                chatStore.chatUpdate();
              }
            }
          } else {
            diceChatState.value = 0;
            chatStore.chatUpdate();

            targetValue.value = 0;
          }

          diceChatState.value = null;
          scrollStore.targetScroll = null;
          break;
      }
    } else if (
      typeEquip("Armor") &&
      scrollStore.typeScroll("Armor") &&
      checkTargetSafetyValue(6)
    ) {
      // write here
    } else if (
      typeEquip("Armor") &&
      scrollStore.typeScroll("Armor") &&
      checkTargetSafetyValue(4)
    ) {
      // wrtie here
    }

    // else if (typeEquip('Armor') && scrollStore.typeScroll('Armor') && checkTargetSafetyValue(6)) {
    // scrollStore.targetScroll = null;
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
    // else if (typeEquip('Armor') && scrollStore.typeScroll('Armor') && checkTargetSafetyValue(4)) {
    //   scrollStore.targetScroll = null;
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
