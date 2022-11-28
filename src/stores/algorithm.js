import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const dice = ref(null)
  const targetScroll = ref(null);
  const targetValue = ref(null)
  const targetCategory = ref(null)
  const targetSafetyValue = ref(null)

  const checkTargetSafetyValue = (num) => {
    return targetSafetyValue.value === num
  }
  const diceOneTo = (num) => dice.value = Math.floor(Math.random() * num) + 1



  const algorithm = computed(() => {
    // About number... I use switch to get more effect.
    // About scroll... I use if-else, cost a little bit effect, but get lots of readability. 

    if (!targetScroll.value) return

    const scrollArmor = targetScroll.value.includes('Armor')
    const scrollWeapon = targetScroll.value.includes('Weapon')

    const scrollWhite = targetScroll.value.includes('white')
    const scrollCursed = targetScroll.value.includes('cursed')
    const scrollBlessed = targetScroll.value.includes('blessed')

    const categoryJewelry = ["amulet", "left-ring", "belt", "right-ring"];
    const categoryWeapon = targetCategory.value === 'weapon'
    const categoryArmor = !(categoryJewelry.includes(targetCategory.value)) && targetCategory.value !== 'weapon'



    if (categoryWeapon && scrollWeapon && checkTargetSafetyValue(6)) {
      if (targetValue.value >= 0) {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          case 0:
            if (scrollBlessed) {
              diceOneTo(3)
              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 1:
            if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 2:
            if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          // blessed scroll # 50% +1 | 50% +2
          case 3:
            if (scrollBlessed) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 4:
            if (scrollBlessed) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 5:
            if (scrollBlessed) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          // white = blessed scroll # 33.3% success  66.6% failure
          case 6:
            if (scrollBlessed || scrollWhite) {
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
            if (scrollBlessed || scrollWhite) {
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
            if (scrollBlessed || scrollWhite) {
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
            if (scrollBlessed) {
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
            else if (scrollWhite) {
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
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -2:
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -3:
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -4:
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -5:
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
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
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -7:
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -8:
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
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
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
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
    else if (categoryArmor && scrollArmor && checkTargetSafetyValue(6)) {
      if (targetValue.value >= 0) {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          case 0:
            if (scrollBlessed) {
              diceOneTo(3)
              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 1:
            if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 2:
            if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          // blessed scroll # 50% +1 | 50% +2
          case 3:
            if (scrollBlessed) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 4:
            if (scrollBlessed) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 5:
            if (scrollBlessed) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          // white = blessed scroll # 1/n% success  n-1/n% failure
          case 6:
            if (scrollBlessed || scrollWhite) {
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
            if (scrollBlessed || scrollWhite) {
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
            if (scrollBlessed || scrollWhite) {
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
            if (scrollBlessed) {
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
            else if (scrollWhite) {
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
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -2:
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -3:
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -4:
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -5:
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
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
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -7:
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -8:
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
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
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
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
    else if (categoryArmor && scrollArmor && checkTargetSafetyValue(4)) {
      if (targetValue.value >= 0) {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          case 0:
            if (scrollBlessed) {
              diceOneTo(3)
              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 1:
            if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          case 2:
            if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          // blessed scroll # 50% +1 | 50% +2
          case 3:
            if (scrollBlessed) {
              diceOneTo(2)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                default:
                  targetValue.value++
                  break;
              }
            }
            else if (scrollWhite) targetValue.value++
            else targetValue.value--

            targetScroll.value = null
            break;
          // blessed scroll # 12.5% +1 | 12.5% +2 | 75% failure 
          // white scroll # 25% +1 || 75% failure
          case 4:
            if (scrollBlessed) {
              diceOneTo(8)

              switch (dice.value) {
                case 1:
                  targetValue.value = targetValue.value + 1
                  break;
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollWhite) {
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
            if (scrollBlessed) {
              diceOneTo(10)

              switch (dice.value) {
                case 1:
                  targetValue.value = targetValue.value + 1
                  break;
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                default:
                  targetValue.value = 0
                  break;
              }
            }
            else if (scrollWhite) {
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
            if (scrollBlessed || scrollWhite) {
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
            if (scrollBlessed || scrollWhite) {
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
            if (scrollBlessed || scrollWhite) {
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
            if (scrollBlessed) {
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
            else if (scrollWhite) {
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
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -2:
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -3:
            if (scrollCursed) targetValue.value--
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
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
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -5:
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -6:
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -7:
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
                  break;
                default:
                  targetValue.value++
                  break;
              }
            } else targetValue.value++

            targetScroll.value = null
            break;
          case -8:
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
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
            if (scrollCursed) {
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
            else if (scrollBlessed) {
              diceOneTo(3)

              switch (dice.value) {
                case 2:
                  targetValue.value = targetValue.value + 2
                  break;
                case 3:
                  targetValue.value = targetValue.value + 3
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

  return { targetScroll, targetValue, targetSafetyValue, targetCategory, algorithm };
});

