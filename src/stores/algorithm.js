import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useScrollStore } from "./scroll";
import { useChatStore } from "./chat";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const dice = ref(null)
  const secDice = ref(null)
  const targetName = ref(null)
  const targetValue = ref(null)
  const targetCategory = ref(null)
  const targetSafetyValue = ref(null)

  const chatStore = useChatStore()
  const scrollStore = useScrollStore()
  const typeEquip = (text) => targetCategory.value.toLowerCase().includes(text.toLowerCase())

  const algorithm = computed(() => {

    // About equip number searching... I use switch to get more effect.
    // About other... I use if-else get readability more. 
    if (!scrollStore.targetScroll) return



    const diceOneTo = (num) => dice.value = Math.floor(Math.random() * num) + 1
    const checkTargetSafetyValue = (num) => targetSafetyValue.value === num

    if (typeEquip('weapon') && scrollStore.typeScroll('weapon') && checkTargetSafetyValue(6)) {

      if (targetValue.value >= 0) {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          case 0:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              if (dice.value === 2) targetValue.value += 2
              else if (dice.value === 3) targetValue.value += 3
              else targetValue.value++
            }
            else if (scrollStore.typeScroll('white')) targetValue.value++
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          case 1:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) targetValue.value++
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          case 2:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) targetValue.value++
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          // blessed scroll # 50% +1 | 50% +2
          case 3:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) targetValue.value++
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          case 4:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) targetValue.value++
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          case 5:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) targetValue.value++
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          // white = blessed scroll # 33.3% success  66.6% failure
          case 6:
            if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
              diceOneTo(3)

              switch (dice.value) {
                case 1:
                  targetValue.value++
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          case 7:
            if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
              diceOneTo(3)

              switch (dice.value) {
                case 1:
                  targetValue.value++
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          case 8:
            if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
              diceOneTo(3)

              switch (dice.value) {
                case 1:
                  targetValue.value++
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if white scroll # 33.3% +1 | 66.6% nothing happened
          // if blessed scroll # 66.6% +1 | 33.3% nothing happened 
          case targetValue.value:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(10)

              switch (dice.value) {
                case 1:
                  diceOneTo(3)

                  switch (dice.value) {
                    case 1:
                      console.log('沒有任何事情發生')
                      break;
                    default:
                      targetValue.value++
                      break;
                  }
                  break;

                default:
                  targetValue.value = 0
                  break;
              }

            }
            else if (scrollStore.typeScroll('white')) {
              diceOneTo(10)

              switch (dice.value) {
                case 1:
                  diceOneTo(3)

                  switch (dice.value) {
                    case 1:
                      targetValue.value++
                      break;
                    default:
                      console.log('沒有任何事情發生')
                      break;
                  }
                  break;

                default:
                  targetValue.value = 0
                  break;
              }
            }
            else targetValue.value--

            scrollStore.targetScroll = null
            break;



        }
      }
      else {
        switch (targetValue.value) {

          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          // white scroll # 100% +1
          case -1:
            if (scrollStore.typeScroll('cursed')) targetValue.value--
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          case -2:
            if (scrollStore.typeScroll('cursed')) targetValue.value--
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          case -3:
            if (scrollStore.typeScroll('cursed')) targetValue.value--
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          case -4:
            if (scrollStore.typeScroll('cursed')) targetValue.value--
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          case -5:
            if (scrollStore.typeScroll('cursed')) targetValue.value--
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          // cursed scroll # 33.3% success  66.6% failure
          case -6:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 1:
                  targetValue.value--
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          case -7:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 1:
                  targetValue.value--
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          case -8:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 1:
                  targetValue.value--
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if cursed scroll # 50% +1 | 50% nothing happened
          case targetValue.value:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(10)

              switch (dice.value) {
                case 1:
                  diceOneTo(2)

                  switch (dice.value) {
                    case 1:
                      targetValue.value--
                      break;

                    default:
                      console.log('沒有任何事情發生')
                      break;
                  }
                  break;

                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;


        }
      }
    }
    else if (typeEquip('armor') && scrollStore.typeScroll('armor') && checkTargetSafetyValue(6)) {
      console.log('armor')
      if (targetValue.value >= 0) {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          case 0:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)
              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) targetValue.value++
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          case 1:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) targetValue.value++
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          case 2:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) targetValue.value++
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          // blessed scroll # 50% +1 | 50% +2
          case 3:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) targetValue.value++
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          case 4:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) targetValue.value++
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          case 5:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) targetValue.value++
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          // white = blessed scroll # 1/n% success  n-1/n% failure
          case 6:
            if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
              diceOneTo(6)

              switch (dice.value) {
                case 1:
                  targetValue.value++
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          case 7:
            if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
              diceOneTo(7)

              switch (dice.value) {
                case 1:
                  targetValue.value++
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          case 8:
            if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
              diceOneTo(8)

              switch (dice.value) {
                case 1:
                  targetValue.value++
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else targetValue.value--

            scrollStore.targetScroll = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if white scroll # 33.3% +1 | 66.6% nothing happened
          // if blessed scroll # 66.6% +1 | 33.3% nothing happened 
          case targetValue.value:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(10)

              switch (dice.value) {
                case 1:
                  diceOneTo(3)

                  switch (dice.value) {
                    case 1:
                      console.log('沒有任何事情發生')
                      break;
                    default:
                      targetValue.value++
                      break;
                  }
                  break;

                default:
                  targetValue.value = 0
                  break;
              }

            }
            else if (scrollStore.typeScroll('white')) {
              diceOneTo(10)

              switch (dice.value) {
                case 1:
                  diceOneTo(3)

                  switch (dice.value) {
                    case 1:
                      targetValue.value++
                      break;
                    default:
                      console.log('沒有任何事情發生')
                      break;
                  }
                  break;

                default:
                  targetValue.value = 0
                  break;
              }
            }
            else targetValue.value--

            scrollStore.targetScroll = null
            break;



        }
      }
      else {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          // white scroll # 100% +1
          case -1:
            if (scrollStore.typeScroll('cursed')) targetValue.value--
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          case -2:
            if (scrollStore.typeScroll('cursed')) targetValue.value--
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          case -3:
            if (scrollStore.typeScroll('cursed')) targetValue.value--
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          case -4:
            if (scrollStore.typeScroll('cursed')) targetValue.value--
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          case -5:
            if (scrollStore.typeScroll('cursed')) targetValue.value--
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          // cursed scroll # 33.3% success  66.6% failure
          case -6:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(6)

              switch (dice.value) {
                case 1:
                  targetValue.value--
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          case -7:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(7)

              switch (dice.value) {
                case 1:
                  targetValue.value--
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          case -8:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(8)

              switch (dice.value) {
                case 1:
                  targetValue.value--
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if cursed scroll # 50% +1 | 50% nothing happened
          case targetValue.value:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(10)

              switch (dice.value) {
                case 1:
                  diceOneTo(2)

                  switch (dice.value) {
                    case 1:
                      targetValue.value--
                      break;

                    default:
                      console.log('沒有任何事情發生')
                      break;
                  }
                  break;

                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value += 2
                  break;
                case 3:
                  targetValue.value += 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            scrollStore.targetScroll = null
            break;



        }
      }
    }
    else if (typeEquip('armor') && scrollStore.typeScroll('armor') && checkTargetSafetyValue(4)) {
      if (targetValue.value >= 0) {

        switch (targetValue.value) {
          case 0:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                case 3:
                  chatStore.chatEquip
                  targetValue.value += 3
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) {
              chatStore.chatEquip
              targetValue.value++
            }
            else {
              chatStore.chatEquip
              targetValue.value--
            }

            scrollStore.targetScroll = null
            break;
          case 1:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                case 3:
                  chatStore.chatEquip
                  targetValue.value += 3
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) {
              chatStore.chatEquip
              targetValue.value++
            }
            else {
              chatStore.chatCurse
              targetValue.value--
            }

            scrollStore.targetScroll = null
            break;
          case 2:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                case 3:
                  chatStore.chatEquip
                  targetValue.value += 3
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) {
              chatStore.chatEquip
              targetValue.value++
            }
            else {
              chatStore.chatCurse
              targetValue.value--
            }

            scrollStore.targetScroll = null
            break;
          case 3:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) {
              chatStore.chatEquip
              targetValue.value++
            }
            else {
              chatStore.chatCurse
              targetValue.value--
            }

            scrollStore.targetScroll = null
            break;
          case 4:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(8)

              switch (dice.value) {
                case 1:
                  chatStore.chatEquip
                  targetValue.value++
                  break;

                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) {
              diceOneTo(4)

              switch (dice.value) {
                case 1:
                  chatStore.chatEquip
                  targetValue.value++
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else {
              chatStore.chatCurse
              targetValue.value--
            }

            scrollStore.targetScroll = null
            break;
          case 5:
            if (scrollStore.typeScroll('blessed')) {
              diceOneTo(10)

              switch (dice.value) {
                case 1:
                  chatStore.chatEquip
                  targetValue.value++
                  break;

                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('white')) {
              diceOneTo(5)

              switch (dice.value) {
                case 1:
                  chatStore.chatEquip
                  targetValue.value++
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else {
              chatStore.chatCurse
              targetValue.value--
            }

            scrollStore.targetScroll = null
            break;
          case 6:
            if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
              diceOneTo(6)

              switch (dice.value) {
                case 1:
                  chatStore.chatEquip
                  targetValue.value++
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else {
              chatStore.chatCurse
              targetValue.value--
            }

            scrollStore.targetScroll = null
            break;
          case 7:
            if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
              diceOneTo(7)

              switch (dice.value) {
                case 1:
                  chatStore.chatEquip
                  targetValue.value++
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else {
              chatStore.chatCurse
              targetValue.value--
            }

            scrollStore.targetScroll = null
            break;
          case 8:
            if (scrollStore.typeScroll('blessed') || scrollStore.typeScroll('white')) {
              diceOneTo(8)

              switch (dice.value) {
                case 1:
                  chatStore.chatEquip
                  targetValue.value++
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else {
              chatStore.chatCurse
              targetValue.value--
            }

            scrollStore.targetScroll = null
            break;
          case targetValue.value:
            if (scrollStore.typeScroll('blessed')) {
              secDice.value = diceOneTo(10)

              switch (dice.value) {
                case 1:
                  diceOneTo(3)

                  switch (dice.value) {
                    case 1:
                      chatStore.chatEquip
                      break;

                    default:
                      chatStore.chatEquip
                      targetValue.value++
                      break;
                  }
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }

            }
            else if (scrollStore.typeScroll('white')) {
              diceOneTo(10)

              switch (dice.value) {
                case 1:
                  diceOneTo(3)

                  switch (dice.value) {
                    case 1:
                      chatStore.chatEquip
                      targetValue.value++
                      break;

                    default:
                      chatStore.chatEquip
                      break;
                  }

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else {
              chatStore.chatCurse
              targetValue.value--
            }

            scrollStore.targetScroll = null
            break;



        }
      }
      else {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          // white scroll # 100% +1

          // -3~-8 : cursed scroll # 1/n% success  n-1/n% failure

          // (infinity loop) 10% success  90% failure and then
          // if cursed scroll # 50% +1 | 50% nothing happened
          case -1:
            if (scrollStore.typeScroll('cursed')) {
              chatStore.chatEquip
              targetValue.value--
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                case 3:
                  chatStore.chatEquip
                  targetValue.value += 3
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            } else {
              chatStore.chatEquip
              targetValue.value++
            }

            scrollStore.targetScroll = null
            break;
          case -2:
            if (scrollStore.typeScroll('cursed')) {
              chatStore.chatEquip
              targetValue.value--
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                case 3:
                  chatStore.chatEquip
                  targetValue.value += 3
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            } else {
              chatStore.chatEquip
              targetValue.value++
            }

            scrollStore.targetScroll = null
            break;
          case -3:
            if (scrollStore.typeScroll('cursed')) {
              chatStore.chatEquip
              targetValue.value--
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                case 3:
                  chatStore.chatEquip
                  targetValue.value += 3
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            } else {
              chatStore.chatEquip
              targetValue.value++
            }

            scrollStore.targetScroll = null
            break;
          case -4:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(4)

              switch (dice.value) {
                case 1:
                  chatStore.chatEquip
                  targetValue.value--
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                case 3:
                  chatStore.chatEquip
                  targetValue.value += 3
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            } else {
              chatStore.chatEquip
              targetValue.value++
            }

            scrollStore.targetScroll = null
            break;
          case -5:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(5)

              switch (dice.value) {
                case 1:
                  chatStore.chatEquip
                  targetValue.value--
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                case 3:
                  chatStore.chatEquip
                  targetValue.value += 3
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            } else {
              chatStore.chatEquip
              targetValue.value++
            }

            scrollStore.targetScroll = null
            break;
          case -6:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(6)

              switch (dice.value) {
                case 1:
                  chatStore.chatEquip
                  targetValue.value--
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                case 3:
                  chatStore.chatEquip
                  targetValue.value += 3
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            } else {
              chatStore.chatEquip
              targetValue.value++
            }

            scrollStore.targetScroll = null
            break;
          case -7:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(7)

              switch (dice.value) {
                case 1:
                  chatStore.chatEquip
                  targetValue.value--
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                case 3:
                  chatStore.chatEquip
                  targetValue.value += 3
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            } else {
              chatStore.chatEquip
              targetValue.value++
            }

            scrollStore.targetScroll = null
            break;
          case -8:
            if (scrollStore.typeScroll('cursed')) {
              diceOneTo(8)

              switch (dice.value) {
                case 1:
                  chatStore.chatEquip
                  targetValue.value--
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                case 3:
                  chatStore.chatEquip
                  targetValue.value += 3
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            } else {
              chatStore.chatEquip
              targetValue.value++
            }

            scrollStore.targetScroll = null
            break;
          case targetValue.value:
            if (scrollStore.typeScroll('cursed')) {
              secDice.value = diceOneTo(10)

              switch (dice.value) {
                case 1:
                  diceOneTo(2)

                  switch (dice.value) {
                    case 1:
                      chatStore.chatEquip
                      break;

                    default:
                      chatStore.chatEquip
                      targetValue.value--
                      break;
                  }
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollStore.typeScroll('blessed')) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  chatStore.chatEquip
                  targetValue.value += 2
                  break;

                case 3:
                  chatStore.chatEquip
                  targetValue.value += 3
                  break;

                default:
                  chatStore.chatEquip
                  targetValue.value++
                  break;
              }
            } else {
              chatStore.chatEquip
              targetValue.value++
            }

            scrollStore.targetScroll = null
            break;
        }
      }
    }
    else {
      //jewelry not open yet
    }
  })

  return {
    dice,
    secDice,
    typeEquip,
    algorithm,
    targetName,
    targetValue,
    targetCategory,
    targetSafetyValue,

  };
});

