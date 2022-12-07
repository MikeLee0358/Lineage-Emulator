import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import data from "../dataRole.js";

export const useRoleStore = defineStore("role", () => {
  const role = reactive({
    data,
    currentRole: "knight", // default of role
    currentData: computed(() => role.data[role.currentRole]),
    currentBg: computed(
      () => `url(src/assets/${role.currentRole}/bg_${role.currentRole}.png)`
    ),
  });

  function calcAC() {
    const roleEquips = role.currentData.equips;
    const armorDefault = role.currentData.basic.ac;
    let armorTotal = 0;

    roleEquips.forEach((roleEquip) => {
      const isArmor = computed(() => {
        return /armor/.test(roleEquip.category);
      });

      if (isArmor.value) armorTotal += roleEquip.armor + roleEquip.value;
    });
    return armorDefault - armorTotal;
  }

  return {
    role,
    calcAC,
  };
});
