import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import data from "../data/dataRole.js";

export const useRoleStore = defineStore("role", () => {
  const role = reactive({
    data,

    currentRole: "knight", // default of role
    currentData: computed(() => role.data[role.currentRole]),
    currentBg: computed(
      () => `url(src/assets/${role.currentRole}/bg_${role.currentRole}.png)`
    ),
  });

  function getAC() {
    const roleEquips = role.currentData.equips;
    const roleAC = role.currentData.basic.ac;
    let stackAC = 0;
    let totalAC;

    roleEquips.forEach((roleEquip) => {
      const isArmor = computed(() => {
        return /armor/.test(roleEquip.category);
      });

      if (isArmor.value) stackAC += roleEquip.armor + roleEquip.value;
    });

    totalAC = roleAC - stackAC;

    return totalAC;
  }

  function getMR() {
    const roleEquips = role.currentData.equips;
    const roleMR = role.currentData.basic.mr;
    let stackMR = 0;
    let totalMR;

    roleEquips.forEach((roleEquip) => {
      const isEquipMR = computed(() => {
        return roleEquip.mr !== undefined;
      });
      if (!isEquipMR.value) return;
      else if (/cloak/.test(roleEquip.category))
        stackMR += roleEquip.mr + roleEquip.value * 2;
      else stackMR += roleEquip.mr + roleEquip.value;
    });

    totalMR = roleMR + stackMR;

    return totalMR;
  }
  return {
    role,
    getAC,
    getMR,
  };
});
