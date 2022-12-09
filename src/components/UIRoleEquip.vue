<template>
  <ul class="uiRoleEquip">
    <li
      v-for="equip in storeRole.role.currentData.equips"
      :key="equip.id"
      class="equip"
      :class="equip.category"
      :style="{ backgroundImage: `url(${equip.src})` }"
      @click.stop="dataForAlgorithm(equip, $event)"
      :data-displayEquipInfo="getEquipInfo(equip)"
    ></li>
  </ul>
</template>

<script setup>
import { useAlgorithmStore } from "../stores/algorithm";
import { useRoleStore } from "../stores/role";
const storeRole = useRoleStore();
const storeAlgorithm = useAlgorithmStore();

const getEquipInfo = (equip) => {
  let equipInfo = "";
  const showPlusOrMinus = (value) => {
    if (value === 0) return `+0`;
    return value > 0 ? `+${value}` : value;
  };
  const getName = () => {
    const equipName = equip.name;
    const equipValue = equip.value;
    const equipArmor = equip.armor;
    const equipAttack = equip.attack;

    const isTwoHandsWeapon = () => {
      return equip.grip === "雙手武器" ? "\n 雙手武器" : "";
    };

    if (equip.category === "weapon") {
      return (
        `${showPlusOrMinus(equipValue)} ${equipName} (揮舞)
攻擊力 ${equipAttack.small}${showPlusOrMinus(equipValue)}/${
          equipAttack.large
        }${showPlusOrMinus(equipValue)}` + isTwoHandsWeapon()
      );
    } else if (equip.category.includes("armor")) {
      return `${showPlusOrMinus(equipValue)} ${equipName} (使用中)
防禦 ${equipArmor}${showPlusOrMinus(equipValue)}`;
    } else if (equip.category.includes("jewelry")) {
      return `${equipName} (使用中)`;
    }
  };
  const getFeature = () => {
    //Jewelry are not opened yet
    if (equip.category.includes("jewelry")) return "";
    const hasFeature = equip.feature;
    const occupation = equip.occupation;

    if (hasFeature) {
      const showMR = () => {
        if (equip.mr === undefined) return "";

        if (/cloak/.test(equip.category))
          return showPlusOrMinus(equip.mr + equip.value * 2);
        else if (/helmet|bodyArmor/.test(equip.category))
          return showPlusOrMinus(equip.mr + equip.value);
      };
      return `可使用職業:
${occupation}
  ${hasFeature} ${showMR()}`;
    } else {
      return `可使用職業:
${occupation}`;
    }
  };
  const getMaterial = () => {
    //Jewelry are not opened yet
    if (equip.category.includes("jewelry")) return "";
    const toDisplay = equip;

    return `材質:${toDisplay.material}
  重量 ${toDisplay.weight}`;
  };

  equipInfo = `${getName()}
  ${getFeature()}
  ${getMaterial()}`;

  return equipInfo;
};
const dataForAlgorithm = (equip, event) => {
  storeAlgorithm.target.name = equip.name;
  storeAlgorithm.target.value = equip.value;
  storeAlgorithm.target.category = equip.category;
  storeAlgorithm.target.safetyValue = equip.safetyValue;

  storeAlgorithm.algorithmSystem(equip, event);

  // Updating data to trigger reactivity for rendering getEquipInfo()
  setTimeout(() => {
    equip.value = storeAlgorithm.target.value;
  }, 0);
};
</script>

<style lang="scss" scoped>
@use "../scss/common.scss";
.uiRoleEquip {
  position: absolute;
  inset: 0;
  .equip {
    position: absolute;
    width: 11%;
    height: 9%;
    background-repeat: round;
    background-size: cover;
    color: transparent;
    opacity: 1;
    transition: opacity 1s cubic-bezier(0.18, 0.89, 0.32, 1.28);

    &::after {
      content: attr(data-displayEquipInfo);
      position: absolute;
      top: 102%;
      z-index: 1;
      width: 375%;
      border-width: 0.22vw;
      display: none;

      font-size: 1.3vw;
      line-height: 100%;
      @extend %templateInfoStyle;
      color: var(--color-white);
    }

    &:hover::after {
      display: block;
    }

    &.weapon {
      top: 52.2%;
      left: 36.1%;
    }

    &.armor {
      &.helmet {
        top: 13.5%;
        left: 71.2%;
        z-index: 2;
      }

      &.shirt {
        top: 31%;
        left: 47.7%;
        z-index: 1;
      }

      &.bodyArmor {
        top: 31%;
        left: 60%;
        z-index: 1;
      }

      &.cloak {
        top: 31%;
        left: 72.2%;
        z-index: 1;
      }

      &.shield {
        top: 44.2%;
        left: 79.2%;
      }

      &.gloves {
        top: 48.7%;
        left: 48.5%;
      }

      &.boots {
        top: 79.6%;
        left: 77.7%;
      }
    }

    &.jewelry {
      &.amulet {
        top: 19.3%;
        left: 58.7%;
      }

      &.left-ring {
        top: 42.2%;
        left: 34.7%;
      }

      &.belt {
        top: 41.2%;
        left: 64.9%;
      }

      &.right-ring {
        top: 54.5%;
        left: 78%;
      }

      &.amulet::after,
      &.belt::after,
      &.left-ring::after,
      &.right-ring::after {
        color: var(--color-grey);
        border: unset;
        background: unset;
        padding: unset;
        white-space: nowrap;
      }
    }
  }
}

.hidden {
  visibility: hidden;
  opacity: 0 !important;
}
</style>
