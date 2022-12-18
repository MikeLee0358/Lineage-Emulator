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
    updatedAttr: 0,
  });

  const isEquipedAttrArmor = (boolean) => {
    const equips = role.currentData.equips;
    const equipNameToAttribute = {
      力量手套: "str",
      艾爾穆的祝福: "dex",
      魔法能量之書: "int",
      影子手套: "con",
    };
    equips.forEach((equip) => {
      if (equip.isEquipedAttrArmor) {
        const attribute = equipNameToAttribute[equip.name];
        if (boolean === false) {
          role.currentData.basic[attribute] -= equip.attribute[attribute];
          return;
        }
        role.currentData.basic[attribute] += equip.attribute[attribute];
      }
    });
  };

  function getAC() {
    const roleEquips = role.currentData.equips;
    const roleAC = role.currentData.basic.ac;
    let stackAC = 0;

    roleEquips.forEach((roleEquip) => {
      const isArmor = computed(() => {
        return /armor/.test(roleEquip.category);
      });

      if (isArmor.value) stackAC += roleEquip.armor + roleEquip.value;
    });

    return roleAC - stackAC;
  }

  function getMR() {
    const roleEquips = role.currentData.equips;
    const roleMR = role.currentData.basic.mr;
    let stackMR = 0;

    roleEquips.forEach((roleEquip) => {
      const isEquipMR = computed(() => {
        return roleEquip.mr !== undefined;
      });
      if (!isEquipMR.value) return;
      else if (/cloak/.test(roleEquip.category))
        stackMR += roleEquip.mr + roleEquip.value * 2;
      else stackMR += roleEquip.mr + roleEquip.value;
    });

    return roleMR + stackMR;
  }
  isEquipedAttrArmor();
  return {
    role,
    getAC,
    getMR,
    isEquipedAttrArmor,
  };
});
