<template>
  <ul class="uiRoleEquip">
    <li
      v-for="equip in storeRole.role.currentData.equips"
      :key="equip.id"
      class="equip"
      :class="equip.category"
      :style="{ backgroundImage: `url(${equip.src})` }"
      @click.stop="getDataForAlgorithm(equip, $event)"
      :data-displayEquipInfo="getEquipInfo(equip)"
    ></li>
  </ul>
</template>

<script setup>
import { useAlgorithmStore } from "../stores/algorithm";
import { useRoleStore } from "../stores/role";
const storeRole = useRoleStore();
const storeAlgorithm = useAlgorithmStore();
import { useScrollStore } from "../stores/scroll";
const storeScroll = useScrollStore();

const changeCursor = () => {
  if (storeScroll.scroll.targetScroll === null) {
    return 'url("/src/assets/UI/UI_pointer.png")9 7, auto';
  } else return 'url("/src/assets/UI/UI_target.png")11 17, auto';
};
const getEquipInfo = (equip) => {
  let equipInfo;
  const showPlusOrMinus = (value) => {
    return value >= 0 ? `+${value}` : value;
  };

  const getName = () => {
    const nameArmor = () => {
      return `${showPlusOrMinus(equip.value)} ${equip.name} (使用中)
防禦 ${equip.armor}${showPlusOrMinus(equip.value)}`;
    };
    const nameWeapon = () => {
      return (
        `${showPlusOrMinus(equip.value)} ${equip.name} (揮舞)
攻擊力 ${equip.attack.small}${showPlusOrMinus(equip.value)}/${
          equip.attack.large
        }${showPlusOrMinus(equip.value)}` + isTwoHandsWeapon()
      );
    };
    const nameJewelry = () => {
      return `${equip.name} (使用中)`;
    };
    const isTwoHandsWeapon = () => {
      return /雙手武器/.test(equip.grip) ? "\n  雙手武器" : "";
    };

    if (equip.category === "weapon") return nameWeapon();
    else if (equip.category.includes("armor")) return nameArmor();
    else if (equip.category.includes("jewelry")) return nameJewelry();
  };

  const getFeature = () => {
    //Jewelries are not opened yet
    const getFeatureText = () => {
      const showMR = () => {
        if (equip.mr === undefined) return "";

        if (/cloak/.test(equip.category)) {
          return showPlusOrMinus(equip.mr + equip.value * 2);
        } else if (/helmet|bodyArmor/.test(equip.category)) {
          return showPlusOrMinus(equip.mr + equip.value);
        }
      };
      return `可使用職業:
${equip.occupation}
  ${equip.feature} ${showMR()}`;
    };
    const getNoFeatureText = () => {
      return `可使用職業:
${equip.occupation}`;
    };

    if (!equip.feature) return getNoFeatureText();
    if (equip.category.includes("jewelry")) return "";
    return getFeatureText();
  };

  const getMaterial = () => {
    //Jewelries are not opened yet
    if (equip.category.includes("jewelry")) return "";
    return `材質:${equip.material}
  重量 ${equip.weight}`;
  };

  equipInfo = `${getName()}
  ${getFeature()}
  ${getMaterial()}`;

  return equipInfo;
};

const getDataForAlgorithm = (equip, event) => {
  storeAlgorithm.target.name = equip.name;
  storeAlgorithm.target.value = equip.value;
  storeAlgorithm.target.category = equip.category;
  storeAlgorithm.target.safetyValue = equip.safetyValue;

  storeAlgorithm.algorithmSystem(equip, event);
  setTimeout(() => {
    // Updating data to trigger reactivity for rendering getEquipInfo()
    equip.value = storeAlgorithm.target.value;
  }, 0);
};
</script>

<style lang="scss" scoped>
@use "../scss/common.scss";
.uiRoleEquip {
  position: absolute;
  inset: 0;
  &:hover {
    cursor: v-bind(changeCursor());
  }
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
      left: 35.4%;
    }

    &.armor {
      &.helmet {
        top: 13.5%;
        left: 70.5%;
        z-index: 2;
      }

      &.shirt {
        top: 31%;
        left: 47%;
        z-index: 1;
      }

      &.bodyArmor {
        top: 31%;
        left: 59.3%;
        z-index: 1;
      }

      &.cloak {
        top: 31%;
        left: 71.5%;
        z-index: 1;
      }

      &.shield {
        top: 44.2%;
        left: 78.5%;
      }

      &.gloves {
        top: 48.7%;
        left: 47.8%;
      }

      &.boots {
        top: 79.6%;
        left: 77%;
      }
    }

    &.jewelry {
      &.amulet {
        top: 19.3%;
        left: 58%;
      }

      &.left-ring {
        top: 42.2%;
        left: 34%;
      }

      &.belt {
        top: 41.2%;
        left: 64.2%;
      }

      &.right-ring {
        top: 54.5%;
        left: 77.3%;
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
