import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useScrollStore } from './scroll';
import { useAlgorithmStore } from './algorithm';

export const useChatStore = defineStore('chat', () => {
  const chatLines = ref(['1', '2', '3', '4', '5', '6', '7'])
  const scrollStore = useScrollStore()
  const algorithmStore = useAlgorithmStore()

  const chatUpdate = (text) => {
    chatLines.value.shift()
    chatLines.value.push(text)
  }
  const chatScroll = computed(() => {
    if (scrollStore.targetScroll === null) chatUpdate(' ')
    else if (scrollStore.targetScroll.includes('Weapon')) chatUpdate('請選擇一種武器。')
    else if (scrollStore.targetScroll.includes('Armor')) chatUpdate('請選擇一種防具。')
  })
  const showNumber = computed(() => {
    if (algorithmStore.targetValue === 0) return `+${algorithmStore.targetValue}`;
    return algorithmStore.targetValue > 0 ? `+${algorithmStore.targetValue}` : algorithmStore.targetValue;
  }
  )
  const detectColor = computed(() => {
    if (scrollStore.typeScroll('cursed')) return '黑色的'
    else if (algorithmStore.typeEquip('Weapon')) return '藍色的'
    else return '銀色的'

  })
  const chatPass = computed(() => {
    chatUpdate(`${showNumber.value} ${algorithmStore.targetName} 一瞬間發出 ${detectColor.value} 光芒。`)
  })
  const chatLucky = computed(() => {
    chatUpdate(`${showNumber.value} ${algorithmStore.targetName} 持續發出 ${detectColor.value} 光芒。`)
  })
  const chatGone = computed(() => {
    chatUpdate(`${showNumber.value} ${algorithmStore.targetName} 產生激烈的 ${detectColor.value} 光芒，一會兒後就消失了。`)
  })
  const chatNope = computed(() => {
    chatUpdate(`${showNumber.value} ${algorithmStore.targetName} 持續發出 產生激烈的 ${detectColor.value} 光芒，但是沒有任何事情發生。`)
  })
  const chatCurse = computed(() => {
    chatUpdate(`${showNumber.value} ${algorithmStore.targetName} 一瞬間發出 ${detectColor.value} 光芒。`)
  })


  // const chatEquip = computed(() => {
  //   if (scrollStore.typeScroll('Blessed')) {
  //     if (algorithmStore.dice === 1) chatPass.value
  //     else chatLucky.value
  //   }
  // })


  const chatEquip = computed(() => {
    console.log(1)
    switch (true) {
      case scrollStore.typeScroll('blessed'):

        if (algorithmStore.targetSafetyValue > algorithmStore.targetValue) {
          if (algorithmStore.dice === 1) chatPass.value
          else chatLucky.value
        } else if ([3, 4, 5].includes(algorithmStore.targetValue)) {
          if (algorithmStore.dice === 1) chatPass.value
          else if (algorithmStore.dice === 2) chatLucky.value
          else chatGone.value
        } else if ([6, 7, 8].includes(algorithmStore.targetValue)) {
          if (algorithmStore.dice === 1) chatPass.value
          else chatGone.value
        } else {
          if (algorithmStore.secDice === 1) {
            if (algorithmStore.dice === 1) chatNope.value
            else chatPass.value
          } else chatGone.value
        }

        break;

      default:
        break;
    }
    console.log(2)
  })

  return {
    chatEquip,
    chatLines,
    chatScroll,
  }
})
