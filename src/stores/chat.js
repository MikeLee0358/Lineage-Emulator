import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useScrollStore } from './scroll';
import { useAlgorithmStore } from './algorithm';

export const useChatStore = defineStore('chat', () => {
  const chatLines = ref(Array(7))
  const scrollStore = useScrollStore()
  const algorithmStore = useAlgorithmStore()

  const chatUpdate = (text) => {
    chatLines.value.push(text)
    chatLines.value.shift()
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
    else if (algorithmStore.typeEquip('weapon')) return '藍色的'
    else return '銀色的'

  })
  const chatUpdateOne = computed(() => {
    chatUpdate(`${showNumber.value} ${algorithmStore.targetName} 一瞬間發出 ${detectColor.value} 光芒。`)
  })
  const chatUpdateMore = computed(() => {
    chatUpdate(`${showNumber.value} ${algorithmStore.targetName} 持續發出 ${detectColor.value} 光芒。`)
  })
  const chatUpdateGone = computed(() => {
    chatUpdate(`${showNumber.value} ${algorithmStore.targetName} 產生激烈的 ${detectColor.value} 光芒，一會兒後就消失了。`)
  })
  const chatUpdateNope = computed(() => {
    chatUpdate(`${showNumber.value} ${algorithmStore.targetName} 持續發出 產生激烈的 ${detectColor.value} 光芒，但是沒有任何事情發生。`)
  })






  const chatEquipV2 = () => {
    if (algorithmStore.diceChatState === 1) chatUpdateOne.value
    else if (algorithmStore.diceChatState === 0) chatUpdateGone.value
    else if (algorithmStore.diceChatState === null) chatUpdateNope.value
    else chatUpdateMore.value
  }

  return {
    chatEquipV2,
    chatLines,
    chatScroll,
  }
})
