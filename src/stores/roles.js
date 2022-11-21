import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useRoleStore = defineStore('role', () => {
  const currentRole = ref('knight')
  const roles = ref({
    prince: {
      title: 'prince',
      basic: {
        lv: 1,
        exp: 0.00,
        hp: 14,
        hpRate: 11.5,
        mp: 2,
        mpRate: 2.5,
        ac: 10,
        mr: 10,
      },
      attributes: {
        str: 16,
        dex: 10,
        con: 10,
        int: 11,
        wis: 10,
        cha: 18,
      },

    },
    knight: {
      title: 'knight',
      basic: {
        lv: 1,
        exp: 0.00,
        hp: 16,
        hpRate: 17.5,
        mp: 1,
        mpRate: 1,
        ac: 10,
        mr: 0,
      },
      attributes: {
        str: 20,
        dex: 12,
        con: 14,
        int: 9,
        wis: 8,
        cha: 12,
      },

    },
    elf: {
      title: 'elf',
      basic: {
        lv: 1,
        exp: 0.00,
        hp: 15,
        hpRate: 11.5,
        mp: 5,
        mpRate: 4.33,
        ac: 10,
        mr: 25,
      },
      attributes: {
        str: 11,
        dex: 18,
        con: 13,
        int: 12,
        wis: 12,
        cha: 9,
      },

    },
    magician: {
      title: 'magician',
      basic: {
        lv: 1,
        exp: 0.00,
        hp: 12,
        hpRate: 7.5,
        mp: 8,
        mpRate: 11,
        ac: 10,
        mr: 26,
      },
      attributes: {
        str: 8,
        dex: 7,
        con: 12,
        int: 18,
        wis: 18,
        cha: 12,
      },

    },
  })

  const changeBg = computed(() => {
    return `url(src/assets/${currentRole.value}/bg_${currentRole.value}.png)`;
  })


  return { roles, currentRole, changeBg }
})

