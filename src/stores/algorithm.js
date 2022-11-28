import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const dice = ref(null)
  const targetValue = ref(null)
  const targetScroll = ref(null);
  const targetCategory = ref(null)
  const targetSafetyValue = ref(null)

  const algorithm = computed(() => {
    // About equip number searching... I use switch to get more effect.
    // About other... I use if-else get readability more. 
    if (!targetScroll.value) return
    const typeEquip = (text) => targetCategory.value.toLowerCase().includes(text.toLowerCase())
    const typeScroll = (text) => targetScroll.value.toLowerCase().includes(text.toLowerCase())
    const diceOneTo = (num) => dice.value = Math.floor(Math.random() * num) + 1
    const checkTargetSafetyValue = (num) => targetSafetyValue.value === num

    if (typeEquip('weapon') && typeScroll('weapon') && checkTargetSafetyValue(6)) {
      if (targetValue.value >= 0) {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          case 0:
            if (typeScroll('blessed')) {
              diceOneTo(3)

              if (dice.value === 2) targetValue.value += 2
              else if (dice.value === 3) targetValue.value += 3
              else targetValue.value++
            }
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 1:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 2:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          // blessed scroll # 50% +1 | 50% +2
          case 3:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 4:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 5:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          // white = blessed scroll # 33.3% success  66.6% failure
          case 6:
            if (typeScroll('blessed') || typeScroll('white')) {
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

            targetScroll.value = null
            break;
          case 7:
            if (typeScroll('blessed') || typeScroll('white')) {
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

            targetScroll.value = null
            break;
          case 8:
            if (typeScroll('blessed') || typeScroll('white')) {
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

            targetScroll.value = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if white scroll # 33.3% +1 | 66.6% nothing happened
          // if blessed scroll # 66.6% +1 | 33.3% nothing happened 
          case targetValue.value:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) {
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

            targetScroll.value = null
            break;



        }
      }
      else {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          // white scroll # 100% +1
          case -1:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -2:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -3:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -4:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -5:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          // cursed scroll # 33.3% success  66.6% failure
          case -6:
            if (typeScroll('cursed')) {
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
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -7:
            if (typeScroll('cursed')) {
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
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -8:
            if (typeScroll('cursed')) {
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
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if cursed scroll # 50% +1 | 50% nothing happened
          case targetValue.value:
            if (typeScroll('cursed')) {
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
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;


        }
      }
    }
    else if (typeEquip('armor') && typeScroll('armor') && checkTargetSafetyValue(6)) {
      if (targetValue.value >= 0) {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          case 0:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 1:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 2:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          // blessed scroll # 50% +1 | 50% +2
          case 3:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 4:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 5:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          // white = blessed scroll # 1/n% success  n-1/n% failure
          case 6:
            if (typeScroll('blessed') || typeScroll('white')) {
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

            targetScroll.value = null
            break;
          case 7:
            if (typeScroll('blessed') || typeScroll('white')) {
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

            targetScroll.value = null
            break;
          case 8:
            if (typeScroll('blessed') || typeScroll('white')) {
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

            targetScroll.value = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if white scroll # 33.3% +1 | 66.6% nothing happened
          // if blessed scroll # 66.6% +1 | 33.3% nothing happened 
          case targetValue.value:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) {
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

            targetScroll.value = null
            break;



        }
      }
      else {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          // white scroll # 100% +1
          case -1:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -2:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -3:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -4:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -5:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          // cursed scroll # 33.3% success  66.6% failure
          case -6:
            if (typeScroll('cursed')) {
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
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -7:
            if (typeScroll('cursed')) {
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
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -8:
            if (typeScroll('cursed')) {
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
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if cursed scroll # 50% +1 | 50% nothing happened
          case targetValue.value:
            if (typeScroll('cursed')) {
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
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;



        }
      }
    }
    else if (typeEquip('armor') && typeScroll('armor') && checkTargetSafetyValue(4)) {
      if (targetValue.value >= 0) {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          case 0:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 1:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 2:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          // blessed scroll # 50% +1 | 50% +2
          case 3:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          // blessed scroll # 12.5% +1 | 12.5% +2 | 75% failure 
          // white scroll # 25% +1 || 75% failure
          case 4:
            if (typeScroll('blessed')) {
              diceOneTo(8)

              switch (dice.value) {
                case 1:
                  targetValue.value = targetValue.value + 1
                  break;
                case 2:
                  targetValue.value += 2
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (typeScroll('white')) {
              diceOneTo(4)

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

            targetScroll.value = null
            break;
          // blessed scroll # 10% +1 | 10% +2 | 80% failure 
          // white scroll # 20% +1 || 80% failure
          case 5:
            if (typeScroll('blessed')) {
              diceOneTo(10)

              switch (dice.value) {
                case 1:
                  targetValue.value = targetValue.value + 1
                  break;
                case 2:
                  targetValue.value += 2
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (typeScroll('white')) {
              diceOneTo(5)

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

            targetScroll.value = null
            break;
          // white = blessed scroll # 1/n% success  n-1/n% failure
          case 6:
            if (typeScroll('blessed') || typeScroll('white')) {
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

            targetScroll.value = null
            break;
          case 7:
            if (typeScroll('blessed') || typeScroll('white')) {
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

            targetScroll.value = null
            break;
          case 8:
            if (typeScroll('blessed') || typeScroll('white')) {
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

            targetScroll.value = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if white scroll # 33.3% +1 | 66.6% nothing happened
          // if blessed scroll # 66.6% +1 | 33.3% nothing happened 
          case targetValue.value:
            if (typeScroll('blessed')) {
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
            else if (typeScroll('white')) {
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

            targetScroll.value = null
            break;



        }
      }
      else {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          // white scroll # 100% +1
          case -1:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -2:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -3:
            if (typeScroll('cursed')) targetValue.value--
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          // cursed scroll # 1/n% success  n-1/n% failure
          case -4:
            if (typeScroll('cursed')) {
              diceOneTo(4)

              switch (dice.value) {
                case 1:
                  targetValue.value--
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -5:
            if (typeScroll('cursed')) {
              diceOneTo(5)

              switch (dice.value) {
                case 1:
                  targetValue.value--
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -6:
            if (typeScroll('cursed')) {
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
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -7:
            if (typeScroll('cursed')) {
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
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          case -8:
            if (typeScroll('cursed')) {
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
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if cursed scroll # 50% +1 | 50% nothing happened
          case targetValue.value:
            if (typeScroll('cursed')) {
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
            else if (typeScroll('blessed')) {
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

            targetScroll.value = null
            break;



        }
      }
    }
    else {
      //jewelry not open yet
    }
  })

  return { algorithm, targetValue, targetScroll, targetCategory, targetSafetyValue };
});

