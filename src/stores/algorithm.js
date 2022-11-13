import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const scroll = ref(null);
  const targetCategory = ref(null)
  const targetValue = ref(0)
  const targetSafetyValue = ref(0)
  const dice = ref(0)

  function checkTargetSafetyValue(num) {
    return targetSafetyValue.value === num
  }
  function diceOneTo(num) {
    dice.value = Math.floor(Math.random() * num) + 1
  }

  const algorithm = computed(() => {
    // About number... I use switch to get more effect.
    // About scroll... I use if-else, cost a little bit effect, but get lots of readability. 
    if (!scroll.value) return

    const armorScroll = scroll.value.includes('Armor')
    const weaponScroll = scroll.value.includes('Weapon')
    const whiteScroll = scroll.value.includes('white')
    const cursedScroll = scroll.value.includes('cursed')
    const blessedScroll = scroll.value.includes('blessed')

    const weaponCategory = targetCategory.value === 'weapon'
    const jewelryCategory = ["amulet", "left-ring", "belt", "right-ring"];
    const armorCategory = !(jewelryCategory.includes(targetCategory.value)) || !weaponCategory


    if (weaponCategory && weaponScroll && checkTargetSafetyValue(6)) {
      if (targetValue.value >= 0) {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          case 0:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          case 1:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          case 2:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;

            switch (scroll.value) {
              case blessedScroll:
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
                break;

              case cursedScroll:
                targetValue.value--
                break;

              default:
                targetValue.value++
                break;
            }
            scroll.value = null
            break;

            switch (scroll.value) {
              case blessedScroll:
                diceOneTo(2)

                switch (dice.value) {
                  case 2:
                    targetValue.value = targetValue.value + 2
                    break;

                  default:
                    targetValue.value++
                    break;
                }
                break;

              case cursedScroll:
                targetValue.value--
                break;

              default:
                targetValue.value++
                break;
            }
            scroll.value = null
            break;
          // blessed scroll # 50% +1 | 50% +2
          case 3:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          case 4:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          case 5:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          // white = blessed scroll # 33.3% success  66.6% failure
          case 6:
            if (blessedScroll || whiteScroll) {
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

            scroll.value = null
            break;
          case 7:
            if (blessedScroll || whiteScroll) {
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

            scroll.value = null
            break;
          case 8:
            if (blessedScroll || whiteScroll) {
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

            scroll.value = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if white scroll # 33.3% +1 | 66.6% nothing happened
          // if blessed scroll # 66.6% +1 | 33.3% nothing happened 
          case targetValue.value:
            if (blessedScroll) {
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
            else if (whiteScroll) {
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

            scroll.value = null
            break;



        }
      }
      else {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          // white scroll # 100% +1
          case -1:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -2:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -3:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -4:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -5:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          // cursed scroll # 33.3% success  66.6% failure
          case -6:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -7:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -8:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if cursed scroll # 50% +1 | 50% nothing happened
          case targetValue.value:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;


        }
      }
    }
    else if (armorCategory && armorScroll && checkTargetSafetyValue(6)) {
      if (targetValue.value >= 0) {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          case 0:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          case 1:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          case 2:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;

            switch (scroll.value) {
              case blessedScroll:
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
                break;

              case cursedScroll:
                targetValue.value--
                break;

              default:
                targetValue.value++
                break;
            }
            scroll.value = null
            break;

            switch (scroll.value) {
              case blessedScroll:
                diceOneTo(2)

                switch (dice.value) {
                  case 2:
                    targetValue.value = targetValue.value + 2
                    break;

                  default:
                    targetValue.value++
                    break;
                }
                break;

              case cursedScroll:
                targetValue.value--
                break;

              default:
                targetValue.value++
                break;
            }
            scroll.value = null
            break;
          // blessed scroll # 50% +1 | 50% +2
          case 3:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          case 4:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          case 5:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          // white = blessed scroll # 1/n% success  n-1/n% failure
          case 6:
            if (blessedScroll || whiteScroll) {
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

            scroll.value = null
            break;
          case 7:
            if (blessedScroll || whiteScroll) {
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

            scroll.value = null
            break;
          case 8:
            if (blessedScroll || whiteScroll) {
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

            scroll.value = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if white scroll # 33.3% +1 | 66.6% nothing happened
          // if blessed scroll # 66.6% +1 | 33.3% nothing happened 
          case targetValue.value:
            if (blessedScroll) {
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
            else if (whiteScroll) {
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

            scroll.value = null
            break;



        }
      }
      else {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          // white scroll # 100% +1
          case -1:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -2:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -3:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -4:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -5:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          // cursed scroll # 33.3% success  66.6% failure
          case -6:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -7:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -8:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if cursed scroll # 50% +1 | 50% nothing happened
          case targetValue.value:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;



        }
      }
    }
    else if (armorCategory && armorScroll && checkTargetSafetyValue(4)) {
      if (targetValue.value >= 0) {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          case 0:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          case 1:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          case 2:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;

            switch (scroll.value) {
              case blessedScroll:
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
                break;

              case cursedScroll:
                targetValue.value--
                break;

              default:
                targetValue.value++
                break;
            }
            scroll.value = null
            break;

            switch (scroll.value) {
              case blessedScroll:
                diceOneTo(2)

                switch (dice.value) {
                  case 2:
                    targetValue.value = targetValue.value + 2
                    break;

                  default:
                    targetValue.value++
                    break;
                }
                break;

              case cursedScroll:
                targetValue.value--
                break;

              default:
                targetValue.value++
                break;
            }
            scroll.value = null
            break;
          // blessed scroll # 50% +1 | 50% +2
          case 3:
            if (blessedScroll) {
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
            else if (whiteScroll) targetValue.value++
            else targetValue.value--

            scroll.value = null
            break;
          // blessed scroll # 12.5% +1 | 12.5% +2 | 75% failure 
          // white scroll # 25% +1 || 75% failure
          case 4:
            if (blessedScroll) {
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
            else if (whiteScroll) {
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

            scroll.value = null
            break;
          // blessed scroll # 10% +1 | 10% +2 | 80% failure 
          // white scroll # 20% +1 || 80% failure
          case 5:
            if (blessedScroll) {
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
            else if (whiteScroll) {
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

            scroll.value = null
            break;
          // white = blessed scroll # 1/n% success  n-1/n% failure
          case 6:
            if (blessedScroll || whiteScroll) {
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

            scroll.value = null
            break;
          case 7:
            if (blessedScroll || whiteScroll) {
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

            scroll.value = null
            break;
          case 8:
            if (blessedScroll || whiteScroll) {
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

            scroll.value = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if white scroll # 33.3% +1 | 66.6% nothing happened
          // if blessed scroll # 66.6% +1 | 33.3% nothing happened 
          case targetValue.value:
            if (blessedScroll) {
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
            else if (whiteScroll) {
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

            scroll.value = null
            break;



        }
      }
      else {
        switch (targetValue.value) {
          // blessed scroll # 33.3% +1 | 33.3% +2 | 33.3% +3
          // white scroll # 100% +1
          case -1:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -2:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -3:
            if (cursedScroll) targetValue.value--
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          // cursed scroll # 1/n% success  n-1/n% failure
          case -4:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -5:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -6:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -7:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          case -8:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;
          // (infinity loop) 10% success  90% failure and then
          // if cursed scroll # 50% +1 | 50% nothing happened
          case targetValue.value:
            if (cursedScroll) {
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
            else if (blessedScroll) {
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

            scroll.value = null
            break;



        }
      }
    }
    else {
      //jewelry not open yet
    }

  })

  return { scroll, targetValue, targetSafetyValue, targetCategory, algorithm };
});

